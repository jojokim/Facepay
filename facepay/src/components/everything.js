import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import * as firebase from 'firebase';
import firestore from 'firebase/firestore';
import styles from './everything.css';
import $ from 'jquery';
import Webcam from 'react-webcam';

import logo0 from '../imgs/plink2.png';
import logo1 from '../imgs/plink3.png';

var storage;
let db;
// Create a root reference
var subscriptionKey = "cb2e4566d1ac4bdea478b4a3e9ec7256";

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      hello: '',
      info: '',
      first: 'First',
      last: 'Last',
      imgurl: 'imgURL',
      imgsrc: logo1,
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.addPerson = this.addPerson.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

    componentDidMount () {
       console.log("runs");
      let timerId = setInterval(() => {
        if (this.state.imgsrc == logo0)
          this.setState({imgsrc:logo1});
        else
          this.setState({imgsrc:logo0});
      }, 3000);
      let timerId3 = setTimeout(() => {
        let timerId2 = setInterval(() => {
          if (this.state.imgsrc == logo0)
            this.setState({imgsrc:logo1});
          else
            this.setState({imgsrc:logo0});
        }, 3000);
      }, 500);
    }

    componentWillMount() {
      db = firebase.firestore();
      storage = firebase.storage();
    }

    setRef = (webcam) => {
      this.webcam = webcam;
    }

    captureAndAdd = () => {
      let imageSrc = this.webcam.getScreenshot();
      imageSrc = imageSrc.substr(23);
      const imgBlob = this.b64toBlob(imageSrc, "image/jpeg");
      var storageRef = firebase.storage().ref();
      
      var uploadTask = storageRef.child('fromapp'+Date.now+'.jpg').put(imgBlob);
      uploadTask.on('state_changed', function(snapshot){
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      }, function(error) {
        // Handle unsuccessful uploads
      }, function() {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        var downloadURL = uploadTask.snapshot.downloadURL;
        this.setState({imgurl : downloadURL});
        this.addPerson();
      });
    }

    captureAndProcess = () => {
      let imageSrc = this.webcam.getScreenshot();
      imageSrc = imageSrc.substr(23);
      const imgBlob = this.b64toBlob(imageSrc, "image/jpeg");
      this.detect(imgBlob);
    };

    b64toBlob(b64Data, contentType, sliceSize) {
      contentType = contentType || '';
      sliceSize = sliceSize || 256;
      var byteCharacters = atob(b64Data);
      var byteArrays = [];
      for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);
        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
        var byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }
      var blob = new Blob(byteArrays, {type: contentType});
      return blob;
    }

    detect = (blob) => {
      var header = {  'Content-Type': 'application/octet-stream','Ocp-Apim-Subscription-Key': subscriptionKey,  };
      //var header = {  'Content-Type': 'application/json','Ocp-Apim-Subscription-Key': subscriptionKey,  };
      // Request parameters.
      var params = {
        "returnFaceId": "true",
        "returnFaceLandmarks": "false",
      };
      // variables used for finding the largest rectangle later
      var index = 0;
      var max_size = 0;
      fetch('https://eastus.api.cognitive.microsoft.com/face/v1.0/detect?' + params, {
        method: 'POST',
        headers: header,
        body: blob,
      }).then((res) => {
        return res.json();
      }).then(data => {
        window.data = data;
        if (data.length > 1) {
          // calculate the square size for each array, and the return the faceId of the largest rectangle
          for (let i = 0; i < data.length; i++) {
             if (max_size < this.size_of_rectangle(data[i])) {
              max_size = this.size_of_rectangle(data[i]);
              index = i;
             }
          }
        }
        if (data[0] == null);
          //this.setState({hello:"Analyzing"});
        else {
          this.identify(data[index].faceId);
        }
      });

    };

    size_of_rectangle = (d) => {
      var width = d.faceRectangle["width"];
      var height = d.faceRectangle["height"];
      var size = width * height;
      return size;
    }

    identify = (fid) => {
      var header = {  'Content-Type': 'application/json','Ocp-Apim-Subscription-Key': subscriptionKey,  };
      console.log(fid +"is the fid");
      fetch('https://eastus.api.cognitive.microsoft.com/face/v1.0/identify', {
        method: 'POST',
        headers: header,
        body: JSON.stringify({
          faceIds:[fid],
          personGroupId:"hophacks",
          maxNumOfCandidatesReturned: "1",
        })
      }).then(data => {
        return data.json();
      }).then(result => {
        if (result[0].candidates[0])
          this.getPersistedId(result[0].candidates[0].personId);

          this.setState = result[0].candicates[0].confidence;
      }).catch(err => {
        console.log(err);
      });

    }

    getPersistedId = (personId) => {
      // Request parameters.
      var params = {"personGroupId":"hophacks", "personId":personId};
      // Perform the REST API call.
        fetch('https://eastus.api.cognitive.microsoft.com/face/v1.0/persongroups/hophacks/persons/'+ personId+'?' + $.param(params), {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': subscriptionKey,
          }
        }).then(function(data) {
          return data.json();
      }).then(res=> {
        var persistedId = res.persistedFaceIds[0];
        this.bringPersonInfo(res.userData);
      }).catch(function(err) {
          console.log(err);
      });
    }

    bringPersonInfo = (docId) => {
      var docRef = db.collection("users").doc(docId);
      docRef.get().then(doc => {
          if (doc.exists) {
              console.log("Document data:", doc.data());
              this.setState({hello : "Hi, " + doc.data().first + "!",})
          } else {
              console.log("Not on the system!");
          }
      }).catch(function(error) {
          console.log("Error getting Data:", error);
      });
    }

    componentWillMount() {
      db = firebase.firestore();
    }

    createGroup() {
      // Request parameters.
      var params = {
        "personGroupId":"hophacks",
      };
      fetch('https://eastus.api.cognitive.microsoft.com/face/v1.0/persongroups/hophacks?' + $.param(params), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key': subscriptionKey,
        },
        body: JSON.stringify({
          name: 'hophacksgroup',
          userData: 'containsdocs',
        })
      }).then(function() {
        console.log("ok");
      }).catch(function() {
          console.log("error");
      });
    }

    getGroup() {
      // Request parameters.
      var params = {"personGroupId":"hophacks"};
      // Perform the REST API call.
        fetch('https://eastus.api.cognitive.microsoft.com/face/v1.0/persongroups/hophacks?' + $.param(params), {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': subscriptionKey,
          }
        }).then(function(data) {
          return data.json();

      }).then(res=> {
        window.res = res;
      }).catch(function() {
          console.log("error");
      });
    }

    addPerson() {
      let User = {
        first: this.state.first,
        last: this.state.last,
        img: this.state.imgurl,
        pid: " ",
      };
      db.collection('users').add(User).then(function(docRef) {
          console.log('Added with docID : ' + docRef.id);
          // Request parameters.
          var params = {"personGroupId":"hophacks"};
          var header = {  'Content-Type': 'application/json','Ocp-Apim-Subscription-Key': subscriptionKey,  };
          fetch('https://eastus.api.cognitive.microsoft.com/face/v1.0/persongroups/hophacks/persons', {
            method: 'POST',
            headers: header,
            body: JSON.stringify({
              name: (User.first+" "+User.last),
              userData: docRef.id,
            })
          }).then(function(res) {
            console.log("added to azure");
            return res.json();
        }).then(function(data) {
              // putting person's image part //
              var pid = data["personId"];
              params = {"personGroupId":"hophacks", "personId": pid,};

              fetch('https://eastus.api.cognitive.microsoft.com/face/v1.0/persongroups/hophacks/persons/'+ pid +'/persistedFaces', {
                  method: 'POST',
                  headers: header,
                  body: JSON.stringify({  url: User.img })
                }).then(function(result) {
                    console.log("added to azure");
                    return result.json();
                }).then(function(dat) {
                  window.dat = dat;
                  User.pid = dat["persistedFaceId"];
                  docRef.set(User);
                  console.log("update_finished");
                });
        });
      });
    }

    trainStatus() {
      // Request parameters.
      var params = {"personGroupId":"hophacks"};
      // Perform the REST API call.
        fetch('https://eastus.api.cognitive.microsoft.com/face/v1.0/persongroups/hophacks/training?' + $.param(params), {
          method: 'GET',
          headers: {
            'Ocp-Apim-Subscription-Key': subscriptionKey,
          }
        }).then(function() {
          console.log("success");

      }).catch(function() {
          console.log("error");
      });
    }

    trainGroup() {
      // Request parameters.
      var params = {"personGroupId":"hophacks"};
      // Perform the REST API call.
        fetch('https://eastus.api.cognitive.microsoft.com/face/v1.0/persongroups/hophacks/train?' + $.param(params), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': subscriptionKey,
          }
        }).then(function() {
          console.log("train success");

      }).catch(function() {
          console.log("train error");
      });
    }

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="col-sm">
            </div>
            <div className="col-sm">
              <h1>{this.state.name}</h1>
              <h1>{this.state.hello}</h1>
              <h2>{this.state.info}</h2>
              {
                (this.state.name == '') ? <img className="centered" src={this.state.imgsrc} alt="plink" onClick={this.captureAndProcess}/> : ''
              }
            </div>
            <div className="col-sm">
            </div>
          </div>
        </div>


        <div>
          <div className ="forms">
            <input name="first" type="text" value={this.state.first} onChange={this.handleInputChange}/>
            <input name="last" type="text" value={this.state.last} onChange={this.handleInputChange}/>
            <input name="imgurl" type="text" value={this.state.imgurl} onChange={this.handleInputChange}/>
            <button onClick={() => this.addPerson(this.state.first, this.state.last, this.state.imgurl)}>Add</button>
            <button onClick={this.trainStatus}>Train Check</button>
            <button onClick={this.trainGroup}>Train Group</button>
          </div>
        </div>

        <Webcam
          audio={false}
          height={500}
          ref={this.setRef}
          screenshotFormat="image/jpeg"
          width={500}
        />
      </div>
    );
  }
}

export default App;

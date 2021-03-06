import React, { Component } from 'react';
import $ from 'jquery';
import Webcam from 'react-webcam';

import * as firebase from 'firebase';
import firestore from 'firebase/firestore';

import Chart from './chart';


let db;
// Create a root reference
var subscriptionKey = "cb2e4566d1ac4bdea478b4a3e9ec7256";

export default class Face extends Component {

  constructor () {
    super();
    this.state = {
      confidence : 0,
    };
  }

  componentWillMount() {
    db = firebase.firestore();
  }

  setRef = (webcam) => {
    this.webcam = webcam;
  }

  autoprogo = () => {
    let timeroutId = setTimeout(() => this.automatedProcess(), 5000);
  }

  automatedProcess = () => {
    let timerId = setInterval(() => this.captureAndProcess(), 999);
    setTimeout(() => { clearInterval(timerId); this.emoValue = this.emoCheck(); }, 5000);
    console.log("automated Process started");
  };

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

  render() {

    return (
      <div>
        <div>
          <h1>{this.state.name}</h1>
          <h1>{this.state.hello}</h1>
          <h2>{this.state.info}</h2>

          <Chart conf={this.state.confidence}/>
          <Webcam
            audio={false}
            height={500}
            ref={this.setRef}
            screenshotFormat="image/jpeg"
            width={500}
          />
          <br/>
          <button onClick={this.captureAndProcess}>Magic Button</button>
        </div>

      </div>
    );
  }
}

import React, { Component } from 'react';
import $ from 'jquery';
import * as firebase from 'firebase';
import firestore from 'firebase/firestore';

var subscriptionKey = "cb2e4566d1ac4bdea478b4a3e9ec7256";
let db;

export default class Group extends Component {

  constructor () {
    super();
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
      }).then(function() {
        console.log("ok");

    }).catch(function() {
        console.log("error");
    });
  }

  addPerson(nameIn, imgUrl) {
    let User = {
      first: "Someone",
      last: "Person",
      img: "https://scontent-iad3-1.xx.fbcdn.net/v/t1.0-9/18813881_1323154691133471_2162425183642652951_n.jpg?oh=ffc98a87253b8ab0ab22d2e557107931&oe=5B0546D1",
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

  render() {
    return (
      <div>
        <button onClick={this.createGroup}>Create Face List</button>
        <button onClick={this.getGroup}>Get Group</button>
        <div className ="forms">
          <input className="formControl" type="text" placeholder="First Name"/>
          <input className="formControl" type="text" placeholder="Last Name"/>
          <input className="formControl" type="text" placeholder="Img Url"/>
          <button onClick={this.addPerson}>Add</button>
        </div>
      </div>
    );
  }
}

import React, { Component } from 'react';
import $ from 'jquery';
import Webcam from 'react-webcam';

export default class Face extends Component {

  constructor () {
    super();
    this.state = {value: ''};
    this.value = 0;
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
    this.processImage(imgBlob);
  };

  b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;
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

  processImage(blob) {
    var subscriptionKey = "cb2e4566d1ac4bdea478b4a3e9ec7256";
    var uriBase = "https://eastus.api.cognitive.microsoft.com/face/v1.0/detect";

    // Request parameters.
    var params = {
      "returnFaceId": "false",
      "returnFaceLandmarks": "false",
    };

    // Perform the REST API call.
      $.ajax({
        url: uriBase + "?" + $.param(params),
        contentType: false,
        processData: false,
        // Request headers.
        beforeSend: function(xhrObj){
        //xhrObj.setRequestHeader("Content-Type","application/json");
        xhrObj.setRequestHeader("Content-Type","application/octet-stream");
        xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
        },
        type: "POST",
        // Request body.
        data: blob,
      })
      .done((data) => {
        // Show formatted JSON on webpage.
        $("#responseTextArea").val(JSON.stringify(data, null, 2));
        console.log(JSON.stringify(data, null, 2));
        if (data[0] != null) {
          console.log(this.emotion);
        }
        //this part is where you process things all the function call goes here
        faceCompare(data);
      })
      .fail(function(jqXHR, textStatus, errorThrown) {
        // Display error message.
        var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
        errorString += (jqXHR.responseText === "") ? "" : (JSON.parse(jqXHR.responseText)) ?
        JSON.parse(jqXHR.responseText).message : JSON.parse(jqXHR.responseText).error.message;
        alert(errorString);
      });
  }

  faceCompare = (data) => {

  }

  render() {
    /* this.autoprogo();  */
    const styles = {
      font: {
        textAlign: 'center',
        color: 'white',
        marginTop: '100px',
        marginBottom: '40px'
      }
    }

    return (
      <div>
        <div>
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

        <br/><br/>
        <div id="wrapper" style={this.outputStyle}>
            <div id="jsonOutput" style={this.imageStyle}>
                Response:
                <br/><br/>
                <textarea id="responseTextArea" className="UIInput" style={{width:'580px', height:'400px'}}></textarea>
            </div>
        </div>

      </div>
    );
  }
}

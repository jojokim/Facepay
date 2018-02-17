import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppBar title="FacePay"/>
      </div>
    );
  }
}

export default App;

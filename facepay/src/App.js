import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

import Face from './components/face';
import Chart from './components/chart';
import Group from './components/group';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppBar title="FacePay"/>
        <Group/>
        <Face/>
        <Chart/>
      </div>
    );
  }
}

export default App;

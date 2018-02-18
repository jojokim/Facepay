import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import * as firebase from 'firebase';
<<<<<<< HEAD
import firestore from 'firebase/firestore';
import styles from './App.css';
=======
import firestore from 'firebase/firestore'
>>>>>>> parent of c629809... css

import Face from './components/face';
import Chart from './components/chart';
import Group from './components/group';

class App extends Component {
<<<<<<< HEAD
  constructor() {
    super();
    this.state = {
      imgurl : "",
    }
  }

  ender() {
    return (
      <div className="App">

=======
  render() {
    return (
      <div className="App">
        <AppBar title="FacePay"/>
>>>>>>> parent of c629809... css
        <Group/>
        <Face/>
        <Chart/>
      </div>
    );
  }
}

export default App;

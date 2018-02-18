import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import * as firebase from 'firebase';
import firestore from 'firebase/firestore';
import styles from './App.css';

import img1 from './imgs/plink4.png';
import img2 from './imgs/blink2.png';

import Face from './components/face';
import Chart from './components/chart';
import Group from './components/group';

class App extends Component {
  constructor() {
    super();
    this.state = {
      imgurl : [""];
    }
  }

  ender() {
    return (
      <div className="App">
        <img src="" alt=""/>
        <Group/>
        <Face/>
        <Chart/>
      </div>
    );
  }
}

export default App;

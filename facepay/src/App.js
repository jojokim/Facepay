import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import * as firebase from 'firebase';
import firestore from 'firebase/firestore';
import styles from './App.css';

import Face from './components/face';
import Chart from './components/chart';
import Group from './components/group';

import logo0 from './imgs/plink2.png';
import logo1 from './imgs/plink3.png';

class App extends Component {
  constructor() {
    super();
    this.state = {
      imgurl : [logo1, logo0],
    }
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <img className="plink" src={this.state.imgurl[0]} alt="plink"/>
        </div>

        <Group/>
        <Face/>
        <Chart/>
      </div>
    );
  }
}

export default App;

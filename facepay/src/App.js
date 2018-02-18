import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import * as firebase from 'firebase';
import firestore from 'firebase/firestore';
import styles from './App.css';

import Face from './components/face';
import Chart from './components/chart';
import Group from './components/group';

class App extends Component {
  constructor() {
    super();
    this.state = {
<<<<<<< HEAD
=======
      imgurl : "",
>>>>>>> 85a5b4750079dc8e704220429c90b1e323bb1372
    }
  }

  render() {
    return (
      <div className="App">
        <Group/>
        <Face/>
        <Chart/>
      </div>
    );
  }
}

export default App;

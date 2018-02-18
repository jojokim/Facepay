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
      imgurl : logo1,
      verified : false,
    }
  }

   componentDidMount () {
     console.log("runs");
    let timerId = setInterval(() => {
      if (this.state.imgurl == logo0)
        this.setState({imgurl:logo1});
      else
        this.setState({imgurl:logo0});
    }, 3000);
    let timerId3 = setTimeout(() => {
      let timerId2 = setInterval(() => {
        if (this.state.imgurl == logo0)
          this.setState({imgurl:logo1});
        else
          this.setState({imgurl:logo0});
      }, 3000);
    }, 500);
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="col-sm">
            </div>
            <div className="col-sm">
              <img className="centered" src={this.state.imgurl} alt="plink"/>
            </div>
            <div className="col-sm">
            </div>
          </div>
        </div>
        <Face/>
        <Group/>
        <Chart/>
      </div>
    );
  }
}

export default App;

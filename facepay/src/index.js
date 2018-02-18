import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {lightGreen500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import * as firebase from 'firebase';
import firestore from 'firebase/firestore'
import registerServiceWorker from './registerServiceWorker';

var config = {
   apiKey: 'AIzaSyDXC_ba_hzVZrlZg1ly3nzgL9hlGNJlaxc',
   authDomain: 'airy-charmer-164016.firebaseapp.com',
   databaseURL: 'https://airy-charmer-164016.firebaseio.com',
   projectId: 'airy-charmer-164016',
   storageBucket: 'airy-charmer-164016.appspot.com',
   messagingSenderId: '359173267747',
};

firebase.initializeApp(config);
firebase.firestore().enablePersistence();

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: "#f28499",
  },
});

const MuiApp = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <App/>
  </MuiThemeProvider>
);

ReactDOM.render(<MuiApp/>, document.getElementById('root'));
registerServiceWorker();

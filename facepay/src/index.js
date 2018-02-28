import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/everything';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {lightGreen500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import * as firebase from 'firebase';
import firestore from 'firebase/firestore'
import registerServiceWorker from './registerServiceWorker';

var config = {
   // fetch from firebase //
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

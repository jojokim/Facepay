import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

var config = {
   apiKey: "AIzaSyDXC_ba_hzVZrlZg1ly3nzgL9hlGNJlaxc",
       authDomain: "airy-charmer-164016.firebaseapp.com",
       databaseURL: "https://airy-charmer-164016.firebaseio.com",
       projectId: "airy-charmer-164016",
       storageBucket: "airy-charmer-164016.appspot.com",
       messagingSenderId: "359173267747"
};

firebase.initializeApp(config);
firebase.firestore().enablePersistence();

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

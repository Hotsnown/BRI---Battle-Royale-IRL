import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyB9sCRCcvnmiQhBQkABfpMg6nr5QMNCt-w",
  authDomain: "pubg-irl-261413.firebaseapp.com",
  databaseURL: "https://pubg-irl-261413.firebaseio.com",
  projectId: "pubg-irl-261413",
  storageBucket: "pubg-irl-261413.appspot.com",
  messagingSenderId: "663648480299",
  appId: "1:663648480299:web:80cb1e26e8cb1889c40e6e",
  measurementId: "G-C5F395KGFQ"
};
  
 const firebaseApp  = firebase.initializeApp(firebaseConfig);

export default firebaseApp;

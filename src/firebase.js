import firebase from 'firebase/app'
import 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'

const config = {
    apiKey: "AIzaSyBKBIdVQsvEZT6mZ16r9IfqvHz8EU7375I",
    authDomain: "tryzna-e6433.firebaseapp.com",
    databaseURL: "https://tryzna-e6433.firebaseio.com",
    projectId: "tryzna-e6433",
    storageBucket: "tryzna-e6433.appspot.com",
    messagingSenderId: "85016489552"
  };
  firebase.initializeApp(config);

const firebaseDB = firebase.database();
const firebaseHNavs = firebaseDB.ref('hnavs');
const firebaseSlider = firebaseDB.ref('slider');

export {
    firebase,
    firebaseHNavs,
    firebaseSlider,
    firebaseDB
}
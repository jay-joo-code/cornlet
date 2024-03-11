import * as firebase from "firebase/app";
import 'firebase/storage';
import uploadFile from './uploadFile';

const firebaseConfig = {
  apiKey: "AIzaSyAQ9olIfEWy0ydA0yJU52qfH0paJn9MXIM",
  authDomain: "cornlet-prod.firebaseapp.com",
  databaseURL: "https://cornlet-prod.firebaseio.com",
  projectId: "cornlet-prod",
  storageBucket: "cornlet-prod.appspot.com",
  messagingSenderId: "88125142899",
  appId: "1:88125142899:web:59480abcd4cf2bd7eb7706",
  measurementId: "G-045Z67SPL6"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
export {
  uploadFile,
}
import firebase from 'firebase/app'
import 'firebase/database'

var firebaseConfig = {
    apiKey: "AIzaSyBqT3oIwoJSdKuj4iq_m2EBK1bh4TnSLbg",
    authDomain: "breadbox-147c2.firebaseapp.com",
    projectId: "breadbox-147c2",
    storageBucket: "breadbox-147c2.appspot.com",
    messagingSenderId: "458411662648",
    appId: "1:458411662648:web:fcd2c043f4fe74769c35cd",
    measurementId: "G-1N4225LKW7"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
export default db;
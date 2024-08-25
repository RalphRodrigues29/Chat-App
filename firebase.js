//import firebase from "./firebase";

//import firebase from "./firebase/app";
//import "firebase/firestore";
//import "firebase/auth";

import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBwnCQ9lGt5RuYLlUYWbEgJhfM9oF-846A",
    authDomain: "whatsapp-2-accae.firebaseapp.com",
    projectId: "whatsapp-2-accae",
    storageBucket: "whatsapp-2-accae.appspot.com",
    messagingSenderId: "164136485851",
    appId: "1:164136485851:web:edcc1f7ec5b2a2bbdf9dfe"
};

/*const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
  */

const app = initializeApp(firebaseConfig);

//const db = app.firestore();
const db = getFirestore(app);
//const auth = app.auth();
const auth = getAuth(app);
//const provider = new firebase.auth.GoogleAuthProvider();
const provider = new GoogleAuthProvider();


export {db, auth, provider };
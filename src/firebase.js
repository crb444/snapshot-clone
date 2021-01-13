import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDcKJpFQHyZrONbASap4c5mDIKjiO2OhLs",
  authDomain: "snapchat-clone-6d71a.firebaseapp.com",
  projectId: "snapchat-clone-6d71a",
  storageBucket: "snapchat-clone-6d71a.appspot.com",
  messagingSenderId: "846969683993",
  appId: "1:846969683993:web:f446268282a0e1bfc4ea88",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, storage, provider };

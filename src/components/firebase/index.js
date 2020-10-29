import firebase from "firebase";


const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDVBfyiG2ynAFJaRETQuDZTEaa-9jqHy8M",
  authDomain: "gov-techthon-assessment.firebaseapp.com",
  databaseURL: "https://gov-techthon-assessment.firebaseio.com",
  projectId: "gov-techthon-assessment",
  storageBucket: "gov-techthon-assessment.appspot.com",
  messagingSenderId: "229055794635",
  appId: "1:229055794635:web:40c51d365ac42939663a4e"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
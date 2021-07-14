import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCKxJjbtSLHtBbpOsc3hNtc3GqMHPi0vMo",
    authDomain: "melonn-sellers-app.firebaseapp.com",
    projectId: "melonn-sellers-app",
    storageBucket: "melonn-sellers-app.appspot.com",
    messagingSenderId: "808532719635",
    appId: "1:808532719635:web:d46ab9ec70a6034c4ba7e6",
    measurementId: "G-XRJCFQGGPY"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
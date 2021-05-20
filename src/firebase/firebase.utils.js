import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAT6CEgzK1agclvAnBU1azhRdd885mlJX4",
    authDomain: "crwn-db-de897.firebaseapp.com",
    projectId: "crwn-db-de897",
    storageBucket: "crwn-db-de897.appspot.com",
    messagingSenderId: "1084622915753",
    appId: "1:1084622915753:web:7ba12adecb89ca7b7d41b8",
    measurementId: "G-TXSZ9BEB90"
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
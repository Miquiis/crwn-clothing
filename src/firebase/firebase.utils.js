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

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();

    objectsToAdd.forEach(object => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, object);
    })

    return await batch.commit();
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapshot = await userRef.get();

    if (!snapshot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}

export const convertCollectionsSnapshotToMap = collections => {
    const trasformedCollection = collections.docs.map(doc => {
        const {title, items } = doc.data();
        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    })
    return trasformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    } , {});
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
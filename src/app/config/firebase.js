import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
   apiKey: process.env.REACT_APP_GOOGLE_MAP_API,
   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKER,
   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;

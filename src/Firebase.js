import { initializeApp } from "firebase/app";
import { getAuth, signInWithCustomToken } from "firebase/auth";

let config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
};
const firebaseApp = initializeApp(config);

export default firebaseApp;

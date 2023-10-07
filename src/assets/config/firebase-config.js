import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.REACT_APP_FIREBASE_APIKEYS,
  authDomain: import.meta.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: import.meta.env.REACT_APP_FIREBASE_APPID,
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;


export const auth =  getAuth(app);
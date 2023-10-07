import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDz8SuXKyfx5v4FeMbPt45HHP330MLyT7M",
  authDomain: "practise-3e58a.firebaseapp.com",
  projectId: "practise-3e58a",
  storageBucket: "practise-3e58a.appspot.com",
  messagingSenderId: "970291141176",
  appId: "1:970291141176:web:35e38e8b459974bbcde4cd"
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;


export const auth =  getAuth(app);
export const storage = getStorage(app);

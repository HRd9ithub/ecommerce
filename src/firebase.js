import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB58g632DyB5rlJXxsESpYRsQOLVgWLCCI",
  authDomain: "react-firebase-authentic-18a86.firebaseapp.com",
  projectId: "react-firebase-authentic-18a86",
  storageBucket: "react-firebase-authentic-18a86.appspot.com",
  messagingSenderId: "462800266389",
  appId: "1:462800266389:web:51f2f2f628153fe5c6e79c",
  measurementId: "G-01PGDDB95P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db =getFirestore(app);
 const auth = getAuth();

 export {auth,app,db};
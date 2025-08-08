// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";


import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAy2z-DPE2Zeu3BSnam5EpzTRlasykSlC0",
  authDomain: "vocalprep-92aba.firebaseapp.com",
  projectId: "vocalprep-92aba",
  storageBucket: "vocalprep-92aba.firebasestorage.app",
  messagingSenderId: "748147172950",
  appId: "1:748147172950:web:8da59baeb1e6e21e0ebdf7",
  measurementId: "G-8PK9J6RSVM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {auth,provider, signInWithPopup,db };
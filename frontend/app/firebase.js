// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvLL1QLVIZ84HroYkXnG2zIirkAddVnH8",
  authDomain: "posturize-ff73a.firebaseapp.com",
  projectId: "posturize-ff73a",
  storageBucket: "posturize-ff73a.appspot.com",
  messagingSenderId: "690220820681",
  appId: "1:690220820681:web:37bc586f4c81fbbaa20518",
  measurementId: "G-NTSSRZZQ0F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const db = firebase.firestore();

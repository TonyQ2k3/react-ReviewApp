// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, setDoc, doc, getDoc, getDocs } from "firebase/firestore";

// Authentication
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, updateProfile } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXViKfYn5KnxmNeJeZOSWQG0c-KlS3DYo",
  authDomain: "moviereview-ca8ef.firebaseapp.com",
  projectId: "moviereview-ca8ef",
  storageBucket: "moviereview-ca8ef.appspot.com",
  messagingSenderId: "126282723254",
  appId: "1:126282723254:web:069b0e9c25eafea5e9db17",
  measurementId: "G-ZH7Y5KZ57P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth();

export { 
  app, db, getFirestore, collection, addDoc, getDoc, setDoc, doc, getDocs,
  auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, updateProfile,
};
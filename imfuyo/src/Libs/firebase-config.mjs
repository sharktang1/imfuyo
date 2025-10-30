// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getMessaging } from "firebase/messaging";

// Your web app's Firebase configuration
const firebaseConfig = {

  apiKey: "AIzaSyCH4ZsRBAs1WJ77GNXA-bVpGUmNyPRbqzM",
  authDomain: "imfuyobe.firebaseapp.com",
  projectId: "imfuyobe",
  storageBucket: "imfuyobe.firebasestorage.app",
  messagingSenderId: "250998738419",
  appId: "1:250998738419:web:865032a555da103a769686",
  measurementId: "G-KV6G6HYLE7"
    
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);
const db = getFirestore(app);
const auth = getAuth(app);

// Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = getMessaging(app);

export { app, storage, db, auth, messaging };
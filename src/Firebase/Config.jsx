// Firebase/Config.jsx
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyASTvxdxCjynNUoeH0fKQj-lL3OiCI-xjA",
  authDomain: "olx-clone-f97c8.firebaseapp.com",
  projectId: "olx-clone-f97c8",
  storageBucket: "olx-clone-f97c8.appspot.com",
  messagingSenderId: "823272804321",
  appId: "1:823272804321:web:6e8144a824ed288832cca0",
  measurementId: "G-7LJFLK13H7"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { app, auth, firestore };




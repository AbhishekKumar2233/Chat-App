// import firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/firestore';


// const config = {
//   apiKey: "AIzaSyA7WFds7lrw3Qc638JPdwImD6znLS_a08Q",
//   authDomain: "chat-web-app-97e0f.firebaseapp.com",
//   projectId: "chat-web-app-97e0f",
//   storageBucket: "chat-web-app-97e0f.appspot.com",
//   messagingSenderId: "408229915654",
//   appId: "1:408229915654:web:1b2e0096683001a549e787"
// };

// // Initialize Firebase
// const app = initializeApp(config);

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from "firebase/app";  // Firebase v9+ modular import
import { getDatabase, ref } from "firebase/database"; // Firebase v9+ for Database
import { getAuth } from "firebase/auth"; // Firebase v9+ for Auth
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyA7WFds7lrw3Qc638JPdwImD6znLS_a08Q",
    authDomain: "chat-web-app-97e0f.firebaseapp.com",
    projectId: "chat-web-app-97e0f",
    storageBucket: "chat-web-app-97e0f.appspot.com",
    messagingSenderId: "408229915654",
    appId: "1:408229915654:web:1b2e0096683001a549e787"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Use Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const database = getDatabase(app);
export const storage = getStorage(app); // Initialize Firebase Storage
export { ref }; // Export `ref` to use in other files


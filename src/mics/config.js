// import firebase from "firebase/app";
// import "firebase/auth";
// import "firebase/database";
// import "firebase/storage";

// const config = {
//   apiKey: "AIzaSyA7WFds7lrw3Qc638JPdwImD6znLS_a08Q",
//   authDomain: "chat-web-app-97e0f.firebaseapp.com",
//   projectId: "chat-web-app-97e0f",
//   storageBucket: "chat-web-app-97e0f.appspot.com",
//   messagingSenderId: "408229915654",
//   appId: "1:408229915654:web:1b2e0096683001a549e787"
// };

// const app = firebase.initializeApp(config);
// export const auth = app.auth();
// export const database = app.database();
// export const storage = app.storage();

import { initializeApp } from "firebase/app";  // Firebase v9+ modular import
import { getDatabase, ref } from "firebase/database"; // Firebase v9+ for Database
import { getAuth } from "firebase/auth"; // Firebase v9+ for Auth
import { getStorage } from 'firebase/storage'; // Firebase v9+ for Storage

// Your Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyA7WFds7lrw3Qc638JPdwImD6znLS_a08Q",
//   authDomain: "chat-web-app-97e0f.firebaseapp.com",
//   projectId: "project-275378454444",
//   storageBucket: "chat-web-app-97e0f.appspot.com",
//   messagingSenderId: "408229915654",
//   appId: "1:408229915654:web:1b2e0096683001a549e787"
// };
const firebaseConfig = {
  apiKey: "AIzaSyCnhROrBrALEt5ZXuQ8UXktPeMnIsHGbJk",
  authDomain: "chatapp1-f3d52.firebaseapp.com",
  databaseURL: "https://chatapp1-f3d52-default-rtdb.firebaseio.com",
  projectId: "chatapp1-f3d52",
  storageBucket: "chatapp1-f3d52.firebasestorage.app",
  messagingSenderId: "275378454444",
  appId: "1:275378454444:web:278bd3c809ea821787c409",
  measurementId: "G-ET7L00DRRF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase services
export const database = getDatabase(app);
export const auth = getAuth(app);
export const storage = getStorage(app); // Initialize Firebase Storage

// Export the necessary Firebase services
export { ref }; // Export `ref` to use in other files




// export { app, database, auth, storage };  // Export app, database, and auth to be used elsewhere





//   // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyA7WFds7lrw3Qc638JPdwImD6znLS_a08Q",
//   authDomain: "chat-web-app-97e0f.firebaseapp.com",
//   projectId: "chat-web-app-97e0f",
//   storageBucket: "chat-web-app-97e0f.appspot.com",
//   messagingSenderId: "408229915654",
//   appId: "1:408229915654:web:1b2e0096683001a549e787"
// };

// // Initialize Firebase
// // const app = initializeApp(firebaseConfig);

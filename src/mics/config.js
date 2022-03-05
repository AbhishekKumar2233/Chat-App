import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: "AIzaSyA7WFds7lrw3Qc638JPdwImD6znLS_a08Q",
  authDomain: "chat-web-app-97e0f.firebaseapp.com",
  projectId: "chat-web-app-97e0f",
  storageBucket: "chat-web-app-97e0f.appspot.com",
  messagingSenderId: "408229915654",
  appId: "1:408229915654:web:1b2e0096683001a549e787"
};

const app = firebase.initializeApp(config);
export const auth = app.auth();
export const database = app.database();

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

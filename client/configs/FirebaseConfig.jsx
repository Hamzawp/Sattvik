// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAEjyXrpfHs-tFaaREN-buNKcWdlTF3bnY",
  authDomain: "mumbaihacks-ff6f0.firebaseapp.com",
  projectId: "mumbaihacks-ff6f0",
  storageBucket: "mumbaihacks-ff6f0.appspot.com",
  messagingSenderId: "1052283909353",
  appId: "1:1052283909353:web:f2507989405f08351eec78",
  measurementId: "G-1Y9K5D4LMD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
const analytics = getAnalytics(app);
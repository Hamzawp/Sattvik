// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBkhfA83PWMs2MpJ05JkVK6SQU2keHyjDU",
  authDomain: "sattvik-e9374.firebaseapp.com",
  projectId: "sattvik-e9374",
  storageBucket: "sattvik-e9374.appspot.com",
  messagingSenderId: "298233407540",
  appId: "1:298233407540:web:d01b244237c168e0a70261",
  measurementId: "G-M5DPBNLVNJ"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
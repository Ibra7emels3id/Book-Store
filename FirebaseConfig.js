// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7opbBQe1Whz0KLXOiSUdiMajjvriaSzE",
  authDomain: "app-684d2.firebaseapp.com",
  databaseURL: "https://app-684d2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "app-684d2",
  storageBucket: "app-684d2.appspot.com",
  messagingSenderId: "882810017872",
  appId: "1:882810017872:web:9306451dd8faabf9975955"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app)
export const storage = getStorage(app);
export const db = getFirestore(app);

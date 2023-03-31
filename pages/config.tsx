// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCtcg-EgF376BiCoGJuryQ17lXaT2qTnqQ",
    authDomain: "plant-checker-19855.firebaseapp.com",
    projectId: "plant-checker-19855",
    storageBucket: "plant-checker-19855.appspot.com",
    messagingSenderId: "437356590475",
    appId: "1:437356590475:web:eb3db3c17286c6b2d7eb8e"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
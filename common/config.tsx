// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3HKNcPUv6_l94ZKaVyNqTCYpsFehqE9o",
  authDomain: "plants-3c632.firebaseapp.com",
  databaseURL: "https://plants-3c632-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "plants-3c632",
  storageBucket: "plants-3c632.appspot.com",
  messagingSenderId: "728037970089",
  appId: "1:728037970089:web:147c26271095511e7e99b8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);
const dbRef = ref(database);

export { auth, dbRef };

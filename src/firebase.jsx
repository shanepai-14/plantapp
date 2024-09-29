
import { initializeApp } from "@firebase/app";
import { getAuth } from '@firebase/auth';
import { getFirestore } from '@firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyBi36xDFev8-TCI-SaGhEQ0GnLhx5pn8z8",
    authDomain: "kimplant-f4bfe.firebaseapp.com",
    databaseURL: "https://kimplant-f4bfe-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "kimplant-f4bfe",
    storageBucket: "kimplant-f4bfe.appspot.com",
    messagingSenderId: "36163263452",
    appId: "1:36163263452:web:62cacf626d8d49fad54d19"
  };

  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const db = getFirestore(app);
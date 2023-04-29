// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBkJKwyKHmC2tw46g5A60YjUC62jW5Y-B0",
  authDomain: "torizon-ddfc3.firebaseapp.com",
  projectId: "torizon-ddfc3",
  storageBucket: "torizon-ddfc3.appspot.com",
  messagingSenderId: "218776331621",
  appId: "1:218776331621:web:3bca49582a2cc9b4e36d8c",
  measurementId: "G-L9BM96GT13"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
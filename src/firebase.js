// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjoFCamdfZqfvPG1eUs90FE-pQxHk8V1E",
  authDomain: "sharepic-socmedia.firebaseapp.com",
  projectId: "sharepic-socmedia",
  storageBucket: "sharepic-socmedia.appspot.com",
  messagingSenderId: "684124019192",
  appId: "1:684124019192:web:00ed216f074cc20f5ede0d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth= getAuth(app)
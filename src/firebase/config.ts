import { getFirestore } from "firebase/firestore";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-dGjTMbj99AbBeQlg2bBbPHVAu2boAwU",
  authDomain: "newlinkedinclone-5dbef.firebaseapp.com",
  projectId: "newlinkedinclone-5dbef",
  storageBucket: "newlinkedinclone-5dbef.appspot.com",
  messagingSenderId: "971173234870",
  appId: "1:971173234870:web:9c7be4b990bef4b1fd7e17",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

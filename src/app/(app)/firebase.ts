// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBj3OhJV4C4wn--ODhRbdPjRc7W5IiPNV4",
  authDomain: "openzo-rt.firebaseapp.com",
  projectId: "openzo-rt",
  storageBucket: "openzo-rt.appspot.com",
  messagingSenderId: "53179141705",
  appId: "1:53179141705:web:e10484bae0a6173afc3998",
  measurementId: "G-QSG3L0RN9P"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebaseApp);


export default firebaseApp;
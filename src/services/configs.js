import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCXqeHlWRFEJH4Cs2kFsvIzMSPS260AwUU",
  authDomain: "proyecto-final-react-f9242.firebaseapp.com",
  projectId: "proyecto-final-react-f9242",
  storageBucket: "proyecto-final-react-f9242.appspot.com",
  messagingSenderId: "518701259186",
  appId: "1:518701259186:web:f1eacb870b8f0b607c2cab",
  measurementId: "G-XSSYTS7FJ8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, analytics, db };

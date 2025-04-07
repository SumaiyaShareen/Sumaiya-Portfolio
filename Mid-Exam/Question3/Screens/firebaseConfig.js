// Import Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// Your Firebase Configuration (Copy from Firebase Console)
const firebaseConfig = {
    apiKey: "AIzaSyCyipRbLtRhOoaIrvu-PlbMHxHgCrNAxmE",
    authDomain: "joblistingapp-30be7.firebaseapp.com",
    projectId: "joblistingapp-30be7",
    storageBucket: "joblistingapp-30be7.appspot.com",
    messagingSenderId: "366564226018",
    appId: "1:366564226018:android:1530ec599beaf954533fbb"
  };
  
  const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };



import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
 apiKey: "AIzaSyCrFPrzY8bJsZ1BKyb8rbEaTg_HcMV1FA8",
  authDomain: "taskmate-91336.firebaseapp.com",
  projectId: "taskmate-91336",
  storageBucket: "taskmate-91336.firebasestorage.app",
  messagingSenderId: "24401373834",
  appId: "1:24401373834:web:c4cd9ff7acf599ca7b9b73",
  measurementId: "G-C01NM4DZ7M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

export default app;

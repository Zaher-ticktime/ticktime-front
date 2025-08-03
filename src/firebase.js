// firebase.js (updated with Firestore)
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCO5ZHbBXNrugsBkhpGVo6dzyHB71neGGA",
  authDomain: "ticktime-26063.firebaseapp.com",
  projectId: "ticktime-26063",
  storageBucket: "ticktime-26063.firebasestorage.app",
  messagingSenderId: "896348015908",
  appId: "1:896348015908:web:14f67e6088ff3c6708f7b1",
  measurementId: "G-GL45NFFG4N"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // ✅ Firestore added

export { auth, db };
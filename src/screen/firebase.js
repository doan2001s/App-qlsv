import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "@firebase/firestore"
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDBDbRl-SO6PpjQEUI08d7ZqgMgmkjCG0",
  authDomain: "fir-46ef9.firebaseapp.com",
  projectId: "fir-46ef9",
  storageBucket: "fir-46ef9.appspot.com",
  messagingSenderId: "333956790100",
  appId: "1:333956790100:web:586aa99626cdaab210fac1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
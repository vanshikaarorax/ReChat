import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
import { initializeApp } from "firebase/app";




const firebaseConfig = {
  apiKey: "AIzaSyDDmyyakghMUCO23wAZUl4fRCtC2_gyE7Y",
  authDomain: "rechat-6c903.firebaseapp.com",
  projectId: "rechat-6c903",
  storageBucket: "rechat-6c903.appspot.com",
  messagingSenderId: "174094191675",
  appId: "1:174094191675:web:bdf178422b03923806a01e"
};



const app = initializeApp(firebaseConfig);

export const auth =getAuth(app);
export const db=getFirestore();
export const storage=getStorage();
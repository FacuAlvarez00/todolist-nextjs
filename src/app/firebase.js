import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore, doc, setDoc, collection, getDoc, getDocs, updateDoc} from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyAjS2UeXCde1BFrURuEn6re57HI1hq1VhY",
  authDomain: "todolist-56476.firebaseapp.com",
  projectId: "todolist-56476",
  storageBucket: "todolist-56476.appspot.com",
  messagingSenderId: "437120906705",
  appId: "1:437120906705:web:1e623ed060d8d97022dcf0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export const auth = getAuth(app)


export async function createOrder(order) {
  const orderRef = doc(db, "order", + order.username  + "-"  + order.userinfo);
  let respuesta = await setDoc(orderRef, order);
  return respuesta
}
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDocs,
  connectFirestoreEmulator,
  deleteDoc,
} from "firebase/firestore";

let firebaseConfig = {
  apiKey: "AIzaSyA5diy6MQPwAAwUZRw1UQsPQ1nF9szdT8E",
  authDomain: "christmas-b1caa.firebaseapp.com",
  databaseURL:
    "https://christmas-b1caa-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "christmas-b1caa",
  storageBucket: "christmas-b1caa.appspot.com",
  messagingSenderId: "129981413452",
  appId: "1:129981413452:web:80e32746d98924e1511ce9",
  measurementId: "G-N49H44BWVH",
};
console.log(import.meta.env);

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
if (import.meta.env.VITE_LOCAL_FIRESTORE) {
  connectFirestoreEmulator(db, "127.0.0.1", 5001);
}

const itemsCollection = collection(db, "items");

export const setFireStoreData = async (items) => {
  await Promise.all(
    items.map(function (item) {
      return setDoc(doc(itemsCollection, item.id.toString()), item);
    })
  );
};

export const deleteFireStoreField = async (itemToDelete) => {
  await Promise.all(deleteDoc(doc(itemsCollection, "items", itemToDelete)));
};

export const deleteDocuments = async (items) => {
  await Promise.all(
    items.map(function (item) {
      return deleteDoc(doc(itemsCollection, item.id.toString()), item);
    })
  );
};
export const getFireStoreData = async () => {
  const querySnapshot = await getDocs(itemsCollection);
  if (querySnapshot) {
    const items = [];
    querySnapshot.forEach((doc) => {
      items.push(doc.data());
    });
    return items;
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
};

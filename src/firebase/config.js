import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, getDoc, setDoc,doc, deleteDoc, onSnapshot, updateDoc } from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyCr-L9ijmP7rda3102QjWKeDDnR572FAuQ",
    authDomain: "fir-learn-de306.firebaseapp.com",
    projectId: "fir-learn-de306",
    storageBucket: "fir-learn-de306.appspot.com",
    messagingSenderId: "154165880094",
    appId: "1:154165880094:web:c25e1273ae6fb46033550f"
  };

  //initialize firebase
  initializeApp(firebaseConfig)

  //init services
  const db = getFirestore()

  export { db, collection, addDoc, getDoc, setDoc, doc, deleteDoc, onSnapshot, updateDoc }

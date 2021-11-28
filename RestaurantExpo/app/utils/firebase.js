import firebase from "firebase/app";
import { initializeApp } from "firebase/app";

const firebaseConfig = {

  apiKey: "AIzaSyCylBY4Sgpm8WSctEfrbfn6xi7EZWmmuys",

  authDomain: "restaurante-cdb96.firebaseapp.com",

  projectId: "restaurante-cdb96",

  storageBucket: "restaurante-cdb96.appspot.com",

  messagingSenderId: "504454623489",

  appId: "1:504454623489:web:9eb25c8eaa377bf19bab00",

  measurementId: "G-71KY9SB283"



};

export const firebaseApp = firebase.initializeApp(firebaseConfig);

import firebase from "firebase/app";
import { initializeApp } from "firebase/app";

const firebaseConfig = {

  apiKey: "AIzaSyCOyJoCwDi1d_09uioGhneCQ5yA-acbxdQ",

  authDomain: "todolist-ed874.firebaseapp.com",

  databaseURL: "https://todolist-ed874-default-rtdb.firebaseio.com",

  projectId: "todolist-ed874",

  storageBucket: "todolist-ed874.appspot.com",

  messagingSenderId: "1021361332997",

  appId: "1:1021361332997:web:f7e3bba39b794420864d6c"




};

export const firebaseApp = firebase.initializeApp(firebaseConfig);

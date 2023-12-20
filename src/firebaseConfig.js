import firebase from "firebase/compat/app";
import "firebase/compat/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBxdI0CF-B2Bo3j20Vru-Nl4i7iNYHNM8I",
  authDomain: "sd95-23d65.firebaseapp.com",
  projectId: "sd95-23d65",
  storageBucket: "sd95-23d65.appspot.com",
  messagingSenderId: "285525703015",
  appId: "1:285525703015:web:68ba7ea2edcd3e741e57c2",
  measurementId: "G-58ENY3K05X"
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export { storage };

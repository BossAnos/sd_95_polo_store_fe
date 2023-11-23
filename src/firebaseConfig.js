import firebase from "firebase/compat/app";
import "firebase/compat/storage";
const firebaseConfig = {
  apiKey: "AIzaSyApn0mM1_GADY0jZNq0nWbjfybuYwbjVFc",
  authDomain: "sd-95-polostore.firebaseapp.com",
  projectId: "sd-95-polostore",
  storageBucket: "sd-95-polostore.appspot.com",
  messagingSenderId: "1011216587316",
  appId: "1:1011216587316:web:2b341b050b0060ab778861",
  measurementId: "G-FVT7GSVV2H",
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export { storage };

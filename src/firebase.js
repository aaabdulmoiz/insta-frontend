// Import the functions you need from the SDKs you need
import firebase from "firebase/compat";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNGn7HyAgbw0MSvTR3Yvy6i3Skb9xi6i4",
  authDomain: "instagram-clone-332ed.firebaseapp.com",
  projectId: "instagram-clone-332ed",
  storageBucket: "instagram-clone-332ed.appspot.com",
  messagingSenderId: "4480371790",
  appId: "1:4480371790:web:d44e80997e49750012871f",
  measurementId: "G-CRWQ2F03DE",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };

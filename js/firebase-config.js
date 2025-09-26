// firebase-config.js
const firebaseConfig = {
  apiKey: "AIzaSyApudwYbgzjerguwLWyPw58r4vAK2OT4ME",
  authDomain: "comigo-pets.firebaseapp.com",
  projectId: "comigo-pets",
  storageBucket: "comigo-pets.appspot.com",
  messagingSenderId: "239085731208",
  appId: "1:239085731208:web:78df7588e8c80af8650e3d",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth };
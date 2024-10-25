import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDfHOhXO7u0Ad3fdbDyxrLvUgNmCjTxPC4",
    authDomain: "hope-2c90e.firebaseapp.com",
    databaseURL: "https://hope-2c90e-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "hope-2c90e",
    storageBucket: "hope-2c90e.appspot.com",
    messagingSenderId: "888345076086",
    appId: "1:888345076086:web:c47e4df699fb0f152cda57",
    measurementId: "G-45QYQLL8JF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
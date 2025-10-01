// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIRE_BASE_API_KEY,
  authDomain: "quickbite-srs26.firebaseapp.com",
  projectId: "quickbite-srs26",
  storageBucket: "quickbite-srs26.firebasestorage.app",
  messagingSenderId: "229468305485",
  appId: "1:229468305485:web:9bb4166d930be766f64404",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { app, auth };

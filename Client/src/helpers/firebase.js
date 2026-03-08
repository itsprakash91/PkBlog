// Import the functions you need from the SDKs you need
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { initializeApp } from "firebase/app";
import { getEnv } from "./getEnv";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: getEnv('VITE_FIREBASE_API'),
    authDomain: "mern-blog-71fa6.firebaseapp.com",
    projectId: "mern-blog-71fa6",
    storageBucket: "mern-blog-71fa6.firebasestorage.app",
    messagingSenderId: "1039333655830",
    appId: "1:1039333655830:web:b69d81f7adf867b5ec3c37"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

provider.setCustomParameters({
    prompt: "select_account"  // force karega account chooser ko
});

export { auth, provider }
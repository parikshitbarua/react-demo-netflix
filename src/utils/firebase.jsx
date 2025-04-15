// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCqTUrWcZWd9wtwArPgwlYhGzM7sd6ZF_w",
    authDomain: "netflixgpt-50403.firebaseapp.com",
    projectId: "netflixgpt-50403",
    storageBucket: "netflixgpt-50403.firebasestorage.app",
    messagingSenderId: "133903718756",
    appId: "1:133903718756:web:f230f5eb892f95154bc271",
    measurementId: "G-FVT5SCX8E3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
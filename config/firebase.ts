// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth'
import AsyncStorage from "@react-native-async-storage/async-storage";
// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
    // apiKey: process.env.FIREBASE_API_KEY,
    // authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    // projectId: process.env.FIREBASE_PROJECT_ID,
    // storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    // messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    // appId: process.env.FIREBASE_APP_ID,
    // measurementId: process.env.FIREBASE_MEASUREMENT_ID
    apiKey: "AIzaSyC8nxqcFTEXaOw8acvKyCxppwtdRJWUAYU",
    authDomain: "skipspaceapp.firebaseapp.com",
    projectId: "skipspaceapp",
    storageBucket: "skipspaceapp.appspot.com",
    messagingSenderId: "246450722568",
    appId: "1:246450722568:web:e02abd48ea7d01b2f27ebd",
    measurementId: "G-61LDVMQE6N"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
})
// const db = getFirestore(app);

// initializeAuth(app, {
//     persistence: getReactNativePersistence(ReactNativeAsyncStorage)
// });


// const auth = getAuth(app);



// export { app, db, auth }
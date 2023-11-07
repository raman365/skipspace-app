import { initializeApp } from 'firebase/app';
import * as firebaseAuth from 'firebase/auth';
import { initializeAuth } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


const firebaseConfig = {
    apiKey: "AIzaSyC8nxqcFTEXaOw8acvKyCxppwtdRJWUAYU",
    authDomain: "skipspaceapp.firebaseapp.com",
    projectId: "skipspaceapp",
    storageBucket: "skipspaceapp.appspot.com",
    messagingSenderId: "246450722568",
    appId: "1:246450722568:web:e02abd48ea7d01b2f27ebd",
    measurementId: "G-61LDVMQE6N"
};

export const app = initializeApp(firebaseConfig);
const reactNativePersistence = (firebaseAuth as any).getReactNativePersistence;

export const auth = initializeAuth(app, {
    persistence: reactNativePersistence(ReactNativeAsyncStorage)
});

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Firestore instance
export const db = getFirestore(app);

// // Initialize Firebase
// //firebase.initializeApp(firebaseConfig); // It's expecting an objects

// export const app = initializeApp(firebaseConfig);

// // Initialize Firebase Authentication and get a reference to the service
// export const auth = initializeAuth(app, {
//     persistence: getReactNativePersistence(ReactNativeAsyncStorage)
// });
// // export const auth = getAuth(app);


// // const auth = getAuth()

// // export { app, auth }

import { initializeApp } from 'firebase/app';
import * as firebaseAuth from 'firebase/auth';
import { initializeAuth } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getFirestore } from 'firebase/firestore';


// TODO: Hide env variables

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


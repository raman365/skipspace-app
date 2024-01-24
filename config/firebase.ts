import { initializeApp } from 'firebase/app';
import * as firebaseAuth from 'firebase/auth';
import { initializeAuth } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getFirestore } from 'firebase/firestore';
import {
    FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID, FIREBASE_MEASUREMENT_ID
} from '@env'

const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
    appId: FIREBASE_APP_ID,
    measurementId: FIREBASE_MEASUREMENT_ID,
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


// import {
// 	createUserWithEmailAndPassword,
// 	getAuth,
// 	sendPasswordResetEmail,
// 	signInWithEmailAndPassword,
// 	signOut,
// } from 'firebase/auth';
// import { auth, db } from './firebase';
// import { Alert } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { addDoc, collection } from 'firebase/firestore';

// import { initializeApp } from "firebase/app";
// import { getAuth, onAuthStateChanged}
// const navigation = useNavigation();

// import React, { useState, useEffect} from 'react'

// interface AuthContext {
//     user: 
// }

// export const AuthContext = React.createContext();

// // // ************************
// // //   SIGN UP | REGISTER
// // // ************************

// export const registerNewUser = async (firstName: string, lastName: string, email: string, password: string) => {
// 	try {
// 		const res = await createUserWithEmailAndPassword(auth, email, password);
// 		const user = res.user;

// 		await addDoc(collection(db, "registeredUsers"), {
// 			uid: user.uid,
// 			firstName,
// 			lastName,
// 			email,
// 			authProvider: 'local' // TODO find out what this is
// 		});
// 	} catch (error: any) {
// 		const errorCode = error.code;
// 		const errorMessage = error.message;
// 		console.error(error);
// 		Alert.alert(error.message)
// 	}
// }

// //  ************************
// //    RESET PASSWWORD 
// //  ************************

// export const resetPassword = async (email: string, { navigation }: any) => {
// 	try {
// 		await sendPasswordResetEmail(auth, email);
// 		Alert.alert('Check your inbox, password reset link sent');
// 		// TODO: Change this to a better UX flow
// 		// navigate to sign up page

// 		navigation.navigate('AuthDashboard')
// 	} catch (error: any) {
// 		console.error(error);
// 		Alert.alert(error.message);
// 	}
// }

// // // ************************
// // //   	SIGN IN
// // // ************************


// export const signIn = async (email: string, password: string, { navigation }: any) => {
// 	try {
// 		await signInWithEmailAndPassword(auth, email, password)
// 			.then((userCredential) => {

// 				// signedIn
// 				const user = userCredential.user;
// 				navigation.navigate('SignedInDashboard')
// 			})

// 	}
// 	catch (error: any) {
// 		const errorCode = error.code;
// 		const errorMessage = error.message;
// 	}
// }


// // ************************
// //   	SIGN OUT
// // ************************

// export const handleSignOut = async ({ navigation }: any) => {
// 	const auth = getAuth();

// 	try {
// 		signOut(auth).then(() => {
// 			// signout success
// 			navigation.replace('WelcomeHowTo');
// 		});
// 	} catch (error) {
// 		Alert.alert(`An error occurred: ${error}. Please try again`);
// 	}
// };

// // // export const signup = async (email: string, password: string) => {
// // // 	try {
// // // 		const userCredential = await createUserWithEmailAndPassword(
// // // 			auth,
// // // 			email,
// // // 			password
// // // 		);
// // // 		await emailVerification();

// // // 		// user has successfully registered
// // // 		const user = userCredential.user;
// // // 		console.log('user registered: ', user);

// // // 		// user can be redirected to another page or perform another action

// // // 		return user;
// // // 	} catch (error) {
// // // 		throw error;
// // // 	}
// // // };




// // // export const emailVerification = async () => {
// // // 	const user = auth.currentUser;
// // // 	try {
// // // 		await sendEmailVerification(auth.currentUser, {
// // // 			handleCodeInApp: true,
// // // 			url: '',
// // // 		}).then(() => {
// // // 			//showEmailAlert(user?.email)
// // // 			console.log(user?.email);
// // // 		});
// // // 		// email v link is sent
// // // 	} catch (error: any) {
// // // 		// handle error
// // // 		const errorCode = error.code;
// // // 		const errorMessage = error.message;
// // // 		console.log(`Email verification error: ${errorCode}  ${errorMessage}`);
// // // 		throw error;
// // // 	}
// // // }
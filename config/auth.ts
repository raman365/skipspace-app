// import {
// 	createUserWithEmailAndPassword,
// 	getAuth,
// 	signInWithEmailAndPassword,
// 	signOut,
// } from 'firebase/auth';
// import { auth } from './firebaseConfig';
// import { Alert } from 'react-native';
// // import navigation from '../src/navigation';
// import { useNavigation } from '@react-navigation/native';
// const navigation = useNavigation()

// // ************************
// //   SIGN UP | REGISTER
// // ************************

// export const registerNewUser = async (email: string, password: string) => {
// 	try {
// 		createUserWithEmailAndPassword(auth, email, password)
// 			.then((userCredential) => {
// 				// signed up

// 				const user = userCredential.user;
// 				//
// 			})
// 	}
// 	catch (error: any) {
// 		const errorCode = error.code;
// 		const errorMessage = error.message;
// 		// ...
// 	}
// }


// // ************************
// //
// //   	SIGN IN
// //
// // ************************


// export const signIn = async (email: string, password: string) => {
// 	try {
// 		signInWithEmailAndPassword(auth, email, password)
// 			.then((userCredential) => {

// 				// signedIn
// 				const user = userCredential.user;

// 			})

// 	}
// 	catch (error: any) {
// 		const errorCode = error.code;
// 		const errorMessage = error.message;
// 	}
// }


// // ************************
// //
// //   	SIGN OUT
// //
// // ************************

// export const handleSignOut = async ({ navigation }: any) => {
// 	const auth = getAuth();

// 	try {
// 		signOut(auth).then(() => {
// 			// signout success
// 			navigation.navigate('WelcomeHowTo');
// 		});
// 	} catch (error) {
// 		Alert.alert(`An error occurred: ${error}. Please try again`);
// 	}
// };

// // export const signup = async (email: string, password: string) => {
// // 	try {
// // 		const userCredential = await createUserWithEmailAndPassword(
// // 			auth,
// // 			email,
// // 			password
// // 		);
// // 		await emailVerification();

// // 		// user has successfully registered
// // 		const user = userCredential.user;
// // 		console.log('user registered: ', user);

// // 		// user can be redirected to another page or perform another action

// // 		return user;
// // 	} catch (error) {
// // 		throw error;
// // 	}
// // };




// // export const emailVerification = async () => {
// // 	const user = auth.currentUser;
// // 	try {
// // 		await sendEmailVerification(auth.currentUser, {
// // 			handleCodeInApp: true,
// // 			url: '',
// // 		}).then(() => {
// // 			//showEmailAlert(user?.email)
// // 			console.log(user?.email);
// // 		});
// // 		// email v link is sent
// // 	} catch (error: any) {
// // 		// handle error
// // 		const errorCode = error.code;
// // 		const errorMessage = error.message;
// // 		console.log(`Email verification error: ${errorCode}  ${errorMessage}`);
// // 		throw error;
// // 	}
// // };
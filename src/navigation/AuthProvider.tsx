// import React, { createContext, useState } from 'react';
// import {
// 	createUserWithEmailAndPassword,
// 	getAuth,
// 	signInWithEmailAndPassword,
// 	signOut,
// } from 'firebase/auth';
// import { auth } from '../../config/firebase';

// export interface IAuth {
// 	user: any;
// 	setUser: any;
// 	login: any;
// 	register: any;
// 	logout: any;
// }
// export const AuthContext = createContext({});

// export const AuthProvider = ({ children }: any) => {
// 	const [user, setUser] = useState(null);
// 	// const auth = getAuth();
// 	return (
// 		<AuthContext.Provider
// 			value={{
// 				user,
// 				setUser,
// 				login: async (email: string, password: string) => {
// 					try {
// 						await signInWithEmailAndPassword(auth, email, password);
// 					} catch (err: any) {
// 						console.log(`Error: ${err.code} - ${err.message}`);
// 					}
// 				},
// 				register: async (email: string, password: string) => {
// 					try {
// 						await createUserWithEmailAndPassword(auth, email, password);
// 					} catch (err: any) {
// 						console.log(`Error: ${err.code} - ${err.message}`);
// 					}
// 				},
// 				logout: async () => {
// 					try {
// 						await signOut(auth);
// 					} catch (err: any) {
// 						console.log(`Error: ${err.code} - ${err.message}`);
// 					}
// 				},
// 			}}
// 		>
// 			{children}
// 		</AuthContext.Provider>
// 	);
// };

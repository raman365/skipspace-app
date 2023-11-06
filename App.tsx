import { useState, useEffect } from 'react';

import { ThemeProvider } from '@rneui/themed';
import 'expo-splash-screen';

import { theme } from './constants/theme';
// import RootNavigation from './src/navigation';
import CustomStatusBar from './src/components/StatusBar';
import { auth } from './config/firebase';
import AuthorisedStack from './src/navigation/AuthorisedStack';
import { UnauthorisedStack } from './src/navigation/UnauthorisedStack';
import { NavigationContainer } from '@react-navigation/native';
import useAuth from './hooks/useAuth';
// import { AuthProvider } from './src/context/AuthProvider';

// interface User {
// 	uid: string;
// 	email: string | null;
// }

export default function App() {
	// 	const [user, setUser] = useState<User | null>(null);

	// 	useEffect(() => {
	// 		const unsubscribe = auth.onAuthStateChanged((authUser) => {
	// 			if (authUser) {
	// 				// user is signed in
	// 				const { uid, email } = authUser;

	// 				setUser({ uid, email });
	// 			} else {
	// 				setUser(null);
	// 			}
	// 		});
	// 		// clearn up the listener whrn the component unmounts:
	// 		return unsubscribe;
	// 	}, []);

	const { user } = useAuth();
	return (
		// <AuthProvider>
		<ThemeProvider theme={theme}>
			<CustomStatusBar />
			<NavigationContainer>
				{user ? <AuthorisedStack /> : <UnauthorisedStack />}
			</NavigationContainer>
		</ThemeProvider>
		// </AuthProvider>
	);
}

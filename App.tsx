import 'react-native-gesture-handler';

import AuthorisedStack from './src/navigation/AuthorisedStack';
import { UnauthorisedStack } from './src/navigation/UnauthorisedStack';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';

import * as SplashScreen from 'expo-splash-screen';
import useAuth from './src/hooks/useAuth';
import { useState, useCallback } from 'react';

// import { ThemeProvider } from '@rneui/themed';
// import 'expo-splash-screen';

// import { theme } from './constants/theme';
// // import RootNavigation from './src/navigation';
// import CustomStatusBar from './src/components/StatusBar';
// import AuthorisedStack from './src/navigation/AuthorisedStack';
// import { UnauthorisedStack } from './src/navigation/UnauthorisedStack';
// import { NavigationContainer } from '@react-navigation/native';
// // import useAuth from './hooks/useAuth';
// import RootNavigation from './src/navigation';
// import Providers from './src/navigation';
// AppRegistry.registerComponent(appName, () => App);`

// // import { AuthProvider } from './src/context/AuthProvider';

// export default function App() {
// 	return (
// 		<ThemeProvider theme={theme}>
// 			<CustomStatusBar />
// 			<Providers />
// 		</ThemeProvider>
// 	);
// }

export default function App() {
	const { user } = useAuth();
	const [loading, setLoading] = useState<boolean>(false);

	const [fontsLoaded, fontError] = useFonts({
		tungsten_bold: require('./assets/fonts/Tungsten/TungstenBold.ttf'),
		Tungsten_SemiBold: require('./assets/fonts/Tungsten/Tungsten_SemiBold.ttf'),
		tungsten_med: require('./assets/fonts/Tungsten/Tungsten_Med.otf'),
	});

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded || fontError) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded, fontError]);

	if (!fontsLoaded && !fontError) {
		return null;
	}

	return (
		<NavigationContainer onReady={onLayoutRootView} independent={true}>
			{user ? <AuthorisedStack /> : <UnauthorisedStack />}
		</NavigationContainer>
	);
}

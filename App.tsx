import 'react-native-gesture-handler';

import AuthorisedStack from './src/navigation/AuthorisedStack';
import { UnauthorisedStack } from './src/navigation/UnauthorisedStack';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';

import * as SplashScreen from 'expo-splash-screen';
import useAuth from './src/hooks/useAuth';
import { useState, useCallback } from 'react';
import { StyleSheet } from 'react-native';
export default function App() {
	const { user, isAuthenticated: authLoading } = useAuth();
	const [loading, setLoading] = useState<boolean>(true);

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

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

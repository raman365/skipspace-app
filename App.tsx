import { useCallback } from 'react';
import { View } from 'react-native';
import { ThemeProvider } from '@rneui/themed';

import { COLORS, theme } from './constants/theme';
import RootNavigation from './src/navigation';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// SplashScreen.preventAutoHideAsync();

export default function App() {
	// const [fontsLoaded, fontError] = useFonts({
	// 	// 'Inter-Black': require('./assets/fonts/Inter-Black.otf'),
	// 	'Open-Sans': require('./assets/fonts/OpenSans/OpenSans-Regular.ttf'),
	// 	'Open-Sans-Cond-SemiBold': require('./assets/fonts/OpenSans/OpenSans_Condensed-SemiBold.ttf'),
	// 	'Open-Sans-SemiCond-Reg': require('./assets/fonts/OpenSans/OpenSans_SemiCondensed-Regular.ttf'),
	// 	'Tungsten-Bold': require('./assets/fonts/Tungsten/Tungsten-Bold.ttf'),
	// 	'Tungsten-SemiBold': require('./assets/fonts/Tungsten/Tungsten-Semibold.ttf'),
	// });

	// const onLayoutRootView = useCallback(async () => {
	// 	if (fontsLoaded || fontError) {
	// 		await SplashScreen.hideAsync();
	// 	}
	// }, [fontsLoaded, fontError]);

	// if (!fontsLoaded && !fontError) {
	// 	return null;
	// }
	return (
		// <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
		<ThemeProvider theme={theme}>
			{/* <StatusBar backgroundColor={COLORS.bgGreen} /> */}
			<RootNavigation />
		</ThemeProvider>
		// </View>
	);
}

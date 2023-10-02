import React from 'react';
import { ThemeProvider } from '@rneui/themed';

import { COLORS, theme } from './constants/theme';
import RootNavigation from './src/navigation';
import { StatusBar } from 'expo-status-bar';
import CustomStatusBar from './src/components/StatusBar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';

// const theme = createTheme({
//   lightColors: {},
//   darkColors: {},
// });

export default function App() {
	const [fontsLoaded] = useFonts({
		// 'Inter-Black': require('./assets/fonts/Inter-Black.otf'),
		'Open-Sans': require('./assets/fonts/OpenSans-Regular.ttf'),
		'Tungsten-Bold': require('./assets/fonts/Tungsten-Bold.ttf'),
		'Tungsten-Semi': require('./assets/fonts/Tungsten-Semibold.ttf'),
	});
	return (
		<ThemeProvider theme={theme}>
			{/* <StatusBar backgroundColor={COLORS.bgGreen} /> */}
			{/* <CustomStatusBar backgroundColor={COLORS.bgBlue} /> */}
			{/* </SafeAreaProvider> */}
			<RootNavigation />
		</ThemeProvider>
	);
}

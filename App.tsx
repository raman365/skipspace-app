import { useCallback } from 'react';
// import { View, StatusBar } from 'react-native';
import { ThemeProvider } from '@rneui/themed';

import { COLORS, theme } from './constants/theme';
import RootNavigation from './src/navigation';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

export default function App() {
	return (
		<ThemeProvider theme={theme}>
			<StatusBar style='dark' translucent={true} />
			<RootNavigation />
		</ThemeProvider>
	);
}

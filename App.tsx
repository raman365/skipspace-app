import { ThemeProvider } from '@rneui/themed';
import 'expo-splash-screen';

import { theme } from './constants/theme';
import RootNavigation from './src/navigation';
import CustomStatusBar from './src/components/StatusBar';

export default function App() {
	return (
		<ThemeProvider theme={theme}>
			<CustomStatusBar />
			<RootNavigation />
		</ThemeProvider>
	);
}

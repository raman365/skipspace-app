import 'react-native-gesture-handler';

// import { AppRegistry } from 'react-native';

import { ThemeProvider } from '@rneui/themed';
import 'expo-splash-screen';

import { theme } from './constants/theme';
// import RootNavigation from './src/navigation';
import CustomStatusBar from './src/components/StatusBar';
import AuthorisedStack from './src/navigation/AuthorisedStack';
import { UnauthorisedStack } from './src/navigation/UnauthorisedStack';
import { NavigationContainer } from '@react-navigation/native';
// import useAuth from './hooks/useAuth';
import RootNavigation from './src/navigation';
import Providers from './src/navigation';
// AppRegistry.registerComponent(appName, () => App);`

// import { AuthProvider } from './src/context/AuthProvider';

export default function App() {
	return (
		<ThemeProvider theme={theme}>
			<CustomStatusBar />
			<Providers />
		</ThemeProvider>
	);
}

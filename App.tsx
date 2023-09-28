import React from 'react';
import { ThemeProvider } from '@rneui/themed';
import Component from './components/MyComponent';

import { theme } from './constants/theme';
import RootNavigation from './src/navigation';
// const theme = createTheme({
//   lightColors: {},
//   darkColors: {},
// });

export default function App() {
	return (
		<ThemeProvider theme={theme}>
			{/* <Component /> */}
			<RootNavigation />
		</ThemeProvider>
	);
}

import React, { useEffect } from 'react';
import { View, StyleSheet, StatusBar, Platform } from 'react-native';

const CustomStatusBar: React.FC = () => {
	// useEffect(() => {
	// 	// Change the text color to #7acc00 and set the background color
	// 	StatusBar.setBarStyle('light-content');
	// 	// if (Platform.OS === 'android') {
	// 	// 	StatusBar.setBackgroundColor('#7acc00');
	// 	// }
	// }, []);
	return (
		<View>
			<StatusBar translucent />
		</View>
	);
};

const styles = StyleSheet.create({});

export default CustomStatusBar;

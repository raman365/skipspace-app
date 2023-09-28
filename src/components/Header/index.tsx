import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { COLORS } from '../../../constants/theme';
import {} from '@rneui/themed';

const HeaderComponent: React.FC = () => {
	return (
		<View style={styles.imageContainer}>
			<View style={styles.innerContainer}>
				<Image
					source={require('../Header/image/sslogo1.png')}
					style={styles.logoImage}
					resizeMode='contain'
				/>
			</View>
		</View>
	);
};

export default HeaderComponent;

const styles = StyleSheet.create({
	imageContainer: {
		backgroundColor: COLORS.bgBlue,
		height: 150,
		paddingTop: 20,

		paddingBottom: 30,
	},
	innerContainer: {
		paddingTop: 40,
		justifyContent: 'center',
		alignItems: 'center',
	},
	logoImage: {
		width: 100,
		height: 100,
		paddingTop: 30,
	},
});

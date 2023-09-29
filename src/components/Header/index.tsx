import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { COLORS } from '../../../constants/theme';
import { Button, Icon } from '@rneui/themed';
import { Colors } from 'react-native/Libraries/NewAppScreen';
// import {  } from '@rneui/base';

interface IHeaderComponentProps {
	authorised: Boolean;
	onPress?: () => void;
	icon?: React.ReactElement;
}
const HeaderComponent: React.FC<IHeaderComponentProps> = ({
	authorised,
	icon,
	onPress,
}) => {
	return (
		<View style={styles.imageContainer}>
			{authorised ? (
				<View
					style={{
						width: 100,
						height: 100,
						alignSelf: 'center',
						justifyContent: 'center',
						paddingTop: 0,
					}}
				>
					<Button onPress={onPress}>{icon}</Button>
				</View>
			) : null}
			<View style={styles.innerContainer}>
				<Image
					style={styles.logoImage}
					source={require('../Header/image/sslogo1.png')}
					resizeMode='contain'
				/>
			</View>
			<View style={{ width: 100, alignSelf: 'center' }}></View>
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
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	innerContainer: {
		paddingTop: 40,
		alignSelf: 'center',
	},
	logoImage: {
		width: 100,
		height: 100,
		paddingTop: 30,
	},
});

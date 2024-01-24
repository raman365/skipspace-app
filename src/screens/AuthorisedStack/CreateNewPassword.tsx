import { StyleSheet, ActivityIndicator, View } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Header, Icon, Input, Button, Image, Text } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { theme, COLORS } from '../../../constants/theme';
import HeaderComponent from '../../components/Header';

export const LogoImage = () => {
	return <Image source={require('../../../assets/ss.png')} />;
};

const CreateNewPassword = () => {
	return (
		<SafeAreaProvider>
			<HeaderComponent authorised={false} />

			<View style={{ paddingTop: 30 }}>
				<Text h3 h3Style={{ fontWeight: 'bold', textAlign: 'center' }}>
					Create new password{' '}
				</Text>
			</View>
			<View style={styles.centerContainer}>
				<View>
					<View>
						<Text style={styles.textStyle}>Password:</Text>
						<Input placeholder='********' secureTextEntry={true} />
					</View>
					<View>
						<Text style={styles.textStyle}>Confirm password:</Text>
						<Input placeholder='********' secureTextEntry={true} />
					</View>

					<View style={{ paddingVertical: 30 }}>
						<Button
							title='Create'
							buttonStyle={{
								backgroundColor: COLORS.bgBlue,
								borderRadius: 5,
							}}
							titleStyle={{
								fontWeight: '700',
								fontSize: 16,
								color: COLORS.white,
							}}
							onPress={() => console.log('aye')}
						/>
					</View>
				</View>
			</View>
			<View style={styles.bottomContainer}>
				<View
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Text style={styles.textStyleTwo}>Already have an account? </Text>
					<Text
						style={{
							fontWeight: '700',
							color: COLORS.bgGreen,
							fontSize: 17,
						}}
					>
						{' '}
						Sign in here
					</Text>
				</View>
			</View>
		</SafeAreaProvider>
	);
};

const styles = StyleSheet.create({
	heading: {
		color: COLORS.bgGreen,
		fontSize: 22,
		fontWeight: 'bold',
	},
	headerRight: {
		display: 'flex',
		flexDirection: 'row',
	},
	subheaderText: {
		color: 'white',
		fontSize: 16,
		fontWeight: 'bold',
	},
	centerContainer: {
		paddingHorizontal: 25,
		display: 'flex',
		justifyContent: 'center',
		flex: 2,
	},
	textStyle: {
		fontSize: 15,
	},
	textStyleTwo: {
		fontSize: 17,
		fontWeight: '500',
		textAlign: 'center',
	},
	bottomContainer: {
		borderTopColor: COLORS.bgGreen,
		borderTopWidth: 2,
		height: 100,
		paddingTop: 30,
	},
});

export default CreateNewPassword;

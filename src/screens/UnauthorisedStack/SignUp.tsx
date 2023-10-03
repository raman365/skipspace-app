import { StyleSheet, ActivityIndicator, View } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Header, Icon, Input, Button, Image, Text } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { theme, COLORS } from '../../../constants/theme';
import HeaderComponent from '../../components/Header';
import ScreenTitle from '../../components/ScreenTitle';

// const SKIPSPACE_LOGO =
// 	'/Users/bbb/ContractProjects/skipspace-app/assets/images';

export const LogoImage = () => {
	return <Image source={require('../../../assets/ss.png')} />;
};

const SignUp = ({ navigation }: any) => {
	const handleRegisterBtn = () => {
		// TODO Handle registration
		navigation.navigate('VerifyEmail');
	};
	return (
		<SafeAreaProvider>
			<HeaderComponent authorised={true} />
			<ScreenTitle title={'Register'} />

			<View style={styles.centerContainer}>
				<View>
					<View>
						<Text style={styles.textStyle}>First name:</Text>
						<Input placeholder='First name' />
					</View>
					<View>
						<Text style={styles.textStyle}>Last name:</Text>
						<Input placeholder='Last name' />
					</View>
					<View>
						<Text style={styles.textStyle}>Email address:</Text>
						<Input placeholder='your@email.com' />
					</View>
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
							title='Next'
							buttonStyle={{
								backgroundColor: COLORS.bgBlue,
								borderRadius: 5,
							}}
							titleStyle={{
								fontWeight: '700',
								fontSize: 16,
								color: COLORS.white,
							}}
							onPress={handleRegisterBtn}
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
					<Button
						type={'clear'}
						titleStyle={{
							color: COLORS.bgGreen,
							fontSize: 17,
							fontWeight: 'bold',
							// fontFamily: 'Open-Sans-Cond-SemiBold',
						}}
						onPress={() => navigation.navigate('AuthDashboard')}
					>
						Sign in here
					</Button>
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
		color: COLORS.bgBlue,
		// fontFamily: 'Open-Sans-Cond-SemiBold',
	},
	bottomContainer: {
		borderTopColor: COLORS.bgGreen,
		borderTopWidth: 2,
		height: 100,
		paddingTop: 15,
	},
});

export default SignUp;

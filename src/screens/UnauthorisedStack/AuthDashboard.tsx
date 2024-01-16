import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Input } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { COLORS, FONTSIZES } from '../../../constants/theme';
import HeaderComponent from '../../components/Header';
import ScreenTitle from '../../components/ScreenTitle';
import ClearBtn from '../../components/Button/ClearBtn';
import StandardButton from '../../components/Button/StandardBtn';
import Footer from '../../components/Footer';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../config/firebase';

const AuthDashboard = ({ navigation }: any) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const handleSignIn = async () => {
		setError('');
		if (email && password) {
			try {
				await signInWithEmailAndPassword(auth, email, password);
			} catch (error: any) {
				if (error.code == 'auth/invalid-login-credentials') {
					setError('Invalid email/password details');
				}
				// console.error(`ERROR: ${error.code} - ${error.message}`);
			}
		}
	};

	const handleForgotPasswordLink = () => {
		navigation.navigate('ForgotDetails');
	};
	const handleSignUp = () => {
		navigation.navigate('SignUp');
	};
	return (
		<SafeAreaProvider>
			<HeaderComponent authorised={false} />

			<ScreenTitle title={'Sign In'} />

			<View style={styles.centerContainer}>
				<View>
					<Text style={styles.formTextStyle}>Email address </Text>
					<Input
						style={{ fontSize: FONTSIZES.large }}
						keyboardType='email-address'
						inputContainerStyle={styles.contStyle}
						onChangeText={(email) => setEmail(email)}
						value={email}
						autoCapitalize='none'
						autoCorrect={false}
					/>
				</View>
				<View>
					<Text style={styles.formTextStyle}>Password</Text>
					<Input
						style={{ fontSize: FONTSIZES.large }}
						keyboardType='default'
						inputContainerStyle={styles.contStyle}
						secureTextEntry={true}
						onChangeText={(password) => setPassword(password)}
						value={password}
						autoCapitalize='none'
					/>
				</View>

				<View>
					<ClearBtn
						buttonLabel={'Forgot Password?'}
						onPress={handleForgotPasswordLink}
					/>
				</View>
				{error && (
					<View style={{ paddingTop: 20 }}>
						<Text
							style={{
								color: COLORS.softRed,
								textAlign: 'center',
								fontWeight: '700',
								fontSize: FONTSIZES.large,
							}}
						>
							{error}
						</Text>
					</View>
				)}

				<View style={{ paddingVertical: 40 }}>
					<StandardButton
						buttonLabel={'Sign In'}
						onPress={handleSignIn}
						bgGreen={false}
						fontBlue={false}
					/>
				</View>
			</View>
			<Footer
				children={
					<>
						<Text style={styles.textStyleTwo}>Don't have an account?</Text>
						<ClearBtn
							buttonLabel={'Sign up here'}
							onPress={handleSignUp}
							fontSize='large'
						/>
					</>
				}
			/>
		</SafeAreaProvider>
	);
};

const styles = StyleSheet.create({
	formTextStyle: {
		fontSize: FONTSIZES.large,
		paddingBottom: 10,
	},
	contStyle: {
		backgroundColor: COLORS.alpha.lightBlue,
		opacity: 1,
		paddingHorizontal: 10,
	},
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
		fontSize: FONTSIZES.xl,
		fontWeight: '600',
		textAlign: 'center',
		color: COLORS.bgBlue,
	},
});

export default AuthDashboard;

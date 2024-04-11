import React, { useState } from 'react';
import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	View,
} from 'react-native';
import { Text, Input, Icon } from '@rneui/themed';
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
	const [isPasswordSecure, setIsPasswordSecure] = useState(true);

	const handleSignIn = async () => {
		setError('');
		if (email && password) {
			try {
				await signInWithEmailAndPassword(auth, email, password);
			} catch (error: any) {
				if (error.code == 'auth/invalid-login-credentials') {
					setError('Invalid email/password details');
				}
			}
		}
	};

	const handleForgotPasswordLink = () => {
		navigation.navigate('ForgotDetails');
	};
	const handleSignUp = () => {
		navigation.navigate('SignUp');
	};

	const handleViewPassword = () => {
		isPasswordSecure ? setIsPasswordSecure(false) : setIsPasswordSecure(true);
	};
	return (
		<SafeAreaProvider>
			<ScrollView style={{ flex: 1 }}>
				<KeyboardAvoidingView
					style={{ flex: 1 }}
					behavior={Platform.OS === 'ios' ? 'padding' : undefined}
					keyboardVerticalOffset={100}
				>
					<HeaderComponent authorised={false} />

					<ScreenTitle title={'Sign In'} />

					<View style={styles.centerContainer}>
						<View>
							<Text style={styles.formTextStyle}>Email address </Text>
							<Input
								accessibilityLabel='Email address'
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
								accessibilityLabel='Password'
								style={{ fontSize: FONTSIZES.large }}
								keyboardType='default'
								inputContainerStyle={styles.contStyle}
								onChangeText={(password) => setPassword(password)}
								value={password}
								autoCapitalize='none'
								secureTextEntry={isPasswordSecure}
							    rightIcon={
								<Icon
									size={20}
									type='entypo'
									color={COLORS.black}
									name={isPasswordSecure ? 'eye-with-line' : 'eye'}
									onPress={handleViewPassword}
								/>
							}
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
				</KeyboardAvoidingView>
			</ScrollView>

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
		paddingTop: 60,
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

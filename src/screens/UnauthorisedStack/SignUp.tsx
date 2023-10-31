import {
	StyleSheet,
	View,
	KeyboardAvoidingView,
	ScrollView,
	Text,
	Platform,
	Alert,
} from 'react-native';
import React, { useState } from 'react';
import { Icon, Image } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { COLORS, FONTSIZES } from '../../../constants/theme';
import HeaderComponent from '../../components/Header';
import ScreenTitle from '../../components/ScreenTitle';
import ClearBtn from '../../components/Button/ClearBtn';
import TextInput, { autoCap } from '../../components/FormComponents/TextInput';
import StandardButton from '../../components/Button/StandardBtn';
import Footer from '../../components/Footer';
import SmlStandardBtn from '../../components/Button/SmallStandardBtn';
import { registerNewUser } from '../../../config/auth';

export const LogoImage = () => {
	return <Image source={require('../../../assets/ss.png')} />;
};

// export const registerToVerifySignUp = async(email, password) => {
// 	try {
// 		const userCredential = await
// 	}
// }
const SignUp = ({ navigation }: any) => {
	const handleRegisterBtn = async () => {
		setLoading(true);

		try {
			// 	const user = await registerNewUser(email, password);
			// 	if (user) {
			// 		const id = user.uid;
			// 		// await saveUserData(id, firstName, lastName)
			// 		// navigation.navigate('VerifyEmail');
			// 	}
		} catch (error: any) {
			setLoading(false);

			if (error.code === 'auth/email-already-in-use') {
				Alert.alert(
					'Email is already in use. Please choose a different email.'
				);
			} else if (error.code === 'auth/invalid-email') {
				Alert.alert('Email address is not valid. Please enter a valid email');
			} else if (error.code === 'auth/weak-password') {
				Alert.alert('Weak password. Please enter a stronger password');
			} else {
				Alert.alert(`Sign up error: ${error.message}`);
			}
		}

		// TODO Handle registration
		// navigation.navigate('VerifyEmail');
	};

	const handleSignIn = () => {
		navigation.navigate('AuthDashboard');
	};

	const handleViewPassword = () => {
		isPasswordSecure ? setIsPasswordSecure(false) : setIsPasswordSecure(true);
	};

	const [loading, setLoading] = useState(false);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isPasswordSecure, setIsPasswordSecure] = useState(true);

	return (
		<SafeAreaProvider style={{ backgroundColor: COLORS.alpha.white }}>
			<ScrollView>
				<KeyboardAvoidingView
					style={{ flex: 1 }}
					behavior={Platform.OS === 'ios' ? 'height' : undefined}
					keyboardVerticalOffset={100}
				>
					<HeaderComponent authorised={true} />
					<ScreenTitle title={'Register'} />

					<View style={styles.container}>
						<TextInput
							inputLabel={'First name:'}
							autoCapitalize={autoCap.WORDS}
							value={firstName}
							onChangeText={() => setFirstName}
						/>
						<TextInput
							inputLabel={'Last name:'}
							autoCapitalize={autoCap.WORDS}
							value={lastName}
							onChangeText={() => setLastName}
						/>

						<TextInput
							inputLabel={'Email:'}
							autoCapitalize={autoCap.NONE}
							value={email}
							onChangeText={() => setEmail}
							// change keyboard type to email
						/>
						<TextInput
							inputLabel={'Password:'}
							autoCapitalize={autoCap.NONE}
							value={password}
							onChangeText={() => setPassword}
							secureTextEntry={isPasswordSecure}
							icon={
								<Icon
									type='entypo'
									color={COLORS.black}
									name={isPasswordSecure ? 'eye-with-line' : 'eye'}
									onPress={handleViewPassword}
								/>
							}
						/>

						<SmlStandardBtn
							buttonLabel={'Next'}
							onPress={handleRegisterBtn}
							bgGreen={false}
							fontBlue={false}
						/>
					</View>

					<View style={{ justifyContent: 'flex-end' }}></View>
				</KeyboardAvoidingView>
			</ScrollView>
			<Footer
				children={
					<>
						<Text style={styles.textStyleTwo}>Already have an account?</Text>
						<ClearBtn buttonLabel={'Sign in here'} onPress={handleSignIn} />
					</>
				}
			/>
		</SafeAreaProvider>
	);
};

const styles = StyleSheet.create({
	centerContainer: {
		padding: 20,
		marginTop: 15,
		display: 'flex',
		justifyContent: 'center',
		flex: 2,
	},

	container: {
		padding: 20,
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

export default SignUp;

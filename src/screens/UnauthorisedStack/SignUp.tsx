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
// import StandardButton from '../../components/Button/StandardBtn';
import Footer from '../../components/Footer';
import SmlStandardBtn from '../../components/Button/SmallStandardBtn';
import { Input } from '@rneui/base';
import {
	createUserWithEmailAndPassword,
	getAuth,
	sendEmailVerification,
} from 'firebase/auth';
import { auth } from '../../../config/firebase';
// import { useAuth } from '../../context/AuthProvider';
// import { registerNewUser } from '../../../config/auth';

export const LogoImage = () => {
	return <Image source={require('../../../assets/ss.png')} />;
};

// export const registerToVerifySignUp = async(email, password) => {
// 	try {
// 		const userCredential = await
// 	}
// }

interface SignUpFormValues {
	email: string;
	password: string;
	// repeatPassword: string
}

const SignUp = ({ navigation }: any) => {
	// const SignUp = () => {
	const auth = getAuth();
	const [loading, setLoading] = useState(false);

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [isPasswordSecure, setIsPasswordSecure] = useState(true);

	// const { signUp } = useAuth();
	const [formError, setFormError] = useState<String>('');

	// const handleRegisterBtn = async () => {
	// setLoading(true);
	// try {
	// 	await signUp(email, password);
	// 	try {
	// 		// navigation.navigate('VerifyEmail');
	// 		console.log('user signed up');
	// 	} catch (error) {
	// 		console.log('sign up error');
	// 	}
	// } catch (error) {
	// 	console.log(error);
	// 	setFormError(formError);
	// 	setLoading(false);
	// }
	// };

	// 	const user = await registerNewUser(email, password);
	// 	if (user) {
	// 		const id = user.uid;
	// 		// await saveUserData(id, firstName, lastName)
	// 		// navigation.navigate('VerifyEmail');
	// 	}
	// } catch (error: any) {
	// 	setLoading(false);

	// 	if (error.code === 'auth/email-already-in-use') {
	// 		Alert.alert(
	// 			'Email is already in use. Please choose a different email.'
	// 		);
	// 	} else if (error.code === 'auth/invalid-email') {
	// 		Alert.alert('Email address is not valid. Please enter a valid email');
	// 	} else if (error.code === 'auth/weak-password') {
	// 		Alert.alert('Weak password. Please enter a stronger password');
	// 	} else {
	// 		Alert.alert(`Sign up error: ${error.message}`);
	// 	}
	// }

	// TODO Handle registration
	// navigation.navigate('VerifyEmail');
	//};

	const handleRegisterBtn = async (
		email: string,
		password: string,
		firstName: string,
		lastName: string
	) => {
		if (email && password && firstName && lastName) {
			await createUserWithEmailAndPassword(auth, email, password).then((cred) =>
				sendEmailVerification(cred.user, {
					handleCodeInApp: true,
					url: 'https://skipspaceapp.firebaseapp.com',
				})
					.then(() => {
						// navigate to email v screen or send toast
						Alert.alert('Check your inbox for the verification email');
					})
					.catch((error: any) => {
						alert(error.message);
					})
					.then(() => {
						console.log('sdsd');
					})
			);
			// .then( async (cred) => await sendEmailVerification(cred.user))

			// try {
			// 	await createUserWithEmailAndPassword(auth, email, password).then(
			// 		navigation.navigate('VerifyEmail')
			// 	);
			// } catch (err: any) {
			// 	console.log(`Error occured: ${err.code} -  ${err.message}`);
			// }
		}

		// sendEmailVerification(auth.currentUser)
	};

	const handleSignIn = () => {
		navigation.navigate('AuthDashboard');
	};

	const handleViewPassword = () => {
		isPasswordSecure ? setIsPasswordSecure(false) : setIsPasswordSecure(true);
	};

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
						<Text style={styles.textStyle}>First name:</Text>
						<Input
							inputContainerStyle={styles.contStyle}
							autoCapitalize='words'
							value={firstName}
							onChangeText={(value) => setFirstName(value)}
						/>

						<Text style={styles.textStyle}>Last name:</Text>
						<Input
							inputContainerStyle={styles.contStyle}
							autoCapitalize='words'
							value={lastName}
							onChangeText={(value) => setLastName(value)}
						/>

						<Text style={styles.textStyle}>Email:</Text>
						<Input
							inputContainerStyle={styles.contStyle}
							autoCapitalize='none'
							value={email}
							onChangeText={(email) => setEmail(email)}
						/>

						<Text style={styles.textStyle}>Password:</Text>
						<Input
							inputContainerStyle={styles.contStyle}
							autoCapitalize='none'
							value={password}
							onChangeText={(password) => setPassword(password)}
							secureTextEntry={isPasswordSecure}
							rightIcon={
								<Icon
									type='entypo'
									color={COLORS.black}
									name={isPasswordSecure ? 'eye-with-line' : 'eye'}
									onPress={handleViewPassword}
								/>
							}
						/>

						{/* <TextInput
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
							onChangeText={(value: string) => setEmail(value)}
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
						/> */}

						<SmlStandardBtn
							buttonLabel={'Next'}
							onPress={() => handleRegisterBtn}
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
		marginTop: 20,
	},
	// textStyle: {
	// 	fontSize: 15,
	// },
	textStyleTwo: {
		fontSize: FONTSIZES.xl,
		fontWeight: '600',
		textAlign: 'center',
		color: COLORS.bgBlue,
	},
	textStyle: {
		fontSize: FONTSIZES.large,
		paddingBottom: 10,
	},
	contStyle: {
		backgroundColor: COLORS.alpha.lightBlue,
		opacity: 1,
		paddingHorizontal: 10,
	},
	errorStyle: {
		color: COLORS.softRed,
	},
});

export default SignUp;

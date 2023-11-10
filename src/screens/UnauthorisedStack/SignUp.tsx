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

import Footer from '../../components/Footer';
import SmlStandardBtn from '../../components/Button/SmallStandardBtn';
import { Input } from '@rneui/base';
import {
	UserCredential,
	createUserWithEmailAndPassword,
	sendEmailVerification,
	updateProfile,
} from 'firebase/auth';
import { auth, db } from '../../../config/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export const LogoImage = () => {
	return <Image source={require('../../../assets/ss.png')} />;
};

interface SignUpFormValues {
	email: string;
	password: string;
}

const SignUp = () => {
	const navigation = useNavigation<StackNavigationProp<any>>();
	const [loading, setLoading] = useState(false);

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [isPasswordSecure, setIsPasswordSecure] = useState(true);

	const [formError, setFormError] = useState<String>('');

	const handleVerfifyRegister = async () => {
		try {
			const newUserCredential: UserCredential =
				await createUserWithEmailAndPassword(auth, email, password);

			// await sendEmailVerification(newUserCredential.user);

			const userProfileDocRef = doc(db, `users/${newUserCredential.user.uid}`);

			// await sendEmailVerification(newUserCredential.user);

			await setDoc(userProfileDocRef, { firstName, lastName, email });

			await updateProfile(newUserCredential.user, {
				displayName: `${firstName} ${lastName}`,
			}).then(() => {
				navigation.push('VerifyEmail');
			});
			return newUserCredential;
		} catch (error: any) {
			console.log(`Error: ${error.code} - ${error.message}`);
			if (error.code === 'auth/email-already-in-use') {
				setFormError('Email is already in use.');
			} else if (error.code === 'auth/invalid-email') {
				setFormError('Email address is not valid.');
			} else if (error.code === 'auth/weak-password') {
				setFormError('Weak password. Please use a stronger password');
			} else {
				setFormError(`Sign up error: ${error.message}`);
			}
		}
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
							autoCorrect={false}
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
						<View
							style={{
								paddingHorizontal: 10,
								paddingTop: 10,
								paddingBottom: 20,
							}}
						>
							<Text style={styles.errorText}>
								{formError}
								{/* This an example of error text */}
							</Text>
						</View>

						<SmlStandardBtn
							buttonLabel={'Next'}
							onPress={handleVerfifyRegister}
							// onPress={() => console.log('hello')}
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
	errorText: {
		color: COLORS.softRed,
		fontSize: FONTSIZES.large,
		textAlign: 'center',
	},
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
});

export default SignUp;

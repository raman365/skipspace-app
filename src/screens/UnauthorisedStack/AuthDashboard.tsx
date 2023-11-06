import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, View, Pressable } from 'react-native';
import { Text, Input } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { COLORS, FONTSIZES } from '../../../constants/theme';
import HeaderComponent from '../../components/Header';
import ScreenTitle from '../../components/ScreenTitle';
import ClearBtn from '../../components/Button/ClearBtn';
import StandardButton from '../../components/Button/StandardBtn';
import Footer from '../../components/Footer';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../../../config/firebase';
import { useNavigation } from '@react-navigation/native';
import { handleSignIn } from '../../utils/authentication';

const AuthDashboard = ({ navigation }: any) => {
	const auth = getAuth();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	// TODO: email verification
	const handleSignIn = async () => {
		if (email && password) {
			try {
				await signInWithEmailAndPassword(auth, email, password).then(
					(userCredential) => {
						const user = userCredential.user;
					}
				);
			} catch (error: any) {
				const errorCode = error.code;
				const errorMessage = error.message;

				console.log(`${errorCode} - ${errorMessage} `);
			}
		}
	};

	const handleForgotPasswordLink = () => {
		// navigation.navigate('ForgotDetails');
	};
	// const handleSignUp = () => {
	// 	navigation.navigate('SignUp');
	// };
	return (
		<SafeAreaProvider>
			<HeaderComponent authorised={true} />

			<ScreenTitle title={'Sign In'} />

			<View style={styles.centerContainer}>
				{/* <TextInput inputLabel={'Email address:'} placeholder={''} value={''} autoCapitalize={"/Users/bbb/ContractProjects/skipspace-app/src/components/FormComponents/TextInput/index".NONE} />
				<TextInput inputLabel={'Password:'} secureTextEntry placeholder={''} />  */}
				<View>
					<Text style={styles.formTextStyle}>Email address </Text>
					<Input
						keyboardType='email-address'
						inputContainerStyle={styles.contStyle}
						onChangeText={(email) => setEmail(email)}
						value={email}
						autoCapitalize='none'
					/>
				</View>
				<View>
					<Text style={styles.formTextStyle}>Password</Text>
					<Input
						keyboardType='default'
						inputContainerStyle={styles.contStyle}
						secureTextEntry
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

				<View style={{ paddingVertical: 40 }}>
					<StandardButton
						buttonLabel={'Sign In'}
						onPress={handleSignIn}
						bgGreen={false}
						fontBlue={false}
					/>
					{/* <Pressable onPress={handleSignIn} /> */}
				</View>
			</View>
			<Footer
				children={
					<>
						<Text style={styles.textStyleTwo}>Don't have an account?</Text>
						<ClearBtn
							buttonLabel={'Sign up here'}
							onPress={() => navigation.navigate('signUp')}
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

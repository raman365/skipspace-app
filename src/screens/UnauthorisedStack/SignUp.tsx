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

export const LogoImage = () => {
	return <Image source={require('../../../assets/ss.png')} />;
};

interface SignUpFormValues {
	email: string;
	password: string;
}

const SignUp = ({ navigation }: any) => {
	const [loading, setLoading] = useState(false);

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [isPasswordSecure, setIsPasswordSecure] = useState(true);

	const [formError, setFormError] = useState<String>('');

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
							// onPress={handleRegisterBtn}
							onPress={() => console.log('hello')}
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

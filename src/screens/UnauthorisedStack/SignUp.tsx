import {
	StyleSheet,
	View,
	KeyboardAvoidingView,
	ScrollView,
	SafeAreaView,
	Platform,
} from 'react-native';
import React, { useState } from 'react';
import { Icon, Image, Text } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { COLORS, FONTSIZES } from '../../../constants/theme';
import HeaderComponent from '../../components/Header';
import ScreenTitle from '../../components/ScreenTitle';
import ClearBtn from '../../components/Button/ClearBtn';
import TextInput from '../../components/FormComponents/TextInput';
import StandardButton from '../../components/Button/StandardBtn';
import Footer from '../../components/Footer';
import SmlStandardBtn from '../../components/Button/SmallStandardBtn';

export const LogoImage = () => {
	return <Image source={require('../../../assets/ss.png')} />;
};

const SignUp = ({ navigation }: any) => {
	const handleRegisterBtn = () => {
		// TODO Handle registration
		navigation.navigate('VerifyEmail');
	};
	const handleSignUp = () => {
		// TODO Handle registration
		navigation.navigate('AuthDashboard');
	};

	const handleViewPassword = () => {
		isPasswordSecure ? setIsPasswordSecure(false) : setIsPasswordSecure(true);
	};
	const [password, setPassword] = useState('');
	const [isPasswordSecure, setIsPasswordSecure] = useState(true);

	return (
		<SafeAreaProvider>
			<ScrollView>
				<KeyboardAvoidingView
					style={{ flex: 1 }}
					behavior={Platform.OS === 'ios' ? 'height' : undefined}
					keyboardVerticalOffset={100}
				>
					<HeaderComponent authorised={true} />
					<ScreenTitle title={'Register'} />

					{/* <View style={styles.centerContainer}> */}
					<View style={styles.container}>
						<TextInput inputLabel={'First name:'} placeholder={''} />
						<TextInput inputLabel={'Last name:'} placeholder={''} />

						<TextInput inputLabel={'Email:'} placeholder={''} />
						<TextInput
							inputLabel={'Password:'}
							placeholder={''}
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

					{/* <View style={{ marginBottom: 20 }}> */}
					{/* <View style={{ paddingHorizontal: 20, paddingTop: 30 }}>
				<StandardButton
					buttonLabel={'Next'}
					onPress={handleRegisterBtn}
					bgGreen={false}
					fontBlue={false}
				/>
			</View> */}
					<View style={{ justifyContent: 'flex-end' }}></View>
				</KeyboardAvoidingView>
			</ScrollView>
			<Footer
				children={
					<>
						<Text style={styles.textStyleTwo}>Already have an account?</Text>
						<ClearBtn buttonLabel={'Sign up here'} onPress={handleSignUp} />
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

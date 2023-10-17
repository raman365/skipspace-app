import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Image, Text } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { COLORS, FONTSIZES } from '../../../constants/theme';
import HeaderComponent from '../../components/Header';
import ScreenTitle from '../../components/ScreenTitle';
import ClearBtn from '../../components/Button/ClearBtn';
import TextInput from '../../components/FormComponents/TextInput';
import StandardButton from '../../components/Button/StandardBtn';
import Footer from '../../components/Footer';

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
	return (
		<SafeAreaProvider>
			<HeaderComponent authorised={true} />
			<ScreenTitle title={'Register'} />

			<View style={styles.centerContainer}>
				<TextInput inputLabel={'First name:'} placeholder={''} />
				<TextInput inputLabel={'Last name:'} placeholder={''} />
				<TextInput inputLabel={'Email:'} placeholder={''} />
				<TextInput inputLabel={'Password:'} placeholder={''} secureTextEntry />
				<TextInput
					inputLabel={'Confirm password:'}
					placeholder={''}
					secureTextEntry
				/>

				<View style={{ paddingBottom: 12 }}>
					<StandardButton
						buttonLabel={'Next'}
						onPress={handleRegisterBtn}
						bgGreen={false}
						fontBlue={false}
					/>
				</View>
			</View>
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
		paddingTop: 20,
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

export default SignUp;

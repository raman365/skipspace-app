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
			<SmlStandardBtn
				buttonLabel={'Next'}
				onPress={handleRegisterBtn}
				bgGreen={false}
				fontBlue={false}
			/>

			<Footer
				children={
					<>
						<Text style={styles.textStyleTwo}>Already have an account?</Text>
						<ClearBtn buttonLabel={'Sign up here'} onPress={handleSignUp} />
					</>
				}
			/>
			{/* </View> */}
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

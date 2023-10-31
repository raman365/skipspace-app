import { StyleSheet, View } from 'react-native';
import { Text } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { COLORS, FONTSIZES } from '../../../constants/theme';
import HeaderComponent from '../../components/Header';
import ScreenTitle from '../../components/ScreenTitle';
import ClearBtn from '../../components/Button/ClearBtn';
import StandardButton from '../../components/Button/StandardBtn';
import TextInput from '../../components/FormComponents/TextInput';
import Footer from '../../components/Footer';

const AuthDashboard = ({ navigation }: any) => {
	const handleSignIn = () => {
		console.log('handleSignIn');
	};

	const handleForgotPasswordLink = () => {
		navigation.navigate('ForgotDetails');
	};
	const handleSignUp = () => {
		navigation.navigate('SignUp');
	};
	return (
		<SafeAreaProvider>
			<HeaderComponent authorised={true} />

			<ScreenTitle title={'Sign In'} />

			<View style={styles.centerContainer}>
				{/* <TextInput inputLabel={'Email address:'} placeholder={''} />
				<TextInput inputLabel={'Password:'} secureTextEntry placeholder={''} /> */}

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
				</View>
			</View>
			<Footer
				children={
					<>
						<Text style={styles.textStyleTwo}>Don't have an account?</Text>
						<ClearBtn buttonLabel={'Sign up here'} onPress={handleSignUp} />
					</>
				}
			/>
		</SafeAreaProvider>
	);
};

const styles = StyleSheet.create({
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

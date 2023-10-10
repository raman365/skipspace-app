import { StyleSheet, View } from 'react-native';
import { Input, Button, Text } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { COLORS, FONTSIZES } from '../../../constants/theme';
import HeaderComponent from '../../components/Header';
import ScreenTitle from '../../components/ScreenTitle';
import ClearBtn from '../../components/Button/ClearBtn';
import StandardButton from '../../components/Button/StandardBtn';

const AuthDashboard = ({ navigation }: any) => {
	const handleSignIn = () => {
		console.log('handleSignIn');
	};

	const handleForgotPasswordLink = () => {
		navigation.navigate('ForgotDetails');
	};
	return (
		<SafeAreaProvider>
			<HeaderComponent authorised={true} />

			<ScreenTitle title={'Sign In'} />

			<View style={styles.centerContainer}>
				<View>
					<View>
						<Text style={styles.textStyle}>Email address:</Text>
						<Input placeholder='your@email.com' />
					</View>
					<View>
						<Text style={styles.textStyle}>Password:</Text>
						<Input placeholder='********' secureTextEntry={true} />
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
						/>
					</View>
				</View>
			</View>
			<View style={styles.bottomContainer}>
				<View
					style={{
						// display: 'flex',
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center',
						// alignContent: 'center',
					}}
				>
					<Text style={styles.textStyleTwo}>Don't have an account?</Text>
					<ClearBtn
						buttonLabel={'Sign up here'}
						onPress={() => navigation.navigate('SignUp')}
					/>
				</View>
			</View>
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
	bottomContainer: {
		borderTopColor: COLORS.bgGreen,
		borderTopWidth: 2,
		height: 100,
		paddingTop: 15,
	},
});

export default AuthDashboard;

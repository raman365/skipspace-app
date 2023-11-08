import { View, StyleSheet } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { Text, Button, Input, Image, Icon } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { COLORS, FONTSIZES } from '../../../constants/theme';
import ScreenTitle from '../../components/ScreenTitle';
import StandardButton from '../../components/Button/StandardBtn';
import { useState } from 'react';
import { Tooltip, TooltipProps } from '@rneui/base';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../config/firebase';

interface IProps {
	onOpen: () => void;
	onClose: () => void;
	visible: boolean;
}
const CustomToolTip: React.FC<TooltipProps> = ({
	onOpen,
	onClose,
	visible,
	...props
}) => {
	return (
		<Tooltip visible={visible} onOpen={onOpen} onClose={onClose} {...props} />
	);
};

const ForgotDetails = ({ navigation }: any) => {
	const [open, setOpen] = useState(false);

	const [email, setEmail] = useState('');
	const [formError, setFormError] = useState('');

	const handleForgotPassword = async () => {
		// const auth
		try {
			await sendPasswordResetEmail(auth, email).then(() => {
				// TODO send toast
				// TODO: customise email template for password reset
				setOpen(true);
				setEmail('');
				setFormError('');

				navigation.push('AuthDashboard');
			});
		} catch (error: any) {
			console.log(error.code);
			if (error.code === 'auth/missing-email') {
				setFormError('Add the email you registered with.');
			} else if (error.code === 'auth/invalid-email') {
				setFormError('Email address is not valid.');
			} else if (error.code === 'auth/user-not-found') {
				setFormError('User not found.');
			} else {
				setFormError(`${error.message}`);
			}
		}
		// console.log('handleForgotPassword');
	};

	const handleBackBtn = () => {
		navigation.dispatch(CommonActions.goBack());
	};

	return (
		<SafeAreaProvider>
			{/* <HeaderComponent authorised={true} icon={'arrow-left'} /> */}
			<View style={styles.imageContainer}>
				<View
					style={{
						width: 100,
						height: 100,
						alignSelf: 'center',
						justifyContent: 'center',
					}}
				>
					<Button onPress={handleBackBtn}>
						<Icon
							name='arrow-left'
							type={'feather'}
							size={34}
							color={COLORS.bgGreen}
						/>
					</Button>
				</View>
				<View style={styles.innerContainer}>
					<Image
						style={styles.logoImage}
						source={require('../../components/Header/image/sslogo1.png')}
						resizeMode='contain'
					/>
				</View>
				<View style={{ width: 100, alignSelf: 'center' }}></View>
			</View>
			<ScreenTitle title={'Forgot Password?'} />

			<View style={styles.centerContainer}>
				<View>
					<View>
						<Text style={styles.textStyle}>
							Enter your email and we will help you get back in{' '}
						</Text>
					</View>
					<View style={{ paddingVertical: 50 }}>
						<Text style={styles.textStyle}>Email:</Text>
						<Input
							inputContainerStyle={styles.contStyle}
							autoCapitalize='none'
							autoCorrect={false}
							value={email}
							onChangeText={(email) => setEmail(email)}
						/>
					</View>
					<View
						style={{
							paddingHorizontal: 10,
							paddingBottom: 20,
						}}
					>
						<Text style={styles.errorText}>{formError}</Text>

						<View
							style={{
								// display: 'flex',
								// flexDirection: 'row',
								// justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<CustomToolTip
								backgroundColor={COLORS.alpha.bgGreen}
								// onOpen={}
								onClose={() => {
									setOpen(false);
								}}
								visible={open}
								containerStyle={{
									width: 250,
									height: 60,
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}
								withPointer={false}
								animationType={'fade'}
								popover={
									<Text style={{ textAlign: 'center' }}>
										Password reset email has been sent to your inbox!
									</Text>
								}
							/>
						</View>
					</View>

					<View style={{ paddingVertical: 10 }}>
						<StandardButton
							buttonLabel={'Send'}
							onPress={handleForgotPassword}
							bgGreen={false}
							fontBlue={false}
						/>
					</View>
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
	contStyle: {
		backgroundColor: COLORS.alpha.lightBlue,
		opacity: 1,
		paddingHorizontal: 10,
	},
	centerContainer: {
		paddingHorizontal: 25,
		paddingVertical: 50,
		display: 'flex',
		justifyContent: 'space-between',
		// flex: 1,
	},
	textStyle: {
		fontSize: FONTSIZES.large,
		paddingBottom: 10,
	},
	// textStyle: {
	// 	fontSize: 15,
	// 	textAlign: 'center',
	// 	paddingVertical: 2,
	// },
	textStyleTwo: {
		fontSize: 17,
		fontWeight: '500',
		textAlign: 'center',
	},
	bottomContainer: {
		borderTopColor: COLORS.bgGreen,
		borderTopWidth: 2,
		height: 100,
		paddingTop: 30,
	},
	errorText: {
		color: COLORS.softRed,
		fontSize: FONTSIZES.large,
		textAlign: 'center',
	},
	imageContainer: {
		backgroundColor: COLORS.bgBlue,
		height: 150,
		paddingTop: 30,
		paddingBottom: 30,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	innerContainer: {
		paddingTop: 40,
		alignSelf: 'center',
	},
	logoImage: {
		width: 100,
		height: 100,
		paddingTop: 20,
	},
});
export default ForgotDetails;

import { View, StyleSheet } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { Text, Button, Input, Image, Icon } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { COLORS } from '../../../constants/theme';
import HeaderComponent from '../../components/Header';
import ScreenTitle from '../../components/ScreenTitle';
import {} from '@rneui/base';

const ForgotDetails = ({ navigation }: any) => {
	const handleForgotPassword = () => {
		console.log('handleForgotPassword');
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
						// paddingTop: 0,
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
						// source={require('../Header/image/sslogo1.png')}
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
						<Text style={{}}>Email address:</Text>
						<Input placeholder='your@email.com' />
					</View>

					<View style={{ paddingVertical: 10 }}>
						<Button
							title='Send'
							buttonStyle={{
								backgroundColor: COLORS.bgBlue,
								borderRadius: 5,
							}}
							titleStyle={{
								fontWeight: '700',
								fontSize: 16,
								color: COLORS.white,
							}}
							onPress={handleForgotPassword}
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
	centerContainer: {
		paddingHorizontal: 25,
		paddingVertical: 50,
		display: 'flex',
		justifyContent: 'space-between',
		// flex: 1,
	},
	textStyle: {
		fontSize: 15,
		textAlign: 'center',
		paddingVertical: 2,
	},
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

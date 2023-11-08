import { View, StyleSheet, ActivityIndicator } from 'react-native';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { COLORS, FONTSIZES } from '../../../constants/theme';
import HeaderComponent from '../../components/Header';
import { Input, Text, Button } from '@rneui/themed';
import ScreenTitle from '../../components/ScreenTitle';
import { auth } from '../../../config/firebase';

const VerifyEmail = ({ navigation }: any) => {
	// const handleVerifyEmail = async () => {

	// 	auth.currentUser?.reload()
	// 	.then( ()=> console.log(auth.currentUser?.emailVerified))

	// 	if (auth.currentUser?.emailVerified)
	// 	// navigation.navigate('AuthorisedStack', { screen: 'signedInDashboard' });

	// };
	return (
		<SafeAreaProvider>
			<HeaderComponent authorised={true} />
			<ScreenTitle title={'Verify your email'} />

			<View style={styles.centerContainer}>
				<View>
					<View>
						<Text style={styles.textStyle}>
							We've just sent you a verification email.
						</Text>
						<Text style={styles.textStyle}>
							Check your inbox and return here once you've followed the
							instructions
						</Text>
					</View>
					<View style={{ paddingVertical: 50 }}>
						<ActivityIndicator size={'large'} color={COLORS.bgBlue} />
					</View>

					<View style={{ paddingVertical: 10, marginHorizontal: 50 }}>
						<Button
							title={"I've verified my email"}
							buttonStyle={{
								backgroundColor: COLORS.bgGreen,
								borderRadius: 25,
							}}
							titleStyle={{
								fontWeight: '700',
								fontSize: FONTSIZES.large,
								color: COLORS.white,
							}}
							onPress={() => console.log('hello')}
							// onPress={handleVerifyEmail}
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
});
export default VerifyEmail;

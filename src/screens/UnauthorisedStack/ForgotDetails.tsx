import { View, StyleSheet } from 'react-native';
import { Text, Button, Input } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { COLORS } from '../../../constants/theme';
import HeaderComponent from '../../component/Header';

const ForgotDetails = () => {
	return (
		<SafeAreaProvider>
			<HeaderComponent />

			<View style={{ paddingTop: 30 }}>
				<Text h3 h3Style={{ fontWeight: 'bold', textAlign: 'center' }}>
					Forgot Password?
				</Text>
			</View>

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
							onPress={() => console.log('aye')}
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
export default ForgotDetails;

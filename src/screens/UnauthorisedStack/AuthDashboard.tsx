import { StyleSheet, View } from 'react-native';
import { Input, Button, Text } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { COLORS } from '../../../constants/theme';
import HeaderComponent from '../../components/Header';
import ScreenTitle from '../../components/ScreenTitle';

const AuthDashboard = ({ navigation }: any) => {
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
						<Text style={styles.textStyle}>Forgot Password?</Text>
					</View>

					<View style={{ paddingVertical: 40 }}>
						<Button
							title='Sign In'
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
			<View style={styles.bottomContainer}>
				<View
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Text style={styles.textStyleTwo}>Don't have an account? </Text>
					<Button
						type={'clear'}
						titleStyle={{
							color: COLORS.bgGreen,
							fontSize: 17,
							fontWeight: 'bold',
						}}
						onPress={() => navigation.navigate('SignUp')}
					>
						Sign up here
					</Button>
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
		fontSize: 17,
		fontWeight: '500',
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

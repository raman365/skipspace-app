import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Input, Image, Icon } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { COLORS, FONTSIZES } from '../../../constants/theme';
import ScreenTitle from '../../components/ScreenTitle';
import StandardButton from '../../components/Button/StandardBtn';
import { useState } from 'react';
import { Tooltip, TooltipProps } from '@rneui/base';
import useAuth from '../../hooks/useAuth';
import { NavProps } from '../../../types/types';

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

const ForgotDetails = ({ navigation }: NavProps) => {
	const { sendPasswordResetEmail } = useAuth();
	const [forgotEmail, setForgotEmail] = useState('');
	const [formError, setFormError] = useState('');

	const handleBackBtn = () => {
		navigation.navigate('AuthDashboard');
	};

	const handlePasswordReset = () => {
		sendPasswordResetEmail(forgotEmail);
		navigation.navigate('AuthDashboard');
	};

	return (
		<SafeAreaProvider>
			<View style={styles.imageContainer}>
				<View
					style={{
						width: 100,
						height: 100,
						alignSelf: 'center',
						justifyContent: 'center',
					}}
				>
					<TouchableOpacity onPress={handleBackBtn}>
						<Icon
							name='arrow-left'
							type={'feather'}
							size={34}
							color={COLORS.bgGreen}
						/>
					</TouchableOpacity>
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
				<View style={{ marginHorizontal: 10, marginVertical: 20 }}>
					<Text style={{ textAlign: 'center', fontSize: FONTSIZES.ml }}>
						Enter your email address and we'll help you get back in!
					</Text>
				</View>
				<Text style={styles.textStyle}>Email:</Text>
				<Input
					style={{ fontSize: FONTSIZES.large }}
					inputContainerStyle={styles.contStyle}
					autoCapitalize='none'
					value={forgotEmail}
					onChangeText={(value) => setForgotEmail(value)}
				/>
			</View>
			<View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
				<StandardButton
					buttonLabel={'Send'}
					onPress={handlePasswordReset}
					bgGreen={false}
					fontBlue={false}
				/>
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
	},
	textStyle: {
		fontSize: FONTSIZES.large,
		paddingBottom: 10,
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

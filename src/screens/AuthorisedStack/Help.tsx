import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { COLORS, FONTSIZES } from '../../../constants/theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HeaderComponent from '../../components/Header';
import { Icon, Text } from '@rneui/themed';
import * as Linking from 'expo-linking';

let emailURL = `skipspace-app://mailto:kirk@skipspace.co.uk`;
let webURL = 'https://www.example.com';

const Help = ({ navigation }: any) => {
	const handleEmailLink = () => {
		const email = 'kirk@skipspace.co.uk';
		const subject = 'Help/Question from the User App';

		const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}`;

		Linking.openURL(mailtoLink).catch((err) =>
			console.error('Failed to open mailto link:', err)
		);
	};
	return (
		<SafeAreaProvider>
			<HeaderComponent
				authorised={true}
				icon={
					<Icon name='menu' type='feather' color={COLORS.bgGreen} size={30} />
				}
				onPress={() => {
					navigation.toggleDrawer();
				}}
			/>
			<View style={{ paddingTop: 30 }}>
				<Text
					h4
					h4Style={{
						fontWeight: 'bold',
						textAlign: 'center',
						color: COLORS.bgBlue,
						fontSize: 30,
						fontFamily: 'Tungsten_SemiBold',
					}}
				>
					Help
				</Text>
			</View>
			<View style={styles.centerContainer}>
				<Text style={{ fontSize: FONTSIZES.xl }}>How to use your voucher:</Text>
				<View style={{ paddingLeft: 10, paddingTop: 10 }}>
					<Text style={{ fontSize: FONTSIZES.ml, marginBottom: 10 }}>
						1. Arrive at your SkipSpace site.
					</Text>
					<Text style={{ fontSize: FONTSIZES.ml, marginBottom: 10 }}>
						2. Show the QR code to the security staff when you arrive.
					</Text>
					<Text style={{ fontSize: FONTSIZES.ml, marginBottom: 10 }}>
						3. Drop off your items
					</Text>
				</View>

				<View style={{ paddingTop: 30 }}>
					<Text style={{ fontSize: FONTSIZES.xl, textAlign: 'center' }}>
						Need further help?
					</Text>
					<Text
						style={{
							fontSize: FONTSIZES.ml,
							textAlign: 'center',
							paddingBottom: 20,
							paddingTop: 5,
						}}
					>
						Get in touch:
					</Text>

					<TouchableOpacity onPress={handleEmailLink}>
						<Text
							style={{
								fontWeight: 'bold',
								textAlign: 'center',
								fontSize: FONTSIZES.xxl,
								color: COLORS.bgGreen,
							}}
						>
							kirk@skipspace.co.uk
						</Text>
					</TouchableOpacity>
				</View>

				{/* TODO: aDD help skipspace mail link */}
			</View>
		</SafeAreaProvider>
	);
};

const styles = StyleSheet.create({
	centerContainer: {
		paddingTop: 50,
		paddingHorizontal: 20,
		display: 'flex',
		justifyContent: 'center',
	},

	listItemTitle: {
		paddingVertical: 5,
		fontSize: 12,
		fontWeight: 'bold',
	},
	listItemTitle1: {
		paddingVertical: 5,
		fontSize: 12,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	listItemSubtitle: {
		paddingVertical: 5,
		fontSize: 11,
	},
});

export default Help;

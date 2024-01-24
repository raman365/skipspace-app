import { View, StyleSheet } from 'react-native';
import React from 'react';
import { COLORS, FONTSIZES } from '../../../constants/theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HeaderComponent from '../../components/Header';
import { Icon, Text } from '@rneui/themed';
import * as Linking from 'expo-linking';
import ClearBtn from '../../components/Button/ClearBtn';

let emailURL = `skipspace-app://mailto:kirk@skipspace.co.uk`;
let webURL = 'https://www.example.com';

const Help = ({ navigation }: any) => {
	const handleLink = () => {
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
				<Text
					style={{
						fontSize: FONTSIZES.xl,
						textAlign: 'center',
						paddingBottom: 10,
					}}
				>
					How to use your voucher:
				</Text>
				<View style={{ paddingLeft: 10, paddingTop: 10 }}>
					<Text style={{ fontSize: FONTSIZES.ml, marginBottom: 15 }}>
						1. Arrive at your SkipSpace site.
					</Text>
					<Text style={{ fontSize: FONTSIZES.ml, marginBottom: 15 }}>
						2. Show the QR code to the security staff.
					</Text>
					<Text style={{ fontSize: FONTSIZES.ml, marginBottom: 15 }}>
						3. Drop off your items
					</Text>
				</View>

				<View
					style={{
						paddingTop: 30,
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Text
						style={{
							fontSize: FONTSIZES.xl,
							textAlign: 'center',
							paddingBottom: 5,
							fontWeight: '600',
							color: COLORS.bgBlue,
						}}
					>
						Need further help?
					</Text>
					<ClearBtn
						fontSize='large'
						buttonLabel={' Contact us'}
						onPress={() =>
							Linking.openURL('https://www.skipspace.co.uk/contact')
						}
					/>
				</View>
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

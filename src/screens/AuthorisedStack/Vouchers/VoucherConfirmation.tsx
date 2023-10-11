import { View, StyleSheet } from 'react-native';
import React from 'react';
import { COLORS, FONTSIZES } from '../../../../constants/theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HeaderComponent from '../../../components/Header';
import { Button, Icon, Text, ListItem } from '@rneui/themed';
import QREncoder from '../../../components/QREncoder';
import StandardButton from '../../../components/Button/StandardBtn';
import ScreenTitle from '../../../components/ScreenTitle';

const VoucherConfirmation = ({ navigation }: any) => {
	const stringExample = 'test - this is a test a test this is';
	// 'Location Name: Skips are us | Address: 123 Fake Lane, E17 123. This is an example of a QR code';
	const handleReturnHome = () => {
		navigation.navigate('signedInDashboard');
		// TODO: Push voucher data to the database
	};
	return (
		<SafeAreaProvider>
			<HeaderComponent
				authorised={false}
				icon={
					<Icon name='menu' type='feather' color={COLORS.bgGreen} size={40} />
				}
				onPress={() => {
					navigation.toggleDrawer();
				}}
			/>

			<View>
				<View style={{ paddingVertical: 20 }}>
					<ScreenTitle title={'Confirmation'} />
					{/* <Text
						h4
						h4Style={{
							fontWeight: 'bold',
							textAlign: 'center',
							color: COLORS.bgBlue,
							fontSize: FONTSIZES.txxl,
							fontFamily: 'Tungsten-SemiBold',
						}}
					>
						Confirmation
					</Text> */}
				</View>

				<View
					style={{
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<QREncoder codeValue={stringExample} />
				</View>

				<View style={{ paddingVertical: 40, paddingHorizontal: 30 }}>
					<View
						style={{
							paddingVertical: 10,
							paddingHorizontal: 10,
							borderColor: COLORS.bgBlue,
							borderWidth: 1,
							marginTop: 10,
							marginBottom: 20,
						}}
					>
						<Text
							style={{
								textDecorationLine: 'underline',
								textAlign: 'center',
								paddingVertical: 10,
								fontWeight: 'bold',
								fontSize: 16,
							}}
						>
							Instructions:
						</Text>
						{/* <Text style={{ textAlign: 'left', fontWeight: '400' }}> */}
						<ListItem style={{ backgroundColor: COLORS.white }}>
							<ListItem.Content>
								<ListItem.Title style={styles.listItemTitle}>
									1. Go to your SkipSpace site.
								</ListItem.Title>
								<ListItem.Title style={styles.listItemTitle}>
									2. Show this QR code to the security staff when you arrive.
								</ListItem.Title>
								<ListItem.Title style={styles.listItemTitle}>
									3. This QR code will expire in 24 hours and can also be found
									in the Vouchers section.
								</ListItem.Title>
							</ListItem.Content>
						</ListItem>
					</View>
				</View>

				<View style={{ paddingVertical: 40, paddingHorizontal: 30 }}>
					<Button
						title='Return Home'
						buttonStyle={{
							backgroundColor: COLORS.bgGreen,
							borderRadius: 30,
							paddingVertical: 15,
						}}
						titleStyle={{
							fontWeight: '700',
							fontSize: FONTSIZES.xl,
							color: COLORS.bgBlue,
						}}
						onPress={handleReturnHome}
					/>
				</View>
			</View>
		</SafeAreaProvider>
	);
};

const styles = StyleSheet.create({
	centerContainer: {
		// paddingTop: 20,
		// paddingHorizontal: 20,
		// display: 'flex',
		// justifyContent: 'flex-end',
		// alignContent: 'space-between',
		// flex: 1,
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

export default VoucherConfirmation;

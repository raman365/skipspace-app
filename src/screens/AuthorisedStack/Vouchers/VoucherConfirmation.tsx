import { View, StyleSheet } from 'react-native';
import React from 'react';
import { COLORS, FONTSIZES } from '../../../../constants/theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HeaderComponent from '../../../components/Header';
import { Button, Icon, Text, ListItem } from '@rneui/themed';
import QREncoder from '../../../components/QREncoder';
import StandardButton from '../../../components/Button/StandardBtn';
import ScreenTitle from '../../../components/ScreenTitle';

const VoucherConfirmation = ({ route, navigation }: any) => {
	// const { councilName, subCollParams } = route.params;
	const { localAuth, skipCompanyName, skipCompanyAddress } = route.params;

	const stringExample = 'test - this is a test a test this is';

	const dataInQRCode = `\n
						  Local Authority Issue: ${localAuth} 
						  Skip Company Name: ${skipCompanyName}
						  Skip Company Address: ${skipCompanyAddress}
	 `;
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
					<ScreenTitle title={'Confirmed'} />
				</View>

				<View
					style={{
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<QREncoder codeValue={dataInQRCode} />
					{console.log(dataInQRCode)}
					{/* <Text>{dataInQRCode}</Text> */}
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
									1. Arrive at your SkipSpace with your items to discard.
								</ListItem.Title>
								<ListItem.Title style={styles.listItemTitle}>
									2. Show this QR code to the security staff when you arrive. It
									can also be found in the Vouchers section.
								</ListItem.Title>
								<ListItem.Title style={styles.listItemTitle}>
									3. This QR code will expire in 24 hours
								</ListItem.Title>
							</ListItem.Content>
						</ListItem>
					</View>
				</View>

				<View style={{ paddingHorizontal: 30 }}>
					<StandardButton
						bgGreen
						fontBlue
						buttonLabel={'Return Home'}
						onPress={handleReturnHome}
					/>
				</View>
			</View>
		</SafeAreaProvider>
	);
};

const styles = StyleSheet.create({
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

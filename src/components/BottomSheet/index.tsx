import React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { BottomSheet, ListItem } from '@rneui/themed';

import { COLORS, FONTSIZES } from '../../../constants/theme';
import ScreenTitle from '../ScreenTitle';
import QREncoder from '../QREncoder';
import StandardButton from '../Button/StandardBtn';
import Subtitle from '../Subtitle';
import CountdownTimer from '../Timer';
import SmlStandardBtn from '../Button/SmallStandardBtn';

interface IVoucherSheetProps {
	isVisible: boolean;
	onCancelPress: () => void;
	userName: string;
	skipCompanyName: string;
	skipCompanyAddress: string;
	localAuthIssue: string;
	// qrCode: React.ReactElement;

	// mapLink: string
	// expiryDate: Date | string
}

const VoucherSheet: React.FC<IVoucherSheetProps> = ({
	isVisible = false,
	onCancelPress,
	skipCompanyName,
	skipCompanyAddress,
	userName,
	localAuthIssue,
}) => {
	const stringExample = 'test - this is a test a test this is';
	// TODO : Work with date string on voucher
	// TODO: Maps link on bottom sheeet voucher
	////   Date issued: ${new Date()}
	const dataInQRCode = `\n
						
						  Person Details: ${userName}
						  Local Authority Issue: ${localAuthIssue} 
						  Skip Company Name: ${skipCompanyName}
						  Skip Company Address: ${skipCompanyAddress}
	 `;
	return (
		<BottomSheet
			isVisible={isVisible}
			onBackdropPress={onCancelPress}
			containerStyle={{}}
		>
			<View style={styles.mainContainer}>
				{/* <View style={styles.voucherTicketTop} /> */}

				<View style={{ paddingTop: 10, paddingBottom: 10 }}>
					<ScreenTitle title={'Active Voucher'} />
				</View>

				<View style={styles.viewSection}>
					<Subtitle subtitle={'Expires: '} />
					<CountdownTimer />
					{/* <Subtitle textColor={COLORS.softRed} subtitle={'12:10:00'} /> */}
				</View>

				<View>
					<View
						style={{
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<QREncoder codeValue={dataInQRCode} />
					</View>

					<View
						style={{
							paddingTop: 20,
							paddingHorizontal: 30,
							flexDirection: 'column',
							justifyContent: 'center',
						}}
					>
						<Subtitle subtitle={'Skip Company: '} />
						<Text style={{ textAlign: 'center' }}>{skipCompanyName}</Text>
					</View>
					<View
						style={{
							paddingTop: 20,
							// paddingBottom: 10,
							paddingHorizontal: 30,
							flexDirection: 'column',
							justifyContent: 'center',
						}}
					>
						<Subtitle subtitle={'Address: '} />
						{/* <Text style={{ fontWeight: 'bold' }}>Address: </Text> */}
						<Text style={{ textAlign: 'center' }}>{skipCompanyAddress}</Text>
					</View>
					<View>
						<Text
							style={{
								textAlign: 'center',
								paddingVertical: 10,
								textDecorationLine: 'underline',
								fontWeight: 'bold',
							}}
						>
							View on maps
						</Text>
					</View>
				</View>

				<View style={{ paddingVertical: 10, paddingHorizontal: 30 }}>
					<View
						style={{
							paddingVertical: 10,
							paddingHorizontal: 10,
							borderColor: COLORS.bgBlue,
							borderWidth: 1,
							marginTop: 10,
							// marginBottom: 20,
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
						<ListItem style={{ backgroundColor: COLORS.white }}>
							<ListItem.Content>
								<ListItem.Title style={styles.listItemTitle}>
									1. Arrive at your SkipSpace site.
								</ListItem.Title>
								<ListItem.Title style={styles.listItemTitle}>
									2. Show this QR code to the security staff when you arrive.
								</ListItem.Title>
								<ListItem.Title style={styles.listItemTitle}>
									3. This QR code will expire within 24 hours of first issue.
								</ListItem.Title>
							</ListItem.Content>
						</ListItem>
					</View>
				</View>

				<View style={{ paddingBottom: 30, paddingHorizontal: 30 }}>
					{/* <StandardButton
						bgGreen
						fontBlue
						buttonLabel={'Back to Vouchers'}
						onPress={onCancelPress}
					/> */}
					<SmlStandardBtn
						buttonLabel={'Back to Vouchers'}
						onPress={onCancelPress}
						bgGreen
						fontBlue
					/>
				</View>
			</View>
		</BottomSheet>
	);
};

export default VoucherSheet;

const styles = StyleSheet.create({
	mainContainer: {
		backgroundColor: COLORS.white,
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
	},
	viewSection: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 15,
	},
	voucherTicketTop: {
		paddingTop: 10,
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

import React, { useState } from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { BottomSheet, ListItem } from '@rneui/themed';

import { COLORS, FONTSIZES } from '../../../constants/theme';
import ScreenTitle from '../ScreenTitle';
import QREncoder from '../QREncoder';
import StandardButton from '../Button/StandardBtn';
import Subtitle from '../Subtitle';
import CountdownTimer from '../Timer';
import SmlStandardBtn from '../Button/SmallStandardBtn';
import ClearBtn from '../Button/ClearBtn';
import { useNavigation } from '@react-navigation/native';

interface IVoucherSheetProps {
	isShown: boolean;
	onCancelPress: () => void;
	onHelpPress: () => void;
	userName: string;
	skipCompanyName: string;
	skipCompanyAddress: string;
	localAuthIssue: string;
	dateIssued: string;
	// qrCode: React.ReactElement;

	// mapLink: string
	// expiryDate: Date | string
}

const VoucherSheet: React.FC<IVoucherSheetProps> = ({
	isShown = false,
	onCancelPress,
	onHelpPress,
	skipCompanyName,
	skipCompanyAddress,
	userName,
	localAuthIssue,
	dateIssued,
}) => {
	const stringExample = 'test - this is a test a test this is';
	// TODO : Work with date string on voucher
	// TODO: Maps link on bottom sheeet voucher
	////   Date issued: ${new Date()}
	const dataInQRCode = `\n
						  Date issued: ${dateIssued}
						  Person Details: ${userName}
						  Local Authority Issue: ${localAuthIssue} 
						  Skip Company Name: ${skipCompanyName}
						  Skip Company Address: ${skipCompanyAddress}
	 `;

	// const [isVisible, setIsVisible] = useState(false)

	return (
		<BottomSheet
			isVisible={isShown}
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
					{/* Convert string to timestamp in numbers */}
					{/* <Subtitle textColor={COLORS.softRed} subtitle={'12:10:00'} /> */}
				</View>

				<View>
					<View
						style={{
							justifyContent: 'center',
							alignItems: 'center',
							padding: 20,
						}}
					>
						<QREncoder codeValue={dataInQRCode} />
					</View>

					<View
						style={{
							justifyContent: 'center',
							alignItems: 'center',
							paddingBottom: 20,
						}}
					>
						<Text
							style={{
								textAlign: 'center',
								// padding: 10,
								paddingHorizontal: 40,
								fontWeight: 'bold',
							}}
						>
							Arrive at your SkipSpace site and show this QR code
						</Text>
					</View>

					<View
						style={{
							borderColor: COLORS.lightGrey,
							borderWidth: 1,
							margin: 30,
						}}
					>
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
								paddingHorizontal: 30,
								flexDirection: 'column',
								justifyContent: 'center',
							}}
						>
							<Subtitle subtitle={'Address: '} />
							<Text style={{ textAlign: 'center' }}>{skipCompanyAddress}</Text>
						</View>
						<View style={{ paddingVertical: 20 }}>
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
				</View>

				<View style={{ paddingBottom: 10, paddingHorizontal: 30 }}>
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
				<View
					style={{
						justifyContent: 'center',
						alignItems: 'center',
						paddingBottom: 20,
					}}
				>
					<ClearBtn buttonLabel={'Need help?'} onPress={onHelpPress} />
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

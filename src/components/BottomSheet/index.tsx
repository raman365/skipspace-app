import React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { BottomSheet, ListItem } from '@rneui/themed';

import { COLORS, FONTSIZES } from '../../../constants/theme';
import ScreenTitle from '../ScreenTitle';
import QREncoder from '../QREncoder';
import StandardButton from '../Button/StandardBtn';
import Subtitle from '../Subtitle';

interface IVoucherSheetProps {
	isVisible: boolean;
	onCancelPress: () => void;
	// qrCode: React.ReactElement;
	// skipCompanyName: string
	// skipCompanyAddress: string
	// mapLink: string
	// expiryDate: Date | string
}

const VoucherSheet: React.FC<IVoucherSheetProps> = ({
	isVisible = false,
	onCancelPress,
}) => {
	const stringExample = 'test - this is a test a test this is';
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
					<Subtitle textColor={COLORS.softRed} subtitle={'12:10:00'} />
				</View>

				<View>
					<View
						style={{
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<QREncoder codeValue={stringExample} />
					</View>

					<View
						style={{
							paddingTop: 20,
							paddingHorizontal: 30,
							flexDirection: 'row',
							justifyContent: 'center',
						}}
					>
						<Subtitle subtitle={'Name: '} />
						<Text>Example name</Text>
					</View>
					<View
						style={{
							paddingTop: 20,
							paddingHorizontal: 30,
							flexDirection: 'row',
							justifyContent: 'center',
						}}
					>
						<Subtitle subtitle={'Address: '} />
						{/* <Text style={{ fontWeight: 'bold' }}>Address: </Text> */}
						<Text>123 Wer asda fdf gfgf </Text>
					</View>
					<View>
						<Text
							style={{
								textAlign: 'center',
								paddingVertical: 10,
								textDecorationLine: 'underline',
							}}
						>
							View on maps
						</Text>
					</View>
				</View>

				<View style={{ paddingVertical: 15, paddingHorizontal: 30 }}>
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
						<ListItem style={{ backgroundColor: COLORS.white }}>
							<ListItem.Content>
								<ListItem.Title style={styles.listItemTitle}>
									1. Go to your SkipSpace site.
								</ListItem.Title>
								<ListItem.Title style={styles.listItemTitle}>
									2. Show this QR code to the security staff when you arrive.
								</ListItem.Title>
								<ListItem.Title style={styles.listItemTitle}>
									3. This QR code will expire in 24 hours.
								</ListItem.Title>
							</ListItem.Content>
						</ListItem>
					</View>
				</View>

				<View style={{ paddingBottom: 30, paddingHorizontal: 30 }}>
					<StandardButton
						bgGreen
						fontBlue
						buttonLabel={'Back to Vouchers'}
						onPress={onCancelPress}
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

import React, { useEffect, useState } from 'react';

import {
	Linking,
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { BottomSheet } from '@rneui/themed';

import { COLORS } from '../../../constants/theme';
import ScreenTitle from '../ScreenTitle';
import Subtitle from '../Subtitle';
import SmlStandardBtn from '../Button/SmallStandardBtn';
import ClearBtn from '../Button/ClearBtn';
import QRCoder from '../QRCoder';
import { encryptData } from '../../utils/encryptDecrypt';
import * as Location from 'expo-location';

interface IVoucherSheetProps {
	isShown: boolean;
	onCancelPress: () => void;
	onHelpPress: () => void;
	userName: any;
	skipCompanyName: string;
	skipCompanyAddress: string;
	localAuthIssue: string;
	// dateIssued: string | Date;
	dateIssued: string; //TODO change
	dateExpires?: string; // TODO change
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
	dateExpires,
}) => {
	// TODO : Work with date string on voucher
	// TODO: Maps link on bottom sheeet voucher
	////   Date issued: ${new Date()}
	// const now = dayjs();
	// const dataInQRCode = `\n
	// 					  Date issued: ${dateIssued}
	// 					  Date expires: ${dateExpires}
	// 					  Person Details: ${userName}
	// 					  Local Authority Issue: ${localAuthIssue}
	// 					  Skip Company Name: ${skipCompanyName}
	// 					  Skip Company Address: ${skipCompanyAddress}
	//  `;

	// const [isVisible, setIsVisible] = useState(false)
	// console.log(dayjs(dateIssued));

	// const dataInQRCode = `\n Date issued: ${dateIssued} \n Expiry date: ${dateExpires} \nPerson Details: ${userName} \n Local Authority Issue: ${localAuthIssue} \nSkip Company Name: ${skipCompanyName} \n Skip Company Address:\n${skipCompanyAddress}`;
	const voucherData = {
		date_time_issued: dateIssued,
		user_name: userName,
		local_auth_issue: localAuthIssue,
		skip_company_name: skipCompanyName,
		skip_company_address: skipCompanyAddress,
		voucher_used: false,
	};

	const jsonString = JSON.stringify(voucherData);

	const secretKey = 'theSecretKey';
	// const dataToEncode = dataInQRCode;

	// const encData = encryptData(dataToEncode, secretKey);

	const [coordinates, setCoordinates] = useState<{
		latitude: number;
		longitude: number;
	} | null>(null);

	const handleOpenMaps = () => {
		console.log('handlemaps: ', coordinates);

		if (coordinates) {
			const url: any = Platform.select({
				ios: `maps://app?daddr=${coordinates.latitude},${coordinates.longitude}&dirflg=d`,
				android: `google.navigation:q=${coordinates.latitude},${coordinates.longitude}&mode=d`,
			});
			Linking.openURL(url);
		} else {
			console.error('Location is not available');
		}
	};

	const [skipLocation, setSkipLocation] = useState(skipCompanyAddress);

	useEffect(() => {
		setSkipLocation(skipCompanyAddress);

		const getCoordinates = async () => {
			try {
				const locationData = await Location.geocodeAsync(skipLocation);
				if (locationData && locationData.length > 0) {
					setCoordinates({
						latitude: locationData[0].latitude,
						longitude: locationData[0].longitude,
					});
				} else {
					//TODO: ERROR HANDLING
					console.error('No coordinates found for the given address');
				}
			} catch (error) {
				console.error('Error fetching coordinates', error);
			}
		};
		getCoordinates();
	}, [skipLocation]);
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

				<View>
					<View
						style={{
							justifyContent: 'center',
							alignItems: 'center',
							padding: 20,
						}}
					>
						{/* <QRCoder data={encData} /> */}
						{/* <QRCoder data={encData} /> */}
						<QRCoder data={jsonString} />
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
							<TouchableOpacity onPress={handleOpenMaps}>
								<Text
									style={{
										textAlign: 'center',
										paddingVertical: 10,
										textDecorationLine: 'underline',
										fontWeight: 'bold',
									}}
								>
									Open in maps
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>

				<View style={{ paddingBottom: 10, paddingHorizontal: 30 }}>
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

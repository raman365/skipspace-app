import React, { useEffect, useState } from 'react';

import {
	Alert,
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
import { encryptDataFunc } from '../../utils/encryptDecrypt';
import { EXPO_PUBLIC_SECRET_KEY } from '@env';
import * as Location from 'expo-location';

interface IVoucherSheetProps {
	isShown: boolean;
	onCancelPress: () => void;
	onHelpPress: () => void;
	userName: any;
	skipCompanyAddress: string;
	localAuthIssue: string;
	dateIssued: string;
	dateExpires?: string;
}

const VoucherSheet: React.FC<IVoucherSheetProps> = ({
	isShown = false,
	onCancelPress,
	onHelpPress,
	skipCompanyAddress,
	userName,
	localAuthIssue,
	dateIssued,
}) => {
	const voucherData = {
		date_time_issued: dateIssued,
		user_name: userName,
		local_auth_issue: localAuthIssue,
		skip_company_address: skipCompanyAddress,
		voucher_used: false,
	};

	const jsonString = JSON.stringify(voucherData);

	const encData = encryptDataFunc(jsonString, EXPO_PUBLIC_SECRET_KEY);

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

	// const [skipLocation, setSkipLocation] = useState(skipCompanyAddress);
	const [skipLocation, setSkipLocation] = useState(
		voucherData.skip_company_address
	);

	console.log('Skip company add: ', skipCompanyAddress);
	console.log('json: ', jsonString);

	useEffect(() => {
		setSkipLocation(voucherData.skip_company_address);

		const getCoordinates = async () => {
			try {
				const locationData = await Location.geocodeAsync(skipLocation);
				if (locationData && locationData.length > 0) {
					setCoordinates({
						latitude: locationData[0].latitude,
						longitude: locationData[0].longitude,
					});
				} else {
					console.error('No coordinates found for the given address');
					Alert.alert('No coordinates found for the given address');
				}
			} catch (error: any) {
				console.error('Error fetching coordinates', error);
				Alert.alert('Error fetching coordinates', error);
			}
		};
		getCoordinates();
	}, [skipLocation]);
	return (
		<BottomSheet isVisible={isShown} onBackdropPress={onCancelPress}>
			<View style={styles.mainContainer}>
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
								paddingTop: 10,
								paddingHorizontal: 30,
								flexDirection: 'column',
								justifyContent: 'center',
							}}
						></View>
						<View
							style={{
								paddingTop: 10,
								paddingHorizontal: 30,
								flexDirection: 'column',
								justifyContent: 'center',
							}}
						>
							<Subtitle subtitle={'Address: '} />
							{/* <Text style={{ textAlign: 'center' }}>{skipCompanyAddress}</Text> */}
							<Text style={{ textAlign: 'center' }}>{skipLocation}</Text>
						</View>
						<View style={{ paddingVertical: 20 }}>
							<TouchableOpacity onPress={handleOpenMaps}>
								<Text
									style={{
										paddingVertical: 5,
										backgroundColor: COLORS.alpha.bgBlue,
										borderRadius: 25,
										marginHorizontal: 25,
										textAlign: 'center',
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

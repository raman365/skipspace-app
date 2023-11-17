import React, { useEffect, useState } from 'react';
import {
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { BottomSheet, Icon } from '@rneui/themed';
import { COLORS, FONTSIZES } from '../../../constants/theme';
import StandardButton from '../Button/StandardBtn';
import { windowHeight } from '../../utils/dimensions';
import MapLink from '../MapLink';
import * as Linking from 'expo-linking';

import {
	getCoordinatesFromAddress,
	Coordinates,
} from '../../utils/geoCodeHelper';

interface ISkipOptionsSheetProps {
	isVisible: boolean;
	onCancelPress: () => void;
	onVoucherPress: () => void;
	councilName?: string;
	skipCompany?: string;
	skipCompanyAddress?: string;
	// qrCode: React.ReactElement;
	// skipCompanyName: string
	// skipCompanyAddress: string
	// mapLink: string
	// expiryDate: Date | string
}

const SkipOptionsSheet: React.FC<ISkipOptionsSheetProps> = ({
	isVisible = false,
	onCancelPress,
	onVoucherPress,
	councilName,
	skipCompany,
	skipCompanyAddress,
}) => {
	const [long, setlong] = useState<Number>();
	const [lat, setlat] = useState<Number>();

	let skipLong: number;
	let skipLat: number;
	const url: any = Platform.select({
		ios: `maps:0,0?q=${skipCompanyAddress}`,
		android: `geo:0,0?q=${skipCompanyAddress}`,
	});
	const fetchCoordindates = async (skipCompanyAddress: any) => {
		const coordinates: Coordinates | null = await getCoordinatesFromAddress(
			skipCompanyAddress
		);

		if (coordinates) {
			console.log(
				`Latitude: ${coordinates.latitude}, Longitude: ${coordinates.longitude}`
			);
			// console.warn(typeof `${coordinates.latitude}`);

			skipLong = coordinates.longitude;
			skipLat = coordinates.longitude;
			// setlat(coordinates.latitude);
			// setlong(coordinates.longitude);

			console.log(`Lat: ${skipLat} | Long: ${skipLong} `);

			//https://www.google.com/maps/@51.5707162,-0.1186661,17z?entry=ttu

			// You can use the coordinates to display a marker on the map or perform other actions.
		}
	};
	useEffect(() => {
		// 	const fetchCoordindates = async (skipCompanyAddress: any) => {
		// 		const coordinates: Coordinates | null = await getCoordinatesFromAddress(
		// 			skipCompanyAddress
		// 		);

		// 		if (coordinates) {
		// 			console.log(
		// 				`Latitude: ${coordinates.latitude}, Longitude: ${coordinates.longitude}`
		// 			);
		// 			// You can use the coordinates to display a marker on the map or perform other actions.
		// 		}
		// 	};
		fetchCoordindates(skipCompanyAddress);
	}, []);
	return (
		<BottomSheet
			isVisible={isVisible}
			onBackdropPress={onCancelPress}
			modalProps={{}}
			containerStyle={{
				backgroundColor: COLORS.white,
				flex: 1,
				justifyContent: 'space-between',
			}}
		>
			<View style={{ marginVertical: 20 }}>
				<View style={styles.top}>
					{/* <ScreenTitle title={`Results from ${councilName}`} /> */}

					<View
						style={{
							paddingVertical: 20,
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'center',
							// justifyContent: 'center',
							alignContent: 'space-between',
						}}
					>
						<TouchableOpacity onPress={onCancelPress} style={{ padding: 5 }}>
							<Icon
								name='arrow-left'
								type='feather'
								color={COLORS.bgBlue}
								size={40}
							/>
						</TouchableOpacity>
						{/* <View style={{ paddingHorizontal: 5, width: 50 }}></View> */}
						<Text
							style={{
								textAlign: 'center',
								fontFamily: 'Tungsten_SemiBold',
								color: COLORS.bgBlue,
								fontSize: FONTSIZES['5xl'],
							}}
						>
							Selected SkipSpace
						</Text>
					</View>

					<View style={{ borderColor: COLORS.bgGreen, borderWidth: 2 }} />
				</View>
				<View style={{ padding: 20, marginBottom: 50 }}>
					<View style={styles.middle}>
						<View style={{ marginVertical: 10 }}>
							<Text
								style={{
									fontWeight: 'bold',
									fontSize: FONTSIZES.xl,
									paddingVertical: 5,
								}}
							>
								Borough:{' '}
							</Text>

							<Text style={{ fontSize: FONTSIZES.xl }}>{councilName}</Text>
						</View>
						<View style={{ marginVertical: 10 }}>
							<Text
								style={{
									fontWeight: 'bold',
									fontSize: FONTSIZES.xl,
									paddingVertical: 5,
								}}
							>
								Name of Skip company:{' '}
							</Text>
							{/* <Text>{skipCompany}</Text> */}
							<Text style={{ fontSize: FONTSIZES.xl }}>{skipCompany}</Text>
						</View>

						<View style={{ marginVertical: 10 }}>
							<Text
								style={{
									fontWeight: 'bold',
									fontSize: FONTSIZES.xl,
									paddingVertical: 5,
								}}
							>
								Address:{' '}
							</Text>
							<Text style={{ fontSize: FONTSIZES.xl }}>
								{skipCompanyAddress}
							</Text>
						</View>

						<View style={{ paddingVertical: 10 }}>
							{/* convert google map link to component */}
							{/* <Text
								style={{
									textDecorationLine: 'underline',
									textAlign: 'center',
									fontSize: FONTSIZES.xl,
									fontWeight: 'bold',
									color: COLORS.bgBlue,
								}}
							>
								View on Maps
							</Text> */}
							{/* <MapLink 
								label='View on maps'
								address={skipCompanyAddress}
							 /> */}

							{/* https://www.google.com/maps/@51.5707162,-0.1186661,17z?entry=ttu */}
							{/* `http://maps.google.com/?q=100+Main+Street+Buffalo+NY */}

							<TouchableOpacity
								onPress={() =>
									Linking.openURL(
										`https://maps.google.com/maps/@${skipLong},${skipLat},17z`
									)
								}
							>
								<Text style={{ textAlign: 'center' }}>Open something</Text>
							</TouchableOpacity>
						</View>
					</View>
					<View style={styles.bottom}>
						<View
							style={{
								borderColor: COLORS.bgBlue,
								borderWidth: 2,
								padding: 20,
							}}
						>
							<Text style={{ textAlign: 'center', fontSize: FONTSIZES.large }}>
								After confirming you'll receive a one-time voucher to use at
								your selected SkipSpace site.
							</Text>
						</View>

						<View style={{ paddingTop: 20 }}>
							<StandardButton
								buttonLabel={'Confirm Voucher'}
								onPress={onVoucherPress}
								bgGreen
								fontBlue={false}
							/>
						</View>
					</View>
				</View>

				{/* <View style={{ paddingTop: 10, paddingBottom: 10 }}> */}

				{/* <View style={styles.mainContainer}>
				<View style={{ paddingTop: 10, paddingBottom: 10 }}>
					<ScreenTitle title={`Results from ${councilName}`} />
				</View>

				<View style={{ paddingBottom: 30, paddingHorizontal: 30 }}>
					<StandardButton
						bgGreen
						fontBlue
						buttonLabel={'Back'}
						onPress={onCancelPress}
					/>
				</View>
			</View> */}
			</View>
		</BottomSheet>
	);
};

export default SkipOptionsSheet;

const styles = StyleSheet.create({
	mainContainer: {
		backgroundColor: COLORS.white,
		padding: 30,
		flex: 1,
		justifyContent: 'space-between',
		margin: 10,
	},
	container: {
		flex: 1,
		justifyContent: 'space-between',
		backgroundColor: '#fff',
		padding: 20,
		margin: 10,
	},
	top: {
		// flex: 0.3,
		height: windowHeight / 5,
		paddingVertical: 30,
	},

	middle: {
		// flex: 0.3,
		height: windowHeight / 3,
		margin: 10,
	},

	bottom: {
		flex: 0.3,
		height: windowHeight / 3,
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
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

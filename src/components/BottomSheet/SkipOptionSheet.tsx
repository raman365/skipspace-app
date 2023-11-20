import React, { useEffect, useState } from 'react';
import {
	ActivityIndicator,
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
import * as Linking from 'expo-linking';
import * as Location from 'expo-location';

import {
	getCoordinatesFromAddress,
	Coordinates,
} from '../../utils/geoCodeHelper';
import GetLocation from '../GetLocation';
import MapView, { Marker } from 'react-native-maps';

interface ISkipOptionsSheetProps {
	isVisible: boolean;
	onCancelPress: () => void;
	onVoucherPress: () => void;
	councilName?: string;
	skipCompany?: string;
	skipCompanyAddress?: string | any; // TODO: change type
}

const SkipOptionsSheet: React.FC<ISkipOptionsSheetProps> = ({
	isVisible = false,
	onCancelPress,
	onVoucherPress,
	councilName,
	skipCompany,
	skipCompanyAddress,
}) => {
	// TODO Remove 'any' type
	const [location, setLocation] = useState<any>({});
	const [longitude, setLongitude] = useState<any>(null);
	const [latitude, setLatitude] = useState<any>(null);

	useEffect(() => {
		(async () => {
			try {
				console.log('Add: ', skipCompanyAddress);
				const geocode = await Location.geocodeAsync(skipCompanyAddress);

				if (geocode.length > 0) {
					console.log('Geocode is: ', geocode);
					// setLocation(geocode[0].location);
					setLongitude(geocode[0].longitude);
					setLatitude(geocode[0].latitude);

					// console.log(location);
					// console.log(latitude);
					// console.log(longitude);
				} else {
					console.error('Invalid address');
				}
			} catch (error) {
				console.error('Error getting location: ', error);
			}
		})();
	}, [skipCompanyAddress]);

	const handleOpenMaps = () => {
		// const { latitude, longitude } = location;
		// setLocation(latitude,longitude)
		console.log('location: ', latitude);

		if (latitude && longitude) {
			const url: any = Platform.select({
				ios: `maps://app?daddr${latitude},${longitude}&dirflg=d`,
				android: `google.navigation:q=${latitude},${longitude}&mode`,
			});
			console.log('url: ', url);
			Linking.openURL(url);
		} else {
			console.error('Location is not available');
		}
	};
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
					<View
						style={{
							paddingVertical: 20,
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'center',
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
						<View style={{ height: 100 }}>
							{longitude && latitude ? (
								<MapView
									style={styles.map}
									initialRegion={{
										latitude: latitude,
										longitude: longitude,
										latitudeDelta: 0.0922,
										longitudeDelta: 0.0421,
									}}
									minZoomLevel={15}
									maxZoomLevel={20}
								>
									<Marker coordinate={{ latitude, longitude }} />
								</MapView>
							) : (
								<Text>
									<ActivityIndicator size={'small'} color={COLORS.bgGreen} />
								</Text>
							)}
						</View>

						<View style={{ paddingVertical: 10 }}>
							<TouchableOpacity onPress={handleOpenMaps}>
								<Text>Open in Maps</Text>
							</TouchableOpacity>
						</View>
					</View>
					<View style={styles.bottom}></View>

					<View style={{ paddingTop: 20 }}>
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
						<StandardButton
							buttonLabel={'Confirm Voucher'}
							onPress={onVoucherPress}
							bgGreen
							fontBlue={false}
						/>
					</View>
				</View>
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
		// height: windowHeight / 5,
		paddingVertical: 30,
	},
	map: {
		height: 150,
		width: '100%',
	},

	middle: {
		// flex: 0.3,
		// height: windowHeight / 3,
		margin: 10,
	},

	bottom: {
		flex: 0.3,
		// height: windowHeight / 3,
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

import {
	View,
	StyleSheet,
	ActivityIndicator,
	TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS, FONTSIZES } from '../../../constants/theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HeaderComponent from '../../components/Header';
import { Button, Icon, Text } from '@rneui/themed';
import * as Location from 'expo-location';
import MapView, { Marker, Region } from 'react-native-maps';
import { useFocusEffect } from '@react-navigation/native';

const SelectedSkipSpace = ({ route, navigation }: any) => {
	const { councilName, skipCompany, skipCompanyAddress } = route.params;
	const { mainItemId } = route.params || {}; // Use default empty object if params is undefined

	// const {  council_name } = route.params as {
	// 	mainItemId: string;
	// 	council_name: string;
	// };

	const [skipLocation, setSkipLocation] = useState(skipCompanyAddress);
	const [coordinates, setCoordinates] = useState<{
		latitude: number;
		longitude: number;
	} | null>(null);

	const [region, setRegion] = useState<Region | undefined>(undefined);

	console.log('Onload: ', skipCompanyAddress);
	console.log('Coords: ', coordinates);

	useEffect(() => {
		setSkipLocation(skipCompanyAddress);
	}, [skipCompanyAddress]);

	// update the region when he coordinates change
	useEffect(() => {
		if (coordinates) {
			setRegion({
				latitude: coordinates.latitude,
				longitude: coordinates.longitude,
				latitudeDelta: 0.0922,
				longitudeDelta: 0.0421,
			});
		}
	}, [coordinates]);

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

	// useEffect(() => {
	// 	// onload update map
	// 	// (async () => {
	// 	// 	try {
	// 	// 		const geocode = await Location.geocodeAsync(skipCompanyAddress);

	// 	// 		if (geocode.length > 0) {
	// 	// 			setLongitude(geocode[0].longitude);
	// 	// 			setLatitude(geocode[0].latitude);

	// 	// 			console.log('lng: ', longitude);
	// 	// 			console.log('lat: ', latitude);
	// 	// 		} else {
	// 	// 			//TODO:  Convert to alert
	// 	// 			console.error('Invalid address');
	// 	// 		}
	// 	// 	} catch (error) {
	// 	// 		//TODO:  Convert to alert
	// 	// 		console.error('Error getting location: ', error);
	// 	// 	}
	// 	// })();

	// 	console.log('SCA', skipCompanyAddress);

	// 	setSkipLocation(skipCompanyAddress);

	// 	const updateMapLocation = async () => {
	// 		try {
	// 			const geocode = await Location.geocodeAsync(skipLocation);

	// 			if (geocode.length > 0) {
	// 				setLongitude(geocode[0].longitude);
	// 				setLatitude(geocode[0].latitude);
	// 			} else {
	// 				console.error('invalid address');
	// 			}
	// 		} catch (error: any) {
	// 			console.error('Error getting location');
	// 		}
	// 	};
	// 	updateMapLocation();
	// }, [skipLocation]);
	// }, []);

	const handleConfirmVoucher = () => {
		navigation.navigate('voucherConfirmation', {
			localAuth: councilName,
			skipCompanyName: skipCompany,
			skipCompanyAddress: skipCompanyAddress,
		});
	};

	// TODO
	const handleOpenMaps = () => {
		console.log('handlemaps');
	};

	return (
		<SafeAreaProvider>
			<HeaderComponent
				authorised={true}
				icon={
					<Icon
						name='arrow-left'
						type='feather'
						color={COLORS.bgGreen}
						size={40}
					/>
				}
				onPress={() => {
					navigation.goBack();
				}}
			/>

			<View style={{ paddingTop: 20, paddingBottom: 15 }}>
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
					Selected SkipSpace
				</Text>
			</View>

			<View style={styles.centerContainer}>
				<View style={{ alignContent: 'center', paddingBottom: 10 }}>
					<Text
						h4
						h4Style={{
							fontWeight: '600',
							color: COLORS.bgBlue,
							fontFamily: 'Tungsten_SemiBold',
							letterSpacing: 0.3,
							textAlign: 'center',
						}}
					>
						Council:
					</Text>
					<Text style={{ fontSize: FONTSIZES.xl, textAlign: 'center' }}>
						{councilName}
					</Text>
				</View>
				<View style={{ alignContent: 'center', paddingVertical: 20 }}>
					<Text
						h4
						h4Style={{
							fontWeight: '600',
							color: COLORS.bgBlue,
							fontFamily: 'Tungsten_SemiBold',
							paddingBottom: 2,
							letterSpacing: 0.3,
							textAlign: 'center',
						}}
					>
						Skip company:
					</Text>
					<Text style={{ fontSize: FONTSIZES.xl, textAlign: 'center' }}>
						{skipCompany}
					</Text>
				</View>
				<View style={{ paddingTop: 20, paddingBottom: 20 }}>
					<Text
						h4
						h4Style={{
							fontWeight: '600',
							color: COLORS.bgBlue,
							fontFamily: 'Tungsten_SemiBold',
							paddingBottom: 2,
							letterSpacing: 0.3,
							textAlign: 'center',
						}}
					>
						Site Address:
					</Text>
					<Text style={{ fontSize: FONTSIZES.xl, textAlign: 'center' }}>
						{skipCompanyAddress}
					</Text>
				</View>

				<View style={{ height: 100, marginBottom: 10 }}>
					{/* TODO: on screen load open reload map */}

					{coordinates ? (
						<MapView
							style={styles.map}
							region={region}
							minZoomLevel={15}
							maxZoomLevel={20}
							// initialRegion={{
							// 	latitude: coordinates!.latitude,
							// 	longitude: coordinates!.longitude,
							// 	latitudeDelta: 0.0922,
							// 	longitudeDelta: 0.0421,
							// }}
						>
							<Marker
								coordinate={{
									latitude: coordinates!.latitude,
									longitude: coordinates!.longitude,
								}}
							/>
						</MapView>
					) : (
						<View
							style={{ justifyContent: 'center', height: 100, width: '100%' }}
						>
							<ActivityIndicator size={'small'} color={COLORS.bgGreen} />
						</View>
					)}
					<TouchableOpacity
						style={{ paddingVertical: 10 }}
						onPress={handleOpenMaps}
					>
						<Text
							style={{
								fontSize: FONTSIZES.ml,
								textAlign: 'center',
								fontWeight: 'bold',
							}}
						>
							Open in Maps
						</Text>
					</TouchableOpacity>
				</View>
			</View>
			<View style={{ paddingVertical: 40, paddingHorizontal: 30 }}>
				<View
					style={{
						paddingVertical: 10,
						paddingHorizontal: 10,
						borderColor: COLORS.bgBlue,
						borderWidth: 1,
						marginTop: 10,
						marginBottom: 30,
					}}
				>
					<Text style={{ textAlign: 'center', fontWeight: '400' }}>
						After confirmation, you'll receive a one-time voucher to use at your
						selected SkipSpace site.
					</Text>
				</View>
				<Button
					title='Confirm Voucher'
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
					onPress={handleConfirmVoucher}
				/>
			</View>
		</SafeAreaProvider>
	);
};

const styles = StyleSheet.create({
	map: {
		borderColor: COLORS.lightGrey,
		// flex: 1,
		borderWidth: 1,
		height: 150,
		width: '100%',
	},
	centerContainer: {
		paddingHorizontal: 30,
		paddingBottom: 40,
		display: 'flex',
		justifyContent: 'center',
		flex: 1,
	},
});

export default SelectedSkipSpace;

import {
	View,
	StyleSheet,
	ActivityIndicator,
	Pressable,
	Platform,
	Linking,
	Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS, FONTSIZES } from '../../../constants/theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HeaderComponent from '../../components/Header';
import { Button, Icon, Text } from '@rneui/themed';
import * as Location from 'expo-location';
import MapView, { Marker, Region } from 'react-native-maps';

const SelectedSkipSpace = ({ route, navigation }: any) => {
	const { councilName, skipCompany, skipCompanyAddress } = route.params;
	// const { mainItemId } = route.params || {};

	const [skipLocation, setSkipLocation] = useState(skipCompanyAddress);
	const [coordinates, setCoordinates] = useState<{
		latitude: number;
		longitude: number;
	} | null>(null);

	const [region, setRegion] = useState<Region | undefined>(undefined);

	useEffect(() => {
		setSkipLocation(skipCompanyAddress);
	}, [skipCompanyAddress]);

	useEffect(() => {
		if (coordinates && coordinates.latitude && coordinates.longitude) {
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
					console.error('No coordinates found for the given address');
					Alert.alert('No coordinates found for the given address');
				}
			} catch (error) {
				console.error('Error fetching coordinates', error);
			}
		};
		getCoordinates();
	}, [skipLocation]);

	const handleConfirmVoucher = () => {
		navigation.navigate('voucherConfirmation', {
			localAuth: councilName,
			skipCompanyAddress: skipCompanyAddress,
		});
	};

	const handleOpenMaps = () => {
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

	return (
		<SafeAreaProvider>
			<HeaderComponent
				authorised={true}
				icon={
					<Icon
						style={{ marginRight: 30 }}
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

			<View style={{ paddingTop: 30, paddingBottom: 15 }}>
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

			<View style={{ paddingHorizontal: 30, flex: 1 }}>
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

				<View style={{ height: 100, paddingTop: 10 }}>
					{coordinates ? (
						<MapView
							style={styles.map}
							region={region}
							minZoomLevel={15}
							maxZoomLevel={20}
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
				</View>
			</View>

			<View style={{ paddingBottom: 40, paddingHorizontal: 30 }}>
				<Pressable style={{ paddingVertical: 5 }} onPress={handleOpenMaps}>
					<Text
						style={{
							fontSize: FONTSIZES.ml,
							textAlign: 'center',
							fontWeight: 'bold',
						}}
					>
						Open in Maps
					</Text>
				</Pressable>

				<View
					style={{
						paddingVertical: 10,
						paddingHorizontal: 10,
						borderColor: COLORS.bgBlue,
						borderWidth: 1,
						marginTop: 10,
						// paddingTop: 20,
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
		height: 200,
		width: '100%',
		// marginVertical: 20,
	},
	centerContainer: {
		paddingBottom: 40,

		flex: 1,
	},
});

export default SelectedSkipSpace;

import {
	View,
	StyleSheet,
	Linking,
	Platform,
	ActivityIndicator,
	TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS, FONTSIZES } from '../../../constants/theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HeaderComponent from '../../components/Header';
import { Button, Icon, Text } from '@rneui/themed';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

const SelectedSkipSpace = ({ route, navigation }: any) => {
	const { councilName, skipCompany, skipCompanyAddress } = route.params;
	const [longitude, setLongitude] = useState<any>(null);
	const [latitude, setLatitude] = useState<any>(null);

	useEffect(() => {
		(async () => {
			try {
				// console.log('Add: ', skipCompanyAddress);
				// console.log('sds');
				const geocode = await Location.geocodeAsync(skipCompanyAddress);

				if (geocode.length > 0) {
					setLongitude(geocode[0].longitude);
					setLatitude(geocode[0].latitude);
				} else {
					//TODO:  Convert to alert
					console.error('Invalid address');
				}
			} catch (error) {
				//TODO:  Convert to alert
				console.error('Error getting location: ', error);
			}
		})();
	}, [skipCompanyAddress]);

	const handleConfirmVoucher = () => {
		navigation.navigate('voucherConfirmation', {
			localAuth: councilName,
			skipCompanyName: skipCompany,
			skipCompanyAddress: skipCompanyAddress,
		});
	};
	const handleOpenMaps = () => {
		if (latitude && longitude) {
			const url: any = Platform.select({
				ios: `maps://app?daddr${latitude},${longitude}&dirflg=d`,
				android: `google.navigation:q=${latitude},${longitude}&mode`,
			});
			Linking.openURL(url);
		} else {
			//TODO:  Sort this out
			console.error('Location is not available');
		}
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
					navigation.navigate('searchSelectCouncil');
				}}
			/>

			<View style={{ paddingTop: 30 }}>
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
				<View style={{ alignContent: 'center', paddingVertical: 10 }}>
					<Text
						h4
						h4Style={{
							fontWeight: '600',
							color: COLORS.bgBlue,
							fontFamily: 'Tungsten_SemiBold',
						}}
					>
						Local Authority:
					</Text>
					<Text style={{ fontSize: FONTSIZES.xxl }}>{councilName}</Text>
				</View>
				<View style={{ alignContent: 'center', paddingVertical: 10 }}>
					<Text
						h4
						h4Style={{
							fontWeight: '600',
							color: COLORS.bgBlue,
							fontFamily: 'Tungsten_SemiBold',
							paddingBottom: 2,
						}}
					>
						Skip company:
					</Text>
					<Text style={{ fontSize: FONTSIZES.xxl }}>{skipCompany}</Text>
				</View>
				<View style={{ paddingBottom: 30 }}>
					<Text
						h4
						h4Style={{
							fontWeight: '600',
							color: COLORS.bgBlue,
							fontFamily: 'Tungsten_SemiBold',
							paddingBottom: 2,
						}}
					>
						Address:
					</Text>
					<Text style={{ fontSize: FONTSIZES.xl }}>{skipCompanyAddress}</Text>
				</View>
				{/* <View>
					<Text
						style={{
							fontSize: 18,
							fontWeight: '700',
							color: COLORS.bgBlue,
							textAlign: 'center',
							textDecorationLine: 'underline',
							fontFamily: 'Open_Sans_SemiCond_Reg',
						}}
					>
						View on Maps
					</Text>
				</View> */}
				<View style={{ height: 100, marginBottom: 10 }}>
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
						marginBottom: 20,
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
		borderWidth: 1,
		height: 150,
		width: '100%',
	},
	centerContainer: {
		// paddingTop: 10,
		paddingHorizontal: 30,
		paddingBottom: 40,
		display: 'flex',
		justifyContent: 'center',
		flex: 1,
	},
});

export default SelectedSkipSpace;

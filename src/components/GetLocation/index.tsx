import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Linking, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const GetLocation: React.FC<{ address: string }> = ({ address }) => {
	const [location, setLocation] = useState<any>(null);
	const [longitude, setLongitude] = useState<any>(null);
	const [latitude, setLatitude] = useState<any>(null);

	useEffect(() => {
		(async () => {
			try {
				const geocode = await Location.geocodeAsync(address);

				if (geocode.length > 0) {
					setLongitude(geocode[0].longitude);
					setLatitude(geocode[0].latitude);

					console.log(location);
				} else {
					console.error('Invalid address');
				}
			} catch (error) {
				console.error('Error getting location: ', error);
			}
		})();
	}, [address]);

	const handleOpenMaps = () => {
		if (location) {
			const { latitude, longitude } = location;
			const url: any = Platform.select({
				ios: `maps://app?daddr${latitude},${longitude}&dirflg=d`,
				android: `google.navigation:q=${latitude},${longitude}&mode`,
			});
			Linking.openURL(url);
		} else {
			console.error('Location is not available');
		}
	};
	return (
		<View>
			{location ? (
				<MapView
					initialRegion={{
						latitude: latitude,
						longitude: longitude,
						latitudeDelta: 0.09922,
						longitudeDelta: 0.0421,
					}}
				>
					<Marker coordinate={location} />
				</MapView>
			) : (
				<Text>...Loading</Text>
			)}

			<TouchableOpacity onPress={handleOpenMaps}>
				<Text>Open in Maps</Text>
			</TouchableOpacity>
		</View>
	);
};

export default GetLocation;

import { View, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS } from '../../../constants/theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HeaderComponent from '../../components/Header';
import { Icon } from '@rneui/themed';
import { DrawerActions } from '@react-navigation/native';
import StandardButton from '../../components/Button/StandardBtn';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import * as Location from 'expo-location';

const SignedInDashboard = ({ navigation }: any) => {
	const handleToggle = () => {
		navigation.dispatch(DrawerActions.toggleDrawer());
	};
	const handleGoSearch = () => {
		navigation.navigate('searchSelectCouncil');
	};
	const handleGoVouchers = () => {
		navigation.navigate('vouchers');
	};

	const [location, setLocation] = useState<Object>('');
	const [errorMsg, setErrorMsg] = useState<String>('');

	const getLocationPermissions = async () => {
		let { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== 'granted') {
			setErrorMsg(
				'Permission to access location was denied, your lcoation is needed ...'
			);
			return;
		}

		let currentLocation = await Location.getCurrentPositionAsync({});
		setLocation(currentLocation);
		console.log('Current location', currentLocation);
	};

	useEffect(() => {
		getLocationPermissions();
	}, []);

	return (
		<SafeAreaProvider>
			<HeaderComponent
				authorised={true}
				icon={
					<Icon name='menu' type='feather' color={COLORS.bgGreen} size={30} />
				}
				onPress={handleToggle}
			/>

			<View>
				<View>
					<MapView
						provider={PROVIDER_GOOGLE}
						style={styles.map}
						// onRegionChange={onRegionChange}
						initialRegion={{
							latitude: 51.76965576470866,
							latitudeDelta: 14.44648580599754,
							longitude: -4.374094986649737,
							longitudeDelta: 11.222589999999997,
						}}
					/>
				</View>
				<View style={styles.dashboardBottom}>
					<StandardButton
						bgGreen
						fontBlue
						buttonLabel={'Search for SkipSpace'}
						onPress={handleGoSearch}
					/>
					<StandardButton
						bgGreen
						fontBlue
						buttonLabel={'View Vouchers'}
						onPress={handleGoVouchers}
					/>
				</View>
			</View>
		</SafeAreaProvider>
	);
};

const styles = StyleSheet.create({
	map: {
		height: '100%',
		width: '100%',
	},
	dashboardBottom: {
		height: 350,
		width: '100%',
		backgroundColor: COLORS.bgBlue,
		position: 'absolute',
		bottom: 0,
		left: 0,
		paddingTop: 10,
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
	},
});

export default SignedInDashboard;

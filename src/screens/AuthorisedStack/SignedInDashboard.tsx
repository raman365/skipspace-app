import { View, StyleSheet } from 'react-native';
import React from 'react';
import { COLORS } from '../../../constants/theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HeaderComponent from '../../components/Header';
import { Icon } from '@rneui/themed';
import { DrawerActions } from '@react-navigation/native';
import StandardButton from '../../components/Button/StandardBtn';
import MapView from 'react-native-maps';

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
					<MapView style={styles.map} />
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

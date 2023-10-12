import { View, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { COLORS, FONTSIZES } from '../../../constants/theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HeaderComponent from '../../components/Header';
import MapView from 'react-native-maps';

import { Button, Icon, Text, ListItem } from '@rneui/themed';
import QREncoder from '../../components/QREncoder';
import ScreenTitle from '../../components/ScreenTitle';
import VoucherItem from '../../components/VoucherItem';
import VoucherSheet from '../../components/BottomSheet';

const Vouchers = ({ navigation }: any) => {
	const [isVisible, setIsVisible] = useState(false);

	const stringExample =
		'Location Name: Skips are us | Address: 123 Fake Lane, E17 123. This is an example of a QR code';

	const handleVoucherItem = () => {
		console.log('handle voucher item');
		setIsVisible(true);

		// opens up bottom sheet
	};

	const handleBackdropPress = () => {
		setIsVisible(false);
	};
	return (
		<SafeAreaProvider>
			<HeaderComponent
				authorised={true}
				icon={
					<Icon name='menu' type='feather' color={COLORS.bgGreen} size={40} />
				}
				onPress={() => {
					navigation.toggleDrawer();
				}}
			/>

			<View>
				<View style={{ paddingTop: 20 }}>
					<ScreenTitle title={'Vouchers'} />
				</View>

				{/* Active vouchers */}
				<View style={{ paddingBottom: 50 }}>
					<View
						style={{
							borderBottomColor: COLORS.bgBlue,
							borderBottomWidth: 1,
							paddingBottom: 10,
						}}
					>
						<Text
							style={{
								fontSize: FONTSIZES.xl,
								color: COLORS.bgBlue,
								padding: 10,
								fontWeight: 'bold',
							}}
						>
							Active:
						</Text>
					</View>

					<View style={styles.section}>
						<VoucherItem
							nameOfCompany='Skips R Us'
							address='123 Fake Avenue, 24 Fake lane, 123 6AA'
							onPress={handleVoucherItem}
							hasBeenUsed={false}
						/>
						{/* Flat list of links to vouchers */}
					</View>
				</View>

				<View style={{ paddingBottom: 50 }}>
					<View
						style={{
							borderBottomColor: COLORS.bgBlue,
							borderBottomWidth: 1,
							paddingBottom: 10,
						}}
					>
						<Text
							style={{
								fontSize: FONTSIZES.xl,
								color: COLORS.bgBlue,
								padding: 10,
								fontWeight: 'bold',
							}}
						>
							Expired:
						</Text>
					</View>

					<View style={styles.section}>
						<VoucherItem
							nameOfCompany='Skips R Us'
							address='123 Fake Avenue, 24 Fake lane, 123 6AA'
							onPress={handleVoucherItem}
							dateUsed={'12/12/2023'}
							hasBeenUsed={true}
						/>
						{/* if length is < 0 show this */}
						{/*  */}
						{/* Flat list of links to vouchers */}
					</View>
				</View>
			</View>
			<VoucherSheet
				isVisible={isVisible}
				onCancelPress={handleBackdropPress}
				// onBottomButtonPress={onCancelPress}
			/>
		</SafeAreaProvider>
	);
};

const styles = StyleSheet.create({
	section: {
		// borderBottomColor: COLORS.lightBlue,
		// borderTopColor: COLORS.lightBlue,
		// borderBottomWidth: 2,
		// borderTopwidth: 2,
		// paddingTop: 20,
		// paddingHorizontal: 20,
		// display: 'flex',
		// justifyContent: 'flex-end',
		// alignContent: 'space-between',
		// flex: 1,
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

export default Vouchers;

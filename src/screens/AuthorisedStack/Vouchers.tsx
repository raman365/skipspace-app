import { View, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS, FONTSIZES } from '../../../constants/theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HeaderComponent from '../../components/Header';
// import MapView from 'react-native-maps';

import { Button, Icon, Text, ListItem } from '@rneui/themed';
import QREncoder from '../../components/QREncoder';
import ScreenTitle from '../../components/ScreenTitle';
import VoucherItem from '../../components/VoucherItem';
import VoucherSheet from '../../components/BottomSheet';

import { auth } from '../../../config/firebase';
// import { DocumentReference } from '@google-cloud/firestore'

import { query, where, getDocs, collection } from 'firebase/firestore';
import { db } from '../../../config/firebase';

// const fetchDataByValues = async (collectionName: string, field: string, value: any) => {
// 	try {
// 		const q = query(collection(db, collectionName), where(field, '==', value));
// 		const querySnapshot = await getDocs(q);

// 		const data = querySnapshot.docs.map((doc: any) => ({
// 			id: doc.id,
// 			...doc.data(),
// 		}));

// 		console.log('Fetched data: ', data);
// 		return data;
// 	} catch (error) {
// 		console.error('Error fetching data: ', error);
// 		return [];
// 	}
// }

const Vouchers = ({ navigation }: any) => {
	const [isVisible, setIsVisible] = useState(false);
	const [data, setData] = useState<any>([]);

	// const stringExample =
	// 	'Location Name: Skips are us | Address: 123 Fake Lane, E17 123. This is an example of a QR code';

	// TODO: Database permissions
	// const fetchDataByValues = async (collectionName: string, field: string, value: any) => {
	// 	try {
	// 		const q = query(collection(db, collectionName), where(field, '==', value));
	// 		const querySnapshot = await getDocs(q);

	// 		const data = querySnapshot.docs.map((doc: any) => ({
	// 			id: doc.id,
	// 			...doc.data(),
	// 		}));

	// 		console.log('Fetched data: ', data);
	// 		return data;
	// 	} catch (error) {
	// 		console.error('Error fetching data: ', error);
	// 		return [];
	// 	}
	// }

	const fetchAllDataByValues = async (
		collectionName: string,
		filters: { field: string; value: any }[]
	) => {
		try {
			// build query with multiple 'where' conditions
			let q = collection(db, collectionName);

			// apply filters using where clause

			filters.forEach((filter) => {
				// TODO - Figure this out
				// @ts-ignore
				q = query(q, where(filter.field, '==', filter.value));
			});

			// extract the data
			const querySnapshot = await getDocs(q);
			const data = querySnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			console.log('fetched data: ', data);
			return data;
		} catch (error) {
			console.error('Error fecthcing data: ', error);
			return [];
		}
	};

	// data to fetch

	// const collectionName = 'vouchers';
	// const filters = [
	// 	{ user_name: auth.currentUser?.displayName },
	// 	{ user_email: auth.currentUser?.email },
	// ];

	// const vouchRef = collection(db, 'vouchers');
	// const q = query(vouchRef, where('user_email', '==', auth.currentUser?.email));

	const handleVoucherItem = () => {
		console.log('handle voucher item');
		setIsVisible(true);

		// opens up bottom sheet
	};

	const handleBackdropPress = () => {
		setIsVisible(false);
	};

	/* fetch voucher data from database 
	
	- that matches users info
	*/

	// const activeVouchers: [];
	useEffect(() => {
		const fetchVoucherData = async () => {
			try {
				// create a ref to the vouchers collection
				const vouchRef = collection(db, 'vouchers');
				const q = query(
					vouchRef,
					where('user_email', '==', auth.currentUser?.email)
				);

				const querySnapshot = await getDocs(q);

				const newData = querySnapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));

				setData(newData);
			} catch (error) {
				console.error('Error fetching data: ', error);
			}
		};
		fetchVoucherData();
	}, []);

	return (
		<SafeAreaProvider>
			<HeaderComponent
				authorised={true}
				icon={
					<Icon
						style={{ marginRight: 30 }}
						name='menu'
						type='feather'
						color={COLORS.bgGreen}
						size={30}
					/>
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

					{/* 

					check length of vouchers for user
					show activity indicator
					if length is > 1  show information
					if less than one:
					- show text : 'You don't have any active vouchers'


					There are currently no expired vouchers
					
					*/}
					{/* 
					Show activity indicator whilst loading active vouchers
					on click 
					open up bottomsheet showing the voucher details
					with timings?
					
					
					*/}
					{/*  */}
					{/* <View>
						{activeVouchers ? (
							<View style={styles.section}>
								<VoucherItem
									nameOfCompany='Skips R Us'
									address='123 Fake Avenue, 24 sFake lane, 123 6AA'
									onPress={handleVoucherItem}
									hasBeenUsed={false}
								/>
							</View>
						) : (
							<Text>You currently have no current vouchers</Text>
						)}
					</View> */}
					{/*  */}
					<View style={styles.section}>
						{data.map((voucher: any, i: any) => (
							<>
								<VoucherItem
									key={voucher.id}
									nameOfCompany={voucher.skip_company_name}
									address={voucher.skip_company_address}
									onPress={handleVoucherItem}
									hasBeenUsed={false}
								/>

								<VoucherSheet
									isVisible={isVisible}
									onCancelPress={handleBackdropPress}
									skipCompanyName={voucher.skip_company_name}
									skipCompanyAddress={voucher.skip_company_address} // onBottomButtonPress={onCancelPress}
									localAuthIssue={voucher.local_auth_issue}
									userName={voucher.userName}
								/>
							</>
						))}
						{/* <VoucherItem
							nameOfCompany='Skips R Us'
							address='123 Fake Avenue, 24 Fake lane, 123 6AA'
							onPress={handleVoucherItem}
							hasBeenUsed={false}
						/> */}
						{/* Flat list of links to vouchers */}
					</View>
				</View>

				{/* Expired vouchers section */}
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

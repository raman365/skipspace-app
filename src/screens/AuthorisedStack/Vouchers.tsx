import { View, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS, FONTSIZES } from '../../../constants/theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HeaderComponent from '../../components/Header';
// import MapView from 'react-native-maps';

import { Icon, Text } from '@rneui/themed';
import ScreenTitle from '../../components/ScreenTitle';
import VoucherItem from '../../components/VoucherItem';
import VoucherSheet from '../../components/BottomSheet';

import { auth } from '../../../config/firebase';
// import { DocumentReference } from '@google-cloud/firestore'

import dayjs from 'dayjs';

import {
	query,
	where,
	getDocs,
	collection,
	onSnapshot,
	orderBy,
} from 'firebase/firestore';
import { db } from '../../../config/firebase';
import { ScrollView } from 'react-native-gesture-handler';

//TODO - Get realtime updates on vouchers
const fetchDataByValues = async (
	collectionName: string,
	field: string,
	value: any
) => {
	try {
		const q = query(collection(db, collectionName), where(field, '==', value));
		const querySnapshot = await getDocs(q);

		const data = querySnapshot.docs.map((doc: any) => ({
			id: doc.id,
			...doc.data(),
		}));

		console.log('Fetched data: ', data);
		return data;
	} catch (error) {
		console.error('Error fetching data: ', error);
		return [];
	}
};

const Vouchers = ({ navigation }: any) => {
	const [isVisible, setIsVisible] = useState(false);
	const [voucherData, setVoucherData] = useState<any | null>([]);
	const [isLoading, setIsLoading] = useState(false);
	const userFullname = auth.currentUser?.displayName;

	// TODO: Database permissions
	const handleVoucherItem = () => {
		// console.log('handle voucher item');
		setIsVisible(true);

		// opens up bottom sheet
	};

	const handleBackdropPress = () => {
		setIsVisible(false);
	};

	const handleHelp = () => {
		setIsVisible(false);
		navigation.navigate('help');
	};

	useEffect(() => {
		const fetchVoucherData = async () => {
			try {
				// create a ref to the vouchers collection
				setIsLoading(true);
				const vouchRef = collection(db, 'vouchers');

				const q = query(
					vouchRef,
					where('user_email', '==', auth.currentUser?.email),
					orderBy('date_issued', 'asc')
				);
				// TODO: Get real time updates ££

				const unsubscribe = onSnapshot(q, (snapshot) => {
					const updatedData = snapshot.docs.map((doc) => ({
						id: doc.id,
						...doc.data(),
					}));
					// const timestampData = snapshot.data()?.timestampField;

					setVoucherData(updatedData);
					setIsLoading(false);
				});

				return () => {
					unsubscribe(); // Cleanup the listener when the component unmounts
				};

				// CHECK DATE ON VOUCHER
				/* 
				
				IF date is less than today then place in expiry date section
				
				*/

				// const querySnapshot = await getDocs(q);
				// const newData = querySnapshot.docs.map((doc) => ({
				// 	id: doc.id,
				// 	...doc.data(),
				// }));

				// setData(newData);
			} catch (error) {
				console.error('Error fetching data: ', error);
			}
		};
		fetchVoucherData();
	}, []);

	// const dateFormatter = (date: any) => {
	// 	console.log('D: ', date.toDate());
	// 	return date.toDate();
	// };

	const renderVouchers = () => {
		return voucherData.map((voucher: any) => (
			<View
				key={voucher.id}
				style={{
					borderRadius: 25,
				}}
			>
				<VoucherItem
					nameOfCompany={voucher.skip_company_name}
					address={voucher.skip_company_address}
					dateIssued={voucher.date_issued}
					onPress={handleVoucherItem}
					hasBeenUsed={false}
				/>

				<VoucherSheet
					isShown={isVisible}
					onCancelPress={handleBackdropPress}
					skipCompanyName={voucher.skip_company_name}
					skipCompanyAddress={voucher.skip_company_address}
					localAuthIssue={voucher.local_auth_issue}
					userName={userFullname}
					dateIssued={voucher.date_issued}
					onHelpPress={handleHelp}
				/>
			</View>
		));
	};

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
				<View style={{ paddingVertical: 20 }}>
					<ScreenTitle title={'Vouchers'} />
				</View>
				{/* Active vouchers */}
				<View style={{ paddingBottom: 50 }}>
					<View
						style={{
							borderBottomColor: COLORS.bgBlue,
							borderBottomWidth: 0.5,
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

					{voucherData === null ? (
						<View>
							{/* TODO: Add conditional rendering */}
							<Text
								style={{
									textAlign: 'center',
									fontSize: FONTSIZES.ml,
									paddingVertical: 15,
								}}
							>
								You have currently have no active vouchers
							</Text>
						</View>
					) : (
						<ScrollView>
							<View
								style={{
									borderRadius: 10,
									backgroundColor: COLORS.white,
									paddingHorizontal: 10,
									margin: 10,
								}}
							>
								{isLoading ? (
									<ActivityIndicator
										color={COLORS.bgGreen}
										size={'small'}
										style={{ marginVertical: 30 }}
									/>
								) : (
									renderVouchers()
								)}
							</View>
						</ScrollView>
					)}
				</View>

				{/* Expired vouchers section */}
				<View style={{ paddingBottom: 50 }}>
					<View
						style={{
							borderBottomColor: COLORS.bgBlue,
							borderBottomWidth: 0.5,
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
							Used:
						</Text>
					</View>

					<View style={styles.section}>
						{/* TODO: Add conditional rendering */}
						<Text
							style={{
								textAlign: 'center',
								fontSize: FONTSIZES.ml,
								paddingVertical: 15,
							}}
						>
							You currently have no used vouchers
						</Text>
					</View>
				</View>
			</View>
		</SafeAreaProvider>
	);
};

const styles = StyleSheet.create({
	section: {
		margin: 10,
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

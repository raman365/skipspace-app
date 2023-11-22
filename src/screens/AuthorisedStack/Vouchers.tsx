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

import { query, where, getDocs, collection } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import { ScrollView } from 'react-native-gesture-handler';

//TODO - Get realtime updates on vouchers
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
	const [isLoading, setIsLoading] = useState(false);

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
					where('user_email', '==', auth.currentUser?.email)
				);
				// TODO: Get real time updates

				const querySnapshot = await getDocs(q);
				const newData = querySnapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));

				setData(newData);
				setIsLoading(false);
			} catch (error) {
				console.error('Error fetching data: ', error);
			}
		};
		fetchVoucherData();
	}, []);

	const renderVouchers = () => {
		return data.map((voucher: any) => (
			<View key={voucher.id}>
				<VoucherItem
					nameOfCompany={voucher.skip_company_name}
					address={voucher.skip_company_address}
					dateIssued={voucher.date_issued.toString()}
					onPress={handleVoucherItem}
					hasBeenUsed={false}
				/>

				<VoucherSheet
					isShown={isVisible}
					onCancelPress={handleBackdropPress}
					skipCompanyName={voucher.skip_company_name}
					skipCompanyAddress={voucher.skip_company_address} // onBottomButtonPress={onCancelPress}
					localAuthIssue={voucher.local_auth_issue}
					userName={voucher.userName}
					dateIssued={voucher.date_issued}
					onHelpPress={handleHelp}
				/>
			</View>
		));
	};

	// const VoucherData = () => {
	// 	return <>
	// 		<FlatList
	// 			data={data}
	// 			keyExtractor={voucher => voucher.id}
	// 			renderItem={ ({voucher}) => {
	// 				return (
	// 				<>
	// 					{voucher == 0
	// 						? <Text> You currently have no active vouchers</Text>
	// 						: <View>
	// 							<VoucherItem
	// 								nameOfCompany={voucher.skip_company_name}
	// 								address={voucher.skip_company_address}
	// 								dateIssued={voucher.date_issued.toString()}
	// 								onPress={handleVoucherItem}
	// 								hasBeenUsed={false}
	// 							/>

	// 							<VoucherSheet
	// 								isShown={isVisible}
	// 								onCancelPress={handleBackdropPress}
	// 								skipCompanyName={voucher.skip_company_name}
	// 								skipCompanyAddress={voucher.skip_company_address} // onBottomButtonPress={onCancelPress}
	// 								localAuthIssue={voucher.local_auth_issue}
	// 								userName={voucher.userName}
	// 								dateIssued={voucher.date_issued}
	// 							/>
	// 					</View>
	// 					}

	// 				</>
	// 				)
	// 			}
	// 		}

	// 		/>
	// 	</>
	// }
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
					<ScrollView>
						<View style={styles.section}>
							{isLoading ? (
								<ActivityIndicator
									color={COLORS.bgGreen}
									size={'small'}
									style={{ marginVertical: 30 }}
								/>
							) : (
								renderVouchers()
							)}

							{/* {data.map((voucher: any) => (
									<View key={voucher.id}>
										<VoucherItem
											nameOfCompany={voucher.skip_company_name}
											address={voucher.skip_company_address}
											dateIssued={voucher.date_issued.toString()}
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
									</View>
								))} */}
							{/* <VoucherItem
								nameOfCompany='Skips R Us'
								address='123 Fake Avenue, 24 Fake lane, 123 6AA'
								onPress={handleVoucherItem}
								hasBeenUsed={false}
							/> */}
							{/* Flat list of links to vouchers */}
						</View>
					</ScrollView>
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
						{/* TODO: Add conditional rendering */}
						<Text
							style={{
								textAlign: 'center',
								fontSize: FONTSIZES.ml,
								paddingVertical: 15,
							}}
						>
							You have currently have no expired vouchers
						</Text>

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

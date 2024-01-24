import { View, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS, FONTSIZES } from '../../../constants/theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HeaderComponent from '../../components/Header';

import { Icon, Text } from '@rneui/themed';
import ScreenTitle from '../../components/ScreenTitle';
import VoucherItem from '../../components/VoucherItem';
import VoucherSheet from '../../components/BottomSheet';

import { auth } from '../../../config/firebase';

import { query, where, collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../../config/firebase';

const Vouchers = ({ navigation }: any) => {
	const [isVisible, setIsVisible] = useState(false);
	const [voucherData, setVoucherData] = useState<any | null>([]);

	const [usedVoucherData, setUsedVoucherData] = useState<any | null>([]);
	const [isLoading, setIsLoading] = useState(false);
	const userFullname = auth.currentUser?.displayName;

	// TODO: Database permissions
	const handleVoucherItem = () => {
		setIsVisible(true);
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
				setIsLoading(true);
				const vouchRef = collection(db, 'vouchers');

				const activeVouchers = query(
					vouchRef,
					where('user_email', '==', auth.currentUser?.email),
					where('voucher_used', '==', false)
				);

				const usedVouchers = query(
					vouchRef,
					where('user_email', '==', auth.currentUser?.email),
					where('voucher_used', '==', true)
				);

				const unsubscribe = onSnapshot(activeVouchers, (snapshot) => {
					const updatedData = snapshot.docs.map((doc) => ({
						id: doc.id,
						...doc.data(),
					}));

					setVoucherData(updatedData);
					setIsLoading(false);
				});
				const unsubscribeUsed = onSnapshot(usedVouchers, (snapshot) => {
					const updatedData = snapshot.docs.map((doc) => ({
						id: doc.id,
						...doc.data(),
					}));

					setUsedVoucherData(updatedData);
					setIsLoading(false);
				});

				return () => {
					unsubscribe(); // Cleanup the listener when the component unmounts
					unsubscribeUsed(); // Cleanup the listener when the component unmounts
				};
			} catch (error) {
				console.error('Error fetching data: ', error);
			}
		};
		fetchVoucherData();
	}, []);

	const renderVouchers = (isLoading: boolean) => {
		return isLoading ? (
			<ActivityIndicator
				color={COLORS.bgGreen}
				size={'small'}
				style={{ marginVertical: 30 }}
			/>
		) : (
			usedVoucherData.map((voucher: any) => (
				<View
					key={voucher.id}
					style={{
						borderRadius: 25,
					}}
				>
					<View
						key={voucher.id}
						style={{
							borderRadius: 25,
						}}
					>
						<VoucherItem
							address={voucher.skip_company_address}
							dateTimeIssued={voucher.date_time_issued}
							onPress={handleVoucherItem}
							hasBeenUsed={false}
						/>

						<VoucherSheet
							isShown={isVisible}
							onCancelPress={handleBackdropPress}
							skipCompanyAddress={voucher.skip_company_address}
							localAuthIssue={voucher.local_auth_issue}
							userName={userFullname}
							dateIssued={voucher.date_time_issued}
							onHelpPress={handleHelp}
						/>
					</View>
				</View>
			))
			// <FlatList
			// 	data={voucherData}
			// 	keyExtractor={(item) => item.id}
			// 	renderItem={({ item }) => (
			// 		<View style={{ borderRadius: 25 }}>
			// 			<VoucherItem
			// 				address={item.skip_company_address}
			// 				dateTimeIssued={item.date_time_issued}
			// 				onPress={handleVoucherItem}
			// 				hasBeenUsed={false}
			// 			/>
			// 			<VoucherSheet
			// 				isShown={false}
			// 				onCancelPress={handleBackdropPress}
			// 				skipCompanyAddress={item.skip_company_address}
			// 				userName={userFullname}
			// 				localAuthIssue={item.local_auth_issue}
			// 				dateIssued={item.date_time_issued}
			// 				onHelpPress={handleHelp}
			// 			/>
			// 		</View>
			// 	)}
			// />
		);
	};

	const renderUsedVouchers = (isLoading: boolean) => {
		return isLoading ? (
			<ActivityIndicator
				color={COLORS.bgGreen}
				size={'small'}
				style={{ marginVertical: 30 }}
			/>
		) : (
			usedVoucherData.map((voucher: any) => (
				<View
					key={voucher.id}
					style={{
						borderRadius: 25,
					}}
				>
					<View
						key={voucher.id}
						style={{
							borderRadius: 25,
						}}
					>
						<VoucherItem
							address={voucher.skip_company_address}
							dateTimeIssued={voucher.date_time_issued}
							onPress={handleVoucherItem}
							hasBeenUsed={true}
						/>

						<VoucherSheet
							isShown={isVisible}
							onCancelPress={handleBackdropPress}
							skipCompanyAddress={voucher.skip_company_address}
							localAuthIssue={voucher.local_auth_issue}
							userName={userFullname}
							dateIssued={voucher.date_time_issued}
							onHelpPress={handleHelp}
						/>
					</View>
				</View>
			))
		);

		// <FlatList
		// 	data={usedVoucherData}
		// 	keyExtractor={(item) => item.id}
		// 	renderItem={({ item }) => (
		// 		<View style={{ borderRadius: 25 }}>
		// 			<VoucherItem
		// 				address={item.skip_company_address}
		// 				dateTimeIssued={item.date_time_issued}
		// 				onPress={handleVoucherItem}
		// 				hasBeenUsed={true}
		// 			/>
		// 			<VoucherSheet
		// 				isShown={false}
		// 				onCancelPress={handleBackdropPress}
		// 				skipCompanyAddress={item.skip_company_address}
		// 				userName={userFullname}
		// 				localAuthIssue={item.local_auth_issue}
		// 				dateIssued={item.date_time_issued}
		// 				onHelpPress={handleHelp}
		// 			/>
		// 		</View>
		// 	)}
		///>
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

			<View style={{ paddingVertical: 20 }}>
				<ScreenTitle title={'Vouchers'} />
			</View>

			{/* <ScrollView style={{ marginBottom: 200 }}> */}
			<View style={{ marginBottom: 200 }}>
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

					{voucherData.length > 0 ? (
						<>
							<View>
								<View
									style={{
										borderRadius: 10,
										backgroundColor: COLORS.white,
										paddingHorizontal: 10,
										margin: 10,
									}}
								>
									{renderVouchers(isLoading)}
								</View>
							</View>
						</>
					) : (
						<>
							<Text
								style={{
									textAlign: 'center',
									fontSize: FONTSIZES.ml,
									paddingVertical: 15,
								}}
							>
								You currently have no active vouchers
							</Text>
						</>
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

					<>
						{usedVoucherData.length > 0 ? (
							<View style={{ paddingBottom: 50 }}>
								<View
									style={{
										borderRadius: 10,
										backgroundColor: COLORS.white,
										paddingHorizontal: 10,
										margin: 10,
									}}
								>
									{renderUsedVouchers(isLoading)}
								</View>
							</View>
						) : (
							<Text
								style={{
									textAlign: 'center',
									fontSize: FONTSIZES.ml,
									paddingVertical: 15,
								}}
							>
								You have currently have no used vouchers
							</Text>
						)}
					</>
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

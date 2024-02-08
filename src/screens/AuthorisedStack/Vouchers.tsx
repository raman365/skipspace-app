import { View, StyleSheet, ScrollView } from 'react-native';
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
	const [selectedVoucher, setSelectedVoucher] = useState<any | null>(null);
	const userFullname = auth.currentUser?.displayName;

	const handleVoucherItem = (voucher: any) => {
		setSelectedVoucher(voucher);
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
					unsubscribe();
					unsubscribeUsed();
				};
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
			<View style={{ paddingVertical: 20 }}>
				<ScreenTitle title={'Vouchers'} />
			</View>

			<ScrollView
				style={{ paddingBottom: 200 }}
				showsVerticalScrollIndicator={false}
			>
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
						<View
							style={{
								borderRadius: 10,
								backgroundColor: COLORS.white,
								paddingHorizontal: 10,
								margin: 10,
							}}
						>
							{voucherData.map((voucher: any) => (
								<VoucherItem
									key={voucher.id}
									voucher={voucher} // Pass the voucher object
									onPress={() => handleVoucherItem(voucher)}
									hasBeenUsed={false}
								/>
							))}
						</View>
					) : (
						<Text
							style={{
								textAlign: 'center',
								fontSize: FONTSIZES.ml,
								paddingVertical: 15,
							}}
						>
							You currently have no active vouchers
						</Text>
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

					{usedVoucherData.length > 0 ? (
						<ScrollView
							style={{ paddingBottom: 50 }}
							showsVerticalScrollIndicator={false}
						>
							<View
								style={{
									borderRadius: 10,
									backgroundColor: COLORS.white,
									paddingHorizontal: 10,
									margin: 10,
								}}
							>
								{usedVoucherData.map((voucher: any) => (
									<VoucherItem
										key={voucher.id}
										voucher={voucher}
										onPress={() => handleVoucherItem(voucher)}
										hasBeenUsed={true}
									/>
								))}
							</View>
						</ScrollView>
					) : (
						<Text
							style={{
								textAlign: 'center',
								fontSize: FONTSIZES.ml,
								paddingVertical: 15,
							}}
						>
							You currently have no used vouchers
						</Text>
					)}
				</View>
				{selectedVoucher && (
					<VoucherSheet
						isShown={isVisible}
						onCancelPress={handleBackdropPress}
						skipCompanyAddress={selectedVoucher.skip_company_address}
						localAuthIssue={selectedVoucher.local_auth_issue}
						userName={userFullname}
						dateIssued={selectedVoucher.date_time_issued}
						onHelpPress={handleHelp}
					/>
				)}
			</ScrollView>
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

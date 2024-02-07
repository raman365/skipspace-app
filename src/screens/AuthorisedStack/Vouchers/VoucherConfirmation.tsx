import { View, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { COLORS } from '../../../../constants/theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HeaderComponent from '../../../components/Header';
import { Icon, Text, ListItem } from '@rneui/themed';
import StandardButton from '../../../components/Button/StandardBtn';
import ScreenTitle from '../../../components/ScreenTitle';
import { getAuth } from 'firebase/auth';
import dayjs from 'dayjs';

import { db } from '../../../../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import QRCoder from '../../../components/QRCoder';
import { encryptDataFunc } from '../../../utils/encryptDecrypt';
import { EXPO_PUBLIC_SECRET_KEY } from '@env';

const addDataToCollection = async (collectionName: string, data: any) => {
	try {
		const voucherCollRef = collection(db, collectionName);
		const docRef = await addDoc(voucherCollRef, data);
		console.log('Doc written with id: ', docRef.id);
	} catch (error) {
		console.error('Error adding document: ', error);
	}
};

const VoucherConfirmation = ({ route, navigation }: any) => {
	const { localAuth, skipCompanyAddress } = route.params;

	const auth = getAuth();

	const userFullname = auth.currentUser?.displayName;
	const userEmail = auth.currentUser?.email;

	let dateTimeNow = dayjs().format('DD/MM/YYYY HH:mm:ss');
	console.log(dateTimeNow);

	const voucherData = {
		date_time_issued: dateTimeNow,
		user_name: userFullname,
		user_email: userEmail,
		local_auth_issue: localAuth,
		skip_company_address: skipCompanyAddress,
		voucher_used: false,
	};

	const jsonString = JSON.stringify(voucherData);
	const encData = encryptDataFunc(jsonString, EXPO_PUBLIC_SECRET_KEY);

	const handleReturnHome = () => {
		addDataToCollection('vouchers', voucherData);
		navigation.navigate('signedInDashboard');
	};
	return (
		// <SafeAreaProvider>
		<ScrollView>
			<HeaderComponent
				authorised={false}
				icon={
					<Icon name='menu' type='feather' color={COLORS.bgGreen} size={40} />
				}
				onPress={() => {
					navigation.toggleDrawer();
				}}
			/>

			<View>
				<View style={{ paddingVertical: 15 }}>
					<ScreenTitle title={'Confirmed'} />
				</View>

				<View
					style={{
						justifyContent: 'center',
						alignItems: 'center',
						paddingBottom: 10,
					}}
				>
					<QRCoder data={encData} />
				</View>

				{/* <View style={{ paddingVertical: 40, paddingHorizontal: 30 }}> */}
				<View>
					<View
						style={{
							padding: 10,
							borderColor: COLORS.bgBlue,
							borderWidth: 1,
							marginTop: 10,
							marginBottom: 20,
							marginHorizontal: 30,
						}}
					>
						<Text
							style={{
								textDecorationLine: 'underline',
								textAlign: 'center',
								paddingVertical: 10,
								fontWeight: 'bold',
								fontSize: 16,
							}}
						>
							Instructions:
						</Text>
						<ListItem style={{ backgroundColor: COLORS.white }}>
							<ListItem.Content>
								<ListItem.Title style={styles.listItemTitle}>
									1. Arrive at your SkipSpace with your items to discard.
								</ListItem.Title>
								<ListItem.Title style={styles.listItemTitle}>
									2. Show this QR code to the security staff when you arrive.
								</ListItem.Title>
								<ListItem.Title
									style={{
										paddingVertical: 5,
										fontSize: 12,
										fontWeight: 'bold',
										textAlign: 'center',
									}}
								>
									This voucher can also be found in the Vouchers section.
								</ListItem.Title>
							</ListItem.Content>
						</ListItem>
					</View>
					<View style={{ paddingHorizontal: 30 }}>
						<StandardButton
							bgGreen
							fontBlue
							buttonLabel={'Return Home'}
							onPress={handleReturnHome}
						/>
					</View>
				</View>
			</View>
		</ScrollView>
		// {/* </SafeAreaProvider> */}
	);
};

const styles = StyleSheet.create({
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

export default VoucherConfirmation;

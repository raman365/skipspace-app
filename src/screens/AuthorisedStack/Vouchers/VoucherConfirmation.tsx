import { View, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS, FONTSIZES } from '../../../../constants/theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HeaderComponent from '../../../components/Header';
import { Button, Icon, Text, ListItem } from '@rneui/themed';
// import QREncoder from '../../../components/QREncoder';
import StandardButton from '../../../components/Button/StandardBtn';
import ScreenTitle from '../../../components/ScreenTitle';
import { getAuth } from 'firebase/auth';
import dayjs from 'dayjs';

import { db } from '../../../../config/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import QRCoder from '../../../components/QRCoder';
import { encryptDataFunc } from '../../../utils/encryptDecrypt';

const addDataToCollection = async (collectionName: string, data: any) => {
	try {
		// get ref to collection
		const voucherCollRef = collection(db, collectionName);
		// add a new doc with the data
		const docRef = await addDoc(voucherCollRef, data);

		console.log('Doc written with id: ', docRef.id);
	} catch (error) {
		console.error('Error adding document: ', error);
	}
};

const VoucherConfirmation = ({ route, navigation }: any) => {
	const { localAuth, skipCompanyName, skipCompanyAddress } = route.params;

	const auth = getAuth();

	const userFullname = auth.currentUser?.displayName;
	const userEmail = auth.currentUser?.email;

	let dateTimeNow = dayjs().format('DD/MM/YYYY HH:mm:ss');
	console.log(dateTimeNow);
	// let expiryDate = dayjs().hour(24).format('DD/MM/YYYY');

	// const dataInQRCode = `\n Date issued: ${dateTimeNow} \nPerson Details: ${userFullname} \n Local Authority Issue: ${localAuth} \nSkip Company Name: ${skipCompanyName} \n Skip Company Address:\n${skipCompanyAddress}`;

	const secretKey = 'theSecretKey'; //TODO - Change this
	// const dataToEncode = dataInQRCode;

	// const [data, setData] = useState<string>('');

	// useEffect(() => {
	// 	// encrypt the data
	// 	setData(dataInQRCode);

	// 	const encryptedData = encryptData(data, secretKey);
	// 	console.log('Encrypted data: ', encryptedData);
	// }, [data]);

	const voucherData = {
		date_time_issued: dateTimeNow,
		user_name: userFullname,
		user_email: userEmail,
		local_auth_issue: localAuth,
		skip_company_name: skipCompanyName,
		skip_company_address: skipCompanyAddress,
		voucher_used: false,
	};

	// this part goes into the QR code
	const jsonString = JSON.stringify(voucherData);

	// const parseData = JSON.parse(jsonString);

	// console.log('Parsed: ', parseData);

	// const encData = encryptDataFunc(jsonString, secretKey);
	const encData = encryptDataFunc(jsonString, secretKey);

	// console.log('Serialized Obj: ', jsonString);

	const handleReturnHome = () => {
		addDataToCollection('vouchers', voucherData);
		navigation.navigate('signedInDashboard');
	};
	return (
		<SafeAreaProvider>
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
				<View style={{ paddingVertical: 20 }}>
					<ScreenTitle title={'Confirmed'} />
				</View>

				<View
					style={{
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					{/* <QREncoder codeValue={dataInQRCode} /> */}
					{/* <QRCoder data={encData} /> */}
					<QRCoder data={jsonString} />
				</View>

				<View style={{ paddingVertical: 40, paddingHorizontal: 30 }}>
					<View
						style={{
							padding: 10,
							borderColor: COLORS.bgBlue,
							borderWidth: 1,
							marginTop: 10,
							marginBottom: 20,
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
						{/* <Text style={{ textAlign: 'left', fontWeight: '400' }}> */}
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
		</SafeAreaProvider>
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

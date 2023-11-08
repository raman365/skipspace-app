import { View, StyleSheet, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS, FONTSIZES } from '../../../constants/theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HeaderComponent from '../../components/Header';
import { Button, Icon, Input, Text } from '@rneui/themed';
// import TextInput, { autoCap } from '../../components/FormComponents/TextInput';
// import SSButton from '../../components/Button';

// import { handleSignOut } from '../../navigation/AuthorisedStack';
import SmlStandardBtn from '../../components/Button/SmallStandardBtn';
import { auth } from '../../../config/firebase';
import { db } from '../../../config/firebase';
import {
	doc,
	getDoc,
	collection,
	getDocs,
	where,
	query,
	QuerySnapshot,
} from 'firebase/firestore';
import { err } from 'react-native-svg/lib/typescript/xml';
import { handleSignOut } from '../../navigation/AuthorisedStack';
// import { handleSignOut } from '../../utils/authentication';

// TODO: Replace with user data

const UserAccount = ({ navigation }: any) => {
	const [userInfo, setUserInfo] = useState<any | undefined>();
	const [userData, setUserData] = useState<any>(null);
	const userDetail = auth.currentUser?.uid;

	// const fetchDataByUID = async (uid: string) => {
	// 	try {
	// 		const userDocRef = doc(db, 'registeredUser', uid);

	// 		const userDocSnapshot = await getDoc(userDocRef);

	// 		if (userDocSnapshot.exists()) {
	// 			const userData = userDocSnapshot.data();
	// 			setUserInfo(userData);
	// 		} else {
	// 			// no user found with that UID
	// 			return null;
	// 		}
	// 	} catch (error: any) {
	// 		console.error('Error fetching data:', error);
	// 		return null;
	// 	}

	// const docRef = doc(db, 'registeredUsers');

	// const docSnap = await getDoc(docRef);

	// if (docSnap.exists()) {
	// 	console.log('Document data:', docSnap.data());
	// 	setUserInfo(docSnap.data());
	// } else {
	// 	// docSnap.data() will be undefined in this case
	// 	console.log('No such document!');
	// }
	// };

	// const getData = async () => {
	// 	const querySnapshot = await getDocs(collection(db, 'registeredUsers'));
	// 	querySnapshot.forEach((doc) => {
	// 		// doc.data() is never undefined for query doc snapshots
	// 		console.log(doc.id, ' => ', doc.data());
	// 		setUserInfo(doc.data());
	// 	});
	// };

	const getUserDataByUID = async (uid: any) => {
		try {
			const userDocRef = doc(db, 'registeredUsers', uid);

			const userDocSnapshot = await getDoc(userDocRef);

			if (userDocSnapshot.exists()) {
				const userData = userDocSnapshot.data();
				return userData;
			} else {
				// no user with UID found
				return null;
			}
		} catch (error) {
			console.error('Error fetching user data', error);
			return null;
		}
	};

	useEffect(() => {
		const uid = auth.currentUser?.uid;

		async function fetchData() {
			const user = await getUserDataByUID(uid);
			if (user) {
				setUserData(user);
			} else {
				console.log('user not found');
			}
		}
		fetchData();
	}, []);

	return (
		<SafeAreaProvider>
			<HeaderComponent
				authorised={true}
				icon={
					<Icon name='menu' type='feather' color={COLORS.bgGreen} size={30} />
				}
				onPress={() => {
					navigation.toggleDrawer();
				}}
			/>
			<View style={{ paddingTop: 30 }}>
				<Text
					style={{
						textAlign: 'center',
						color: COLORS.bgBlue,
						fontSize: 30,
						fontFamily: 'Tungsten_SemiBold',
					}}
				>
					Your Account
				</Text>
			</View>
			<View style={styles.centerContainer}>
				{userData ? (
					<View>
						<Text style={styles.textStyle}>First name:</Text>
						<Input
							disabled
							inputContainerStyle={styles.contStyle}
							autoCapitalize='words'
							placeholder={userData?.firstName}
						/>
						<Text style={styles.textStyle}>Last name:</Text>
						<Input
							disabled
							inputContainerStyle={styles.contStyle}
							autoCapitalize='words'
							placeholder={userData?.lastName}
						/>
						<Text style={styles.textStyle}>Email:</Text>
						<Input
							disabled
							inputContainerStyle={styles.contStyle}
							autoCapitalize='words'
							placeholder={userData?.email}
						/>
					</View>
				) : (
					<Text>Loading data</Text>
				)}

				<View style={styles.bottomDivider}>
					<View style={{ marginTop: 30 }}>
						<SmlStandardBtn
							buttonLabel={'Sign out'}
							onPress={handleSignOut}
							bgGreen
							fontBlue={false}
						/>
					</View>

					<View
						style={{ paddingVertical: 10, marginHorizontal: 50, marginTop: 20 }}
					>
						<Button
							title='Delete my account'
							buttonStyle={{
								backgroundColor: COLORS.primaryRed,
								borderRadius: 25,
							}}
							titleStyle={{
								fontWeight: '700',
								fontSize: FONTSIZES.medium,
								color: COLORS.white,
							}}
							onPress={() => console.log('sdfds')}
						/>
					</View>
					{/* <SSButton
						buttonLabel={'Sign out'}
						// onPress={() => handleSignOut}
						onPress={handleSignOut}
						bgGreen={false}
					/> */}
					{/* <Button
						title='Log out'
						buttonStyle={{
							backgroundColor: COLORS.bgGreen,
							borderRadius: 5,
							paddingVertical: 15,
						}}
						titleStyle={{
							fontWeight: '700',
							fontSize: 16,
							color: COLORS.white,
						}}
						// onPress={handleSignOut}
						onPress={() => console.log('todo')}
					/> */}
				</View>
				<View style={styles.topDivider}>
					{/* <View style={{ paddingVertical: 10, marginHorizontal: 50 }}>
						<Button
							title='Delete my account'
							buttonStyle={{
								backgroundColor: COLORS.primaryRed,
								borderRadius: 25,
							}}
							titleStyle={{
								fontWeight: '700',
								fontSize: FONTSIZES.medium,
								color: COLORS.white,
							}}
							onPress={() => console.log('sdfds')}
						/>
					</View> */}
					{/* <Button
						title='Delete my account'
						buttonStyle={{
							backgroundColor: COLORS.primaryRed,
							borderRadius: 25,
							paddingVertical: 10,
						}}
						titleStyle={{
							fontWeight: '700',
							fontSize: FONTSIZES.medium,
							color: COLORS.white,
						}}
						onPress={() => Alert.alert('Todo: log out')}
					/> */}
				</View>
				{/* <View style={{ paddingVertical: 40, paddingHorizontal: 30 }}>
					<Button
						title='Search for SkipSpace'
						buttonStyle={{
							backgroundColor: COLORS.bgGreen,
							borderRadius: 5,
							paddingVertical: 15,
						}}
						titleStyle={{
							fontWeight: '700',
							fontSize: 16,
							color: COLORS.bgBlue,
						}}
						onPress={() => navigation.navigate('selectCouncil')}
					/>
				</View> */}
				{/* <View style={{ paddingVertical: 40, paddingHorizontal: 30 }}>
					<Button
						title='View active vouchers'
						buttonStyle={{
							backgroundColor: COLORS.bgGreen,
							borderRadius: 5,
							paddingVertical: 15,
						}}
						titleStyle={{
							fontWeight: '700',
							fontSize: 16,
							color: COLORS.bgBlue,
						}}
						onPress={() => navigation.navigate('vouchers')}
					/>
				</View> */}
			</View>
		</SafeAreaProvider>
	);
};

const styles = StyleSheet.create({
	centerContainer: {
		paddingTop: 50,
		paddingHorizontal: 20,
		display: 'flex',
		justifyContent: 'center',
		// flex: 1,
	},
	bottomDivider: {
		paddingVertical: 20,
		paddingHorizontal: 25,
		// borderBottomColor: COLORS.lightBlue,
		// borderBottomWidth: 2,
	},
	topDivider: {
		paddingTop: 50,
		paddingHorizontal: 25,
		// borderBottomColor: COLORS.lightBlue,
		// borderBottomWidth: 2,
	},
	textStyle: {
		fontSize: FONTSIZES.large,
		paddingBottom: 10,
	},
	contStyle: {
		backgroundColor: COLORS.alpha.lightBlue,
		opacity: 1,
		paddingHorizontal: 10,
	},
});

export default UserAccount;

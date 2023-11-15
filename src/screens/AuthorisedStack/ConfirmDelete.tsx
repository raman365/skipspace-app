import { View, StyleSheet, ActivityIndicator } from 'react-native';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { COLORS, FONTSIZES } from '../../../constants/theme';
import HeaderComponent from '../../components/Header';
import { Input, Text, Button } from '@rneui/themed';
import ScreenTitle from '../../components/ScreenTitle';
// import { auth } from '../../../config/firebase';
import ClearBtn from '../../components/Button/ClearBtn';
import { getAuth, deleteUser } from 'firebase/auth';

import { auth, db } from '../../../config/firebase';
import { doc, deleteDoc, collection, updateDoc } from 'firebase/firestore';

const ConfirmDelete = ({ navigation }: any) => {
	const auth = getAuth();
	const currentUser = auth.currentUser;

	const deleteUserDoc = async (uid: string) => {
		try {
			const userDocRef = doc(db, 'registeredUsers', uid);

			await deleteDoc(userDocRef);
			console.log('User doc has been been deleted ');
		} catch (error: any) {
			console.error('Error deleting user doc', error);
		}
	};

	const deleteUserProfile = async (userId: string) => {
		const userDocRef = doc(db, 'users', userId);

		try {
			await deleteDoc(userDocRef);
			console.log('User profile deleted');
		} catch (error: any) {
			console.log('Error: ', error);
			// TODO - ncorporate additional security measures depending on your specific use case.
			// TODO: Can account
		}
	};

	const handleDeleteAccount = async () => {
		// TODO: Set up extension: https://extensions.dev/extensions/firebase/delete-user-data
		// requires: ££
		// TODO handle delete account
		// remove user and remove data
		// TODO: Delete user profile in firebase
		// const uid = auth.currentUser?.uid;
		// await deleteUserDoc(uid);
		const auth = getAuth();
		// const userProfile = doc(db, `users/${auth.currentUser?.uid}`);

		const user = auth.currentUser;
	};
	return (
		<SafeAreaProvider>
			<HeaderComponent authorised={true} />
			<ScreenTitle title={'Delete your account'} />

			<View style={styles.centerContainer}>
				<View>
					<View>
						<Text style={styles.textStyle}>
							Are you sure you want to delete your account?
						</Text>
						<Text style={styles.textStyle}>
							All of your user details and voucher history will disappear
							forever.
						</Text>
					</View>

					<View style={{ paddingVertical: 50, marginHorizontal: 50 }}>
						<Button
							title={'Confirm deletion'}
							buttonStyle={{
								backgroundColor: COLORS.primaryRed,
								borderRadius: 25,
							}}
							titleStyle={{
								fontWeight: '700',
								fontSize: FONTSIZES.large,
								color: COLORS.white,
							}}
							onPress={handleDeleteAccount}
						/>

						<View style={{ paddingVertical: 50 }}>
							<View style={{ justifyContent: 'center', alignItems: 'center' }}>
								<ClearBtn
									buttonLabel={"I've changed my mind"}
									color={COLORS.bgBlue}
									onPress={() => navigation.navigate('signedInDashboard')}
								/>
							</View>
						</View>
					</View>
				</View>
			</View>
		</SafeAreaProvider>
	);
};

const styles = StyleSheet.create({
	heading: {
		color: COLORS.bgGreen,
		fontSize: 22,
		fontWeight: 'bold',
	},
	headerRight: {
		display: 'flex',
		flexDirection: 'row',
	},
	subheaderText: {
		color: 'white',
		fontSize: 16,
		fontWeight: 'bold',
	},
	centerContainer: {
		paddingHorizontal: 25,
		paddingVertical: 50,
		display: 'flex',
		justifyContent: 'space-between',
		// flex: 1,
	},
	textStyle: {
		fontSize: 15,
		textAlign: 'center',
		paddingTop: 8,
		paddingVertical: 4,
	},
	textStyleTwo: {
		fontSize: 17,
		fontWeight: '500',
		textAlign: 'center',
	},
	bottomContainer: {
		borderTopColor: COLORS.bgGreen,
		borderTopWidth: 2,
		height: 100,
		paddingTop: 30,
	},
});
export default ConfirmDelete;

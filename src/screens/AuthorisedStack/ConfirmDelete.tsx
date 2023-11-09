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

import { db } from '../../../config/firebase';
import { doc, deleteDoc } from 'firebase/firestore';

const ConfirmDelete = ({ navigation }: any) => {
	const auth = getAuth();
	const currentUser = auth.currentUser;

	const handleDeleteAccount = async (uid: string) => {
		// delete the collection
		try {
			const userDocRef = doc(db, 'registeredUsers', uid);

			await deleteDoc(userDocRef);
			// await deleteUser(auth.currentUser)
			if (currentUser) {
				await currentUser.delete();
				console.log('User auth details deleted success');
			}
			navigation.navigate('welcomeHowTos');
			console.log('User data collection deleted successfully');
		} catch (error: any) {
			console.error('Error deleting user: ', error);
		}
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
					<View style={{ paddingVertical: 50 }}>
						<View style={{ justifyContent: 'center', alignItems: 'center' }}>
							<ClearBtn
								buttonLabel={"I've changed my mind"}
								// onPress={function (): void {
								// 	throw new Error('Function not implemented.');
								// }}
								onPress={() => navigation.navigate('signedInDashboard')}
							/>
						</View>
					</View>

					<View style={{ paddingVertical: 10, marginHorizontal: 50 }}>
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
							onPress={() => handleDeleteAccount()}
						/>
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

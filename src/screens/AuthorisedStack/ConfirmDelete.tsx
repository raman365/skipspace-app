import { View, StyleSheet } from 'react-native';
import React, { useId } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { COLORS, FONTSIZES } from '../../../constants/theme';
import HeaderComponent from '../../components/Header';
import { Text, Button } from '@rneui/themed';
import ScreenTitle from '../../components/ScreenTitle';
import ClearBtn from '../../components/Button/ClearBtn';

import { auth, db } from '../../../config/firebase';
import { doc, deleteDoc } from 'firebase/firestore';
import useAuth from '../../hooks/useAuth';

const ConfirmDelete = ({ navigation }: any) => {
	const { userDelete } = useAuth();

	const currentUser = auth.currentUser;

	const deleteUserDoc = async (uid: string) => {
		try {
			const userDocRef = doc(db, 'users', uid);

			await deleteDoc(userDocRef);
			console.log('User doc has been been deleted ');
		} catch (error: any) {
			console.error('Error deleting user doc', error);
		}
	};

	const handleDeleteAccount = async () => {
		try {
		  if (currentUser) {
			await deleteUserDoc(currentUser.uid);
			await userDelete();
		  } else {
			console.error("Current user not found");
		  }
		} catch (error) {
		  console.error('Error deleting account', error);
		}
	  };

	const handleCancelDeletion = () => {
		navigation.navigate('signedInDashboard');
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
									onPress={handleCancelDeletion}
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

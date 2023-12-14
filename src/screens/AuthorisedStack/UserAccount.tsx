import { View, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS, FONTSIZES } from '../../../constants/theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HeaderComponent from '../../components/Header';
import { Icon, Input, Text } from '@rneui/themed';

import { auth, db } from '../../../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { SmlStandardBtn } from '../../components/Button/SmallStandardBtn';
import ClearBtn from '../../components/Button/ClearBtn';
import useAuth from '../../hooks/useAuth';

const UserAccount = ({ navigation }: any) => {
	// const [userInfo, setUserInfo] = useState<any | undefined>();
	const [userData, setUserData] = useState<any>(null);
	const { signUserOut } = useAuth();

	const handleDeleteAcc = () => {
		navigation.navigate('confirmDelete');
	};

	const handleSignOut = () => {
		signUserOut();
	};

	const getUserDataByUID = async (uid: any) => {
		try {
			const userDocRef = doc(db, 'users', uid);
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
					<>
						<View>
							<Text style={styles.textStyle}>First name:</Text>
							<Input
								disabled
								inputContainerStyle={styles.contStyle}
								autoCapitalize='words'
								placeholder={userData?.user_first_name}
							/>
							<Text style={styles.textStyle}>Last name:</Text>
							<Input
								style={{ fontSize: FONTSIZES.xl }}
								disabled
								inputContainerStyle={styles.contStyle}
								autoCapitalize='words'
								placeholder={userData?.user_last_name}
							/>
							<Text style={styles.textStyle}>Email:</Text>
							<Input
								disabled
								inputContainerStyle={styles.contStyle}
								autoCapitalize='words'
								placeholder={userData?.user_email}
							/>

							<Text style={styles.textStyle}>Used vouchers:</Text>
							<Input
								disabled
								inputContainerStyle={styles.contStyle}
								autoCapitalize='words'
								placeholder={'TBC'}
							/>
						</View>

						<View style={styles.bottomDivider}>
							<View style={{ paddingBottom: 20 }}>
								<SmlStandardBtn
									buttonLabel={'Sign out'}
									onPress={handleSignOut}
									bgGreen
									fontBlue={false}
								/>
							</View>

							<View style={{ justifyContent: 'center', alignItems: 'center' }}>
								<ClearBtn
									buttonLabel={'Delete my account'}
									onPress={handleDeleteAcc}
									color={COLORS.bgBlue}
								/>
								{/* <Button
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
									onPress={handleDeleteAcc}
								/> */}
							</View>
						</View>
					</>
				) : (
					<View>
						<ActivityIndicator size={'large'} />
					</View>
				)}
			</View>
		</SafeAreaProvider>
	);
};

const styles = StyleSheet.create({
	centerContainer: {
		paddingTop: 30,
		paddingHorizontal: 20,
		display: 'flex',
		justifyContent: 'center',
		// flex: 1,
	},
	bottomDivider: {
		paddingVertical: 5,
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

import { View, StyleSheet, ActivityIndicator } from 'react-native';
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
								style={{ fontSize: FONTSIZES.ml }}
								inputContainerStyle={styles.contStyle}
								autoCapitalize='words'
								placeholder={userData?.user_first_name}
							/>
							<Text style={styles.textStyle}>Last name:</Text>
							<Input
								disabled
								style={{ fontSize: FONTSIZES.ml }}
								inputContainerStyle={styles.contStyle}
								autoCapitalize='words'
								placeholder={userData?.user_last_name}
							/>
							<Text style={styles.textStyle}>Email:</Text>
							<Input
								disabled
								style={{ fontSize: FONTSIZES.ml }}
								inputContainerStyle={styles.contStyle}
								autoCapitalize='words'
								placeholder={userData?.user_email}
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
							</View>
						</View>
					</>
				) : (
					<View
						style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
					>
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
	},
	bottomDivider: {
		paddingVertical: 5,
		paddingHorizontal: 25,
	},
	topDivider: {
		paddingTop: 50,
		paddingHorizontal: 25,
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

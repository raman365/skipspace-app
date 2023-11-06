import { View, StyleSheet, Alert } from 'react-native';
import React from 'react';
import { COLORS, FONTSIZES } from '../../../constants/theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HeaderComponent from '../../components/Header';
import { Button, Icon, Input, Text } from '@rneui/themed';
import TextInput, { autoCap } from '../../components/FormComponents/TextInput';
// import SSButton from '../../components/Button';

// import { getAuth, signOut } from 'firebase/auth';
// import { handleSignOut } from '../../navigation/AuthorisedStack';
import SmlStandardBtn from '../../components/Button/SmallStandardBtn';
import { handleSignOut } from '../../utils/authentication';

// TODO: Replace with user data

const UserAccount = ({ navigation }: any) => {
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
				// onPress={() => {
				// 	navigation.navigate('signedInDashboard');
				// }}
			/>
			{/* <ScreenTitle title={'Vouchers'} /> */}
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
				<TextInput
					inputLabel='First name:'
					placeholder={'Jane'}
					value={''}
					disabled
					autoCapitalize={autoCap.WORDS}
				/>
				<TextInput
					inputLabel='Last name:'
					placeholder={'Doe'}
					value={''}
					disabled
					autoCapitalize={autoCap.WORDS}
				/>
				<TextInput
					inputLabel='Email address:'
					placeholder={'jane.doe@email.com'}
					disabled
					value={''}
					autoCapitalize={autoCap.NONE}
				/>
				<TextInput
					inputLabel='Used vouchers:'
					placeholder={'1'}
					disabled
					value={''}
					autoCapitalize={autoCap.NONE}
				/>
				<View style={styles.bottomDivider}>
					<SmlStandardBtn
						buttonLabel={'Sign out'}
						onPress={handleSignOut}
						bgGreen={false}
						fontBlue={false}
					/>

					<View style={{ paddingVertical: 10, marginHorizontal: 50 }}>
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
});

export default UserAccount;

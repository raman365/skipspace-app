import { View, StyleSheet, Alert } from 'react-native';
import React from 'react';
import { COLORS } from '../../../constants/theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HeaderComponent from '../../components/Header';
import { Button, Icon, Input, Text } from '@rneui/themed';

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
					h4
					h4Style={{
						fontWeight: 'bold',
						textAlign: 'center',
						color: COLORS.bgBlue,
					}}
				>
					Your Account
				</Text>
			</View>
			<View style={styles.centerContainer}>
				<View>
					<Text>First name:</Text>
					<Input
						disabled
						placeholder='Jane'
						// TODO: Replace with user data
					/>
				</View>
				<View>
					<Text>Last name:</Text>
					<Input
						disabled
						placeholder='Doe'
						// TODO: Replace with user data
					/>
				</View>
				<View>
					<Text>Email address:</Text>
					<Input
						disabled
						placeholder='jane.doe@email.com'
						// TODO: Replace with user data
					/>
				</View>
				<View>
					<Text>Used vouchers:</Text>
					<Input
						disabled
						placeholder='1'
						// TODO: Replace with user data
					/>
				</View>
				<View style={styles.bottomDivider}>
					<Button
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
						onPress={() => Alert.alert('Todo: log out')}
					/>
				</View>
				<View style={styles.topDivider}>
					<Button
						title='Delete my account'
						buttonStyle={{
							backgroundColor: COLORS.softRed,
							borderRadius: 5,
							paddingVertical: 10,
						}}
						titleStyle={{
							fontWeight: '700',
							fontSize: 16,
							color: COLORS.white,
						}}
						onPress={() => Alert.alert('Todo: log out')}
					/>
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
		borderBottomColor: COLORS.lightBlue,
		borderBottomWidth: 2,
	},
	topDivider: {
		paddingVertical: 20,
		paddingHorizontal: 25,
		// borderBottomColor: COLORS.lightBlue,
		// borderBottomWidth: 2,
	},
});

export default UserAccount;

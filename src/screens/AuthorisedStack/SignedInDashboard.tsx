import { View, StyleSheet } from 'react-native';
import React from 'react';
import { COLORS } from '../../../constants/theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HeaderComponent from '../../components/Header';
import { Button, Icon } from '@rneui/themed';
import { DrawerActions } from '@react-navigation/native';
import StandardButton from '../../components/Button/StandardBtn';

const SignedInDashboard = ({ navigation }: any) => {
	return (
		<SafeAreaProvider style={{ backgroundColor: COLORS.bgBlue }}>
			<HeaderComponent
				authorised={true}
				icon={
					<Icon name='menu' type='feather' color={COLORS.bgGreen} size={30} />
				}
				onPress={() => {
					navigation.dispatch(DrawerActions.toggleDrawer());
				}}
			/>
			<View style={styles.centerContainer}>
				<View style={{ paddingVertical: 40, paddingHorizontal: 30 }}>
					{/* <Button
						title='Search for SkipSpace'
						buttonStyle={{
							backgroundColor: COLORS.bgGreen,
							borderRadius: 25,
							paddingVertical: 15,
						}}
						titleStyle={{
							fontWeight: '700',
							fontSize: 30,
							color: COLORS.bgBlue,
							fontFamily: 'Tungsten-SemiBold',
						}}
						onPress={() => navigation.navigate('searchSelectCouncil')}
					/> */}
					<StandardButton
						buttonLabel={'Search for SkipSpace'}
						onPress={() => navigation.navigate('searchSelectCouncil')}
						bgGreen={false}
					/>
				</View>
				<View style={{ paddingVertical: 40, paddingHorizontal: 30 }}>
					<Button
						title='View active vouchers'
						buttonStyle={{
							backgroundColor: COLORS.bgGreen,
							borderRadius: 5,
							paddingVertical: 15,
						}}
						titleStyle={{
							fontWeight: '700',
							fontSize: 30,
							color: COLORS.bgBlue,
							fontFamily: 'Tungsten-SemiBold',
						}}
						onPress={() => navigation.navigate('vouchers')}
					/>
				</View>
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
});

export default SignedInDashboard;

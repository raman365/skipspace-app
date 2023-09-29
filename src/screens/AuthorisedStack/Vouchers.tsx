import { View, StyleSheet } from 'react-native';
import React from 'react';
import { COLORS } from '../../../constants/theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HeaderComponent from '../../components/Header';
import { Button, Icon, Text } from '@rneui/themed';
import ScreenTitle from '../../components/ScreenTitle';

const Vouchers = ({ navigation }: any) => {
	return (
		<SafeAreaProvider>
			<HeaderComponent
				authorised={true}
				icon={
					<Icon
						name='arrow-left'
						type='feather'
						color={COLORS.bgGreen}
						size={40}
					/>
				}
				onPress={() => {
					navigation.navigate('signedInDashboard');
				}}
			/>
			{/* <ScreenTitle title={'Vouchers'} /> */}
			<View style={{ paddingTop: 30 }}>
				<Text
					h3
					h3Style={{
						fontWeight: 'bold',
						textAlign: 'center',
						color: COLORS.bgBlue,
					}}
				>
					Vouchers
				</Text>
			</View>
			<View style={styles.centerContainer}>
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
});

export default Vouchers;

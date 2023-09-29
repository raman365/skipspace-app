import { View, StyleSheet } from 'react-native';
import React from 'react';
import { COLORS } from '../../../constants/theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HeaderComponent from '../../components/Header';
import { Button } from '@rneui/themed';

const SignedInDashboard = () => {
	return (
		<SafeAreaProvider style={{ backgroundColor: COLORS.bgBlue }}>
			<HeaderComponent />
			<View style={styles.centerContainer}>
				{/* <Text>SignedInDashboard</Text> */}

				<View style={{ paddingVertical: 40, paddingHorizontal: 30 }}>
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
						onPress={() => console.log('aye')}
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
							fontSize: 16,
							color: COLORS.bgBlue,
						}}
						onPress={() => console.log('aye')}
					/>
				</View>
			</View>
		</SafeAreaProvider>
	);
};

const styles = StyleSheet.create({
	centerContainer: {
		paddingHorizontal: 20,
		display: 'flex',
		justifyContent: 'center',
		// flex: 1,
	},
});

export default SignedInDashboard;

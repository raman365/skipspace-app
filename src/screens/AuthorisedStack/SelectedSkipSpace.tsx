import { View, StyleSheet } from 'react-native';
import React from 'react';
import { COLORS, FONTSIZES } from '../../../constants/theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HeaderComponent from '../../components/Header';
import { Button, Icon, Text } from '@rneui/themed';
import ScreenTitle from '../../components/ScreenTitle';

const SelectedSkipSpace = ({ navigation }: any) => {
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
					navigation.navigate('selectCouncil');
				}}
			/>
			{/* <ScreenTitle title={'Vouchers'} /> */}
			<View style={{ paddingTop: 30 }}>
				<Text
					h4
					h4Style={{
						fontWeight: 'bold',
						textAlign: 'center',
						color: COLORS.bgBlue,
						fontSize: 30,
						fontFamily: 'Tungsten-SemiBold',
					}}
				>
					Selected SkipSpace
				</Text>
			</View>
			<View style={styles.centerContainer}>
				<View>
					<Text
						h4
						h4Style={{
							fontWeight: '600',
							color: COLORS.bgBlue,
							fontFamily: 'Tungsten-SemiBold',
						}}
					>
						Council:
					</Text>
					<Text></Text>
				</View>
				<View>
					<Text
						h4
						h4Style={{
							fontWeight: '600',
							color: COLORS.bgBlue,
							fontFamily: 'Tungsten-SemiBold',
						}}
					>
						Name of skip company:
					</Text>
					<Text></Text>
				</View>
				<View>
					<Text
						h4
						h4Style={{
							fontWeight: '600',
							color: COLORS.bgBlue,
							fontFamily: 'Tungsten-SemiBold',
						}}
					>
						Address:
					</Text>
					<Text></Text>
				</View>
				<View>
					<Text
						style={{
							fontSize: 18,
							fontWeight: '700',
							color: COLORS.bgBlue,
							textAlign: 'center',
							textDecorationLine: 'underline',
							fontFamily: 'Open-Sans-SemiCond-Reg',
						}}
					>
						View on Maps
					</Text>
				</View>
			</View>
			<View style={{ paddingVertical: 40, paddingHorizontal: 30 }}>
				<View
					style={{
						paddingVertical: 10,
						paddingHorizontal: 10,
						borderColor: COLORS.bgBlue,
						borderWidth: 1,
						marginTop: 10,
						marginBottom: 20,
					}}
				>
					<Text style={{ textAlign: 'center', fontWeight: '400' }}>
						After confirmation, you'll receive a one-time voucher to use at your
						selected SkipSpace site.
					</Text>
				</View>
				<Button
					title='Confirm Voucher'
					buttonStyle={{
						backgroundColor: COLORS.bgGreen,
						borderRadius: 30,
						paddingVertical: 15,
					}}
					titleStyle={{
						fontWeight: '700',
						fontSize: FONTSIZES.xl,
						color: COLORS.bgBlue,
					}}
					onPress={() => navigation.navigate('voucherConfirmation')}
				/>
			</View>
		</SafeAreaProvider>
	);
};

const styles = StyleSheet.create({
	centerContainer: {
		paddingTop: 50,
		paddingHorizontal: 40,
		display: 'flex',
		justifyContent: 'center',
		flex: 1,
	},
});

export default SelectedSkipSpace;

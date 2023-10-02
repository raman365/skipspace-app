import { View, StyleSheet } from 'react-native';
import React from 'react';
import { COLORS } from '../../../constants/theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HeaderComponent from '../../components/Header';
import { Button, Icon, Text } from '@rneui/themed';
import ScreenTitle from '../../components/ScreenTitle';

const SkipSpaceResults = ({ navigation }: any) => {
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
					}}
				>
					Results
				</Text>
				<Text
					style={{
						color: COLORS.bgBlue,
						padding: 20,
						textAlign: 'center',
					}}
				>
					Choose a SkipSpace below. Tap to see more information
				</Text>
			</View>
			<View style={styles.centerContainer}>
				{/* <View style={{ paddingVertical: 40, paddingHorizontal: 30 }}>*/}
				<Button
					title='SkipSpace result'
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
					onPress={() => navigation.navigate('selectedSkipSpace')}
				/>
				{/*</View> */}
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

export default SkipSpaceResults;

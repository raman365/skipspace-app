import { View, StyleSheet } from 'react-native';
import React from 'react';
import { COLORS } from '../../../constants/theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HeaderComponent from '../../components/Header';
import { Button, Icon, ListItem, Text } from '@rneui/themed';

const Help = ({ navigation }: any) => {
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
						fontSize: 30,
						fontFamily: 'Tungsten_SemiBold',
					}}
				>
					Help
				</Text>
			</View>
			<View style={styles.centerContainer}>
				<View style={{ paddingVertical: 10, paddingHorizontal: 30 }}>
					<View
						style={{
							paddingVertical: 10,
							paddingHorizontal: 10,
							borderColor: COLORS.bgBlue,
							borderWidth: 1,
							marginTop: 10,
							// marginBottom: 20,
						}}
					>
						<Text
							style={{
								textDecorationLine: 'underline',
								textAlign: 'center',
								paddingVertical: 10,
								fontWeight: 'bold',
								fontSize: 16,
							}}
						>
							Instructions:
						</Text>
						<ListItem style={{ backgroundColor: COLORS.white }}>
							<ListItem.Content>
								<ListItem.Title style={styles.listItemTitle}>
									1. Arrive at your SkipSpace site.
								</ListItem.Title>
								<ListItem.Title style={styles.listItemTitle}>
									2. Show this QR code to the security staff when you arrive.
								</ListItem.Title>
								<ListItem.Title style={styles.listItemTitle}>
									3. This QR code will expire within 24 hours of first issue.
								</ListItem.Title>
							</ListItem.Content>
						</ListItem>
					</View>
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
	},

	listItemTitle: {
		paddingVertical: 5,
		fontSize: 12,
		fontWeight: 'bold',
	},
	listItemTitle1: {
		paddingVertical: 5,
		fontSize: 12,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	listItemSubtitle: {
		paddingVertical: 5,
		fontSize: 11,
	},
});

export default Help;

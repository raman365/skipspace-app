import { View, StyleSheet } from 'react-native';
import React from 'react';
import { COLORS } from '../../../constants/theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HeaderComponent from '../../components/Header';
import { Button, Icon, Text, ListItem } from '@rneui/themed';
import QREncoder from '../../components/QREncoder';

const Vouchers = ({ navigation }: any) => {
	const stringExample =
		'Location Name: Skips are us | Address: 123 Fake Lane, E17 123. This is an example of a QR code';

	return (
		<SafeAreaProvider>
			<HeaderComponent
				authorised={false}
				icon={
					<Icon name='menu' type='feather' color={COLORS.bgGreen} size={40} />
				}
				onPress={() => {
					navigation.toggleDrawer();
				}}
			/>

			<View>
				<View style={{ paddingTop: 20 }}>
					<Text
						h4
						h4Style={{
							fontWeight: 'bold',
							textAlign: 'center',
							color: COLORS.bgBlue,
							fontSize: 20,
							fontFamily: 'Tungsten-SemiBold',
						}}
					>
						Voucher Confirmation
					</Text>
				</View>

				<View
					style={{
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<QREncoder codeValue={stringExample} />
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
						{/* <Text style={{ textAlign: 'left', fontWeight: '400' }}> */}
						<ListItem style={{ backgroundColor: COLORS.white }}>
							<ListItem.Content>
								<ListItem.Title style={styles.listItemTitle}>
									1. Go to your SkipSpace site.
								</ListItem.Title>
								<ListItem.Title style={styles.listItemTitle}>
									2. Show this QR code to the security staff when you arrive.
								</ListItem.Title>
								<ListItem.Title style={styles.listItemTitle}>
									3. This QR code will expire in 24 hours and can also be found
									in the Vouchers section.
								</ListItem.Title>
							</ListItem.Content>
						</ListItem>
						{/* </Text> */}
					</View>
					<Button
						title='Return Home'
						buttonStyle={{
							backgroundColor: COLORS.bgGreen,
							borderRadius: 30,
							paddingVertical: 15,
						}}
						titleStyle={{
							fontWeight: '700',
							fontSize: 16,
							color: COLORS.bgBlue,
						}}
						onPress={() => navigation.navigate('SignedInDashboard')}
					/>
				</View>
			</View>

			{/* <View
				style={{
					marginHorizontal: 10,
					
				}}
			>
				<View style={{ paddingVertical: 10 }}>
					<Text style={styles.listItemTitle1}> Name:</Text>
					<Text style={{ textAlign: 'center' }}> Example name</Text>
				</View>
				<View>
					<Text style={styles.listItemTitle1}> Address:</Text>
					<Text style={{ textAlign: 'center', marginVertical: 10 }}>
						{' '}
						Example Address
					</Text>
					<Text
						style={{ textAlign: 'center', textDecorationLine: 'underline' }}
					>
						{' '}
						View on maps
					</Text>
				</View>
			</View> */}
		</SafeAreaProvider>
	);
};

const styles = StyleSheet.create({
	centerContainer: {
		// paddingTop: 20,
		// paddingHorizontal: 20,
		// display: 'flex',
		// justifyContent: 'flex-end',
		// alignContent: 'space-between',
		// flex: 1,
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

export default Vouchers;

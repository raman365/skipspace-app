import React from 'react';

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BottomSheet, ListItem } from '@rneui/themed';

import { COLORS, FONTSIZES } from '../../../constants/theme';
import ScreenTitle from '../ScreenTitle';
import QREncoder from '../QREncoder';
import StandardButton from '../Button/StandardBtn';
import Subtitle from '../Subtitle';
import CountdownTimer from '../Timer';
import { windowHeight } from '../../utils/dimensions';

interface ISkipOptionsSheetProps {
	isVisible: boolean;
	onCancelPress: () => void;
	onVoucherPress: () => void;
	councilName?: string;
	skipCompany?: string;
	skipCompanyAddress?: string;
	// qrCode: React.ReactElement;
	// skipCompanyName: string
	// skipCompanyAddress: string
	// mapLink: string
	// expiryDate: Date | string
}

const SkipOptionsSheet: React.FC<ISkipOptionsSheetProps> = ({
	isVisible = false,
	onCancelPress,
	onVoucherPress,
	councilName,
	skipCompany,
	skipCompanyAddress,
}) => {
	return (
		<BottomSheet
			isVisible={isVisible}
			onBackdropPress={onCancelPress}
			modalProps={{}}
			containerStyle={{
				backgroundColor: COLORS.white,
				flex: 1,
				justifyContent: 'space-between',
				padding: 20,
			}}
		>
			<View style={styles.top}>
				{/* <ScreenTitle title={`Results from ${councilName}`} /> */}
				<View style={{ paddingTop: 20 }}>
					<ScreenTitle title={`Selected SkipSpace `} />
					<TouchableOpacity onPress={onCancelPress}>
						<Text>Back</Text>
					</TouchableOpacity>
				</View>
				<Text
					style={{
						textAlign: 'center',
						paddingVertical: 10,
						fontSize: FONTSIZES.xl,
					}}
				>
					{councilName} council
				</Text>
			</View>
			<View style={styles.middle}>
				<Text>SkipSpace Details:</Text>

				<View style={{ flexDirection: 'row', marginVertical: 10 }}>
					<Text style={{ fontWeight: 'bold' }}>Name of Skip company: </Text>
					{/* <Text>{skipCompany}</Text> */}
					<Text>{skipCompany}</Text>
				</View>

				<View style={{ marginVertical: 10 }}>
					<Text style={{ fontWeight: 'bold' }}>Address: </Text>
					<Text>{skipCompanyAddress}</Text>
				</View>

				<View>
					{/* convert google map link to component */}
					<Text style={{ textDecorationLine: 'underline' }}>View on Maps</Text>
				</View>
			</View>
			<View style={styles.bottom}>
				<View
					style={{ borderColor: COLORS.bgBlue, borderWidth: 2, padding: 20 }}
				>
					<Text style={{ textAlign: 'center', fontSize: FONTSIZES.large }}>
						After confirming you'll receive a one-time voucher to use at your
						selected SkipSpace site.
					</Text>
				</View>

				<View style={{ paddingTop: 20 }}>
					<StandardButton
						buttonLabel={'Confirm Voucher'}
						onPress={onVoucherPress}
						bgGreen
						fontBlue={false}
					/>
				</View>
			</View>
			{/* <View style={{ paddingTop: 10, paddingBottom: 10 }}> */}

			{/* <View style={styles.mainContainer}>
				<View style={{ paddingTop: 10, paddingBottom: 10 }}>
					<ScreenTitle title={`Results from ${councilName}`} />
				</View>

				<View style={{ paddingBottom: 30, paddingHorizontal: 30 }}>
					<StandardButton
						bgGreen
						fontBlue
						buttonLabel={'Back'}
						onPress={onCancelPress}
					/>
				</View>
			</View> */}
		</BottomSheet>
	);
};

export default SkipOptionsSheet;

const styles = StyleSheet.create({
	mainContainer: {
		backgroundColor: COLORS.white,
		padding: 30,

		flex: 1,
		justifyContent: 'space-between',

		margin: 10,
		// height: '100%',
		// borderTopLeftRadius: 30,
		// borderTopRightRadius: 30,
		// flex: 1,
	},
	container: {
		flex: 1,
		justifyContent: 'space-between',
		backgroundColor: '#fff',
		padding: 20,
		margin: 10,
	},
	top: {
		flex: 0.3,
		height: windowHeight / 3,
		paddingTop: 20,
	},

	middle: {
		flex: 0.3,
		height: windowHeight / 3,
		margin: 10,
	},

	bottom: {
		flex: 0.3,
		height: windowHeight / 3,
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
	},

	viewSection: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 15,
	},
	voucherTicketTop: {
		paddingTop: 10,
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

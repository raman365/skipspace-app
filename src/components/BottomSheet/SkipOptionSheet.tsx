import React from 'react';

import { StyleSheet, Text, View } from 'react-native';
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
	// councilName?: string;
	// skipCompany?: string;
	// qrCode: React.ReactElement;
	// skipCompanyName: string
	// skipCompanyAddress: string
	// mapLink: string
	// expiryDate: Date | string
}

const SkipOptionsSheet: React.FC<ISkipOptionsSheetProps> = ({
	isVisible = false,
	onCancelPress,
	// councilName,
	// skipCompany,
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
			{/* <View style={styles.top}>
				<ScreenTitle title={`Results from ${councilName}`} />
			</View> */}
			{/* <View style={styles.middle}>
				<Text>{skipCompany}</Text>
			</View> */}
			<View style={styles.bottom} />
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

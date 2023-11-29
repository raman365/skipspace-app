import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Icon, ListItem } from '@rneui/base';
import { COLORS, FONTSIZES } from '../../../constants/theme';

import dayjs from 'dayjs';
// TODO - Ask whats the purpose of haveing an expiry date? when users can just go and issue another one

interface IProps {
	hasBeenUsed?: boolean;
	dateUsed?: Date | string;
	nameOfCompany?: string;
	address?: string;
	dateIssued: string; // TODO Date maths
	dateExpires: string;
	onPress?: () => void;
}
const VoucherItem: React.FC<IProps> = ({
	hasBeenUsed = false,
	dateUsed,
	nameOfCompany,
	address,
	dateIssued,
	dateExpires,
	onPress,
}) => {
	return (
		<TouchableOpacity
			onPress={onPress}
			style={styles.voucherItem}
			disabled={hasBeenUsed}
		>
			<ListItem>
				<Icon
					name='qrcode'
					type='material-community'
					color={hasBeenUsed ? COLORS.lightGrey : COLORS.black}
				/>
				<ListItem.Content>
					<View style={{ paddingBottom: 5 }}>
						<ListItem.Subtitle
							style={{ color: hasBeenUsed ? COLORS.lightGrey : COLORS.black }}
						>
							<Text style={{ fontWeight: 'bold', fontSize: FONTSIZES.ml }}>
								Name:{' '}
							</Text>
							<Text style={{ fontSize: FONTSIZES.ml }}>{nameOfCompany}</Text>
						</ListItem.Subtitle>
					</View>
					<View>
						<ListItem.Subtitle
							style={{
								color: hasBeenUsed ? COLORS.lightGrey : COLORS.black,
							}}
						>
							<View style={{ paddingTop: 5 }}>
								<Text style={{ fontWeight: 'bold', fontSize: FONTSIZES.ml }}>
									Address:{' '}
								</Text>
								<Text style={{ fontSize: FONTSIZES.ml }}>{address}</Text>
							</View>
						</ListItem.Subtitle>
					</View>
					<View>
						<ListItem.Subtitle
							style={{
								color: hasBeenUsed ? COLORS.lightGrey : COLORS.black,
								paddingTop: 5,
							}}
						>
							<Text
								style={{
									fontWeight: 'bold',
									fontSize: FONTSIZES.ml,
								}}
							>
								Expires:{' '}
							</Text>
							<Text style={{ fontSize: FONTSIZES.ml }}>
								{/* {dateIssued} */}
								{dateExpires}
								{/*{console.log(new Date())}
								{console.log('day is: ', now.format('DD/MM/YYYY hh:mm:ss'))} */}

								{/* {console.log(dayjs(dateIssued))} */}
							</Text>
						</ListItem.Subtitle>
					</View>
					{hasBeenUsed ? (
						<View style={{ paddingVertical: 5 }}>
							<ListItem.Subtitle
								style={{ color: hasBeenUsed ? COLORS.lightGrey : COLORS.black }}
							>
								<Text style={{ fontWeight: 'bold' }}>Used: </Text>
								<Text>{dateUsed}</Text>
							</ListItem.Subtitle>
						</View>
					) : null}
				</ListItem.Content>
				{hasBeenUsed ? null : (
					<ListItem.Chevron size={24} color={COLORS.black} />
				)}
			</ListItem>
		</TouchableOpacity>
	);
};

export default VoucherItem;

const styles = StyleSheet.create({
	voucherItem: {
		// marginBottom: 10,
		borderTopColor: COLORS.lightGrey,
		// borderTopWidth: 1,
		borderBottomColor: COLORS.lightGrey,
		borderBottomWidth: 1,
	},
});

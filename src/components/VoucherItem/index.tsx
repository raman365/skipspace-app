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
	dateTimeIssued: string; // TODO Date maths
	dateExpires?: string;
	onPress?: () => void;
}

const CardItems: React.FC<{
	color: string;
	name: string;
	nameOfCompany: string;
}> = ({ color, name, nameOfCompany }) => {
	return (
		<ListItem.Subtitle style={{ color: `${color}` }}>
			<Text style={{ fontWeight: 'bold', fontSize: FONTSIZES.large }}>
				{name}
			</Text>
			<Text style={{ fontSize: FONTSIZES.large }}>{nameOfCompany}</Text>
		</ListItem.Subtitle>
	);
};
const VoucherItem: React.FC<IProps> = ({
	hasBeenUsed = false,
	dateUsed,
	nameOfCompany,
	address,
	onPress,
}) => {
	return (
		<TouchableOpacity
			onPress={onPress}
			style={styles.voucherItem}
			disabled={hasBeenUsed}
		>
			<ListItem style={{ padding: 0 }} bottomDivider>
				<Icon
					name='qrcode'
					type='material-community'
					color={hasBeenUsed ? COLORS.lightGrey : COLORS.black}
				/>
				<ListItem.Content>
					<View style={{ justifyContent: 'center', alignItems: 'center' }}>
						<ListItem.Subtitle
							style={{
								color: hasBeenUsed ? COLORS.lightGrey : COLORS.black,
								paddingBottom: 5,
							}}
						>
							<Text style={{ fontSize: FONTSIZES.medium }}>
								{nameOfCompany}
							</Text>
						</ListItem.Subtitle>
					</View>

					<View>
						<ListItem.Subtitle
							style={{ color: hasBeenUsed ? COLORS.lightGrey : COLORS.black }}
						>
							<View style={{ flexDirection: 'row' }}>
								<Text
									style={{
										fontSize: FONTSIZES.medium,
										color: hasBeenUsed ? COLORS.lightGrey : COLORS.black,
									}}
								>
									{address}
								</Text>
							</View>
						</ListItem.Subtitle>
					</View>

					{/* {hasBeenUsed ? (
						<View>
							<ListItem.Subtitle
								style={{ color: hasBeenUsed ? COLORS.lightGrey : COLORS.black }}
							>
								<Text style={{ fontSize: FONTSIZES.medium }}>{dateUsed}</Text>
							</ListItem.Subtitle>
						</View>
					) : null} */}
				</ListItem.Content>

				{hasBeenUsed ? null : (
					<ListItem.Chevron size={20} color={COLORS.black} />
				)}
			</ListItem>
		</TouchableOpacity>
	);
};

export default VoucherItem;

const styles = StyleSheet.create({
	voucherItem: {
		// borderTopColor: COLORS.lightGrey,
		// borderBottomColor: COLORS.lightGrey,
		// borderBottomWidth: 0.5,
	},
});

import {
	Pressable,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import React from 'react';
import { Icon, ListItem } from '@rneui/base';
import { COLORS } from '../../../constants/theme';

interface IProps {
	hasBeenUsed?: boolean;
	dateUsed?: Date | string;
	nameOfCompany?: string;
	address?: string;
	onPress?: () => void;
}
const VoucherItem: React.FC<IProps> = ({
	hasBeenUsed = false,
	dateUsed,
	nameOfCompany,
	address,
	onPress,
}) => {
	return (
		<Pressable
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
							<Text style={{ fontWeight: 'bold' }}>Name: </Text>
							<Text>{nameOfCompany}</Text>
						</ListItem.Subtitle>
					</View>
					<View>
						<ListItem.Subtitle
							style={{ color: hasBeenUsed ? COLORS.lightGrey : COLORS.black }}
						>
							<Text style={{ fontWeight: 'bold' }}>Address: </Text>
							<Text>{address}</Text>
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
		</Pressable>
	);
};

export default VoucherItem;

const styles = StyleSheet.create({
	voucherItem: {
		marginVertical: 10,
		borderTopColor: COLORS.lightGrey,
		borderTopWidth: 1,
		borderBottomColor: COLORS.lightGrey,
		borderBottomWidth: 1,
	},
});

// import { ListItem } from '@rneui/themed';
// import { View, Text}

// // icon
// // name of company
// // address
// // isUsed
// // date used
// // colour

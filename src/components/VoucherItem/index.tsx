import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Icon, ListItem } from '@rneui/base';
import { COLORS, FONTSIZES } from '../../../constants/theme';

interface IVoucherItemProps {
	voucher: any;

	hasBeenUsed: boolean;
	onPress: (voucher: any) => void;
}

const VoucherItem: React.FC<IVoucherItemProps> = ({ voucher, onPress }) => {
	const { skip_company_address, voucher_used } = voucher;

	return (
		<TouchableOpacity onPress={() => onPress(voucher)} disabled={voucher_used}>
			<ListItem style={{ padding: 0 }} bottomDivider>
				<Icon
					name='qrcode'
					type='material-community'
					color={voucher_used ? COLORS.lightGrey : COLORS.black}
				/>
				<ListItem.Content>
					<ListItem.Subtitle
						style={{
							color: voucher_used ? COLORS.lightGrey : COLORS.black,
						}}
					>
						<Text
							numberOfLines={3}
							style={{
								fontSize: FONTSIZES.medium,
								color: voucher_used ? COLORS.lightGrey : COLORS.black,
							}}
						>
							{skip_company_address}
						</Text>
					</ListItem.Subtitle>
				</ListItem.Content>

				{!voucher_used && <ListItem.Chevron size={20} color={COLORS.black} />}
			</ListItem>
		</TouchableOpacity>
	);
};

export default VoucherItem;

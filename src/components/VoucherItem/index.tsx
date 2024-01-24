import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Icon, ListItem } from '@rneui/base';
import { COLORS, FONTSIZES } from '../../../constants/theme';

interface IProps {
	hasBeenUsed?: boolean;
	dateUsed?: Date | string;
	nameOfCompany?: string;
	address?: string;
	dateTimeIssued: string;
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
	address,
	onPress,
}) => {
	return (
		<TouchableOpacity onPress={onPress} disabled={hasBeenUsed}>
			<ListItem style={{ padding: 0 }} bottomDivider>
				<Icon
					name='qrcode'
					type='material-community'
					color={hasBeenUsed ? COLORS.lightGrey : COLORS.black}
				/>
				<ListItem.Content>
					<View>
						<ListItem.Subtitle
							style={{ color: hasBeenUsed ? COLORS.lightGrey : COLORS.black }}
						>
							<View style={{ flexDirection: 'row' }}>
								<Text
									style={{
										paddingTop: 5,
										fontSize: FONTSIZES.medium,
										color: hasBeenUsed ? COLORS.lightGrey : COLORS.black,
									}}
								>
									{address}
								</Text>
							</View>
						</ListItem.Subtitle>
					</View>
				</ListItem.Content>

				{hasBeenUsed ? null : (
					<ListItem.Chevron size={20} color={COLORS.black} />
				)}
			</ListItem>
		</TouchableOpacity>
	);
};

export default VoucherItem;

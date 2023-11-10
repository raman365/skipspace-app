import {
	Pressable,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import React from 'react';
import { Icon } from '@rneui/base';
import { COLORS, FONTSIZES } from '../../../constants/theme';

interface IProps {
	councilName: string;
	onPress: () => void;
}

const BoroughSearchButton: React.FC<IProps> = ({ councilName, onPress }) => {
	return (
		<TouchableOpacity
			onPress={onPress}
			style={{
				margin: 15,
				paddingHorizontal: 15,
				paddingVertical: 20,
				borderRadius: 15,
				borderWidth: 1,
				borderColor: COLORS.lightGrey,
				flexDirection: 'row',
				justifyContent: 'center',
				alignContent: 'space-between',
			}}
			// onpress show skip spaces in the borough
		>
			<View>
				<Text
					style={{
						fontSize: FONTSIZES.xl,
						textAlign: 'center',
						color: COLORS.bgBlue,
						fontWeight: 'bold',
					}}
				>
					{councilName}
				</Text>
			</View>
			<View style={{ justifyContent: 'flex-end' }}>
				<Icon name='chevron-right' type='FontAwesome' color={COLORS.bgBlue} />
			</View>
		</TouchableOpacity>
	);
};

export default BoroughSearchButton;

const styles = StyleSheet.create({});

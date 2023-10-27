import { View, StyleSheet } from 'react-native';
import { Text } from '@rneui/themed';
import { COLORS, FONTSIZES } from '../../../constants/theme';
import { Button } from '@rneui/themed';

interface ISmlStandardBtnProps {
	buttonLabel: string;
	onPress: () => void;
	bgGreen: boolean;
	fontBlue: boolean;
}

export const SmlStandardBtn: React.FC<ISmlStandardBtnProps> = ({
	buttonLabel,
	bgGreen,
	fontBlue,
	onPress,
}) => {
	return (
		<View style={{ paddingVertical: 10, marginHorizontal: 50 }}>
			<Button
				title={buttonLabel}
				buttonStyle={{
					backgroundColor: bgGreen ? COLORS.bgGreen : COLORS.bgBlue,
					borderRadius: 25,
				}}
				titleStyle={{
					fontWeight: '700',
					fontSize: FONTSIZES.large,
					color: fontBlue ? COLORS.bgBlue : COLORS.white,
				}}
				onPress={onPress}
			/>
		</View>
	);
};

export default SmlStandardBtn;

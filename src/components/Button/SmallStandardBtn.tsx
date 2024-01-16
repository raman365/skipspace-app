import { View } from 'react-native';
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
		<View style={{ padding: 20, marginHorizontal: 50 }}>
			<Button
				title={buttonLabel}
				buttonStyle={{
					backgroundColor: bgGreen ? COLORS.bgGreen : COLORS.bgBlue,
					borderRadius: 25,
					paddingHorizontal: 20,
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

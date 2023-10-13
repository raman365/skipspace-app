import { View, StyleSheet } from 'react-native';
import { Text } from '@rneui/themed';
import { COLORS, FONTSIZES } from '../../../constants/theme';
import { Button } from '@rneui/themed';

interface IStandardButtonProps {
	buttonLabel: string;
	onPress: () => void;
	bgGreen: boolean;
	fontBlue: boolean;
}

export const StandardButton: React.FC<IStandardButtonProps> = ({
	buttonLabel,
	bgGreen,
	fontBlue,
	onPress,
}) => {
	return (
		<Button
			title={buttonLabel}
			buttonStyle={{
				backgroundColor: bgGreen ? COLORS.bgGreen : COLORS.bgBlue,
				borderRadius: 25,
				paddingVertical: 13,
				marginVertical: 10,
				marginHorizontal: 10,
			}}
			titleStyle={{
				fontWeight: '700',
				fontSize: FONTSIZES.xl,
				color: fontBlue ? COLORS.bgBlue : COLORS.white,
				// fontFamily: 'Tungsten-SemiBold',
			}}
			onPress={onPress}
		/>
	);
};

export default StandardButton;

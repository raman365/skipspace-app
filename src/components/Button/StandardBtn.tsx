import { View, StyleSheet } from 'react-native';
import { Text } from '@rneui/themed';
import { COLORS, FONTSIZES } from '../../../constants/theme';
import { Button } from '@rneui/themed';

interface IStandardButtonProps {
	buttonLabel: string;
	onPress: () => void;
	bgGreen: boolean;
}

export const StandardButton: React.FC<IStandardButtonProps> = ({
	buttonLabel,
	onPress,
}) => {
	return (
		<Button
			title={buttonLabel}
			buttonStyle={{
				backgroundColor: COLORS.bgBlue,
				borderRadius: 25,
				paddingVertical: 15,
			}}
			titleStyle={{
				fontWeight: '700',
				fontSize: FONTSIZES.xl,
				color: COLORS.white,
				// fontFamily: 'Tungsten-SemiBold',
			}}
			onPress={onPress}
		/>
	);
};

export default StandardButton;

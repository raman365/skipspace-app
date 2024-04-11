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
			accessibilityLabel={buttonLabel}
			title={buttonLabel}
			buttonStyle={{
				backgroundColor: bgGreen ? COLORS.bgGreen : COLORS.bgBlue,
				borderRadius: 25,
				paddingVertical: 13,
				paddingHorizontal: 20,
				marginVertical: 10,
				marginHorizontal: 10,
			}}
			titleStyle={{
				fontWeight: '700',
				fontSize: FONTSIZES.xl,
				color: fontBlue ? COLORS.bgBlue : COLORS.white,
			}}
			onPress={onPress}
		/>
	);
};

export default StandardButton;

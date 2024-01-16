import { COLORS } from '../../../constants/theme';
import { Button } from '@rneui/themed';

interface ISSButtonProps {
	buttonLabel: string;
	onPress: () => void;
	bgGreen: boolean;
}

export const SSButton: React.FC<ISSButtonProps> = ({
	buttonLabel,
	onPress,
	bgGreen,
}) => {
	return (
		<Button
			title={buttonLabel}
			buttonStyle={{
				backgroundColor: bgGreen ? COLORS.bgGreen : COLORS.bgBlue,
				borderRadius: 25,
				paddingVertical: 12,
			}}
			titleStyle={{
				fontWeight: '700',
				fontSize: 20,
				color: COLORS.white,
			}}
			onPress={onPress}
		/>
	);
};

export default SSButton;

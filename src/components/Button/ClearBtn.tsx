import { COLORS, FONTSIZES } from '../../../constants/theme';
import { Button } from '@rneui/themed';

interface IStandardButtonProps {
	buttonLabel: string;
	onPress: () => void;
	color?: string;
	fontSize?: 'large' | 'small';
}

export const ClearBtn: React.FC<IStandardButtonProps> = ({
	buttonLabel,
	onPress,
	color = COLORS.bgGreen,
	fontSize,
}) => {
	return (
		<Button
			title={buttonLabel}
			type='clear'
			titleStyle={{
				fontWeight: '700',
				fontSize: fontSize === 'large' ? FONTSIZES.xl : FONTSIZES.large,
				color: `${color}`,
				textAlign: 'left',
			}}
			buttonStyle={{
				display: 'flex',
				alignItems: 'flex-start',
				justifyContent: 'flex-start',
			}}
			onPress={onPress}
		/>
	);
};

export default ClearBtn;

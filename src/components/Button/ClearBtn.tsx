import { View, StyleSheet } from 'react-native';
import { Text } from '@rneui/themed';
import { COLORS, FONTSIZES } from '../../../constants/theme';
import { Button } from '@rneui/themed';

interface IStandardButtonProps {
	buttonLabel: string;
	onPress: () => void;
}

export const ClearBtn: React.FC<IStandardButtonProps> = ({
	buttonLabel,
	onPress,
}) => {
	return (
		<Button
			title={buttonLabel}
			type='clear'
			titleStyle={{
				fontWeight: '700',
				fontSize: FONTSIZES.xl,
				color: COLORS.bgGreen,
				textAlign: 'left',
			}}
			buttonStyle={{
				display: 'flex',
				alignItems: 'flex-start',
				justifyContent: 'flex-start',
				// paddingBottom: 20,
			}}
			onPress={onPress}
		/>
	);
};

export default ClearBtn;

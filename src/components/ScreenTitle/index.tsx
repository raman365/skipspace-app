import { View, Text } from 'react-native';
import { COLORS, FONTSIZES } from '../../../constants/theme';
import {} from '@rneui/themed';

interface IScreenTitleProps {
	title: string;
}

const ScreenTitle: React.FC<IScreenTitleProps> = ({ title }) => {
	return (
		<View style={{ paddingTop: 20 }}>
			<Text
				style={{
					textAlign: 'center',
					fontFamily: 'Tungsten_SemiBold',
					color: COLORS.bgBlue,
					fontSize: FONTSIZES['5xl'],
				}}
			>
				{title}
			</Text>
		</View>
	);
};

export default ScreenTitle;

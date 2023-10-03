import { View, StyleSheet } from 'react-native';
import { Text } from '@rneui/themed';
import { COLORS } from '../../../constants/theme';
import {} from '@rneui/themed';

interface IScreenTitleProps {
	title: string;
}

const ScreenTitle: React.FC<IScreenTitleProps> = ({ title }) => {
	return (
		<View style={{ paddingTop: 30 }}>
			<Text
				h2
				h2Style={{
					fontWeight: 'bold',
					textAlign: 'center',
					fontFamily: 'Tungsten-SemiBold',
					color: COLORS.bgBlue,
				}}
			>
				{title}
			</Text>
		</View>
	);
};

export default ScreenTitle;

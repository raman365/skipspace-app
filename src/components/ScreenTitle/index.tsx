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
			<Text h3 h3Style={{ fontWeight: 'bold', textAlign: 'center' }}>
				{title}
			</Text>
		</View>
	);
};

export default ScreenTitle;

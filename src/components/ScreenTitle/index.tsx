import { View, StyleSheet, Text } from 'react-native';
// import { Text } from '@rneui/themed';
import { COLORS, FONTSIZES } from '../../../constants/theme';
import {} from '@rneui/themed';

interface IScreenTitleProps {
	title: string;
}

const ScreenTitle: React.FC<IScreenTitleProps> = ({ title }) => {
	return (
		<View style={{ paddingTop: 20 }}>
			{/* <Text
				h2
				h2Style={{
					// fontWeight: '800',
					textAlign: 'center',
					fontFamily: 'tungsten_med',
					color: COLORS.bgBlue,
				}}
			> */}
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

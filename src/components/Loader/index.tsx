import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS } from '../../../constants/theme';

interface ISSButtonProps {
	size: 'small' | 'large';
}

export const Loader: React.FC<ISSButtonProps> = ({ size }) => {
	return (
		<View style={styles.loadingContainer}>
			<ActivityIndicator size={size} color={COLORS.bgBlue} />
		</View>
	);
};

const styles = StyleSheet.create({
	loadingContainer: {
		alignItems: 'center',
		justifyContent: 'center',
	},
});
export default Loader;

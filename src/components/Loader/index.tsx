import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS } from '../../../constants/theme';

interface ISSButtonProps {
	size: 'small' | 'large';
}

export const Loader: React.FC<ISSButtonProps> = ({ size }) => {
	return (
		<>
			<ActivityIndicator size={size} color={COLORS.bgBlue} />
		</>
	);
};

export default Loader;

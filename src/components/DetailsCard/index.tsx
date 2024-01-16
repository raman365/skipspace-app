import { Card } from '@rneui/base';
import { TouchableOpacity, View, Text } from 'react-native';

interface IProps {
	cardHeading: string;
	cardSubheading: string;
	onPress: () => void;
}

export const DetailsCard: React.FC<IProps> = ({
	cardHeading,
	cardSubheading,
	onPress,
}) => {
	return (
		<TouchableOpacity onPress={onPress}>
			<Card>
				<Card.Title style={{ textAlign: 'left' }}>{cardHeading}</Card.Title>
				<Card.Divider />
				<View>
					<Text style={{ textAlign: 'left' }}>{cardSubheading}</Text>
				</View>
			</Card>
		</TouchableOpacity>
	);
};

import { View, StyleSheet, Dimensions } from 'react-native';
import { Card, Text } from '@rneui/themed';
import { COLORS } from '../../../constants/theme';
import {} from '@rneui/themed';

interface ICardProps {
	cardLabel: string;
	cardImage: string;
}

const CardWithImage: React.FC<ICardProps> = ({ cardLabel, cardImage }) => {
	return (
		<Card
			containerStyle={{
				backgroundColor: COLORS.white,
				borderColor: COLORS.white,
				shadowColor: COLORS.white,
			}}
		>
			<Card.Image
				style={{ padding: 0 }}
				source={{
					uri: `${cardImage}`,
				}}
			/>
			<Card.Divider color={COLORS.lightBlue} style={{}} />
			<Card.Title>{cardLabel}</Card.Title>
		</Card>
	);
};

export default CardWithImage;

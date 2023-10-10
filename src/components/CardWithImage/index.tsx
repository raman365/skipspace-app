import {
	View,
	StyleSheet,
	Dimensions,
	useWindowDimensions,
} from 'react-native';
import { Card, Text } from '@rneui/themed';
import { COLORS } from '../../../constants/theme';
import {} from '@rneui/themed';

export interface ICardProps {
	cardKey: string;
	cardLabel: string;
	cardImage: string;
}

const CardWithImage: React.FC<ICardProps> = ({
	cardKey,
	cardLabel,
	cardImage,
}) => {
	const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

	const { width } = useWindowDimensions();

	return (
		<View style={[styles.itemContainer, { width: width - 80 }]}>
			<Card
				key={cardKey}
				containerStyle={{
					backgroundColor: COLORS.white,
					borderColor: COLORS.white,
					shadowColor: COLORS.white,
				}}
			>
				<Card.Image
					style={{
						width: windowWidth * 0.9,
						height: windowHeight * 0.9,
					}}
					source={{
						uri: `${cardImage}`,
					}}
				/>
				<Card.Divider color={COLORS.lightBlue} style={{}} />
				<Card.Title style={{ height: 100 }}>{cardLabel}</Card.Title>
			</Card>
		</View>
	);
};

const styles = StyleSheet.create({
	itemContainer: {
		backgroundColor: '#fff',
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 40,
		paddingBottom: 40,
		marginHorizontal: 40,
		borderRadius: 20,
	},
});

export default CardWithImage;

import React from 'react';
import {
	StyleSheet,
	View,
	Text,
	Animated,
	FlatList,
	useWindowDimensions,
} from 'react-native';
import {
	ScalingDot,
	// SlidingBorder,
	// ExpandingDot,
	// SlidingDot,
} from 'react-native-animated-pagination-dots';
import { COLORS } from '../../../constants/theme';

interface ItemProps {
	key: string;
	title: string;
	description: string;
}

const INTRO_DATA = [
	{
		key: '1',
		image: `https://picsum.photos/1440/2842?random=$1`,
		title: 'Step 1 - first do this',
		description:
			'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
	},
	{
		key: '2',
		image: `https://picsum.photos/1440/2842?random=$2`,
		title: 'Step 2 - then do this',
		description:
			"Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. ",
	},
	{
		key: '3',
		image: `https://picsum.photos/1440/2842?random=$3`,
		title: 'Step 3 - then this',
		description:
			'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. ',
	},
];

const ScalingDots = () => {
	const { width } = useWindowDimensions();
	const scrollX = React.useRef(new Animated.Value(0)).current;
	const renderItem = React.useCallback(
		({ item }: { item: ItemProps }) => {
			return (
				<View style={[styles.itemContainer, { width: width - 80 }]}>
					<Text>{item.title}</Text>
					<Animated.Text>{item.description}</Animated.Text>
				</View>
			);
		},
		[width]
	);
	const keyExtractor = React.useCallback((item: ItemProps) => item.key, []);
	return (
		<View style={[styles.container]}>
			<FlatList
				data={INTRO_DATA}
				keyExtractor={keyExtractor}
				showsHorizontalScrollIndicator={false}
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: { x: scrollX } } }],
					{
						useNativeDriver: false,
					}
				)}
				style={styles.flatList}
				pagingEnabled
				horizontal
				decelerationRate={'normal'}
				scrollEventThrottle={16}
				renderItem={renderItem}
			/>
			<View style={styles.text}>
				<View style={styles.dotContainer}>
					<ScalingDot
						data={INTRO_DATA}
						scrollX={scrollX}
						containerStyle={styles.constainerStyles}
						inActiveDotColor={COLORS.bgBlue}
						activeDotColor={COLORS.bgGreen}
					/>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: COLORS.white,
	},
	dotContainer: {
		backgroundColor: COLORS.white,
		justifyContent: 'center',
		alignSelf: 'center',
	},
	text: {
		// flex: 1,
		justifyContent: 'space-evenly',
	},
	flatList: {
		flex: 1,
	},

	dotStyles: {
		width: 10,
		height: 10,
		borderRadius: 5,
		marginHorizontal: 3,
	},
	constainerStyles: {
		top: 30,
	},
	itemContainer: {
		backgroundColor: '#fff',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 40,
		marginTop: 40,
		marginHorizontal: 40,
		borderRadius: 20,
	},
});

export default ScalingDots;

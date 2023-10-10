import {
	View,
	Text,
	Image,
	StyleSheet,
	Dimensions,
	SafeAreaView,
	FlatList,
	Animated,
	useWindowDimensions,
} from 'react-native';
import React, { useRef } from 'react';
import { ScalingDot } from 'react-native-animated-pagination-dots';

import { COLORS } from '../../../constants/theme';

import SSButton from '../../components/Button';
// import ScalingDots from '../../components/ScalingDots';

// const { width } = Dimensions.get('window');
// const SLIDER_WIDTH = Dimensions.get('window').width + 80;
// const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

const DATA = [
	{
		text: '#1 - First do this',
		image:
			'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg',
	},
	{
		text: '#2 - Then do this',
		image:
			'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg',
	},
	{
		text: '#3 - Finally do this!',
		image: 'https://picsum.photos/1440/2842?random=200',
	},
];

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

interface ItemProps {
	key: string;
	title: string;
	description: string;
	image: string;
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

const WelcomeHowTo = ({ navigation }: any) => {
	const { width } = useWindowDimensions();
	const scrollX = React.useRef(new Animated.Value(0)).current;
	const keyExtractor = React.useCallback((item: ItemProps) => item.key, []);

	const renderItem = React.useCallback(
		({ item }: { item: ItemProps }) => {
			return (
				<View style={[styles.itemContainer, { width: windowWidth - 80 }]}>
					<Image
						source={{
							uri: item.image,
						}}
						style={{ height: windowHeight - 500, width: windowWidth - 80 }}
					/>
					<Text
						style={{
							paddingTop: 20,
							fontSize: 20,
							//  fontFamily: 'Open-Sans'
						}}
					>
						{item.title}
					</Text>
					{/* <Animated.Text>{item.description}</Animated.Text> */}
				</View>
			);
		},
		[width]
	);

	return (
		<SafeAreaView style={{ justifyContent: 'space-between', flex: 1 }}>
			{/* image */}
			<View
				style={{
					alignItems: 'center',
					paddingTop: 25,
					paddingBottom: 25,
				}}
			>
				<Image
					style={styles.logoImage}
					source={require('../../components/Header/image/sslogo1.png')}
					resizeMode='contain'
				/>
			</View>

			<View>
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
					pagingEnabled
					horizontal
					decelerationRate={'normal'}
					scrollEventThrottle={16}
					renderItem={renderItem}
				/>
			</View>
			<View style={styles.dotContainer}>
				<ScalingDot
					data={INTRO_DATA}
					scrollX={scrollX}
					containerStyle={styles.constainerStyles}
					inActiveDotColor={COLORS.bgBlue}
					activeDotColor={COLORS.bgGreen}
				/>
			</View>
			<View style={{ marginHorizontal: 30, paddingVertical: 20 }}>
				<SSButton
					buttonLabel={'Find SkipSpace'}
					onPress={() => navigation.navigate('AuthDashboard')}
					bgGreen
				/>
			</View>
		</SafeAreaView>
	);
};

export default WelcomeHowTo;
const styles = StyleSheet.create({
	mainContainer: {},
	imageContainer: {
		backgroundColor: COLORS.bgBlue,
		height: 150,
		paddingTop: 20,
		paddingBottom: 30,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	innerContainer: {
		paddingTop: 40,
		alignSelf: 'center',
	},
	logoImage: {
		width: 150,
		height: 150,
	},

	dotContainer: {
		backgroundColor: COLORS.white,
		justifyContent: 'center',
		alignSelf: 'center',
	},
	text: {
		justifyContent: 'space-evenly',
	},

	dotStyles: {
		width: 10,
		height: 10,
		borderRadius: 5,
		marginHorizontal: 3,
	},
	constainerStyles: {
		top: 0,
	},

	itemContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 10,
		marginHorizontal: 40,
		borderRadius: 20,
	},
	sliderImage: {
		height: 250,
	},
});

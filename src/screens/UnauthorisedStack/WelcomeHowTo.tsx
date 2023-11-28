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

import { COLORS, FONTSIZES } from '../../../constants/theme';

import SSButton from '../../components/Button';
import StandardButton from '../../components/Button/StandardBtn';
// import ScalingDots from '../../components/ScalingDots';

// const { width } = Dimensions.get('window');
// const SLIDER_WIDTH = Dimensions.get('window').width + 80;
// const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

// const DATA = [
// 	{
// 		text: '#1 - First do this',
// 		image:
// 			'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg',
// 	},
// 	{
// 		text: '#2 - Then do this',
// 		image:
// 			'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg',
// 	},
// 	{
// 		text: '#3 - Finally do this!',
// 		image: 'https://picsum.photos/1440/2842?random=200',
// 	},
// ];

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

interface ItemProps {
	key: string;
	title: string;
	image: any;
}
const INTRO_DATA = [
	{
		key: '1',
		image: require('../../../assets/images/step1.png'),
		title: 'Select a borough',
	},
	{
		key: '2',
		image: require('../../../assets/images/step2.png'),
		title: "Choose a SkipSpace location that's close to you",
	},
	{
		key: '3',
		image: require('../../../assets/images/step3.png'),
		title: 'Dispose of your items at the selected SkipSpace',
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
						source={item.image}
						style={{ height: windowHeight - 500, width: windowWidth - 80 }}
					/>
					<Text
						style={{
							paddingTop: 15,
							fontSize: FONTSIZES['4xl'],
							textAlign: 'center',
							fontFamily: 'Tungsten_SemiBold',
							color: COLORS.bgBlue,
							letterSpacing: 0.2,
						}}
					>
						{item.title}
					</Text>
				</View>
			);
		},
		[width]
	);
	const handleRegister = () => {
		navigation.navigate('SignUp');
	};
	const handleSignIn = () => {
		navigation.navigate('AuthDashboard');
	};
	return (
		<SafeAreaView style={{ justifyContent: 'space-between', flex: 1 }}>
			{/* image */}
			<View
				style={{
					alignItems: 'center',
					paddingTop: 15,
					paddingBottom: 15,
				}}
			>
				<Image
					style={styles.logoImage}
					source={require('../../components/Header/image/sslogo1.png')}
					resizeMode='contain'
				/>
			</View>

			<View style={styles.carouselContainer}>
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
				<StandardButton
					buttonLabel={'Sign in'}
					onPress={handleSignIn}
					bgGreen={false}
					fontBlue={false}
				/>
				<StandardButton
					buttonLabel={'Register'}
					onPress={handleRegister}
					bgGreen
					fontBlue={false}
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
	carouselContainer: {
		paddingBottom: 20,
		marginTop: -10,
	},
	dotContainer: {
		// paddingVertical: 20,
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

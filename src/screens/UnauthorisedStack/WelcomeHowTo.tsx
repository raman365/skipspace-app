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
import React from 'react';
import { ScalingDot } from 'react-native-animated-pagination-dots';
import { COLORS, FONTSIZES } from '../../../constants/theme';
import StandardButton from '../../components/Button/StandardBtn';

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

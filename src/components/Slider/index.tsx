import React, { useRef } from 'react';
import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	ScrollView,
	ImageBackground,
	useWindowDimensions,
} from 'react-native';

import Animated from 'react-native-reanimated';

interface ISliderScrollProps {
	// images: [],
}

const images = new Array(6).fill(
	'https://images.unsplash.com/photo-1556740749-887f6717d7e4'
);

const SliderScroll: React.FC<ISliderScrollProps> = ({}) => {
	const scrollX = useRef(new Animated.Value(0)).current;
	const { width: windowWidth } = useWindowDimensions();

	return (
		<SafeAreaView>
			<ScrollView
				horizontal={true}
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				onScroll={Animated.event(
					[
						{
							nativeEvent: {
								contentOffset: {
									x: scrollX,
								},
							},
						},
					],
					{ useNativeDriver: true }
				)}
				scrollEventThrottle={1}
			>
				{images.map((image, imageIndex) => {
					return (
						<View style={{ width: windowWidth }} key={imageIndex}>
							<ImageBackground source={{ uri: image }} style={styles.card}>
								<View style={styles.textContainer}>
									<Text style={styles.infoText}>{'Image -' + imageIndex}</Text>
								</View>
							</ImageBackground>
						</View>
					);
				})}
			</ScrollView>
			{/* <View style={styles.indicatorContainer}>
				{images.map((image, imageIndex) => {
					const width = scrollX.interpolate({
						inputRange: [
							windowWidth * (imageIndex - 1),
							windowWidth * imageIndex,
							windowWidth * (imageIndex + 1),
						],
						outputRange: [8, 16, 8],
						extrapolate: 'clamp',
					});
					return (
						<Animated.View
							key={imageIndex}
							style={[styles.normalDot, { width }]}
							
						/>
					);
				})}
			</View> */}
		</SafeAreaView>
	);
};

export default SliderScroll;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	scrollContainer: {
		height: 300,
		alignItems: 'center',
	},
	card: {
		flex: 1,
		marginVertical: 4,
		marginHorizontal: 16,
		borderRadius: 5,
		overflow: 'hidden',
		alignItems: 'center',
		justifyContent: 'center',
	},
	indicatorContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	textContainer: {
		backgroundColor: 'rgba(0,0,0, 0.7)',
		paddingHorizontal: 24,
		paddingVertical: 8,
		borderRadius: 5,
	},
	infoText: {
		color: 'white',
		fontSize: 16,
		fontWeight: 'bold',
	},
	normalDot: {
		height: 8,
		width: 8,
		borderRadius: 4,
		backgroundColor: 'silver',
		marginHorizontal: 4,
	},
});

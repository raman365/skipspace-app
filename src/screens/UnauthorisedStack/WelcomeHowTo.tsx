import {
	View,
	Text,
	Image,
	StyleSheet,
	Dimensions,
	SafeAreaView,
	FlatList,
} from 'react-native';
import React, { useRef } from 'react';
import { COLORS } from '../../../constants/theme';
// import Carousel from 'react-native-snap-carousel';
import CardWithImage from '../../components/CardWithImage';
import SSButton from '../../components/Button';
import SliderScroll from '../../components/Slider';
import Carousel from '../../components/Carousel';

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
		image:
			'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg',
	},
];

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

const slideList = Array.from({ length: 3 }).map((_, i) => {
	return {
		id: i,
		image: `https://picsum.photos/1440/2842?random=${i}`,
		title: `This is the title! ${i + 1}`,
		subtitle: `This is the subtitle ${i + 1}!`,
	};
});

function Slide({ data }: any) {
	return (
		<View
			style={{
				height: windowHeight,
				width: windowWidth,
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Image
				source={{ uri: data.image }}
				style={{ width: windowWidth * 0.9, height: windowHeight * 0.9 }}
			></Image>
			<Text style={{ fontSize: 24 }}>{data.title}</Text>
			<Text style={{ fontSize: 18 }}>{data.subtitle}</Text>
		</View>
	);
}
const WelcomeHowTo = ({ navigation }: any) => {
	const item = (data: any) => {
		<CardWithImage cardImage={data.text} cardLabel={data.image} />;
	};

	// const _renderItem = (data: any) => {
	// 	return <Text>{data.text}</Text>;
	// };
	return (
		<SafeAreaView
			style={{
				backgroundColor: COLORS.white,
				justifyContent: 'space-around',
				alignContent: 'space-around',
			}}
		>
			<View
				style={{
					justifyContent: 'center',
					alignItems: 'center',
					paddingTop: 60,
				}}
			>
				<Image
					style={styles.logoImage}
					source={require('../../components/Header/image/sslogo1.png')}
					resizeMode='contain'
				/>

				{/* </View> */}
				{/* 
				<View>
					<CardWithImage
						cardLabel={'Find your local council'}
						cardImage={
							'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg'
						}
					/>*/}
			</View>

			<View>
				{/* <Carousel /> */}
				<FlatList
					data={DATA}
					pagingEnabled
					horizontal
					renderItem={({ item }: any) => {
						return (
							<CardWithImage cardImage={item.image} cardLabel={item.text} />
						);
					}}
				/>
			</View>

			<View style={{ paddingHorizontal: 20 }}>
				<SSButton
					bgGreen
					buttonLabel={'Find SkipSpace'}
					onPress={() => navigation.navigate('AuthDashboard')}
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
		paddingTop: 30,
	},
});

import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import React, { useRef } from 'react';
import { COLORS } from '../../../constants/theme';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import CardWithImage from '../../components/CardWithImage';
import SSButton from '../../components/Button';

const { width } = Dimensions.get('window');
const SLIDER_WIDTH = Dimensions.get('window').width + 80;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

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

const WelcomeHowTo = ({ navigation }: any) => {
	const item = (data: any) => {
		<CardWithImage cardImage={data.text} cardLabel={data.image} />;
	};
	return (
		<View style={{ backgroundColor: COLORS.white, flex: 1 }}>
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
			</View>
			<View>
				{/* <Carousel 
					data={DATA}
					layout='default'
					layoutCardOffset={9}
					renderItem={item}
					sliderWidth={SLIDER_WIDTH}
					itemWidth={ITEM_WIDTH}
				/> */}
				{/* <CardWithImage cardLabel={'Step 1'} /> */}
				{/* <Carousel
					pagination={PaginationLight}
					renderItem={renderItem}
					data={DATA}
				/> */}
			</View>
			<View style={{ paddingHorizontal: 20 }}>
				<SSButton
					bgGreen
					buttonLabel={'Find SkipSpace'}
					onPress={() => navigation.navigate('AuthDashboard')}
				/>
			</View>
		</View>
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

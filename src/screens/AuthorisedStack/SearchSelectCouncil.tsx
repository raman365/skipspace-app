import { View, StyleSheet, ActivityIndicator, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS, FONTSIZES } from '../../../constants/theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HeaderComponent from '../../components/Header';
import { BottomSheet, Button, Icon, Text } from '@rneui/themed';
import {
	collection,
	onSnapshot,
	doc,
	getDocs,
	DocumentData,
} from 'firebase/firestore';

// TODO: Generate customized skip id

import { db } from '../../../config/firebase';
import BoroughSearchButton from '../../components/BoroughSearchButton';

const SelectCouncil = ({ navigation }: any) => {
	// get all data in a collection

	const [councilData, setCouncilData] = useState<DocumentData[]>([]);
	const cData: DocumentData[] = [];

	const [isVisible, setIsVisible] = useState(false);

	const BottomSheetSection: React.FC = () => {
		return (
			<BottomSheet
				modalProps={{}}
				isVisible={isVisible}
				// containerStyle={{ backgroundColor: COLORS.white }}
				onBackdropPress={() => setIsVisible(false)}
			>
				{/* <View style={{ flex: 1, backgroundColor: COLORS.bgGreen }}></View> */}
				<View
					style={[
						styles.mainContainer,
						{
							// Try setting `flexDirection` to `"row"`.
							flexDirection: 'column',
						},
					]}
				>
					<View style={{ flex: 1, backgroundColor: 'red' }} />
					<View style={{ flex: 2, backgroundColor: 'darkorange' }} />
					<View style={{ flex: 3, backgroundColor: 'green' }} />
				</View>
			</BottomSheet>
		);
	};

	const getDataByCollection = async () => {
		try {
			const querySnapshot = await getDocs(collection(db, 'councils'));

			querySnapshot.forEach((doc) => {
				cData.push(doc.data());
			});
			setCouncilData(cData);
		} catch (error: any) {
			console.log('Error: ', error);
		}
	};

	const handlePress = (itemId: any) => {
		console.log(`Item with ID ${itemId} pressed`);
		// Perform any actions you want on press
	};
	useEffect(() => {
		getDataByCollection();
	}, []);

	return (
		<SafeAreaProvider>
			<HeaderComponent
				authorised={true}
				icon={
					<Icon
						style={{ marginRight: 30 }}
						name='menu'
						type='feather'
						color={COLORS.bgGreen}
						size={30}
					/>
				}
				onPress={() => {
					navigation.toggleDrawer();
				}}
			/>
			<View style={{ paddingTop: 30 }}>
				<Text
					h4
					h4Style={{
						fontWeight: 'bold',
						textAlign: 'center',
						color: COLORS.bgBlue,
						fontFamily: 'Tungsten_SemiBold',
						fontSize: 30,
					}}
				>
					Search for SkipSpace
				</Text>
				<Text
					style={{
						color: COLORS.bgBlue,
						padding: 20,
						textAlign: 'center',
					}}
				>
					Tap on your local borough to find SkipSpace in your area
				</Text>
			</View>

			<View>
				{councilData ? (
					<View>
						{councilData.map((council, i) => (
							<View key={i}>
								<BoroughSearchButton
									councilName={council.council_name}
									onPress={() => setIsVisible(true)}
									// onPress={() => handlePress(council.council_name)}
									// open up bottom sheet
								/>
								<BottomSheetSection />
							</View>
						))}
					</View>
				) : (
					<View
						style={{
							alignItems: 'center',
							justifyContent: 'center',
							// flex: 2,
						}}
					>
						<ActivityIndicator color={COLORS.bgGreen} size={'large'} />
					</View>
				)}
			</View>
		</SafeAreaProvider>
	);
};

const styles = StyleSheet.create({
	centerContainer: {
		paddingTop: 50,
		paddingHorizontal: 20,
		display: 'flex',
		justifyContent: 'center',
	},
	mainContainer: {
		flex: 1,
		// alignItems: 'flex-start',
		justifyContent: 'center',
		// justifyItems: ''
	},
});

export default SelectCouncil;

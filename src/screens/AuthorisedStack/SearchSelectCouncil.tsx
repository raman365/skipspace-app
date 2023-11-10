import { View, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS } from '../../../constants/theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HeaderComponent from '../../components/Header';
import { Button, Icon, Text } from '@rneui/themed';
import {
	collection,
	onSnapshot,
	doc,
	getDocs,
	DocumentData,
} from 'firebase/firestore';

import { db } from '../../../config/firebase';

const SelectCouncil = ({ navigation }: any) => {
	// get all data in a collection

	const [councilData, setCouncilData] = useState<DocumentData[]>([]);
	const cData: DocumentData[] = [];

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
			{/* <View style={styles.centerContainer}>
				<Button
					onPress={() => navigation.navigate('skipSpaceResults')}
					title={'Barnet'}
				/>
			</View> */}

			{/*
				
				- UseEffect - loop	 though and show local council collection
				
				*/}
			<View>
				{cData ? (
					<View>
						{councilData.map((council) => (
							<View key={council.councilName}>
								<Text>{council.councilName}</Text>
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
});

export default SelectCouncil;

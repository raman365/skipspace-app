import { View, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS, FONTSIZES } from '../../../constants/theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HeaderComponent from '../../components/Header';
import { Icon, Text } from '@rneui/themed';
import {
	collection,
	getDocs,
	DocumentData,
	onSnapshot,
} from 'firebase/firestore';

// TODO: Generate customized skip id

import { db } from '../../../config/firebase';
import { ScrollView } from 'react-native-gesture-handler';

interface MainDoc {
	id: string;
	mainItemId: any;
	council_name: string;
	// ... other properties from the main document
}

const SelectCouncil = ({ navigation }: any) => {
	// get all data in a collection
	const [councilData, setCouncilData] = useState<DocumentData[]>([]);
	const [skipSitesData, setSkipSitesData] = useState<DocumentData[]>([]);
	const [unsubscribeSubcollections, setUnsubscribeSubcollections] = useState<
		(() => void)[]
	>([]);

	useEffect(() => {
		const fetchData = async () => {
			// **  get data from main council collection
			const mainCollectionRef = collection(db, 'councils');
			const mainCollectionSnapshot = await getDocs(mainCollectionRef);

			const mainCollectionData = mainCollectionSnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			})) as MainDoc[];

			// Apply council data to state
			setCouncilData(mainCollectionData);

			// loop through the main collection and set up onsnapshot for updates real time
			mainCollectionData.forEach(async (mainDoc) => {
				// const subCollectionRef = collection(
				// 	db,
				// 	'councils',
				// 	mainDoc.id,
				// 	'linkedSkipCompanies'
				// );
				const subCollectionRef = collection(
					db,
					'councils',
					mainDoc.id,
					'skipSites'
				);

				const unsubscribeSubCollection = onSnapshot(
					subCollectionRef,
					(subCollectionSnapshot) => {
						const subCollectionData = subCollectionSnapshot.docs.map(
							(subDoc) => ({
								id: subDoc.id,
								...subDoc.data(),
							})
						);

						setSkipSitesData((prevData) => ({
							...prevData,
							[mainDoc.id]: subCollectionData,
						}));
						// setSkipCompanyData((prevData) => ({
						// 	...prevData,
						// 	[mainDoc.id]: subCollectionData,
						// }));

						// setSkipSitesData((prevData) => ({
						// 	...prevData,
						// 	[mainDoc.id]: subCollectionData,
						// }));

						// console.log('Site data: ', skipSitesData);
					}
				);

				// store the unsub function for later use

				setUnsubscribeSubcollections((prevUnsubscribes) => [
					...prevUnsubscribes,
					unsubscribeSubCollection,
				]);
			});
		};

		// loop through the main collection and fetch data from sub

		fetchData();

		// TODO clean up
		return () => {
			unsubscribeSubcollections.forEach((unsubscribe) => unsubscribe());
		};
	}, []);

	// const handleBoroughSearch = (council_n: string) => {
	// 	// console.log('Selected council: ', council_n);
	// 	navigation.navigate('skipSpaceResults', {
	// 		councilName: council_n,
	// 		dataFromCouncil: councilData,
	// 		dataFromSkipCompanies: skipCompanyData,
	// 	});
	// };

	const handleSelectedBorough = (mainItemId: string, council_name: string) => {
		navigation.navigate('skipSpaceResults', {
			mainItemId,
			council_name,
		});
	};
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
			<View
				style={{
					paddingTop: 30,
					flex: 1,
				}}
			>
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
						paddingTop: 20,
						paddingHorizontal: 15,
						textAlign: 'center',
						fontSize: FONTSIZES.xl,
					}}
				>
					Tap on your local borough to find SkipSpace in your area
				</Text>

				<ScrollView
					style={{
						flex: 1,
						paddingTop: 20,
						marginBottom: 20,
						paddingBottom: 100,
					}}
				>
					{councilData === null ? (
						<View
							style={{
								flex: 1,
								justifyContent: 'center',
								alignContent: 'center',
							}}
						>
							<ActivityIndicator size={'large'} color={COLORS.bgGreen} />
						</View>
					) : councilData ? (
						<>
							{councilData.map((mainDoc) => (
								<View key={mainDoc.id}>
									<TouchableOpacity
										key={mainDoc.id}
										onPress={() =>
											handleSelectedBorough(mainDoc.id, mainDoc.council_name)
										}
										style={{
											marginVertical: 7,
											marginHorizontal: 15,
											paddingHorizontal: 15,
											paddingVertical: 10,
											borderRadius: 25,
											borderWidth: 1,
											borderColor: COLORS.alpha.bgGreen,
											backgroundColor: COLORS.bgGreen,
											flexDirection: 'row',
											justifyContent: 'center',
										}}
									>
										<View>
											<Text
												style={{
													fontSize: FONTSIZES.xl,
													textAlign: 'center',
													color: COLORS.bgBlue,
													fontWeight: 'bold',
												}}
											>
												{mainDoc.council_name}
											</Text>
										</View>
									</TouchableOpacity>
								</View>
							))}
						</>
					) : (
						<View
							style={{
								flex: 1,
								justifyContent: 'center',
								alignContent: 'center',
							}}
						>
							<ActivityIndicator size={'large'} color={COLORS.bgGreen} />
						</View>
					)}
				</ScrollView>
			</View>
		</SafeAreaProvider>
	);
};

export default SelectCouncil;

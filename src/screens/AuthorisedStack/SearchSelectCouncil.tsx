import {
	View,
	StyleSheet,
	ActivityIndicator,
	FlatList,
	TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS, FONTSIZES } from '../../../constants/theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HeaderComponent from '../../components/Header';
import { BottomSheet, Button, Icon, Text } from '@rneui/themed';
import {
	collection,
	getDocs,
	DocumentData,
	where,
	doc,
	documentId,
	query,
	onSnapshot,
	SnapshotOptions,
} from 'firebase/firestore';

// TODO: Generate customized skip id

import { db } from '../../../config/firebase';
import BoroughSearchButton from '../../components/BoroughSearchButton';
import SkipOptionsSheet from '../../components/BottomSheet/SkipOptionSheet';

interface MainDoc {
	id: string;
	mainItemId: any;
	council_name: string;
	// ... other properties from the main document
}

const SelectCouncil = ({ navigation }: any) => {
	// get all data in a collection
	const [councilData, setCouncilData] = useState<DocumentData[]>([]);
	const [skipCompanyData, setSkipCompanyData] = useState<DocumentData[]>([]);
	const [selectedMainItemId, setSelectedMainItemId] = useState();

	const [unsubscribeSubcollections, setUnsubscribeSubcollections] = useState<
		(() => void)[]
	>([]);

	const mainCollectionRef = collection(db, 'councils');

	// const unsubscribeMain = onSnapshot(
	// 	mainCollectionRef,
	// 	(mainCollectionSnapshot) => {
	// 		const mainCollectionData = mainCollectionSnapshot.docs.map((doc) => ({
	// 			id: doc.id,
	// 			...doc.data(),
	// 		}));
	// 		setCouncilData(mainCollectionData);
	// 	}
	// );

	// const subCollectionRef = collection(db, 'councils', 'councilName', 'linkedSkipCompanies' );
	// const subCollectionSnapshot = await getDocs(subCollectionRef);
	// const subCollectionData = subCollectionSnapshot.docs.map(doc => ({
	// 	id: doc.id,
	// 	...doc.data(),

	// }))
	// setSkipCompanyData(subCollectionData)

	useEffect(() => {
		const fetchData = async () => {
			// **  get data from main collection

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
				const subCollectionRef = collection(
					db,
					'councils',
					mainDoc.id,
					'linkedSkipCompanies'
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

						// setSkipCompanyData((prevData) => ({
						// 	...prevData,
						// 	[mainDoc.id]: skipCompanyData,
						// }));
						setSkipCompanyData((prevData) => ({
							...prevData,
							[mainDoc.id]: subCollectionData,
						}));

						// push id data into array?
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

	const handleBoroughSearch = (council_n: string) => {
		console.log('Selected council: ', council_n);
		navigation.navigate('skipSpaceResults', {
			councilName: council_n,
			dataFromCouncil: councilData,
			dataFromSkipCompanies: skipCompanyData,
		});
	};

	const handleSelectedBorough = (mainItemId: string, council_name: string) => {
		// Update the selected main item ID
		// setSelectedMainItemId(mainItemId);
		console.log(mainItemId + ' = ' + council_name);
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
						padding: 20,
						textAlign: 'center',
					}}
				>
					Tap on your local borough to find SkipSpace in your area
				</Text>

				<View style={{ flex: 1 }}>
					{/* <FlatList
						data={councilData}
						// key={}
						renderItem={({ item }) => (
						 */}
					{/* // <BoroughSearchButton */}
					{/* // 	councilName={item.council_name}

							// 	onPress={() => handleBoroughSearch(item.council_name)}
							// 	// onPress={() => setIsVisible(true)}
							// /> */}
					{councilData.map((mainDoc) => (
						<View key={mainDoc.id}>
							<TouchableOpacity
								key={mainDoc.id}
								onPress={() =>
									handleSelectedBorough(mainDoc.id, mainDoc.council_name)
								}
								style={{
									marginVertical: 10,
									marginHorizontal: 15,
									paddingHorizontal: 15,
									paddingVertical: 10,
									borderRadius: 5,
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
					{/* )} */}
					{/* /> */}
					{/* {councilData.map((mainDoc) => (
						<View key={mainDoc.id}>
							<Text style={{ fontWeight: 'bold' }}>{mainDoc.council_name}</Text>
							<View>
								{skipCompanyData[mainDoc.id] &&
									skipCompanyData[mainDoc.id].map((subItem: any) => (
										<View key={subItem.id} style={{ paddingBottom: 10 }}>
											<Text>{subItem.skip_company_name}</Text>
											<Text>{subItem.skip_company_address}</Text>
										</View>
									))}
							</View>
						</View>
					))} */}
				</View>
			</View>
		</SafeAreaProvider>
	);
};

export default SelectCouncil;

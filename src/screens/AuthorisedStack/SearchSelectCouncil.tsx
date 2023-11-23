import { View, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
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
// const { listSubcollections } = require('./firestoreService');

// TODO: Generate customized skip id

import { db } from '../../../config/firebase';
import BoroughSearchButton from '../../components/BoroughSearchButton';
// import SkipOptionsSheet from '../../components/BottomSheet/SkipOptionSheet';
import ScreenTitle from '../../components/ScreenTitle';
import SkipOptionsSheet from '../../components/BottomSheet/SkipOptionSheet';

const SelectCouncil = ({ navigation }: any) => {
	// get all data in a collection

	const [councilData, setCouncilData] = useState<DocumentData[]>([]);
	const [councilName, setCouncilName] = useState<string>('');
	const [skipCompanyData, setSkipCompanyData] = useState<DocumentData[]>([]);

	const [subCollectionData, setSubCollectionData] = useState<any[]>([]);

	const mainCollData: DocumentData[] = [];
	const councilColl = collection(db, 'councils');

	// turn into a function with council id as the param

	// const handleSubCollectionData = async (council_n: string) => {
	// 	setCouncilName(council_n);
	// 	const cn = council_n.toLowerCase().replace(/[^a-z]/g, '');

	// 	// console.log(councilName);
	// 	console.log('cn: ', cn);
	// 	const linkedSkipColl = collection(
	// 		db,
	// 		'councils',
	// 		cn,
	// 		'linkedSkipCompanies'
	// 	);

	// 	try {
	// 		const subCollQuerySnapshot = await getDocs(linkedSkipColl);
	// 		const data: DocumentData[] = [];

	// 			const unsubscribe = onSnapshot(
	// 				query(collection(db, `councils,${cn},linkedSkipCompanies`)),
	// 				(snapshot) => {
	// 					const updatedData = snapshot.docs.map((doc) => ({
	// 						id: doc.id,
	// 						...doc.data(),
	// 					}));
	// 					setSkipCompanyData(data);
	// 				}
	// 			);

	// 		// subCollQuerySnapshot.forEach((doc) => {
	// 		// 	data.push({ id: doc.id, ...doc.data() });

	// 		// 	// console.log('Skip', data);
	// 		// 	// setSkipCompanyData(subData);
	// 		// 	setSkipCompanyData(data);

	// 		// 	navigation.navigate('skipSpaceResults', {
	// 		// 		councilName: council_n,
	// 		// 		subCollParams: skipCompanyData,
	// 		// 	});
	// 		// });
	// 	} catch (error: any) {
	// 		console.log('Sub collection error: ', error);
	// 	}

	// 	// nav to next screen with params
	// };

	// const getDataByCollection = async () => {
	// 	try {
	// 		const mainCollectionQuerySnapshot = await getDocs(councilColl);
	// 		// const subCollectionDataSnapshot = await getDocs(collection(db, `councils/${el.id}/linkedSkipCompanies`))

	// 		mainCollectionQuerySnapshot.forEach((doc) => {
	// 			// subDataId.push(doc.id);
	// 			mainCollData.push(doc.data());
	// 		});
	// 		setCouncilData(mainCollData);
	// 	} catch (error: any) {
	// 		console.log('Error: ', error);
	// 	}
	// };

	const handleSubCollectionData = async (council_n: string) => {
		// navigation.navigate('skipSpaceResults', {
		// 	councilName: council_n,
		// 	// skipCompanyData: skipCompanyData,
		// });

		const cn = council_n.toLowerCase().replace(/[^a-z]/g, '');
		const linkedSkipColl = collection(
			db,
			'councils',
			cn,
			'linkedSkipCompanies'
		);

		try {
			const subCollQuerySnapshot = await getDocs(linkedSkipColl);
			const data: DocumentData[] = [];

			subCollQuerySnapshot.forEach((doc) => {
				data.push({ id: doc.id, ...doc.data() });

				// console.log('Skip', data);
				// setSkipCompanyData(subData);
				setSkipCompanyData(data);

				navigation.navigate('skipSpaceResults', {
					councilName: council_n,
					subCollParams: skipCompanyData,
				});
			});
		} catch (error: any) {
			console.log('Sub collection error: ', error);
		}

		// nav to next screen with params
	};
	useEffect(() => {
		const unsubscribe = onSnapshot(
			query(collection(db, 'councils')),
			(snapshot) => {
				const updatedCouncilData = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));

				setCouncilData(updatedCouncilData);
				console.log(councilData);
			}
		);
		return () => {
			unsubscribe(); // Cleanup the listener when the component unmounts
		};
	}, []);

	useEffect(() => {
		// 	const fetchSubCollectionData = async () => {
		// 		// const cn =
		// 		const mainCollectionQuery = query(collection(db, 'councils'));
		// 		const mainCollectionDocs = await getDocs(mainCollectionQuery);
		// 		const mainCollectionDocsIds = mainCollectionDocs.docs.map(
		// 			(doc) => doc.id
		// 		);
		// 		const subCollectionData: any[] = [];
		// 		for (const docId of mainCollectionDocsIds) {
		// 			const subCollectionQuery = query(
		// 				collection(db, 'councils', docId, 'linkedSkipCompanies')
		// 			);
		// 			const subCollectionDataSnapshot = await getDocs(subCollectionQuery);
		// 			subCollectionDataSnapshot.forEach((subDoc) => {
		// 				subCollectionData.push({
		// 					mainDocId: docId,
		// 					subDocId: subDoc.id,
		// 					...subDoc.data(),
		// 				});
		// 			});
		// 		}
		// 		setSubCollectionData(subCollectionData);
		// 	};
		// 	fetchSubCollectionData;
		// }, [councilData]);
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

				<FlatList
					data={councilData}
					// keyExtractor={i}
					renderItem={({ item }) => (
						<BoroughSearchButton
							councilName={item.council_name}
							onPress={() => handleSubCollectionData(item.council_name)}
						/>
					)}
				/>
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

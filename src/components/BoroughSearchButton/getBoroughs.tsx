import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, View, Text } from 'react-native';
import { db } from '../../../config/firebase';
import { DocumentData, collection, onSnapshot } from 'firebase/firestore';

const getCouncils = () => {
	const [loading, setLoading] = useState(true); // set loading to true on component mount
	const [boroughs, setBoroughs] = useState<DocumentData>([]);

	useEffect(() => {
		const councilCollection = collection(db, 'councils');

		const unsubscribe = onSnapshot(councilCollection, (querySnapshot) => {
			const updatedCouncils:
				| React.SetStateAction<DocumentData>
				| { key: string }[] = [];

			querySnapshot.forEach((doc) => {
				updatedCouncils.push({
					...doc.data(),
					key: doc.id,
				});
			});

			setBoroughs(updatedCouncils);
			setLoading(false);
		});

		return () => unsubscribe();
	}, []);

	if (loading) {
		return <ActivityIndicator size={'large'} />;
	}

	// return (
	//     // <FlatList
	//     //     // data={boroughs}
	//     //     renderItem={ ({item}) => (
	//     //         <View>
	//     //             <Text>{item.id}</Text>
	//     //             <Text>{item.council_name}</Text>
	//     //         </View>
	//     //     ) }
	//     // />
	// )
};

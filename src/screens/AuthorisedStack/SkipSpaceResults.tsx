import {
	View,
	StyleSheet,
	ActivityIndicator,
	TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS } from '../../../constants/theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HeaderComponent from '../../components/Header';
import { Icon, Text, Card } from '@rneui/themed';
// import { DocumentData, collection, getDocs, query } from 'firebase/firestore';
import { FlatList } from 'react-native-gesture-handler';
import { DetailsCard } from '../../components/DetailsCard';
import SkipOptionsSheet from '../../components/BottomSheet/SkipOptionSheet';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../config/firebase';

interface SubDoc {
	id: string;
	skip_company_name: string;
	skip_company_address: string;
}

const SkipSpaceResults = ({ route, navigation }: any) => {
	// const { councilName, } = route.params;

	const { mainItemId, council_name } = route.params as {
		mainItemId: string;
		council_name: string;
	};
	const [isVisible, setIsVisible] = useState(false);
	const [skipCompanyData, setskipCompanyData] = useState<SubDoc[]>([]);

	const handleVoucherPress = () => {
		// navigation.navigate('voucherConfirmation');
		console.log('todo');
		// TODO: Information gets pushed to database
		// navigation.navigate('voucherConfirmation', {
		// 	councilName: councilName,
		// 	skipCompanyName: skip.skip_company_name,
		// 	skipCompanyAddress: dataFromSkipCompanies.skip_company_address,
		// 	// skipCompanyName: 'Test',
		// 	// skipCompanyAddress: 'Test Address',
		// });
		// setIsVisible(false);
	};
	useEffect(() => {
		// fetch sub coll data based on selecet main team id

		const fetchSubCollectionData = async () => {
			const subCollectionRef = collection(
				db,
				'councils',
				mainItemId,
				'linkedSkipCompanies'
			);
			const subCollectionSnapshot = await getDocs(subCollectionRef);
			const subCollectionData = subCollectionSnapshot.docs.map((subDoc) => ({
				id: subDoc.id,
				...subDoc.data(),
			})) as SubDoc[];

			setskipCompanyData(subCollectionData);
		};

		fetchSubCollectionData();
	}, [mainItemId]);

	return (
		<SafeAreaProvider>
			<HeaderComponent
				authorised={true}
				icon={
					<Icon
						name='arrow-left'
						type='feather'
						color={COLORS.bgGreen}
						size={40}
					/>
				}
				onPress={() => {
					navigation.goBack();
				}}
			/>
			<View style={{ paddingTop: 30 }}>
				<Text
					h4
					h4Style={{
						fontWeight: 'bold',
						textAlign: 'center',
						color: COLORS.bgBlue,
						fontSize: 30,
						fontFamily: 'Tungsten_SemiBold',
					}}
				>
					SkipSpace in {council_name} council
				</Text>
				<Text
					style={{
						color: COLORS.bgBlue,
						padding: 20,
						textAlign: 'center',
					}}
				>
					Tap for more information
				</Text>
			</View>
			{skipCompanyData.map((item) => (
				<View key={item.id}>
					<View>
						<DetailsCard
							cardHeading={item.skip_company_name}
							cardSubheading={item.skip_company_address}
							onPress={() =>
								navigation.navigate('selectedSkipSpace', {
									councilName: council_name,
									skipCompany: item.skip_company_name,
									skipCompanyAddress: item.skip_company_address,
								})
							}
							// onPress={() => setIsVisible(true)}
						/>

						<SkipOptionsSheet
							isVisible={isVisible}
							onCancelPress={() => setIsVisible(false)}
							onVoucherPress={handleVoucherPress}
							councilName={council_name}
							skipCompany={item.skip_company_name}
							skipCompanyAddress={item.skip_company_address}
						/>
					</View>
				</View>
			))}

			{/* <View>
			 <FlatList
					data={dataFromSkipCompanies}
					renderItem={({ item }) => (
						<>
							{console.log(
								`	${item.skip_company_name} = ${item.skip_company_address}`
							)}
							<DetailsCard
								cardHeading={item.skip_company_name}
								cardSubheading={item.skip_company_address}
								onPress={() =>
									navigation.navigate('selectedSkipSpace', {
										councilName: councilName,
										skipCompany: item.skip_company_name,
										skipCompanyAddress: item.skip_company_address,
									})
								}
								// onPress={() => setIsVisible(true)}
							/>

							<SkipOptionsSheet
								isVisible={isVisible}
								onCancelPress={() => setIsVisible(false)}
								onVoucherPress={handleVoucherPress}
								councilName={councilName}
								skipCompany={item.skip_company_name}
								skipCompanyAddress={item.skip_company_location_address}
							/>
						</>
					)}
				/> 
			</View>*/}
		</SafeAreaProvider>
	);
};

const styles = StyleSheet.create({
	centerContainer: {
		paddingTop: 50,
		paddingHorizontal: 20,
		display: 'flex',
		justifyContent: 'center',
		// flex: 1,
	},
});

export default SkipSpaceResults;

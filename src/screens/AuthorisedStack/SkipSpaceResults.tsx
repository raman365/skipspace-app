import {
	View,
	StyleSheet,
	ScrollView,
	Platform,
	Pressable,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS, FONTSIZES } from '../../../constants/theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HeaderComponent from '../../components/Header';
import { Icon, Text } from '@rneui/themed';

import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import ScreenTitle from '../../components/ScreenTitle';

interface SubDoc {
	id: string;
	skip_company_name: string;
	skip_company_address: string;
}

const SkipSpaceResults = ({ route, navigation }: any) => {
	const { council_name } = route.params as {
		mainItemId: string;
		council_name: string;
	};

	const SkipPill: React.FC<{ address: string; onPress: () => void }> = ({
		address,
		onPress,
	}) => {
		return (
			<>
				<View style={styles.buttonContainer}>
					<Pressable style={styles.card} onPress={onPress}>
						<Icon
							name={'location-sharp'}
							style={{ padding: 5 }}
							type='ionicon'
							color={COLORS.bgGreen}
						/>
						<View style={{ flexDirection: 'row', flexShrink: 1 }}>
							<Text
								style={{
									flexShrink: 1,
									fontSize: FONTSIZES.medium,
								}}
							>
								{address}
							</Text>
						</View>
					</Pressable>
				</View>
			</>
		);
	};
	const [linkedSkipCompaniesData, setLinkedSkipCompaniesData] = useState<any[]>(
		[]
	);
	const [linkedSkipSites, setLinkedSkipSites] = useState<any[]>([]);

	const getSkipSitesData = async () => {
		try {
			const parentId = council_name.toLowerCase().replace(/\s/g, '');
			const subCollectionRef = collection(
				db,
				'councils',
				parentId,
				'skipSites'
			);
			const subCollectionSnapshot = await getDocs(subCollectionRef);

			const subCollectionData = subCollectionSnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));

			setLinkedSkipSites(subCollectionData);
		} catch (error: any) {
			console.log('Error: ', error);
		}
	};

	useEffect(() => {
		getSkipSitesData();
	}, [route]);
	return (
		<SafeAreaProvider>
			<HeaderComponent
				authorised={true}
				icon={
					<Icon
						style={{ marginRight: 30 }}
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
			<View style={{ paddingTop: 30, paddingHorizontal: 10 }}>
				<ScreenTitle title={`Your local SkipSpace sites in ${council_name}`} />
				<Text
					style={{
						color: COLORS.bgBlue,
						padding: 20,
						textAlign: 'center',
						fontSize: FONTSIZES.xl,
					}}
				>
					Tap on a location to confirm your voucher
				</Text>
			</View>
			<ScrollView>
				<View style={{ padding: 20 }}>
					{linkedSkipSites.map((site: any, index: any) => (
						<SkipPill
							key={index}
							address={site.address}
							onPress={() =>
								navigation.navigate('selectedSkipSpace', {
									councilName: council_name,
									skipCompanyAddress: site.address,
								})
							}
						/>
					))}
					<Text></Text>
				</View>

				<View style={{ padding: 20 }}>
					{linkedSkipCompaniesData.map((company) => (
						<View key={company.companyId} style={{ marginVertical: 20 }}>
							<Text
								style={{
									paddingBottom: 10,
									fontFamily: 'Tungsten_SemiBold',
									fontSize: FONTSIZES['4xl'],
									color: COLORS.bgBlue,
									textAlign: 'center',
								}}
							>
								{company.companyName}
							</Text>
							{company.skipSitesData.map((skipSite: any, index: any) => (
								<SkipPill
									key={index}
									address={skipSite.address}
									onPress={() =>
										navigation.navigate('selectedSkipSpace', {
											councilName: council_name,
											skipCompany: company.companyName,
											skipCompanyAddress: skipSite.address,
										})
									}
								/>
							))}
						</View>
					))}
				</View>
			</ScrollView>
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
	card: {
		paddingVertical: 10,
		paddingHorizontal: 15,
		marginVertical: 5,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		borderRadius: 25,
		backgroundColor: COLORS.white,
	},
	...Platform.select({
		ios: {
			commonProp: {
				shadowColor: COLORS.black,
				shadowOffsey: { width: 5, height: 5 },
				shadowOpacity: 0.26,
				shadowRadius: 3,
			},
		},
		android: {
			commonProp: {
				elevation: 20,
				shadowColor: COLORS.black,
			},
		},
	}),
	buttonContainer: {
		paddingHorizontal: 10,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.27,
		shadowRadius: 4.65,

		elevation: 6,
	},
});

export default SkipSpaceResults;

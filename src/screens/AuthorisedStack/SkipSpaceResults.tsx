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
import { DocumentData, collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import { FlatList } from 'react-native-gesture-handler';
import { DetailsCard } from '../../components/DetailsCard';
import SkipOptionsSheet from '../../components/BottomSheet/SkipOptionSheet';

const SkipSpaceResults = ({ route, navigation }: any) => {
	const { councilName, subCollParams } = route.params;

	const [isVisible, setIsVisible] = useState(false);

	// const councilname = councilName.toLowerCase();

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
					Results from {councilName} council
				</Text>
				<Text
					style={{
						color: COLORS.bgBlue,
						padding: 20,
						textAlign: 'center',
					}}
				>
					Choose a SkipSpace below. Tap to see more information
				</Text>
			</View>

			<View>
				{/* <Text>{councilName}</Text> */}
				{/* {console.log(subCollParams.length)} */}

				<FlatList
					data={subCollParams}
					renderItem={({ item }) => (
						<>
							<DetailsCard
								cardHeading={item.skip_company_name}
								cardSubheading={item.skip_company_location_address}
								onPress={() => setIsVisible(true)}
							/>

							<SkipOptionsSheet
								isVisible={isVisible}
								onCancelPress={() => setIsVisible(false)}
							/>
						</>
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
		// flex: 1,
	},
});

export default SkipSpaceResults;

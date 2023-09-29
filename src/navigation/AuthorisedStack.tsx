import {
	createDrawerNavigator,
	DrawerContentScrollView,
	DrawerItemList,
} from '@react-navigation/drawer';
import { View, Image, StyleSheet } from 'react-native';

import {
	CreateNewPassword,
	SelectCouncil,
	SelectedSkipSpace,
	SignedInDashboard,
	SkipSpaceResults,
	UserAccount,
	Vouchers,
	Help,
} from '../screens/index';
import { COLORS, theme } from '../../constants/theme';
import { Button, Icon, ThemeProvider } from '@rneui/themed';
import { NavigationContainer } from '@react-navigation/native';

export type DrawerStackParamsList = {
	signedInDashboard: undefined;
	selectCouncil: undefined;
	skipSpaceResults: undefined;
	selectedSkipSpace: undefined;
	userAccount: undefined;
	vouchers: undefined;
	createNewPassword: undefined;
	help: undefined;
};
const Drawer = createDrawerNavigator<DrawerStackParamsList>();

const CustomDrawerContent = (props: any) => {
	const { state, ...rest } = props;
	const newState = { ...state };

	return (
		<DrawerContentScrollView {...props} safeArea>
			{/* <View>
				<Image
					source={require('../../assets/ss.png')}
					height={50}
					resizeMode='center'
				/>
			</View> */}
			<View>
				<DrawerItemList state={newState} {...rest} />
			</View>
		</DrawerContentScrollView>
	);
};
const CustomDrawer = () => {
	return (
		<NavigationContainer>
			<View style={{ flex: 1 }}>
				<Drawer.Navigator
					initialRouteName={'signedInDashboard'}
					screenOptions={() => ({
						drawerActiveBackgroundColor: COLORS.bgBlue,
						drawerLabelStyle: { fontWeight: 'bold' },
						drawerActiveTintColor: COLORS.bgGreen,
						drawerInactiveBackgroundColor: COLORS.white,

						headerStyle: {
							backgroundColor: COLORS.bgGreen,
							height: 50,
							borderBottomColor: COLORS.bgGreen,
							borderBottomWidth: 2,
						},
						headerTintColor: COLORS.white,
						headerTitleContainerStyle: {
							height: 0,
							paddingTop: 10,
							paddingBottom: 10,
							marginTop: 10,
							marginLeft: 2,
						},
						headerTitleAlign: 'left',
						headerTitleStyle: {
							fontWeight: 'bold',
							fontSize: 24,
							color: COLORS.white,
							position: 'absolute',
							top: 0,
						},
						// headerLeft: () => {
						// 	<View style={styles.imageContainer}>
						// 		<View
						// 			style={{
						// 				width: 100,
						// 				height: 100,
						// 				alignSelf: 'center',
						// 				justifyContent: 'center',
						// 				paddingTop: 0,
						// 			}}
						// 		>
						// 			<Button onPress={navigation.toggleDrawer}>
						// 				<Icon
						// 					name='menu'
						// 					type='feather'
						// 					color={COLORS.bgGreen}
						// 					size={30}
						// 				/>
						// 			</Button>
						// 		</View>

						// 		<View style={styles.innerContainer}>
						// 			<Image
						// 				// style={styles.logoImage}
						// 				height={50}
						// 				source={require('../../assets/ss.png')}
						// 				resizeMode='contain'
						// 			/>
						// 		</View>
						// 		<View style={{ width: 100, alignSelf: 'center' }}></View>
						// 	</View>;
						// 	// 	<View style={{ backgroundColor: COLORS.bgBlue }}>
						// 	// 		<Button
						// 	// 			onPress={navigation.toggleDrawer}
						// 	// 			// background={'transparent'}
						// 	// 		>
						// 	// 			<Icon name='menu' color='white' />
						// 	// 		</Button>
						// 	// 	</View>;
						// },
					})}
					drawerContent={(props) => <CustomDrawerContent {...props} />}
				>
					<Drawer.Screen
						name={'signedInDashboard'}
						component={SignedInDashboard}
						options={{
							headerShown: false,
							drawerItemStyle: { display: 'none' },
						}}
					/>
					<Drawer.Screen
						name={'selectCouncil'}
						component={SelectCouncil}
						options={{
							headerShown: false,
							drawerItemStyle: { display: 'none' },
						}}
					/>
					<Drawer.Screen
						name={'skipSpaceResults'}
						component={SkipSpaceResults}
						options={{
							headerShown: false,
							drawerItemStyle: { display: 'none' },
						}}
					/>
					<Drawer.Screen
						name={'createNewPassword'}
						component={CreateNewPassword}
						options={{
							drawerItemStyle: { display: 'none' },
						}}
					/>
					<Drawer.Screen
						name={'selectedSkipSpace'}
						component={SelectedSkipSpace}
						options={{
							headerShown: false,
							drawerItemStyle: { display: 'none' },
						}}
					/>
					<Drawer.Screen
						name={'vouchers'}
						component={Vouchers}
						options={{
							headerShown: false,
							title: 'Vouchers',
							drawerLabelStyle: { fontSize: 20 },
						}}
					/>
					<Drawer.Screen
						name={'userAccount'}
						component={UserAccount}
						options={{
							headerShown: false,
							title: 'Account details',
							drawerLabelStyle: { fontSize: 20 },
						}}
					/>
					<Drawer.Screen
						name={'help'}
						component={Help}
						options={{
							headerShown: false,
							title: 'Help',
							drawerLabelStyle: { fontSize: 20 },
						}}
					/>
				</Drawer.Navigator>
			</View>
		</NavigationContainer>
	);
};

export const AuthorisedStack = () => {
	return (
		<ThemeProvider theme={theme}>
			<CustomDrawer />
		</ThemeProvider>
	);
};
export default AuthorisedStack;

const styles = StyleSheet.create({
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
		width: 100,
		height: 100,
		paddingTop: 30,
	},
});

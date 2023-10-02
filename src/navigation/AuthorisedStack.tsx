import { useCallback } from 'react';
import {
	createDrawerNavigator,
	DrawerContentScrollView,
	DrawerItemList,
} from '@react-navigation/drawer';
import { View, Image, StyleSheet } from 'react-native';

import {
	CreateNewPassword,
	SearchSelectCouncil,
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

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

export type DrawerStackParamsList = {
	signedInDashboard: undefined;
	searchSelectCouncil: undefined;
	skipSpaceResults: undefined;
	selectedSkipSpace: undefined;
	userAccount: undefined;
	vouchers: undefined;
	createNewPassword: undefined;
	help: undefined;
};

SplashScreen.preventAutoHideAsync();

const Drawer = createDrawerNavigator<DrawerStackParamsList>();

const CustomDrawerContent = (props: any) => {
	const { state, ...rest } = props;
	const newState = { ...state };

	return (
		<DrawerContentScrollView {...props} safeArea>
			<View style={{ marginTop: -45, marginBottom: -30 }}>
				<Image
					source={require('../../assets/images/menulogogreen.png')}
					height={10}
					resizeMode='center'
					resizeMethod='scale'
				/>
			</View>
			<View style={{ paddingVertical: 10 }}>
				<DrawerItemList state={newState} {...rest} />
			</View>
		</DrawerContentScrollView>
	);
};
const CustomDrawer = () => {
	const [fontsLoaded, fontError] = useFonts({
		// 'Inter-Black': require('./assets/fonts/Inter-Black.otf'),
		'Open-Sans': require('../../assets/fonts/OpenSans/OpenSans-Regular.ttf'),
		'Open-Sans-Cond-SemiBold': require('../../assets/fonts/OpenSans/OpenSans_Condensed-SemiBold.ttf'),
		'Open-Sans-SemiCond-Reg': require('../../assets/fonts/OpenSans/OpenSans_SemiCondensed-Regular.ttf'),
		'Tungsten-Bold': require('../../assets/fonts/Tungsten/Tungsten-Bold.ttf'),
		'Tungsten-SemiBold': require('../../assets/fonts/Tungsten/Tungsten-Semibold.ttf'),
	});

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded || fontError) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded, fontError]);

	if (!fontsLoaded && !fontError) {
		return null;
	}
	return (
		<NavigationContainer onReady={onLayoutRootView}>
			<View style={{ flex: 1 }}>
				<Drawer.Navigator
					initialRouteName={'signedInDashboard'}
					screenOptions={() => ({
						drawerActiveBackgroundColor: COLORS.white,
						// drawerActiveTintColor: COLORS.bgGreen,
						drawerActiveTintColor: COLORS.white,

						drawerLabelStyle: {
							fontWeight: 'bold',
							color: COLORS.bgBlue,
							fontSize: 30,
							fontFamily: 'Tungsten-SemiBold',
						},
						drawerInactiveTintColor: COLORS.white,
						drawerInactiveBackgroundColor: COLORS.white,
						headerTintColor: COLORS.white,
						// 	drawerActiveBackgroundColor: COLORS.darkModOrange,
						// drawerLabelStyle: { fontWeight: 'bold', fontSize: 14 },
						// drawerInactiveTintColor: COLORS.darkBlue,
						// drawerInactiveBackgroundColor: COLORS.white,
						// drawerActiveTintColor: COLORS.white,

						headerStyle: {
							backgroundColor: COLORS.bgGreen,
							height: 50,
							borderBottomColor: COLORS.bgGreen,
							borderBottomWidth: 2,
						},
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
						name={'searchSelectCouncil'}
						component={SearchSelectCouncil}
						options={{
							headerShown: false,
							title: 'Search for SkipSpace',
							// drawerItemStyle: { display: 'none' },
						}}
					/>
					<Drawer.Screen
						name={'vouchers'}
						component={Vouchers}
						options={{
							headerShown: false,
							title: 'Vouchers',
						}}
					/>

					<Drawer.Screen
						name={'userAccount'}
						component={UserAccount}
						options={{
							headerShown: false,
							title: 'Your account',
						}}
					/>
					<Drawer.Screen
						name={'help'}
						component={Help}
						options={{
							headerShown: false,
							title: 'Help',
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
						name={'signedInDashboard'}
						component={SignedInDashboard}
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
						name={'selectedSkipSpace'}
						component={SelectedSkipSpace}
						options={{
							headerShown: false,
							drawerItemStyle: { display: 'none' },
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

import { useCallback } from 'react';
import {
	createDrawerNavigator,
	DrawerContentScrollView,
	DrawerItemList,
} from '@react-navigation/drawer';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

import {
	CreateNewPassword,
	SearchSelectCouncil,
	SelectedSkipSpace,
	SignedInDashboard,
	SkipSpaceResults,
	UserAccount,
	Vouchers,
	VoucherConfirmation,
	Help,
} from '../screens/index';
import { COLORS, theme } from '../../constants/theme';
import { ThemeProvider } from '@rneui/themed';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import ClearBtn from '../components/Button/ClearBtn';

export type DrawerStackParamsList = {
	signedInDashboard: undefined;
	searchSelectCouncil: undefined;
	skipSpaceResults: undefined;
	selectedSkipSpace: undefined;
	userAccount: undefined;
	vouchers: undefined;
	voucherConfirmation: undefined;
	createNewPassword: undefined;
	help: undefined;
};

SplashScreen.preventAutoHideAsync();

// const Drawer = createDrawerNavigator<DrawerStackParamsList>({
// 	UnauthorisedStack: { screen: 'SignedInDashboard' }
// });
const Drawer = createDrawerNavigator<DrawerStackParamsList>();
const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

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
			<View>
				<View style={{ paddingVertical: 10 }}>
					<DrawerItemList state={newState} {...rest} />
				</View>
			</View>
			<View
				style={{
					paddingLeft: 5,
					paddingTop: 10,
					position: 'absolute',
					height: 100,
					left: 0,
					width: windowWidth,
					top: windowHeight - 100,
					borderColor: COLORS.lightBlue,
					borderTopWidth: 1,
				}}
			>
				<ClearBtn
					buttonLabel={'Sign out'}
					onPress={function (): void {
						throw new Error('Function not implemented.');
					}}
				/>
			</View>
		</DrawerContentScrollView>
	);
};
const CustomDrawer = () => {
	const [fontsLoaded, fontError] = useFonts({
		// 'Inter-Black': require('./assets/fonts/Inter-Black.otf'),
		open_sans: require('../../assets/fonts/OpenSans/OpenSans_Regular.ttf'),
		open_sans_medium: require('../../assets/fonts/OpenSans/OpenSans_Medium.ttf'),
		open_sans_cond_semibold: require('../../assets/fonts/OpenSans/OpenSans_CondensedSemiBold.ttf'),
		Open_Sans_SemiCond_Reg: require('../../assets/fonts/OpenSans/OpenSans_SemiCondensedRegular.ttf'),
		tungsten_bold: require('../../assets/fonts/Tungsten/TungstenBold.ttf'),
		Tungsten_SemiBold: require('../../assets/fonts/Tungsten/Tungsten_SemiBold.ttf'),
		tungsten_med: require('../../assets/fonts/Tungsten/Tungsten_Med.otf'),
	});

	// const onLayoutRootView = useCallback(async () => {
	// 	if (fontsLoaded || fontError) {
	// 		await SplashScreen.hideAsync();
	// 	}
	// }, [fontsLoaded, fontError]);

	if (!fontsLoaded && !fontError) {
		return null;
	}
	return (
		// <NavigationContainer onReady={onLayoutRootView}>
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
						fontFamily: 'Tungsten_SemiBold',
					},
					drawerInactiveTintColor: COLORS.white,
					drawerInactiveBackgroundColor: COLORS.white,
					headerTintColor: COLORS.white,

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
					name={'voucherConfirmation'}
					component={VoucherConfirmation}
					options={{
						headerShown: false,
						drawerItemStyle: { display: 'none' },
					}}
				/>

				<Drawer.Screen
					name={'userAccount'}
					component={UserAccount}
					options={{
						headerShown: false,
						title: 'Your Account',
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
		// </NavigationContainer>
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

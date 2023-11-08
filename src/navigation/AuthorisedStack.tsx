import * as React from 'react';
import {
	createDrawerNavigator,
	DrawerContentScrollView,
	DrawerItemList,
} from '@react-navigation/drawer';
import { View, Image, StyleSheet, Dimensions, Text } from 'react-native';

import {
	VerifyEmail,
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
import { COLORS, FONTSIZES, theme } from '../../constants/theme';
import { ThemeProvider } from '@rneui/themed';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import ClearBtn from '../components/Button/ClearBtn';
import { NavigationContainer } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';
// import { handleSignOut } from '../utils/authentication';

export type DrawerStackParamsList = {
	verifyEmail: undefined;
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

export const handleSignOut = async () => {
	try {
		await signOut(auth);
	} catch (error: any) {
		console.error(`Error ${error.code} - ${error.message} `);
	}
};
const Drawer = createDrawerNavigator<DrawerStackParamsList>();
const { width: windowWidth, height: windowHeight } = Dimensions.get('window');
const CustomDrawerContent = (props: any) => {
	const { state, ...rest } = props;
	const newState = { ...state };

	return (
		<DrawerContentScrollView {...props} safeArea>
			<View style={{ marginTop: 0 }}>
				<Image
					source={require('../../assets/images/menulogogreen.png')}
					height={10}
					resizeMode='center'
					resizeMethod='scale'
				/>
			</View>
			<View>
				<View style={{ paddingVertical: 5 }}>
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
				<View style={{ paddingLeft: 10 }}>
					<Text style={{ fontSize: FONTSIZES.large, fontWeight: 'bold' }}>
						{auth.currentUser?.displayName}
					</Text>
				</View>
				<ClearBtn buttonLabel={'Sign out'} onPress={handleSignOut} />
			</View>
		</DrawerContentScrollView>
	);
};
const CustomDrawer = () => {
	const [fontsLoaded, fontError] = useFonts({
		tungsten_bold: require('../../assets/fonts/Tungsten/TungstenBold.ttf'),
		Tungsten_SemiBold: require('../../assets/fonts/Tungsten/Tungsten_SemiBold.ttf'),
		tungsten_med: require('../../assets/fonts/Tungsten/Tungsten_Med.otf'),
	});

	if (!fontsLoaded && !fontError) {
		return null;
	}
	return (
		<NavigationContainer>
			<View style={{ flex: 1 }}>
				<Drawer.Navigator
					initialRouteName={'signedInDashboard'}
					screenOptions={() => ({
						drawerActiveBackgroundColor: COLORS.white,
						// drawerActiveTintColor: COLORS.bgGreen,
						drawerActiveTintColor: COLORS.white,

						drawerLabelStyle: {
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
					})}
					drawerContent={(props) => <CustomDrawerContent {...props} />}
				>
					{/* <Drawer.Screen
						name={'searchSelectCouncil'}
						component={SearchSelectCouncil}
						options={{
							headerShown: false,
							title: 'Search for SkipSpace',
						}}
					/> */}
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

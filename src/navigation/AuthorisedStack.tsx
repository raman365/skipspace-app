import * as React from 'react';
import {
	createDrawerNavigator,
	DrawerContentScrollView,
	DrawerItemList,
} from '@react-navigation/drawer';
import { View, Image, StyleSheet, Dimensions, Text } from 'react-native';

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
	ConfirmDelete,
} from '../screens/index';
import { COLORS, FONTSIZES, theme } from '../../constants/theme';
import { ThemeProvider } from '@rneui/themed';

import * as SplashScreen from 'expo-splash-screen';
import ClearBtn from '../components/Button/ClearBtn';
import { auth } from '../../config/firebase';

import { DrawerStackParamsList } from '../../types/types';
import useAuth from '../hooks/useAuth';

SplashScreen.preventAutoHideAsync();

const Drawer = createDrawerNavigator<DrawerStackParamsList>();

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

const CustomDrawerContent = (props: any) => {
	const { state, ...rest } = props;
	const newState = { ...state };

	const { signUserOut } = useAuth();

	const handleSignOut = () => {
		signUserOut();
	};

	return (
		<View style={{ flex: 1 }}>
			<DrawerContentScrollView {...props} safeArea>
				<View style={{ marginTop: 0 }}>
					{/* <Image
						source={require('../../assets/images/menulogogreen.png')}
						height={10}
						resizeMode='center'
					/> */}
					<Image
						style={styles.logoImage}
						source={require('../Header/image/menulogosml.png')}
						resizeMode='contain'
					/>
				</View>
				<View style={{ flex: 1 }}>
					<View style={{ paddingVertical: 5 }}>
						<DrawerItemList state={newState} {...rest} />
					</View>
				</View>
				<View
					style={{
						height: 100,
						justifyContent: 'flex-end',
						alignItems: 'flex-start',
						paddingLeft: 5,
						paddingTop: 20,
					}}
				>
					<View style={{ paddingLeft: 10 }}>
						<Text
							style={{
								fontSize: FONTSIZES.large,
								fontWeight: 'bold',
								color: COLORS.bgBlue,
							}}
						>
							{auth.currentUser?.displayName}
						</Text>
					</View>
					<ClearBtn buttonLabel={'Sign out'} onPress={handleSignOut} />
				</View>
			</DrawerContentScrollView>
		</View>
	);
};
const CustomDrawer = () => {
	return (
		<View style={{ flex: 1 }}>
			<Drawer.Navigator
				initialRouteName={'signedInDashboard'}
				screenOptions={() => ({
					drawerActiveBackgroundColor: COLORS.white,
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
				<Drawer.Screen
					name={'searchSelectCouncil'}
					component={SearchSelectCouncil}
					options={{
						headerShown: false,
						title: 'Search forjj SkipSpace',
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
					name={'confirmDelete'}
					component={ConfirmDelete}
					options={{
						headerShown: false,
						drawerItemStyle: { display: 'none' },
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

import {
	createDrawerNavigator,
	DrawerContentScrollView,
	DrawerItemList,
} from '@react-navigation/drawer';
import { View, Image } from 'react-native';

import {
	CreateNewPassword,
	SelectCouncil,
	SelectedSkipSpace,
	SignedInDashboard,
	SkipSpaceResults,
	UserAccount,
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
	createNewPassword: undefined;
};
const Drawer = createDrawerNavigator<DrawerStackParamsList>();

const CustomDrawerContent = (props: any) => {
	const { state, ...rest } = props;
	const newState = { ...state };

	return (
		<DrawerContentScrollView {...props} safeArea>
			<View>
				<Image
					source={require('../../assets/images/sslogo.png')}
					height={50}
					resizeMode='contain'
				/>
			</View>
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
					screenOptions={({ navigation }) => ({
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
						// 	<View style={{ backgroundColor: COLORS.bgBlue }}>
						// 		<Button
						// 			onPress={navigation.toggleDrawer}
						// 			// background={'transparent'}
						// 		>
						// 			<Icon name='menu' color='white' />
						// 		</Button>
						// 	</View>;
						// },
					})}
					drawerContent={(props) => <CustomDrawerContent {...props} />}
				>
					<Drawer.Screen
						name={'signedInDashboard'}
						component={SignedInDashboard}
						options={{
							headerShown: false,
						}}
					/>
					<Drawer.Screen
						name={'selectCouncil'}
						component={SelectCouncil}
						options={{
							headerShown: false,
						}}
					/>
					<Drawer.Screen
						name={'skipSpaceResults'}
						component={SkipSpaceResults}
						options={{
							headerShown: false,
						}}
					/>
					<Drawer.Screen
						name={'selectedSkipSpace'}
						component={SelectedSkipSpace}
						options={{
							headerShown: false,
						}}
					/>
					<Drawer.Screen
						name={'userAccount'}
						component={UserAccount}
						options={{
							headerShown: false,
						}}
					/>
					<Drawer.Screen
						name={'createNewPassword'}
						component={CreateNewPassword}
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

import {
	createDrawerNavigator,
	DrawerContentScrollView,
} from '@react-navigation/drawer';
import { View, Image } from 'react-native';

import {} from '../screens/index';

export type DrawerStackParamsList = {
	createNewPassword: undefined;
	selectCouncil: undefined;
	selectedSkipSpace: undefined;
	signedInDashboard: undefined;
	skipSpaceResults: undefined;
	userAccount: undefined;
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
					// alt='SkipSpace logo'
					height={50}
					resizeMode='contain'
				/>
			</View>
			<View>{/* <DrawerItemsList state={newState} {...rest} /> */}</View>
		</DrawerContentScrollView>
	);
};

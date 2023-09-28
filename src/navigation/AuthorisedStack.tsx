import { createStackNavigator } from '@react-navigation/stack';
import {
	SignedInDashboard,
	SelectCouncil,
	SelectedSkipSpace,
	SkipSpaceResults,
	UserAccount,
} from '../screens/index';

import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

export type AuthorisedStackParamsList = {
	SignedInDashboard: undefined;
	SelectCouncil: undefined;
	SelectedSkipSpace: undefined;
	SkipSpaceResults: undefined;
	UserAccount: undefined;
};

export const AuthorisedStack = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name='SignedInDashboard'
					component={SignedInDashboard}
					options={{ headerShown: false }}
				/>
				<Stack.Screen name='SelectCouncil' component={SelectCouncil} />
				<Stack.Screen name='SelectedSkipSpace' component={SelectedSkipSpace} />
				<Stack.Screen name='SkipSpaceResults' component={SkipSpaceResults} />
				<Stack.Screen name='UserAccount' component={UserAccount} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

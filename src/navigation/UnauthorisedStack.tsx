import { createStackNavigator } from '@react-navigation/stack';
import {
	WelcomeHowTo,
	SignUp,
	AuthDashboard,
	ForgotDetails,
} from '../screens/index';

const Stack = createStackNavigator();

export const UnauthorisedStack = () => {
	return (
		<Stack.Navigator>
			{/* 1 Welcome/how to */}
			<Stack.Screen
				name='WelcomeHowTo'
				component={WelcomeHowTo}
				options={{ headerShown: false }}
			/>
			{/* 2 SignIn */}
			<Stack.Screen
				name='AuthDashboard'
				component={AuthDashboard}
				options={{
					headerShown: false,
				}}
			/>

			{/* 3 Register */}
			<Stack.Screen
				name='SignUp'
				component={SignUp}
				options={{
					headerShown: false,
				}}
			/>

			<Stack.Screen
				name='ForgotDetails'
				component={ForgotDetails}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
};

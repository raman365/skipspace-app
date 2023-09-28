import { createStackNavigator } from '@react-navigation/stack';
import {
	WelcomeHowTo,
	SignUp,
	AuthDashboard,
	ForgotDetails,
	VerifyEmail,
} from '../screens/index';

import { NavigationContainer } from '@react-navigation/native';
import { View, Image } from 'react-native';
import { Component } from 'react';
import { COLORS } from '../../constants/theme';

const Stack = createStackNavigator();

export type UnauthorisedStackParamsLists = {
	Welcome: undefined;
	SignUp: undefined;
	AuthDashboard: undefined;
	ForgotDetails: undefined;
	VerifyEmail: undefined;
};

export const UnauthorisedStack = () => {
	return (
		<NavigationContainer>
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

				{/*  4 Verify Email */}
				<Stack.Screen
					name='VerifyEmail'
					component={VerifyEmail}
					options={{ headerShown: false }}
				/>
				{/* 5 Forgot details */}
				<Stack.Screen
					name='ForgotDetails'
					component={ForgotDetails}
					options={{ headerShown: false }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

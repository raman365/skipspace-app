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
import { Component, useCallback } from 'react';
import { COLORS } from '../../constants/theme';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const Stack = createStackNavigator();

export type UnauthorisedStackParamsLists = {
	welcome: undefined;
	signUp: undefined;
	authDashboard: undefined;
	forgotDetails: undefined;
	verifyEmail: undefined;
};

export const UnauthorisedStack = () => {
	const [fontsLoaded, fontError] = useFonts({
		// 'Inter-Black': require('./assets/fonts/Inter-Black.otf'),
		'Open-Sans': require('../../assets/fonts/OpenSans/OpenSans-Regular.ttf'),
		'Open-Sans-Medium': require('../../assets/fonts/OpenSans/OpenSans-Medium.ttf'),
		'Open-Sans-SemiCond-Reg': require('../../assets/fonts/OpenSans/OpenSans_SemiCondensed-Regular.ttf'),
		'Open-Sans-Cond-SemiBold': require('../../assets/fonts/OpenSans/OpenSans_Condensed-SemiBold.ttf'),
		'Open-Sans-Extra-Bold': require('../../assets/fonts/OpenSans/OpenSans-Condensed-ExtraBold.ttf'),
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

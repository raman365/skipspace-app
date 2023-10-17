import { createStackNavigator } from '@react-navigation/stack';
import {
	WelcomeHowTo,
	SignUp,
	AuthDashboard,
	ForgotDetails,
	VerifyEmail,
	SignedInDashboard,
} from '../screens/index';

import { NavigationContainer } from '@react-navigation/native';
import { View, Image } from 'react-native';
import { Component, useCallback } from 'react';
import { COLORS } from '../../constants/theme';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import AuthorisedStack from './AuthorisedStack';

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
		open_sans: require('../../assets/fonts/OpenSans/OpenSans_Regular.ttf'),
		'Open-Sans-Medium': require('../../assets/fonts/OpenSans/OpenSans_Medium.ttf'),
		open_sans_cond_semibold: require('../../assets/fonts/OpenSans/OpenSans_CondensedSemiBold.ttf'),
		Open_Sans_SemiCond_Reg: require('../../assets/fonts/OpenSans/OpenSans_SemiCondensedRegular.ttf'),
		tungsten_bold: require('../../assets/fonts/Tungsten/TungstenBold.ttf'),
		Tungsten_SemiBold: require('../../assets/fonts/Tungsten/Tungsten_SemiBold.ttf'),

		// tungsten_semibold: require('../../assets/fonts/Tungsten/TungstenSemibold.ttf'),
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
		<NavigationContainer onReady={onLayoutRootView} independent={true}>
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

				{/* SignedInDashboard */}
				{/* <Stack.Screen
					name='SignedInDashboard'
					component={SignedInDashboard}
					options={{
						headerShown: false,
					}}
				/> */}

				{/* 5 Forgot details */}
				<Stack.Screen
					name='ForgotDetails'
					component={ForgotDetails}
					options={{ headerShown: false }}
				/>
				{/* DRAWER NAVIGATOR NESTED INTO THE STACK NAVIGATOR */}
				<Stack.Screen
					name='AuthorisedStack'
					component={AuthorisedStack}
					options={{
						headerShown: false,
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

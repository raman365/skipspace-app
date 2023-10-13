import React, { useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import CountDown from 'react-native-countdown-component';
import { COLORS, FONTSIZES } from '../../../constants/theme';

// import CountDownTimer from 'react-native-countdown-timer-hooks';
// TODO: Sort out types

interface IProps {
	onTimerFinish?: () => void;
	//TODO: On timer finish, the code is expired
	// code is added to expired list
	timeAmount?: number;
}

// 24 hours : 86400

const CountdownTimer: React.FC<IProps> = ({ onTimerFinish, timeAmount }) => {
	const refTimer = useRef(); // For keeping a track on the Timer
	const [timerEnd, setTimerEnd] = useState(false);

	const timerCallbackFunc = (timerFlag: any) => {
		// Setting timer flag to finished
		setTimerEnd(timerFlag);
		console.warn(
			'You can alert the user by letting him know that Timer is out.'
		);
	};

	return (
		<View style={{ display: timerEnd ? 'none' : 'flex' }}>
			{/* <CountDownTimer
				ref={refTimer}
				timestamp={timeAmount}
				// timerCallback={timerCallbackFunc}
				timerCallback={onTimerFinish}
				containerStyle={{
					height: 56,
					width: 120,
					justifyContent: 'center',
					alignItems: 'flex-start',
					// borderRadius: 35,
					// backgroundColor: '#2196f3',
				}}
				textStyle={{
					fontSize: FONTSIZES.xxl,
					color: COLORS.softRed,
					fontWeight: '500',
					letterSpacing: 0.25,
				}}
			/> */}
		</View>
	);
};

export default CountdownTimer;

const styles = StyleSheet.create({});

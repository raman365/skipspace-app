import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { FONTSIZES } from '../../../constants/theme';

interface IProps {
	subtitle: string;
	textColor?: string;
}
const Subtitle: React.FC<IProps> = ({ subtitle, textColor }) => {
	return (
		<Text
			style={{
				textAlign: 'center',
				fontWeight: 'bold',
				fontSize: FONTSIZES.large,
				color: textColor,
			}}
		>
			{subtitle}
		</Text>
	);
};

export default Subtitle;

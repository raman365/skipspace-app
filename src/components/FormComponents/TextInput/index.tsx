import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Header, Icon, Input, Button, Image, Text } from '@rneui/themed';
import { FONTSIZES, COLORS } from '../../../../constants/theme';

interface ITextInputProps {
	inputLabel: string;
	placeholder: string;
	secureTextEntry?: boolean;
	errorMessage?: string;
	onChangeText?: () => void;
}

const TextInput: React.FC<ITextInputProps> = ({
	inputLabel,
	placeholder,
	secureTextEntry = false,
	errorMessage,
	onChangeText,
}) => {
	return (
		<View>
			<Text style={styles.textStyle}>{inputLabel} </Text>
			<Input
				inputStyle={styles.inputStyle}
				placeholder={placeholder}
				secureTextEntry={secureTextEntry}
				errorMessage={errorMessage}
				errorStyle={styles.errorStyle}
				onChangeText={onChangeText}
			/>
		</View>
	);
};

export default TextInput;

const styles = StyleSheet.create({
	textStyle: {
		fontSize: FONTSIZES.large,
		paddingBottom: 10,
	},
	inputStyle: {
		backgroundColor: COLORS.alpha.lightBlue,
		opacity: 1,
		paddingHorizontal: 10,
	},
	errorStyle: {
		color: COLORS.softRed,
	},
});

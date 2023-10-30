import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Header, Icon, Input, Button, Image, Text } from '@rneui/themed';
import { FONTSIZES, COLORS } from '../../../../constants/theme';

interface ITextInputProps {
	inputLabel: string;
	placeholder: string;
	secureTextEntry?: boolean;
	disabled?: boolean;
	errorMessage?: string;
	onChangeText?: () => void;
	icon?: JSX.Element;
	style?: string;
}

const TextInput: React.FC<ITextInputProps> = ({
	inputLabel,
	placeholder,
	disabled,
	secureTextEntry = false,
	errorMessage,
	icon,
	onChangeText,
}) => {
	return (
		<View>
			<Text style={styles.textStyle}>{inputLabel} </Text>
			<Input
				inputContainerStyle={styles.contStyle}
				placeholder={placeholder}
				disabled={disabled}
				secureTextEntry={secureTextEntry}
				errorMessage={errorMessage}
				errorStyle={styles.errorStyle}
				onChangeText={onChangeText}
				rightIcon={icon}
			/>
			{/* {icon} */}
		</View>
	);
};

export default TextInput;

const styles = StyleSheet.create({
	textStyle: {
		fontSize: FONTSIZES.large,
		paddingBottom: 10,
	},
	// inputStyle: {
	contStyle: {
		backgroundColor: COLORS.alpha.lightBlue,
		opacity: 1,
		paddingHorizontal: 10,
	},
	errorStyle: {
		color: COLORS.softRed,
	},
});

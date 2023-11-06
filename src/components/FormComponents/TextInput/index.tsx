import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Header, Icon, Input, Button, Image, Text } from '@rneui/themed';
import { FONTSIZES, COLORS } from '../../../../constants/theme';

export enum autoCap {
	NONE = 'none',
	CHARACTERS = 'characters',
	WORDS = 'words',
	SENTENCES = 'sentences',
}

interface ITextInputProps {
	inputLabel: string;
	placeholder?: string;
	secureTextEntry?: boolean;
	disabled?: boolean;
	errorMessage?: string;
	icon?: JSX.Element;
	// onChangeText?: () => void;
	style?: string;
	value: string;
	// autoCapitalize: autoCap;
}

const TextInput: React.FC<ITextInputProps> = ({
	inputLabel,
	placeholder,
	disabled,
	secureTextEntry = false,
	errorMessage,
	icon,
	// onChangeText,
	// autoCapitalize,
	// value,
	...rest
}) => {
	return (
		<View>
			<Text style={styles.textStyle}>{inputLabel} </Text>
			{/* <Input
				inputContainerStyle={styles.contStyle}
				// placeholder={placeholder}
				// disabled={disabled}
				// autoCapitalize={autoCapitalize}
				// value={value}
				// secureTextEntry={secureTextEntry}
				// errorMessage={errorMessage}
				errorStyle={styles.errorStyle}
				// onChangeText={onChangeText}
				rightIcon={icon}
				{...rest}			/> */}
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
	contStyle: {
		backgroundColor: COLORS.alpha.lightBlue,
		opacity: 1,
		paddingHorizontal: 10,
	},
	errorStyle: {
		color: COLORS.softRed,
	},
});

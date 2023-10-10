import * as React from 'react';
import QRCode from 'react-native-qrcode-svg';
import { COLORS } from '../../../constants/theme';
import { Text } from 'react-native';

interface IQREncoderProps {
	codeValue: string;
}

const QREncoder: React.FC<IQREncoderProps> = ({ codeValue }) => {
	// const encodingString = (str: string) => {
	// 	// encodeURIComponent(codeValue);
	// 	// console.log(codeValue);
	// 	btoa(str);
	// 	return str;
	// };

	// Inspired by: https://github.com/davidchambers/Base64.js/blob/master/base64.js

	const chars =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
	const Base64 = {
		btoa: (input: string = '') => {
			let str = input;
			let output = '';

			for (
				let block = 0, charCode, i = 0, map = chars;
				str.charAt(i | 0) || ((map = '='), i % 1);
				output += map.charAt(63 & (block >> (8 - (i % 1) * 8)))
			) {
				charCode = str.charCodeAt((i += 3 / 4));

				if (charCode > 0xff) {
					throw new Error(
						"'btoa' failed: The string to be encoded contains characters outside of the Latin1 range."
					);
				}

				block = (block << 8) | charCode;
			}

			return output;
		},

		atob: (input: string = '') => {
			let str = input.replace(/=+$/, '');
			let output = '';

			if (str.length % 4 == 1) {
				throw new Error(
					"'atob' failed: The string to be decoded is not correctly encoded."
				);
			}
			for (
				let bc = 0, bs = 0, buffer, i = 0;
				(buffer = str.charAt(i++));
				~buffer && ((bs = bc % 4 ? bs * 64 + buffer : buffer), bc++ % 4)
					? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
					: 0
			) {
				buffer = chars.indexOf(buffer);
			}
			// console.log(Base64.btoa(output));
			return output;
		},
	};
	return (
		<>
			<QRCode
				value={Base64.btoa(codeValue)}
				size={170}
				// backgroundColor={COLORS.white}
			/>
			<Text style={{ padding: 20 }}>
				{Base64.atob(codeValue)} | {Base64.btoa(codeValue)}
			</Text>
			<Text style={{ padding: 20 }}>{Base64.btoa(codeValue)}</Text>
		</>
	);
};

export default QREncoder;

import * as React from 'react';
import { Text } from 'react-native';
import CryptoJS from 'react-native-crypto-js';
import QRCode from 'react-native-qrcode-svg';

interface IQREncoderProps {
	// codeValue: string[] | Array<String>()
	codeValue: any;
}

const QREncoder: React.FC<IQREncoderProps> = ({ codeValue }) => {
	let encryptedQRCodeData = CryptoJS.AES.encrypt(
		codeValue,
		'secret key 123'
	).toString();

	let bytes = CryptoJS.AES.decrypt(encryptedQRCodeData, 'secret key 123');
	let originalText = bytes.toString(CryptoJS.enc.Utf8);

	return (
		<>
			<QRCode value={encryptedQRCodeData} size={200} />
			{/* <Text style={{ padding: 20 }}>{encryptedQRCodeData}</Text>
			<Text style={{ padding: 20 }}>{originalText}</Text> */}
		</>
	);
};

export default QREncoder;

//TODO:
// Add 24 hour timer to QR code
// encrypt data in QR code

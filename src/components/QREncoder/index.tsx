import React, { useEffect } from 'react';
import { ActivityIndicator, Text } from 'react-native';
// import CryptoJS from 'react-native-crypto-js';
import QRCode from 'react-native-qrcode-svg';
import { COLORS } from '../../../constants/theme';

// interface IQREncoderProps {
// 	// codeValue: string[] | Array<String>()
// 	codeValue: any;
// }

interface QRCoderProps {
	data: string;
}
const QRCoder: React.FC<QRCoderProps> = ({ data }) => {
	return (
		<>
			{data ? (
				<QRCode value={data} size={200} />
			) : (
				<ActivityIndicator size={'large'} color={COLORS.bgGreen} />
			)}
		</>
	);
};

export default QRCoder;
// const [originalData, setOriginalData] = React.useState(codeValue);

// const [encryptedData, setEncryptedData] = React.useState<string | any>(null);
// // const key ='MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCrg0Holn+8OkLu0bRo/qgWAOFV';
// const key = '123456';

// // const encryptData = async (originalData: string) => {
// const encrpyted = CryptoES.AES.encrypt(codeValue, 'somethingsomething');

// console.log('E: ', encrpyted);

// const decrypted = CryptoES.AES.decrypt(encrpyted, 'somethingsomething');

// console.log('D: ', decrypted);

// setEncryptedData(encrpyted);

// try {
// 	const encryptionKey = await Crypto.digestStringAsync(
// 		Crypto.CryptoDigestAlgorithm.SHA256,
// 		key
// 	);

// 	// encrypt the input data
// 	const encrypted = await Crypto.digestStringAsync(
// 		Crypto.CryptoDigestAlgorithm.SHA256,
// 		originalData + encryptionKey
// 	);
// 	console.log('Orig data: ', originalData);
// 	console.log('encrpyted data:- ', encrypted);

// 	setEncryptedData(encrypted);
// } catch (error) {
// 	console.error('Error encrypting data: ', error);
// }
// };

// useEffect(() => {
// 	encryptData(codeValue);
// }, [codeValue]);

//TODO:
// Add 24 hour timer to QR code
// encrypt data in QR code

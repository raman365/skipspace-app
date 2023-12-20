import React, { useEffect } from 'react';
import { ActivityIndicator, Text } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { COLORS } from '../../../constants/theme';

interface QRCoderProps {
	data: any;
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

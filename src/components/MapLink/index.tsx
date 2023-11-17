import React, { useEffect } from 'react';
import { TouchableOpacity, Text, Linking, Platform } from 'react-native';
import { FONTSIZES, COLORS } from '../../../constants/theme';
import {
	Coordinates,
	getCoordinatesFromAddress,
} from '../../utils/geoCodeHelper';

interface IMapLinkProps {
	label: string;
	onPress?: () => void;
	// address: string | undefined;
	fullAddress: string;
	lat: number;
	lng: number;
}

const MapLink: React.FC<IMapLinkProps> = ({
	label,
	onPress,
	lat,
	lng,
	fullAddress,
}) => {
	const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });

	const latLng = `${lat},${lng}`;

	// const label = 'Custom Label';

	// const url = Platform.select({
	// ios: `${scheme}${label}@${latLng}`,
	// android: `${scheme}${latLng}(${label})`
	// });
	const url: any = Platform.select({
		ios: `maps:0,0?q=${fullAddress}`,
		android: `geo:0,0?q=${fullAddress}`,
	});

	// Linking.openURL(url);

	return (
		<TouchableOpacity onPress={onPress}>
			<Text
				style={{
					// textDecorationLine: 'underline',
					textAlign: 'center',
					fontSize: FONTSIZES.xl,
					fontWeight: 'bold',
					color: COLORS.bgBlue,
				}}
			>
				{/* {label} */}
				{Linking.openURL(url)}
			</Text>
			{/* <Text>{address}</Text> */}
		</TouchableOpacity>
	);
};

export default MapLink;

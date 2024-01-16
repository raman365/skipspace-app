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
	const url: any = Platform.select({
		ios: `maps:0,0?q=${fullAddress}`,
		android: `geo:0,0?q=${fullAddress}`,
	});

	return (
		<TouchableOpacity onPress={onPress}>
			<Text
				style={{
					textAlign: 'center',
					fontSize: FONTSIZES.xl,
					fontWeight: 'bold',
					color: COLORS.bgBlue,
				}}
			>
				{Linking.openURL(url)}
			</Text>
		</TouchableOpacity>
	);
};

export default MapLink;

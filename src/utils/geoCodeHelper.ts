import * as Location from 'expo-location'

export interface Coordinates {
    latitude: number,
    longitude: number,
}

export const getCoordinatesFromAddress = async (address: string): Promise<Coordinates | null> => {
    try {
        const location = await Location.geocodeAsync(address);

        if (location && location.length > 0) {
            const { latitude, longitude } = location[0];
            return { latitude, longitude };
        } else {
            // TODO: Does the below need to be see by the user?
            console.warn('no results found for the address ');
            return null
        }
    } catch (error) {
        console.error('Error getting coordinates', error)
        return null
    }
}
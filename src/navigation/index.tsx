import { AuthorisedStack } from './AuthorisedStack';
import { UnauthorisedStack } from '../navigation/UnauthorisedStack';
import { View } from 'react-native';

export default function RootNavigation() {
	// const { user } = useAuthentication();

	return <AuthorisedStack />;
	// return user ? <AuthorisedStack /> : <UnauthorisedStack />;
}

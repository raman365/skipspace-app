import { AuthorisedStack } from './AuthorisedStack';
import { UnauthorisedStack } from '../navigation/UnauthorisedStack';
import { View } from 'react-native';

export default function RootNavigation() {
	// const { user } = useAuthentication();

	return <UnauthorisedStack />;
	// return user ? <AuthorisedStack /> : <UnauthorisedStack />;
}

// import { useAuthentication } from '../utils/hooks/useAuthentication';
import { AuthorisedStack } from './AuthorisedStack';
import { UnauthorisedStack } from '../navigation/UnauthorisedStack';

export default function RootNavigation() {
	// const { user } = useAuthentication();

	return <AuthorisedStack />;
	// return user ? <AuthorisedStack /> : <UnauthorisedStack />;
}

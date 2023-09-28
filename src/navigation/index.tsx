// import { useAuthentication } from '../utils/hooks/useAuthentication';
import { AuthorisedStack } from './AuthorisedStack';
import { UnauthorisedStack } from '../navigation/UnauthorisedStack';

export default function RootNavigation() {
	// const { user } = useAuthentication();

	return <UnauthorisedStack />;
	// return user ? <AuthorisedStack /> : <UnauthorisedStack />;
}

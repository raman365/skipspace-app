import React, { useState } from 'react';

import AuthorisedStack from './AuthorisedStack';
import { UnauthorisedStack } from './UnauthorisedStack';

import useAuth from '../hooks/useAuth';

export default function Routes() {
	const [loading, setLoading] = useState(false);

	const { user } = useAuth();
	return user ? <AuthorisedStack /> : <UnauthorisedStack />;
}

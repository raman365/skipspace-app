import { View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { auth } from '../../config/firebase';

import { Auth } from 'firebase/auth';
import { AuthorisedStack } from './AuthorisedStack';
import { UnauthorisedStack } from '../navigation/UnauthorisedStack';
// import { auth } from '../../config/firebase';
// import { checkAuthState } from '../../config/sharedAuth';

export default function RootNavigation() {
	// Set initialising state
	const [initializing, setInitializing] = useState(true);
	// const [user, setUser] = useState();

	auth.onAuthStateChanged((user) => {
		if (user) {
			return <AuthorisedStack />;
		} else {
			return <UnauthorisedStack />;
		}
	});

	// return user ? <AuthorisedStack/> : <UnauthorisedStack />;
}

import React, { useContext, useState, useEffect } from 'react';
// import { app } from '../../config/firebase';
import { NavigationContainer } from '@react-navigation/native';

// import { getAuth } from 'firebase/auth';
import AuthorisedStack from './AuthorisedStack';
import { UnauthorisedStack } from './UnauthorisedStack';
// import { AuthContext, IAuth } from './AuthProvider';
import Loading from '../components/Loader';
import useAuth from '../../hooks/useAuth';

export default function Routes() {
	const [loading, setLoading] = useState(false);

	// const { user, setUser } = useContext<Partial<IAuth>>(AuthContext);
	// const [loading, setLoading] = useState(true);

	// const [initialising, setInitialising] = useState(true);

	// // handle user state changes
	// function onAuthStateChanged(user: any) {
	// 	setUser(user);

	// 	if (initialising) setInitialising(false);
	// 	setLoading(false);
	// }

	// useEffect(() => {
	// 	const subscriber = onAuthStateChanged(onAuthStateChanged);
	// 	return subscriber;
	// }, []);

	// if (loading) {
	// 	return <Loading size={'small'} />;
	// }

	// <NavigationContainer>
	{
		/* {!user ? <UnauthorisedStack /> : <AuthorisedStack />} */
	}

	const { user } = useAuth();
	return user ? <AuthorisedStack /> : <UnauthorisedStack />;
}

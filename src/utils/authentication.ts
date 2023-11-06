import { getAuth, signOut, signInWithEmailAndPassword } from 'firebase/auth';
import { Alert } from 'react-native';

const auth = getAuth();

export const handleSignIn = async (email: string, password: string) => {
    if (email && password) {
        try {
            await signInWithEmailAndPassword(auth, email, password).then(
                (userCredential) => {
                    // signedIn
                    const user = userCredential.user;
                    // navigation.navigate('signedInDashboard');
                    console.log('logged in');
                }
            );
        } catch (error: any) {
            const errorCode = error.code;
            const errorMessage = error.message;

            console.log(`${errorCode} - ${errorMessage} `);
        }
    }
};

export const handleSignOut = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        Alert.alert(`An error occurred: ${error}. Please try again`);
    }
};


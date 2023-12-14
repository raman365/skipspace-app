import { useState, useEffect } from 'react'
import { User, UserCredential, createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, sendEmailVerification, deleteUser } from 'firebase/auth'
import { auth } from '../../config/firebase';
import { Alert } from 'react-native';

interface AuthState {
    user: User | null;
    isAuthenticated: boolean | null;

}

interface AuthActions {
    signIn: (email: string, password: string) => Promise<UserCredential>;
    signUp: (email: string, password: string) => Promise<UserCredential>;
    signUserOut: () => Promise<void>;
    sendVerifyEmail: () => Promise<void>;
    checkEmailVerificationStatus: () => Promise<void>
    userDelete: () => Promise<void>
    sendPasswordResetEmail: (email: string) => Promise<void>
}


const useAuth = (): AuthState & AuthActions => {
    const [authState, setAuthState] = useState<AuthState>({
        user: null,
        isAuthenticated: null
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setAuthState({
                user,
                isAuthenticated: user !== null,
            })
        })

        return () => {
            unsubscribe()
        }
    }, [auth])


    const signUp = async (
        email: string,
        password: string
    ): Promise<UserCredential> => {
        const credential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        return credential;
    };

    const signIn = async (
        email: string,
        password: string
    ): Promise<UserCredential> => {
        const credentials = await signInWithEmailAndPassword(auth, email, password);
        return credentials;
    };

    const signUserOut = async (): Promise<void> => {
        try {
            await signOut(auth);
        } catch (err: any) {
            // TODO: Error handling
            console.error(`Error ${err.code} - ${err.message}`);
        }
    };

    const sendVerifyEmail = async (): Promise<void> => {
        const user = auth.currentUser;
        console.log('email sent')

        try {
            user
                ? await sendEmailVerification(user)
                : console.log("error - email not sent, please try ")
        } catch (error) {
            // TODO: Make sure this handled well by the user
            console.error("Error: ", error)
        }
    }

    const checkEmailVerificationStatus = async (): Promise<void> => {
        const user = auth.currentUser;

        if (user) {
            // Reload user to get information
            try {
                // Reload the user to get the latest information
                await user.reload();
                // Access the emailVerified property to check if the email is verified
                if (user.emailVerified) {
                    console.log('Email is verified');
                } else {
                    console.log('Email is not verified');
                }
            } catch (error: any) {
                console.error('Error reloading user:', error.message);
            }
        }
    }

    const userDelete = async (): Promise<void> => {
        const user = auth.currentUser;
        if (user) {

            setAuthState({
                user: null,
                isAuthenticated: false,
            });
            // sign user out before deleting
            await signUserOut()
            try {
                await deleteUser(user);


            } catch (err: any) {
                console.log("Err: ", err)
            }
        }
    }

    const sendResetEmail = async (email: string): Promise<void> => {
        try {
            await sendPasswordResetEmail(auth, email);
            Alert.alert('Password reset email sent!')
        } catch (error: any) {
            console.log(`Error:, ${error.code} - ${error.message}`)

        }

    }

    return { ...authState, signIn, signUp, signUserOut, sendVerifyEmail, sendPasswordResetEmail: sendResetEmail, checkEmailVerificationStatus, userDelete };
}

export default useAuth;

// import { User } from "firebase/auth";
import { useState, useEffect } from "react";
import { auth } from "../config/firebase";

interface User {
    uid: string;
    email: string | null;
}



export default function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    // add loader


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                // user is signed in
                const { uid, email } = authUser;

                setUser({ uid, email });
            } else {
                setUser(null);
            }
        });
        // clean up the listener when the component unmounts:
        return unsubscribe;
    }, []);

    return { user }
}
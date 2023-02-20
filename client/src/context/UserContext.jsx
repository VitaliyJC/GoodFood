import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import app from '../firebase/firebase.config';

export const AuthContext = createContext();

const auth = getAuth(app);

const UserContext = ({ children }) => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [cartItems, setCartItems] = useState([]);

    console.log(cartItems, 'cartitems');

    const googleProvider = new GoogleAuthProvider();

    const createUser = (email, password, name) => {
        return createUserWithEmailAndPassword(auth, email, password, name);

    }

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signInWithGoogle = () => {
        return signInWithPopup(auth, googleProvider)
    }

    const logOut = () => {
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
            console.log('auth state changed', currentUser);
        })
        return () => {
            unsubscribe();
        }
    }, [])

    const onAddToCart = (obj) => {
        setCartItems((prev) => [...prev, obj]);
    };

    const authInfo = { user, loading, createUser, signIn, logOut, signInWithGoogle, onAddToCart, cartItems }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserContext;

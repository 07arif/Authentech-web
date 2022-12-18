import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import app from '../firebase/firebase.init';

const auth = getAuth(app)
export const AuthContext = createContext()

const UserContext = ({ children }) => {
    const GoogleProvider = new GoogleAuthProvider();

    const [user, setUser] = useState({});
    const [loading,setLoading]= useState(true);


    //1. Create User :
    const createUser = ( email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    //2.Update Name:
    const updateName = (name)=>{
        setLoading(true)
        return updateProfile(auth.currentUser,{displayName:name})
    }

    //3.Email verification sent:
    const verifyEmail=()=>{
        setLoading(true)
       return sendEmailVerification(auth.currentUser)
    }

    //4.SignUp With Google:
    const signInWithGoogle = ()=>{
        setLoading(true)
        return signInWithPopup(auth,GoogleProvider)
    }
    //5.Log out:
    const logout = ()=>{
        setLoading(true)
        return signOut(auth)
    }

    //6. Login With Password:
 const signIn = (email,password)=>{
    setLoading(true)
    return signInWithEmailAndPassword(auth,email,password)
 }

    //7. Reset pass / forgot Password:
    const resetPassword = (email)=>{
        setLoading(true)
        return sendPasswordResetEmail(auth,email)
    }

    useEffect(()=>{
      const unsubscribe=  onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser)
            setLoading(false)
        })

        return()=>{
            unsubscribe()
        }
    },[])

    const userInfo = {
        user,
        createUser,
        updateName,
        verifyEmail,
        signInWithGoogle,
        logout,
        signIn,
        resetPassword,
        loading,

    }
    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserContext;
import {useContext,createContext, useEffect, useState} from "react"
import { GoogleAuthProvider,signInWithPopup,signInWithRedirect,signOut,onAuthStateChanged } from "firebase/auth";
import {auth} from "../firebase"

const AuthContext=createContext();

export const AuthContextProvider=({children})=>{

    const [user,setUser]=useState({});

    const googleSignIn=()=>{
        const provider=new GoogleAuthProvider();
        signInWithPopup(auth,provider);
    }
    const logout=()=>{
        signOut(auth);
    }
    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser);
            console.log('User is ',currentUser);
        });
        return ()=>{
            unsubscribe();
        }
    },[])

    return(
        <AuthContext.Provider value={{googleSignIn,logout,user}}>
            {children}
        </AuthContext.Provider>
    )
}
export const UserAuth=()=>{
    return useContext(AuthContext)
}
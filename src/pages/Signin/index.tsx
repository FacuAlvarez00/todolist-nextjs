import React from 'react'
import { googleSignIn, logOut } from '../../app/utils/account'
import {auth} from "../../app/firebase"
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../app/GlobalRedux/features/account/accountSlice';
import Link from "next/link"




export default function SignIn() {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user.user);


    const handleSignIn = async () => {
        try {
            await googleSignIn()
          
        } catch (error) {
            console.log(error)
        }

    }

    const handleSignOut = async () => {
        try {
            await logOut()
        } catch (error) {
            console.log(error)
        }
    }

  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser: any) => {
        dispatch(setUser(currentUser));
      });
  
      return () => {
        unsubscribe();
      };
    }, [dispatch]);

   


    
  return (
    <div>
        <h2>Account panel</h2>
        <Link href="/">
        Return home
        </Link>
        
        {user ? (
            <>
            <p>Welcome {user.displayName}</p>
            <img src="https://lh3.googleusercontent.com/a/AGNmyxYy-f-SJBsgElikqvdkVsloBSz5Pni5qqH05Gd6=s96-c"/> 
            <button onClick={handleSignOut}>Log out</button>
            </>
       
      ) : (
        <>
           <p>Please sign in.</p>
            <button onClick={handleSignIn}>Sign In!</button>
        </>

        
     
      )}
    
      
    </div>
  )
}


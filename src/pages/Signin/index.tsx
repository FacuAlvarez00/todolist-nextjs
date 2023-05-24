'use client'

import React from 'react'
import { googleSignIn} from '../../app/utils/account'
import {auth} from "../../app/firebase"
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GoogleButton from 'react-google-button'
import { redirect } from 'next/navigation';
import { useRouter } from 'next/router';
import { clearTasks } from '@/app/GlobalRedux/features/task/taskSlice';


import Link from "next/link"
import { UserAuth } from '@/app/context/AppContext';




export default function SignIn() {

    const dispatch = useDispatch();
   /*  const user = useSelector((state: any) => state.user.user); */
    const router = useRouter();

    const { userChanged, setUserChanged, handleSignOut, completed, user, setUser } = UserAuth()
    


    const handleSignIn = async () => {
        try {
            await googleSignIn()
            setUserChanged(false)
            
          
        } catch (error) {
            console.log(error)
        }
    }


  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser: any) => {
        /* dispatch(setUser(currentUser)); */
        setUser(currentUser)

      });
  
      return () => {
        unsubscribe();
      };
    }, [dispatch]);

    useEffect(() => {
      if (completed) {
        /* dispatch(clearTasks(tasks)) */
        window.location.reload();
      }
   
    }, [userChanged]);


    useEffect ( () => {
      if (user != null){
        router.push('/');
      }
  }, [user])


   console.log(user)
    
  return (
    <div>
        <h2>Account panel</h2>
      
        
        {user ? (
            <>
            <p>Welcome {user.displayName}</p> 
            <button onClick={handleSignOut}>LogOut</button>
         
            </>
       
      ) : (
        <>
           <p>Please sign in.</p>
            <GoogleButton onClick={handleSignIn}/>
        </>

        
     
      )}

      
    </div>
  )
}


'use client'

import React from 'react'
import { googleSignIn, logOut } from '../../app/utils/account'
import {auth} from "../../app/firebase"
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../app/GlobalRedux/features/account/accountSlice';
import GoogleButton from 'react-google-button'
import { clearTasks } from '@/app/GlobalRedux/features/task/taskSlice';

import Link from "next/link"




export default function SignIn() {

    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user.user);
    const tasks = useSelector((state: any) => state.tasks);
    const [userChanged, setUserChanged] = useState(false)


    const handleSignIn = async () => {
        try {
            await googleSignIn()
            setUserChanged(false)
          
        } catch (error) {
            console.log(error)
        }
    }



    const handleSignOut = async () => {
        try {
            await logOut()
            setUserChanged(true)
          /*   dispatch(clearTasks(tasks))
             */
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

    useEffect(() => {
      dispatch(clearTasks(tasks))
      console.log("tasks clereadas")
      console.log(tasks)
    }, [userChanged]);


   
    
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


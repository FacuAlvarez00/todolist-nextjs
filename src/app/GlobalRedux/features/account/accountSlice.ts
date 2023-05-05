import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState} from '../../store'
import { v4 as uuidv4 } from 'uuid';
import {auth} from "../../../firebase"
import { useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";


const generateId = (): string => {
    return uuidv4();
  };

  interface UserState {
    user: any,
}

const initialState: UserState = {
  user: null
}

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
  
  }

  const logOut = () => {
  signOut(auth)
  }



  const handleSignOut = async () => {
  try {
      await logOut()
  } catch (error) {
      console.log(error)
  }
  }


/*   useEffect( () => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: any) => {
      setUser(currentUser)
      
      
    })
    return () => {
      unsubscribe()
    }
  }, [])
 */

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any> ) => { 
      state.user = action.payload
    },
    removeUser: (state, action: PayloadAction<any> ) => { 
      state.user = action.payload
    }
   },
})

export const { setUser, removeUser } = userSlice.actions


export const selectCount = (state: RootState) => state.tasks

export default userSlice.reducer


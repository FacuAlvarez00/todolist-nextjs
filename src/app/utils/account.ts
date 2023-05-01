import {auth} from "../firebase"
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

export const googleSignIn = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
   
}

export const logOut = () => {
  signOut(auth)
}
'use client'
import { useContext, createContext, ReactNode, useEffect, useState } from "react";
import { logOut } from "../../app/utils/account"


interface IAuthContext {
    userChanged: boolean;
    setUserChanged: (value: boolean) => void;
    handleSignOut: () => void;
    completed: boolean;
    setCompleted: (value: boolean) => void;
    handleCompleted: () => void;
    user: any;
    setUser: (value: any) => void;
    
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

interface IAuthContextProviderProps {
  children: ReactNode;
}


export const AuthContextProvider = ({ children }: IAuthContextProviderProps) => {
    const [userChanged, setUserChanged] = useState(false)
    const [completed, setCompleted] = useState<boolean>(false)
    const [user, setUser] = useState<any>()


    const handleCompleted = () => {
        setCompleted(!completed)
      }

    
    const handleSignOut = async () => {
    try {
        await logOut()
        setUserChanged(true)
    } catch (error) {
        console.log(error)
    }
}

    return <AuthContext.Provider value={{ userChanged, setUserChanged, handleSignOut, completed,
    setCompleted, handleCompleted, user, setUser }}>{children}</AuthContext.Provider>;
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
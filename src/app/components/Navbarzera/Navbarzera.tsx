'use client'

import React from 'react'
import Link from 'next/link'
import { useSelector } from 'react-redux';
import { logOut } from "../../utils/account"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { UserAuth } from '@/app/context/AppContext';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearTasks } from '@/app/GlobalRedux/features/task/taskSlice';



const Navbarzera = () => {


  const tasks = useSelector((state: any) => state.tasks);
  const dispatch = useDispatch();
  const { userChanged, setUserChanged, handleSignOut, completed, user } = UserAuth()




  useEffect(() => {
    if (completed) {
      /* dispatch(clearTasks(tasks)) */
      window.location.reload();

    }

  }, [userChanged]);

  return (
    <nav className=' mb-4'>
      <ul className='d-flex align-items-center fw-semibold'>
        <Link href={"/"}> 
          <li>Home</li>
        </Link>

        {user ? (
          <>
            {/*    <p className="nav-link active">Signed as {user.displayName}</p> */}

            {/*  <Link href="/Signin">
          Account
    </Link> */}
            <li onClick={handleSignOut}>LogOut</li>
          </>
        ) : (
          <>
            <Link href="/Signin">
              <li>Login</li>
            </Link>
          </>
        )}

      </ul>

    </nav>

  )
}

export default Navbarzera

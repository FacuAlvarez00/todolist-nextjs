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

  const user = useSelector((state: any) => state.user.user);
  const tasks = useSelector((state: any) => state.tasks);
  const dispatch = useDispatch();
  const { userChanged, setUserChanged, handleSignOut, completed} = UserAuth()




  useEffect(() => {
    if (completed) {
      /* dispatch(clearTasks(tasks)) */
      window.location.reload();

    }
 
  }, [userChanged]);

  return (
    <Navbar bg="light" expand="lg">
    <Container>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">

          <Link href={"/"}>
            <p>Home</p>
          </Link>

          {user? (
     <>
   {/*    <p className="nav-link active">Signed as {user.displayName}</p> */}
   
  {/*  <Link href="/Signin">
          Account
    </Link> */}
    <p onClick={handleSignOut}>LogOut</p>
     </>
    ):(
      <>
      <Link href="/Signin">
          Login
        </Link>
      </>
    )}



        </Nav>

       

      </Navbar.Collapse>
    </Container>
  </Navbar>

    
  )
}

export default Navbarzera

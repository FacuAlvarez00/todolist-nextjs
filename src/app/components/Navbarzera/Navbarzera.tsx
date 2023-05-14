import React from 'react'
import Link from 'next/link'
import { useSelector } from 'react-redux';
import { logOut } from "../../utils/account"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


const Navbarzera = () => {

  const user = useSelector((state: any) => state.user.user);

  const handleSignOut = async () => {
    try {
        await logOut()
    } catch (error) {
        console.log(error)
    }
}



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
      <p onClick={handleSignOut}>Logout</p>
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

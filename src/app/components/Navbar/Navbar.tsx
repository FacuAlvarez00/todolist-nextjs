import React from 'react'
import Link from 'next/link'
import { useSelector } from 'react-redux';
import { logOut } from "../../utils/account"

const Navbar = () => {

  const user = useSelector((state: any) => state.user.user);

  const handleSignOut = async () => {
    try {
        await logOut()
    } catch (error) {
        console.log(error)
    }
}



  return (
    <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
  {/*   <a className="navbar-brand" href="#">Navbar</a> */}
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
        <Link href={"/"}>
          <p className="nav-link active">Home</p>
        </Link>
        

    {user? (
     <>
   {/*    <p className="nav-link active">Signed as {user.displayName}</p> */}
      <p className="nav-link active pe-auto button_account" onClick={handleSignOut}>Logout</p>
     </>
    ):(
      <>
      <Link href="/Signin">
          Login
        </Link>
      </>
    )}
       
        
      </div>
    </div>
  </div>
</nav>
      
    </div>
  )
}

export default Navbar

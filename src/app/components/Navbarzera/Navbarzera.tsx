'use client';

import React, { useState } from 'react'
import Link from 'next/link'
import { UserAuth } from '@/app/context/AppContext';
import { useEffect } from 'react';
import { useWindowSize } from '@react-hook/window-size';


const Navbarzera = () => {


  const { userChanged, handleSignOut, completed, user } = UserAuth()
  const [mobile, setMobile] = useState<any>(false)
  const [windowWidth] = useWindowSize();



  useEffect(() => {
    if (window.innerWidth > 400) {
      setMobile(false)
      console.log("mobile false")
    } else {
      setMobile(true)
      console.log("mobile true")
    }
  }, [windowWidth])

  console.log(mobile)

  useEffect(() => {
    if (completed) {
      window.location.reload();
    }
  }, [userChanged]);

  const maxNameWords = 2;
  const trimmedName = user?.displayName ? user.displayName.split(' ').slice(0, maxNameWords).join(' ') : '';


  return (
    <nav className=' mb-4'>
      <ul className='d-flex justify-content-between align-items-center fw-semibold px-4'>
        <div className='d-flex flex-row gap-3'>
        <Link href={"/"}>
          <li>Home</li>
        </Link>

        {user ? (
          <>
           
            <li style={{cursor: "pointer"}} onClick={handleSignOut}>LogOut</li>
          </>
        ) : (
          <>
            <Link href="/Signin">
              <li style={{cursor: "pointer"}} className='handleLog'>Login</li>
            </Link>
          </>
        )}

        </div>
        

      {mobile ? null : (user ? <div><li>Welcome, {trimmedName}</li></div> : null)}

      </ul>

    </nav>

  )
}

export default Navbarzera

import React from 'react'
import { Nav } from '../Nav/Nav'
import { Outlet } from 'react-router-dom'
import { Footer } from '../Footer/Footer'

export  function Layout() {
  return <>
        <Nav/>
        {/* <div className="pt-24 pb-8 container mx-auto"> */}
          <Outlet/>
        {/* </div> */}
        <Footer/>
    </>
}

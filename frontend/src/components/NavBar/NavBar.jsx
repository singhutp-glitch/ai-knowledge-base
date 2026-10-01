import React from 'react'
import './NavBar.css';
import { isDemoMode } from '../../auth/authSession';
const NavBar = () => {
  return (
   <div className="nav">
    <h1 className="title">Document Intelligence {isDemoMode?<span className='demo-title'>  (Demo Mode)  </span>:''}</h1>
</div>
  )
}

export default NavBar
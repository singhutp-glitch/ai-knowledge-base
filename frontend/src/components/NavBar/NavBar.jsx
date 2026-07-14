import React from 'react'
import './NavBar.css';
const NavBar = ({setGraphMode}) => {
  return (
    <div className="nav">
            <p>Gemini</p>
            <button className="graph-toggle" onClick={()=>{setGraphMode(prev => !prev)}}>
              graph
            </button>
    </div>
  )
}

export default NavBar
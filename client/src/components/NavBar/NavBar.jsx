import React from 'react'
import {Link} from 'react-router-dom'
import './navBar.css'
import logo from '../../img/logo.png'

function NavBar() {


  return (
    <div className='navbar'>
      <div className='logo-container'>
        <Link to="/" >
          <img className='logo' src={logo} alt='logo'/>
        </Link>
      </div>
      <div className='nav-options'>
        <ul className="nav-links">
          <div className="menu">
          <li>
            <Link to="/home"> HOME </Link>
          </li>
          <li>
            <Link to="/create"> CREATE RECIPE </Link>
          </li>
          </div>
        </ul>
      </div>
    </div>
  )
}

export default NavBar
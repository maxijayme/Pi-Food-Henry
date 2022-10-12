import React from 'react'
import {Link} from 'react-router-dom'
import { getRecipes } from '../../actions'
import {useDispatch} from 'react-redux';
import './navBar.css'
import logo from '../../img/logo.png'

function NavBar() {
  
  const dispatch = useDispatch();

  function handleReset(e){
    e.preventDefault();
    dispatch(getRecipes());
  }

  return (
    <div className='navbar'>
      <div className='logo-container'>
        <img className='logo' src={logo} alt='logo'/>
      </div>
      <div className='nav-options'>
        <ul className="nav-links">
          <div className="menu">
          <li>
            <Link to="/home" onClick={e=>handleReset(e)}> HOME </Link>
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
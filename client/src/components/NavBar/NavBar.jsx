import React from 'react'
import {Link} from 'react-router-dom'
import SearchBar from '../SearchBar/index.jsx'

function NavBar({setOrder}) {
  return (
    <div>
      <SearchBar setOrder={setOrder}/>  
      <ul>
        <li>
          <Link to="/home"> HOME </Link>
        </li>
        <li>
          <Link to="/create"> CREATE RECIPE </Link>
        </li>
      </ul>
    </div>
  )
}

export default NavBar
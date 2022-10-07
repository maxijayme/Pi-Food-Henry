import React from 'react';
import { Link } from 'react-router-dom';

function CreateRecipe() {
    return(
        <div>
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

export default CreateRecipe;
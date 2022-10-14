import React from 'react';
import { Link } from 'react-router-dom';
import './landingpage.css'

function LandingPage() {
    return (
        <div className='container'>
            <Link to= 'home'>
                <button className='landing-btn' >LET'S PLAY!</button>
            </Link>
        </div>
    )
}

export default LandingPage;
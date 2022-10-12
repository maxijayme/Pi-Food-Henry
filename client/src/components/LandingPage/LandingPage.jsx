import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
    return (
        <div>
            <Link to= 'home'>
                <button >LET'S PLAY!</button>
            </Link>
        </div>
    )
}

export default LandingPage;
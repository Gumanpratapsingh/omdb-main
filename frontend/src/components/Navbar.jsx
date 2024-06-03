import React from 'react';
import { FaFilm } from 'react-icons/fa'; // Importing a film icon from react-icons
import { UserIcon } from './UserIcon'; // Import UserIcon component
import { Link, useLocation } from 'react-router-dom'; // Import Link and useLocation from react-router-dom

export function Navbar({ title }) { // Accept title as a prop
    const location = useLocation();
    return (
        <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <div className="flex items-center">
                <FaFilm className="text-2xl mr-2" /> {/* Icon */}
                <span className="font-semibold text-xl">{title || 'MovieApp'}</span> {/* Display title or default */}
            </div>
            <div className="flex items-center">
                {location.pathname !== '/home' && <Link to="/home" className="text-xl mr-4">Home</Link>} {/* Add this line for Home button */}
                <UserIcon /> {/* Move UserIcon to the right side */}
            </div>
        </nav>
    );
}

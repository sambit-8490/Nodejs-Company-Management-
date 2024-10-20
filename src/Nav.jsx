import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  let navigate=useNavigate();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Clear localStorage to remove user-specific data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Optionally, remove any other role or user-specific info
    localStorage.removeItem('role');  // If you store role separately
    
    // Navigate to the login page
    navigate('/login');
    
    // Refresh the page to reset the app state
    window.location.reload();  // Forces a full page reload to reset state
};

  return (
    <nav className="bg-[#1b1f2e] text-white">
      <div className="container mx-auto flex justify-between items-center px-4 py-2 h-[10vh]">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="https://pbs.twimg.com/profile_images/1530972080073633792/udcHiOQa_400x400.jpg"
            alt="logo"
            className="w-[45px] md:w-[50px] lg:w-[60px] rounded-full cursor-pointer"
          />
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              ></path>
            </svg>
          </button>
        </div>

        {/* Links for desktop */}
        <div className="hidden md:flex space-x-8 justify-center items-center text-2xl font-semibold">
          
          <button onClick={handleLogout}  className="cursor-pointer hover:text-gray-400">Logout</button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#1b1f2e] flex justify-center">
          <button onClick={handleLogout} className="block py-2 border-b border-gray-700 cursor-pointer hover:text-gray-400">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Nav;

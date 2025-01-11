import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate(); // For redirection

  // Check if user is logged in when the component mounts
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedOn');
    setIsLoggedIn(loggedIn === 'true'); // Convert to boolean
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('isLoggedOn');
    setIsLoggedIn(false); // Update the state
    setDropdownVisible(false); // Hide dropdown
    navigate('/'); // Redirect to home page after logout
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  return (
    <div>
      <nav className="py-4 flex w-full items-center justify-between">
        <h1 className="text-3xl mx-2 font-bold bg-gradient-to-r from-teal-400 via bg-cyan-400 to-blue-400 text-transparent bg-clip-text font-sans flex items-center">
          <a href="/">Avs</a>
        </h1>

        <div className="ml-auto space-x-4 px-3 flex items-center">
          {!isLoggedIn ? (
            <>
              <a
                href="/login"
                className="px-3 py-2 text-slate-800 rounded-lg transition-colors hover:text-slate-950"
              >
                Log in
              </a>
              <a
                href="/signup"
                className="px-3 py-2 text-slate-800 bg-green-300 rounded-lg transition-colors hover:bg-green-400"
              >
                Sign up
              </a>
            </>
          ) : (
            <>
              <div className="relative">
                <div
                  onClick={toggleDropdown}
                  className="w-12 h-12 rounded-full bg-blue-500 cursor-pointer overflow-hidden flex items-center justify-center"
                >
                  <img src="/images.png" alt="Profile" className="w-full h-full object-cover" />
                </div>

                {/* Dropdown Menu */}
                {dropdownVisible && (
                  <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg transition-all duration-300 ease-in-out transform opacity-100">
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 text-left text-slate-800 rounded-lg hover:text-slate-950 w-full"
                    >
                      Log out
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </nav>
      <hr />
    </div>
  );
};

export default Navbar;

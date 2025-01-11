import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom';
import Salary from '../components/Salary';

const Home = () => {
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

  return (
    <div>
        <Navbar />
        {!isLoggedIn ? (
          <div className='text-center my-2'>
            <h1 className='bg-gradient-to-r from-orange-400 to-amber-400 inline-block text-transparent bg-clip-text text-3xl font-bold'>AVS Services</h1>
            <p className=' font-light'>
            AVS Services is a reliable and innovative company offering a range of solutions across various industries. 
            Specializing in IT support, consulting, and tailored services, we are committed to helping businesses achieve their goals with expert guidance and efficient solutions. 
            Our dedicated team works closely with clients to ensure exceptional service and long-term success. 
            Trust AVS Services to be your partner in delivering high-quality results and enhanced performance.
            </p>
          </div>
        ) : (
          <Salary />
        ) }
        
    </div>
  )
}

export default Home
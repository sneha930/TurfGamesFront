// components/Navbar.jsx
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { getCurrentUser } from './utils/auth';

const Navbar = () => {

  const navigate = useNavigate();
  const[user, setUser] = useState(null);

  const activeClass = "text-green-700 font-semibold";
  const inactiveClass = "text-gray-700 hover:text-green-700 font-medium";

  useEffect(() => {
    setUser(getCurrentUser);
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  }
  
  return (
    <nav className='bg-white flex justify-between items-center px-6 py-4 shadow-md'>
      <div className='text-xl font-bold text-green-700'>TurfBooking🏟️</div>
      <div className='space-x-4 flex items-center'>
        {console.log(user)}
        {!user ? (
        <>
          <NavLink to="/" end className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>Home</NavLink>
          <NavLink to="/signin" className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>SignIn</NavLink>
          <NavLink to="/signup" className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>SignUp</NavLink>
        </>
        ) : ( 
        <>
          <div className='text-gray-700 font-medium items-center flex space-x-2'>
            <span>
              {user.role}
            </span>
            <button onClick={handleLogout} className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition'>Logout</button>
          </div>
        </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

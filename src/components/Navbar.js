// components/Navbar.jsx
import { NavLink } from 'react-router-dom';

const Navbar = () => {

  const activeClass = "text-green-700 font-semibold";
  const inactiveClass = "text-gray-700 hover:text-green-700 font-medium";
  
  return (
    <nav className='bg-white flex justify-between items-center px-6 py-4 shadow-md'>
      <div className='text-xl font-bold text-green-700'>TurfBooking🏟️</div>
      <div className='space-x-4'>
        <NavLink to="/" end className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>Home</NavLink>
        <NavLink to="/signin" className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>SignIn</NavLink>
        <NavLink to="/signup" className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>SignUp</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;

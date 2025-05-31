// components/Navbar.jsx
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='bg-white flex justify-between items-center px-6 py-4 shadow-md'>
      <div className='text-xl font-bold text-green-700'>TurfBooking🏟️</div>
      <div className='space-x-4'>
        <Link to="/" className='text-gray-700 hover:text-green-700 font-medium'>Home</Link>
        <Link to="/signin" className='text-gray-700 hover:text-green-700 font-medium'>SignIn</Link>
        <Link to="/signup" className='text-gray-700 hover:text-green-700 font-medium'>SignUp</Link>
      </div>
    </nav>
  );
};

export default Navbar;

// components/Navbar.jsx
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <div className="text-xl font-bold text-green-700">TurfBooking 🏟️</div>
      <div className="space-x-4">
        <Link to="/login" className="text-gray-700 hover:text-green-700 font-medium">Login</Link>
        <Link to="/signup" className="text-gray-700 hover:text-green-700 font-medium">Sign Up</Link>
      </div>
    </nav>
  );
};

export default Navbar;

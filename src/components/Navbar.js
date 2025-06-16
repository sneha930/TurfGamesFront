import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from './utils/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  const activeClass = "text-green-700 font-semibold";
  const inactiveClass = "text-gray-700 hover:text-green-700 font-medium";

  return (
    <nav className="bg-white flex justify-between items-center px-6 py-4 shadow-md">
      <div className="text-xl font-bold text-green-700">TurfBooking🏟️</div>
      <div className="space-x-4">
        {user ? (
          <>
            <span className="text-gray-700">👤 {user.role}</span>
            <button onClick={handleLogout} className="text-red-600 hover:underline">Logout</button>
          </>
        ) : (
          <>
            <NavLink to="/" end className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>Home</NavLink>
            <NavLink to="/signin" className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>SignIn</NavLink>
            <NavLink to="/signup" className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>SignUp</NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

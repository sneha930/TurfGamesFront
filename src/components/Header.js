import { Link } from "react-router-dom";

const Header = () => {
   return (
       <div className="w-full px-6 flex justify-between items-center bg-green-800">
         <div>
           <img
             src="https://turfportals.com/public/assets/images/turf_portal_logo.png"
             alt="Turf App Logo"
             className="h-12 w-auto"
           />
         </div>
 
         <div>
            <ul className="flex space-x-6 text-gray-700 font-medium">
              <li className="px-3 hover:text-orange-600 text-white font-semibold"><Link to="/">Home</Link></li>
              <li className="px-3 hover:text-orange-600 text-white font-semibold"><Link to="/login">Login</Link></li>
              <li className="px-3 hover:text-orange-600 text-white font-semibold"><Link to="/players">Players</Link></li>
              <li className="px-3 hover:text-orange-600 text-white font-semibold"><Link to="/games">Games</Link></li>
            </ul>
         </div>
      </ div>
   );
 };
 
 export default Header;
 
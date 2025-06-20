import { NavLink } from "react-router-dom";

const Sidebar = () => {

  return (
    <div className='w-64 h-screen bg-gray-800 text-white p-4 space-y-4'>
      <h2 className='text-xl font-bold mb-6'>Admin Panel</h2>
      <ul className='space-y-2'>
         <li><NavLink to="players" className="hover:underline">Players</NavLink></li>
         <li><NavLink to="games" className="hover:underline">Games</NavLink></li>
         <li><NavLink to="slots" className="hover:underline">Slots</NavLink></li>
         <li><NavLink to="turfs" className="hover:underline">Turfs</NavLink></li>
         <li><NavLink to="bookslot" className="hover:underline">Join Game</NavLink></li>
      </ul>
    </div>
  )
}

export default Sidebar
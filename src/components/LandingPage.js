import { Link } from "react-router-dom";

const LandingPage = () => {

   return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-center px-4">
         <h1 className="text-4xl font-bold text-green-700 mb-4">Welcome to TurfBooking</h1>
         <p className="text-gray-600 mb-6 text-lg">Book your favorite sports slots in seconds.</p>
         <div className="space-x-4">
            <Link to="/login" className="bg-green-600 text-white px-6 py-2 rounded 
            hover:bg-green-700">Login</Link>
            <Link to="/signup" className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300">SignUp</Link>
         </div>
      </div>
   )
}

export default LandingPage;
import { useState } from "react";
import Header from "./Header";

const Login = () => {

   const [isSignInForm, setIsSignInForm] = useState(true);

   const toggleSignInForm = () => {
      setIsSignInForm(!isSignInForm);
   };

   return (
      <div>
         <div className="absolute">
            <img src="https://img.freepik.com/free-vector/striped-green-grass-field-seamless_1284-51715.jpg?t=st=1743765512~exp=1743769112~hmac=1fda5b93aa6db5d5cbc51ac7c04215700de1c7b881617f268135aa776c7769e0&w=826" alt="background" />
         </div>
         <form className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm && (
          <input
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-700"
          />
        )}
        <input
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-700"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700"
        />
        <button className="p-4 my-6 bg-red-700 w-full rounded-lg">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New Member? Sign Up Now"
            : "Already registered? Sign In Now."}
        </p>
      </form>
      </div>
   )
}

export default Login;
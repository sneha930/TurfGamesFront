import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./utils/AuthContext";

const SignInForm = () => {
  const [credentials, setCredentials] = useState({
    emailId: "",
    password: ""
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post("http://localhost:9090/users/signin", credentials);
    console.log("Login success data from useSignUpResponseDto:", response.data);
    // alert("Login successful!");

    const userData = response.data;
    console.log("response after login:", userData);

    login(userData); // Save to context/localStorage
    const stored = localStorage.getItem("user");
    console.log("Stored user in localStorage:", stored);

    if (userData.role === "ADMIN" || userData.role === "PLAYERADMIN") {
      console.log("Navigating to:", "/admin/dashboard");
      navigate("/admin/dashboard");
    } else if (userData.role === "PLAYER") {
      console.log("Navigating to:", "/player/dashboard");
      navigate("/player/dashboard");
    } else {
      navigate("/");
    }

    setCredentials({
      emailId: "",
      password: "",
    });

  } catch (error) {
    console.error("Login failed:", error);
    alert("Invalid credentials");
  }
};


  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="email"
          name="emailId"
          placeholder="Email"
          value={credentials.emailId}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignInForm;

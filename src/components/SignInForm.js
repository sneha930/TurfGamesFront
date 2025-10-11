import React, { useState } from "react";
import api from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./utils/AuthContext";

console.log("api:", api);

const SignInForm = () => {
  const [credentials, setCredentials] = useState({
    emailId: "",
    password: "",
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await api.post("/users/signin", credentials);
    console.log("Login success:", response.data);

    const { token, user } = response.data;

    // Save token + user in context/localStorage
    login({ token, user });

    const role = user.role?.replace("ROLE_", ""); // Normalize role

    if (role === "ADMIN" || role === "PLAYERADMIN") {
      navigate("/admin/dashboard");
    } else if (role === "PLAYER") {
      navigate("/player/dashboard");
    } else {
      navigate("/");
    }

    setCredentials({ emailId: "", password: "" });
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

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignInForm = () => {
  const [credentials, setCredentials] = useState({
    emailId: "",
    password: ""
  });

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
      // Call your Spring Boot login API
      const response = await axios.post("http://localhost:9090/auth/signin", credentials);

      // Handle success (e.g., store token or redirect)
      console.log("Login success:", response.data);
      alert("Login successful!");

      // Destructure role and emailId from response
      const { emailId, role } = response.data;

      // Save user data in local storage
      localStorage.setItem("user", JSON.stringify({ emailId, role }));

      // Redirect based on role
      if (role === "ADMIN") {
        navigate("/admin/dashboard");
      } else if (role === "PLAYER") {
        navigate("/player/dashboard");
      } else {
        navigate("/");
      }

      // Reset form data
      setCredentials({
        emailId: "",
        password: "",
      })

      // Navigate or store user info/token if needed
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

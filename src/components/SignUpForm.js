import React, { useState } from "react";
import axios from "axios";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    emailId: "",
    password: "",
    role: "PLAYER",
    name: "",
    dob: "",
    address: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      country: "",
      pincode: ""
    },
    contact: {
      primaryContact: "",
      homeContact: "",
      emergencyContact: ""
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [field]: value }
      }));
    } else if (name.startsWith("contact.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        contact: { ...prev.contact, [field]: value }
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace with your API endpoint
      await axios.post("http://localhost:9090/auth/signup", formData);
      alert("User registered successfully!");

      // Reset form fields
      setFormData({
        emailId: "",
        password: "",
        role: "PLAYER",
        name: "",
        dob: "",
        address: {
          line1: "",
          line2: "",
          city: "",
          state: "",
          country: "",
          pincode: ""
        },
        contact: {
          primaryContact: "",
          homeContact: "",
          emergencyContact: ""
        }
      });

    } catch (error) {
      console.error("Signup error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">User Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Email */}
        <input
          type="email"
          name="emailId"
          placeholder="Email"
          value={formData.emailId}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        {/* Role */}
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="PLAYER">Player</option>
          <option value="ADMIN">Admin</option>
        </select>

        {formData.role === "PLAYER" && (
        <>
        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        {/* DOB */}
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <h3 className="font-semibold mt-4">Address</h3>
        <input
          type="text"
          name="address.line1"
          placeholder="Line 1"
          value={formData.address.line1}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="address.line2"
          placeholder="Line 2"
          value={formData.address.line2}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="address.city"
          placeholder="City"
          value={formData.address.city}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="address.state"
          placeholder="State"
          value={formData.address.state}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="address.country"
          placeholder="Country"
          value={formData.address.country}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="address.pincode"
          placeholder="Pincode"
          value={formData.address.pincode}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <h3 className="font-semibold mt-4">Contact</h3>
        <input
          type="text"
          name="contact.primaryContact"
          placeholder="Primary Contact"
          value={formData.contact.primaryContact}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="contact.homeContact"
          placeholder="Home Contact"
          value={formData.contact.homeContact}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="contact.emergencyContact"
          placeholder="Emergency Contact"
          value={formData.contact.emergencyContact}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        </>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;

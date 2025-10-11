import React, { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [gameList, setGameList] = useState([]);

  useEffect(() => {
    api
      .get("/games/get_all_games")
      .then((res) => setGameList(res.data))
      .catch((err) => console.log("GameList fetch failed:", err));
  }, []);

  const [formData, setFormData] = useState({
    emailId: "",
    password: "",
    role: "PLAYER", // default role
    name: "",
    dob: "",
    favouriteGameDtos: [],
    addressDto: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
    },
    contactDto: {
      primaryContact: "",
      homeContact: "",
      emergencyContact: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("addressDto.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        addressDto: { ...prev.addressDto, [field]: value },
      }));
    } else if (name.startsWith("contactDto.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        contactDto: { ...prev.contactDto, [field]: value },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleCheckboxChange = (e, game) => {
    const { checked } = e.target;
    setFormData((prevFormData) => {
      const currentGames = [...prevFormData.favouriteGameDtos];

      if (checked) {
        if (!currentGames.find((g) => g.id === game.id)) {
          currentGames.push(game);
        }
      } else {
        return {
          ...prevFormData,
          favouriteGameDtos: currentGames.filter((g) => g.id !== game.id),
        };
      }

      return { ...prevFormData, favouriteGameDtos: currentGames };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isPlayerFlag =
      formData.role === "PLAYER" || formData.role === "PLAYERADMIN";

    const dataToSend = { ...formData, isPlayer: isPlayerFlag };

    try {
      console.log("Submitting:", dataToSend);
      const response = await api.post("/users/signup", dataToSend);
      console.log("Signup Success:", response.data);
      alert("User registered successfully!");
      navigate("/signin");

      // Reset form
      setFormData({
        emailId: "",
        password: "",
        role: "PLAYER",
        name: "",
        dob: "",
        favouriteGameDtos: [],
        addressDto: {
          line1: "",
          line2: "",
          city: "",
          state: "",
          country: "",
          pincode: "",
        },
        contactDto: {
          primaryContact: "",
          homeContact: "",
          emergencyContact: "",
        },
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
          required
        >
          <option value="PLAYER">Player</option>
          <option value="ADMIN">Admin</option>
          <option value="PLAYERADMIN">Player+Admin</option>
        </select>

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

        {/* Address */}
        <h3 className="font-semibold mt-4">Address</h3>
        {["line1", "line2", "city", "state", "country", "pincode"].map(
          (field) => (
            <input
              key={field}
              type="text"
              name={`addressDto.${field}`}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={formData.addressDto[field]}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          )
        )}

        {/* Contact */}
        <h3 className="font-semibold mt-4">Contact</h3>
        {["primaryContact", "homeContact", "emergencyContact"].map((field) => (
          <input
            key={field}
            type="text"
            name={`contactDto.${field}`}
            placeholder={field.replace(/([A-Z])/g, " $1")}
            value={formData.contactDto[field]}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        ))}

        {/* Favourite Games (visible only for players) */}
        {(formData.role === "PLAYER" || formData.role === "PLAYERADMIN") && (
          <>
            <label className="block mb-1 font-medium">Select Favourite Games</label>
            {gameList.map((game) => (
              <div key={game.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={game.id}
                  checked={formData.favouriteGameDtos.some((g) => g.id === game.id)}
                  onChange={(e) => handleCheckboxChange(e, game)}
                />
                <label htmlFor={game.id}>{game.name}</label>
              </div>
            ))}
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

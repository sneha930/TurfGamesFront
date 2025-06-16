import React, { useEffect, useState } from "react";
import axios from "axios";
import { getCurrentUser } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

const AddGameForm = () => {
  const user = getCurrentUser();
  console.log("Current User from localStorage:", user);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  const [gameData, setGameData] = useState({
    name: "",
    description: "",
    minPlayers: "",
    maxPlayers: "",
    createdBy: {id: null }
  });

  useEffect(() => {
  const fetchUser = async () => {
    console.log("Inside useEffect");
    if (user?.emailId) {
      try {
        const response = await axios.get(`http://localhost:9090/users/get_user_by_emailid/${user.emailId}`);
        console.log("Calling GET with emailId:", user.emailId);
        console.log("Fetched user data from backend:", response.data);
        const id = response.data.id;
        setUserId(id);
        console.log("Fetched userId from backend:", id);

        setGameData((prev) => ({
          ...prev,
          createdBy: { id },

        }));
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }
  };
  fetchUser();
}, [user?.emailId]);

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setGameData({ ...gameData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:9090/games", gameData); 
      setMessage("Game added successfully!");
      
      setGameData({
        name: "",
        description: "",
        minPlayers: "",
        maxPlayers: "",
        createdBy: { id: userId },
      });

      navigate("/admin/dashboard/games");

    } catch (error) {
      console.error("Error adding game:", error);
      setMessage("Something went wrong. Try again!");
    }
  };

   console.log("userId during render:", userId);

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Game</h2>
      {message && <div className="text-center mb-3 text-green-600">{message}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Game Name</label>
          <input
            type="text"
            name="name"
            value={gameData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={gameData.description}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Minimum Required Players</label>
          <input
            name="minPlayers"
            value={gameData.minPlayers}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Maximum Required Players</label>
          <input
            name="maxPlayers"
            value={gameData.maxPlayers}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <button
          type="submit"
          disabled={!userId}
          className={`w-full py-2 px-4 rounded-md transition ${
            userId
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-400 text-gray-700 cursor-not-allowed"
          }`}
        >
          {userId ? "Add Game" : "Loading..."}
        </button>
      </form>
    </div>
  );
};

export default AddGameForm;

import React, { useState } from "react";
import axios from "axios";

const AddGameForm = () => {
  const [gameData, setGameData] = useState({
    name: "",
    description: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setGameData({ ...gameData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:9090/games", gameData); // adjust URL if needed
      setMessage("Game added successfully!");
      setGameData({ name: "", description: "" }); // reset form
    } catch (error) {
      console.error("Error adding game:", error);
      setMessage("Something went wrong. Try again!");
    }
  };

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

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Add Game
        </button>
      </form>
    </div>
  );
};

export default AddGameForm;

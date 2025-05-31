import { useState } from "react";
import axios from "axios";

const GameForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [gameSlots, setGameSlots] = useState([
    { slotName: '', startTime: '', endTime: '', isBooked: false },
  ]);

  const handleSlotChange = (index, field, value) => {
    const updatedSlots = [...gameSlots];
    updatedSlots[index][field] = value;
    setGameSlots(updatedSlots);
  };

  const handleAddSlot = () => {
    setGameSlots([
      ...gameSlots,
      { slotName: '', startTime: '', endTime: '', isBooked: false },
    ]);
  };

  const handleRemoveSlot = (index) => {
    const updatedSlots = gameSlots.filter((_, i) => i !== index);
    setGameSlots(updatedSlots);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const gameData = {
      name,
      description,
      gameSlots,
    };

    try {
      const response = await axios.post("http://localhost:9090/games", gameData);
      alert("Game added successfully!");
      setName('');
      setDescription('');
      setGameSlots([{ slotName: '', startTime: '', endTime: '', isBooked: false }]);
    } catch (error) {
      alert("Error adding game");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg my-2">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Add New Game</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Game Name</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800">Game Slots</h3>
          {gameSlots.map((slot, index) => (
            <div key={index} className="border p-4 rounded-lg">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Slot Name</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={slot.slotName}
                  onChange={(e) => handleSlotChange(index, "slotName", e.target.value)}
                />
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Start Time</label>
                <input
                  type="time"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={slot.startTime}
                  onChange={(e) => handleSlotChange(index, "startTime", e.target.value)}
                />
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">End Time</label>
                <input
                  type="time"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={slot.endTime}
                  onChange={(e) => handleSlotChange(index, "endTime", e.target.value)}
                />
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Is Booked</label>
                <input
                  type="checkbox"
                  checked={slot.isBooked}
                  onChange={(e) => handleSlotChange(index, "isBooked", e.target.checked)}
                />
              </div>

              <button
                type="button"
                onClick={() => handleRemoveSlot(index)}
                className="mt-2 bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Remove Slot
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddSlot}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Add Another Slot
          </button>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-2 rounded-lg mt-4"
          >
            Submit Game
          </button>
        </div>
      </form>
    </div>
  );
};

export default GameForm;

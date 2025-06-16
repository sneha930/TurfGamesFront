import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GameTable = () => {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:9090/games")
      .then(response => setGames(response.data))
      .catch(error => console.error("Failed to fetch games", error));
  }, []);

  const closeModal = () => setSelectedGame(null);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Games</h2>
        <button onClick={() => navigate("/admin/dashboard/add-game")} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Add Game</button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4 border">Game Name</th>
              <th className="py-2 px-4 border">Description</th>
              {/* <th className="py-2 px-4 border">Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {games.map((game) => (
              <tr key={game.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border">{game.name}</td>
                <td className="py-2 px-4 border">{game.description}</td>
                {/* <td className="py-2 px-4 border">
                  <button
                    onClick={() => setSelectedGame(game)}
                    className="text-blue-600 hover:underline"
                  >
                    View Slots
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Slots */}
      {selectedGame && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-xl p-6 shadow-lg w-[90%] max-w-2xl relative max-h-[80vh] overflow-y-auto">
            <button
              onClick={closeModal}
              className="absolute top-2 right-4 text-gray-500 hover:text-red-600 text-xl font-bold"
            >
              ×
            </button>
            <h3 className="text-xl font-semibold mb-4">Slots for {selectedGame.name}</h3>
            {selectedGame.gameSlots?.length > 0 ? (
              <table className="min-w-full text-sm border">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="py-2 px-4 border">Slot Name</th>
                    <th className="py-2 px-4 border">Time</th>
                    <th className="py-2 px-4 border">Turf Size</th>
                    <th className="py-2 px-4 border">Capacity</th>
                    <th className="py-2 px-4 border">Booked</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedGame.gameSlots.map((slot) => (
                    <tr key={slot.id} className="hover:bg-gray-50">
                      <td className="py-2 px-4 border">{slot.slotName}</td>
                      <td className="py-2 px-4 border">{slot.startTime} - {slot.endTime}</td>
                      <td className="py-2 px-4 border">{slot.turfSizeDto?.sizeName}</td>
                      <td className="py-2 px-4 border">{slot.turfSizeDto?.capacity}</td>
                      <td className="py-2 px-4 border">
                        {slot.booked ? (
                          <span className="text-red-600 font-semibold">Yes</span>
                        ) : (
                          <span className="text-green-600 font-semibold">No</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No slots available for this game.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GameTable;

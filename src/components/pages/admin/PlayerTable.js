import api from "../../../api/axiosInstance";
import React, { useEffect, useState } from 'react';

const PlayerTable = () => {
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null); // for modal
  const [loading, setLoading] = useState(true);

  // fetch players
  const fetchPlayers = async () => {
    try {
      const response = await api.get("/users/by_roles?roles=PLAYER,PLAYERADMIN");
      setPlayers(response.data);
      console.log("Response from API:", response.data);
    } catch (error) {
      console.log("Failed to fetch players", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPlayers();
  }, []);

  const closeModal = () => setSelectedPlayer(null);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md relative">
      <h2 className="text-2xl font-semibold mb-4">Registered Players</h2>
      
      {loading ? (
        <p className='text-gray-600'>Loading Players...</p>
      ) : players.length === 0 ? (
        <p>No Players found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">DOB</th>
                <th className="py-2 px-4 border">City</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(players) && players.map((player) => (
                <tr key={player.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border">{player.name || "-"}</td>
                  <td className="py-2 px-4 border">{player.dob || "-"}</td>
                  <td className="py-2 px-4 border">{player.addressDto?.city || "-"}</td>
                  <td className="py-2 px-4 border">
                    <button
                      onClick={() => setSelectedPlayer(player)}
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}

      {/* Player Details Modal */}
      {/* Player Details Modal */}
{selectedPlayer && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
    <div className="bg-white rounded-xl p-6 shadow-lg w-[90%] max-w-lg relative">
      <button
        onClick={closeModal}
        className="absolute top-2 right-4 text-gray-500 hover:text-red-600 text-xl font-bold"
      >
        ×
      </button>
      <h3 className="text-xl font-semibold mb-4">Player Details</h3>
      <div className="text-sm space-y-2">
        <p><strong>Name:</strong> {selectedPlayer.name || "-"}</p>

        <div>
          <strong>Favourite Games:</strong>
          {(selectedPlayer.favouriteGameDtos && selectedPlayer.favouriteGameDtos.length > 0) ? (
            <ul className="list-disc pl-5">
              {selectedPlayer.favouriteGameDtos.map((favgame) => (
                <li key={favgame.id}>{favgame.name}</li>
              ))}
            </ul>
          ) : (
            <span className="text-gray-500">No favourite games added</span>
          )}
        </div>

        <p><strong>DOB:</strong> {selectedPlayer.dob || "-"}</p>
        <p><strong>Primary Contact:</strong> {selectedPlayer.contactDto?.primaryContact || "-"}</p>
        <p><strong>Home Contact:</strong> {selectedPlayer.contactDto?.homeContact || "-"}</p>
        <p><strong>Emergency Contact:</strong> {selectedPlayer.contactDto?.emergencyContact || "-"}</p>
        <p><strong>Address:</strong> {selectedPlayer.addressDto ? `${selectedPlayer.addressDto.line1 || ""}, ${selectedPlayer.addressDto.line2 || ""}` : "-"}</p>
        <p><strong>City:</strong> {selectedPlayer.addressDto?.city || "-"}</p>
        <p><strong>State:</strong> {selectedPlayer.addressDto?.state || "-"}</p>
        <p><strong>Country:</strong> {selectedPlayer.addressDto?.country || "-"}</p>
        <p><strong>Pincode:</strong> {selectedPlayer.addressDto?.pincode || "-"}</p>
      </div>
    </div>
  </div>
)}

    </div>
  )
}

export default PlayerTable;

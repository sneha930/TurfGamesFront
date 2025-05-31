import { useState } from "react";
import PlayerForm from "./PlayerForm";

const PlayerCard = ({ player, onPlayerUpdated }) => {
  const [isEditing, setIsEditing] = useState(false);

  const deletePlayer = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this player?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:9090/players/${player.id}`, { method: "DELETE" });
      if (res.ok) {
        alert("Player deleted successfully");
        onPlayerUpdated?.();
      } else {
        alert("Failed to delete player");
      }
    } catch (err) {
      console.error("Error deleting player:", err);
      alert("An error occurred.");
    }
  };

  return (
    <div className="mb-4">
      {isEditing ? (
        <PlayerForm
          existingPlayer={player}
          onSuccess={() => {
            setIsEditing(false);
            onPlayerUpdated?.();
          }}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <div className="bg-white text-gray-800 p-4 rounded-xl shadow border max-w-sm">
          <p className="text-lg font-semibold mb-1">{player.name}</p>
          <p className="text-sm mb-2">DOB: {player.dob}</p>
          <div className="text-sm mb-2">
            <p className="font-medium">Address:</p>
            <p>{player?.address?.line1}</p>
            <p>{player?.address?.line2}</p>
            <p>{player?.address?.city}, {player?.address?.state}, {player?.address?.country}</p>
          </div>
          <div className="text-sm">
            <p className="font-medium">Contacts:</p>
            <p>Primary: {player?.contact?.primaryContact}</p>
            <p>Home: {player?.contact?.homeContact}</p>
            <p>Emergency: {player?.contact?.emergencyContact}</p>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-2 py-1 rounded-lg text-sm transition mr-2 mt-2"
          >
            Edit
          </button>
          <button
            onClick={deletePlayer}
            className="bg-red-500 hover:bg-red-600 text-white font-medium px-2 py-1 rounded-lg text-sm transition mt-2"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default PlayerCard;

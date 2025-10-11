import { useEffect, useState } from "react";
import api from "../../../api/axiosInstance";
import { getCurrentUser } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

const BookSlotForm = () => {
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [player, setPlayer] = useState(null);
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null);
  const [allPlayers, setAllPlayers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
  const storedUser = getCurrentUser();
  if (!storedUser) return;

  setCurrentLoggedInUser(storedUser);

  // Fetch all slots
  api.get("/gameslot/get_all_game_slots")
    .then(res => setSlots(res.data))
    .catch(err => console.error("Slot fetch failed:", err));

  if (storedUser.role !== "PLAYER") {
    // For ADMIN / PLAYERADMIN → fetch all players
    api.get("/users/by_roles?roles=PLAYER,PLAYERADMIN")
      .then(res => {
        const playersWithPlayerId = res.data.map(u => ({
          ...u,
          playerId: u.playerDto?.id
        }));

        const sortedPlayers = playersWithPlayerId.sort((a, b) =>
          a.id === storedUser.id ? -1 : 1
        );

        setAllPlayers(sortedPlayers);
        setPlayer(sortedPlayers[0]);
      })
      .catch(err => console.error("Players fetch failed:", err));
  } else {
    // For PLAYER → fetch their PlayerDto from backend
    api.get(`/users/current_player?userId=${storedUser.id}`)
      .then(res => setPlayer(res.data))
      .catch(err => console.error("Player fetch failed:", err));
  }
}, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSlot || !player) return alert("Please select a slot.");

    const payload = {
      slotName: selectedSlot.slotName,
      startTime: selectedSlot.startTime,
      endTime: selectedSlot.endTime,
      booked: true,
      game: { id: selectedSlot.game.id },
      turfSizeDto: { id: selectedSlot.turfSizeDto?.id },
      playerDtos: [{ id: player.id }] // ✅ always correct Player.id
    };

    try {
      await api.put(`/gameslot/book_slot/${selectedSlot.id}`, payload);
      alert("Slot booked successfully!");

      if (currentLoggedInUser.role === "PLAYER") {
        navigate("/player/dashboard/slots");
      } else {
        navigate("/admin/dashboard/slots");
      }
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Failed to book slot");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Book a Slot</h2>

      {/* Slot selection */}
      <label className="block font-semibold mb-2">Select a Slot</label>
      <select
        className="w-full p-2 mb-4 border rounded"
        onChange={(e) => {
          const slot = slots.find(s => s.id === e.target.value);
          setSelectedSlot(slot);
        }}
      >
        <option value="">-- Choose Slot --</option>
        {slots.map(slot => {
          const alreadyJoined = slot.playerDtos?.some(p => p.id === player?.id);

          return (
            <option key={slot.id} value={slot.id} disabled={alreadyJoined}>
              {slot.slotName} | {slot.startTime}-{slot.endTime} | {slot.game.name} {alreadyJoined ? "(Already Booked)" : ""}
            </option>
          );
        })}
      </select>

      {/* Player selection for ADMIN / PLAYERADMIN */}
      {(currentLoggedInUser?.role === "PLAYERADMIN" || currentLoggedInUser?.role === "ADMIN") && (
        <>
          <label className="block mb-2 font-medium">Select a Player</label>
          <select
            className="w-full p-2 mb-4 border rounded"
            value={player?.id || ""}
            onChange={(e) => {
              const selected = allPlayers.find(p => p.id === e.target.value);
              setPlayer(selected);
            }}
          >
            {allPlayers.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </>
      )}

      {player && <p className="mb-4 text-sm text-gray-600">Booking as: <strong>{player.name}</strong></p>}

      {selectedSlot?.playerDtos?.some(p => p.id === player?.id) && (
        <p className="text-red-600 text-sm mb-4">⚠️ You’ve already booked this slot.</p>
      )}

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Book Slot
      </button>
    </div>
  );
};

export default BookSlotForm;

import { useEffect, useState } from "react";
import axios from "axios";
import { getCurrentUser } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

const BookSlotForm = () => {
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  // player: The player who is booking the slot (defaults to logged-in user).
  const [player, setPlayer] = useState(null);
  // ourUser: The currently logged-in user.
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null);
  const [allPlayers, setAllPlayers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = getCurrentUser();
    console.log("SU: ", storedUser);
    if (storedUser) {
      setPlayer(storedUser); // Set default selected player or default booking player is self
      setCurrentLoggedInUser(storedUser);
      console.log("got the our user id: "+storedUser.id);
    }

    // fetch all slots
    axios.get("http://localhost:9090/gameslot")
      .then(res => setSlots(res.data))
      .catch(err => console.error("Slot fetch failed:", err));

    // fetch all players if user is PLAYERADMIN or ADMIN
    if (storedUser?.role !== "PLAYER") {
      axios.get("http://localhost:9090/users/users/by_roles?roles=PLAYER,PLAYERADMIN")
        .then(res => {
          const localUser = getCurrentUser();
          console.log("hrtr"+JSON.stringify(res.data));
          // It moves the current user (if present in the list) to the top of the array.
          // If a.id matches the current logged-in user's id (localUser.id), it returns -1, so a comes before b in the sorted list.
          // Otherwise, a stays after b.
          // This ensures the currently logged-in player appears first in the dropdown or list.
          const sorted_data = res.data.sort((a,b) => { 
            if(a?.id == localUser?.id) return -1; 
            else return 1; 
          })
          setAllPlayers(sorted_data); 
          // setPlayer: Automatically selects the first player in the list as the default.
          // Since we sorted the list, the first player is usually the logged-in user, unless they weren't in the list.
          console.log("Sorted player:", sorted_data[0]);
          setPlayer(sorted_data[0]);})
        .catch(err => console.error("Players fetch failed:", err));
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
      turfSizeDto: { id: selectedSlot.turfSizeDto.id },
      // playerDtos: [{ id: player.playerDto.id }]
      playerDtos: [{ id: player?.playerDto?.id }]
    };

    try {
      await axios.put(`http://localhost:9090/gameslot/book_slot/${selectedSlot.id}`, payload);
      alert("Slot booked successfully!");

      {currentLoggedInUser?.role === "PLAYER" ? navigate("/player/dashboard/slots") : navigate("/admin/dashboard/slots")}
    } catch (error) {
      console.error(error);
      alert("Failed to book slot");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Book a Slot</h2>

      <label className="block font-semibold mb-2">Select a Slot</label>
      <select
        className="w-full p-2 mb-4 border rounded"
        onChange={(e) => {
          const slot = slots.find(s => s.id.toString() === e.target.value);
          setSelectedSlot(slot);
        }}
      >
        <option value="">-- Choose Slot --</option>
        {slots.map(slot => {
          const playerId = player?.playerDto?.id || player?.id;
          const alreadyJoined = slot.playerDtos?.some(p => p.id === playerId);

          return (
            <option key={slot.id} value={slot.id} disabled={alreadyJoined}>
              {slot.slotName} | {slot.startTime} - {slot.endTime} | {slot.game.name} | {slot.turfSizeDto.turf.name} | {alreadyJoined ? " (Already Booked)" : ""}
            </option>
          )
        })}
      </select>

      {selectedSlot && (
        <div className="bg-gray-50 p-4 rounded mb-4 space-y-1 text-sm">
          <p><strong>Slot:</strong> {selectedSlot.slotName}</p>
          <p><strong>Time:</strong> {selectedSlot.startTime} - {selectedSlot.endTime}</p>
          <p><strong>Date:</strong> {selectedSlot.date}</p>
          <p><strong>Game:</strong> {selectedSlot.game.name}</p>
          <p><strong>Players:</strong> {selectedSlot.game.minPlayers} - {selectedSlot.game.maxPlayers}</p>
          <p><strong>Turf Size:</strong> {selectedSlot.turfSizeDto.sizeName}</p>
          <p><strong>Turf Name:</strong> {selectedSlot.turfSizeDto.turf.name}</p>
          <p><strong>Location:</strong> {selectedSlot.turfSizeDto.turf.address}</p>
        </div>
      )}

      {selectedSlot && player && selectedSlot.playerDtos?.some(p => p.id === (player?.playerDto?.id || player?.id)) && (
      <p className="text-red-600 text-sm mb-4">
        ⚠️ You’ve already booked this slot.
      </p>
      )}

      {/* Show dropdown if user is PLAYERADMIN */}
      {(currentLoggedInUser?.role === "PLAYERADMIN" || currentLoggedInUser?.role === "ADMIN") &&(
        <>
          <label className="block mb-2 font-medium">Select a Player</label>
          <select
            className="w-full p-2 mb-4 border rounded"
            value={player?.id || ""}
            onChange={(e) => {
              const selected = allPlayers.find(p => String(p.id) === e.target.value);
              setPlayer(selected);
            }}
          >
            
            {/* Show other players */}
            {allPlayers.map(p => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </>
      )}

      {/* Always show current selected player */}
      {player && (
        <p className="mb-4 text-sm text-gray-600" >
          Booking as: <strong>{player.name}</strong>
        </p>
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

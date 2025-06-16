import { useEffect, useState } from "react";
import axios from "axios";
import { getCurrentUser } from "../../utils/auth";

const BookSlotForm = () => {
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [player, setPlayer] = useState(null);
  const [ourUser, setOurUser] = useState(null);


  useEffect(() => {
    // Reads the user from localStorage
    const storedUser = getCurrentUser();
    
    console.log("checking => "+ JSON.stringify(storedUser));
    if (storedUser) {
      console.log("player from localStorage:", storedUser.playerDto);
      // extracts and sets the playerDto into player
      setPlayer(storedUser.playerDto);
      //  stores full user into ourUser
      setOurUser(storedUser);
    }

    // 1. Fetch all slots
    axios.get("http://localhost:9090/gameslot")
      .then(res => setSlots(res.data))
      .catch(err => console.error("Slot fetch failed:", err));

    // 2. Fetch player by email from localStorage
    /*if (user?.emailId) {
      axios.get(`http://localhost:9090/users/get_user_by_emailid/${user.emailId}`)
        .then(res => setPlayer(res.data))
        .catch(err => console.error("Player fetch failed:", err));
    }*/
  }, []);

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSlot || !player) return alert("Please select a slot.");

    const payload = {
      // id: selectedSlot.id,
      slotName: selectedSlot.slotName,
      startTime: selectedSlot.startTime,
      endTime: selectedSlot.endTime,
      booked: true,
      // game: { id: ... }
      // This connects the GameSlot back to the correct Game entity.
      // The backend needs this association to persist the relationship (@ManyToOne Game in GameSlot).
      // You're just sending the ID — which is enough for JPA to link it.
      game: { id: selectedSlot.game.id },
      //  telling the backend which TurfSize this slot belongs to.
      turfSizeDto: { id: selectedSlot.turfSizeDto.id },
      // attaching the logged-in player to the slot so they become part of the game
      // playerDtos: [player] 
      playerDtos: [{ id: player.id }]
    };

    try {
      await axios.put(`http://localhost:9090/gameslot/book_slot/${selectedSlot.id}`, payload);
      console.log(payload);
      alert("Slot booked successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to book slot");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Book a Slot</h2>

      <label className="block font-semibold mb-2">Select a Slot</label>
      {/* Shows all fetched slots as dropdown options. */}
      <select
        className="w-full p-2 mb-4 border rounded"
        onChange={(e) => {
          const slot = slots.find(s => s.id.toString() === e.target.value);
          setSelectedSlot(slot);
        }}
      >
        <option value="">-- Choose Slot --</option>
        {slots.map(slot => (
          <option key={slot.id} value={slot.id}>
            {slot.slotName} | {slot.startTime} - {slot.endTime} | {slot.game.name}
          </option>
        ))}
      </select>

        {/* If a slot is selected, show all its details */}
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

      {player && (
        <p className="mb-4 text-sm text-gray-600">
          Booking as: <strong>{ourUser.name}</strong>
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

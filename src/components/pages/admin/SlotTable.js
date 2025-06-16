import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SlotTable = () => {
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:9090/gameslot")  // Adjust API endpoint as needed
      .then(response => setSlots(response.data))
      .catch(error => console.error("Failed to fetch slots", error));
  }, []);

  const closeModal = () => setSelectedSlot(null);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold mb-4">Slots</h2>
        <button onClick={() => navigate("/admin/dashboard/create-slot")} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Create Slot</button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4 border">Slot Name</th>
              <th className="py-2 px-4 border">Time</th>
              <th className="py-2 px-4 border">Turf Name</th>
              <th className="py-2 px-4 border">Turf Size</th>
              <th className="py-2 px-4 border">Capacity</th>
              <th className="py-2 px-4 border">Booked</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {slots.map((slot) => (
              <tr key={slot.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border">{slot.slotName}</td>
                <td className="py-2 px-4 border">{slot.startTime} - {slot.endTime}</td>
                <td className="py-2 px-4 border">{slot?.turfSizeDto?.turf?.name}</td>
                <td className="py-2 px-4 border">{slot.turfSizeDto?.sizeName}</td>
                <td className="py-2 px-4 border">{slot.turfSizeDto?.capacity}</td>
                <td className="py-2 px-4 border">
                  {slot.booked ? (
                    <span className="text-red-600 font-semibold">Yes</span>
                  ) : (
                    <span className="text-green-600 font-semibold">No</span>
                  )}
                </td>
                <td className="py-2 px-4 border">
                  <button
                    onClick={() => setSelectedSlot(slot)}
                    className="text-blue-600 hover:underline"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Slot Details */}
      {selectedSlot && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-xl p-6 shadow-lg w-[90%] max-w-lg relative max-h-[80vh] overflow-y-auto">
            <button
              onClick={closeModal}
              className="absolute top-2 right-4 text-gray-500 hover:text-red-600 text-xl font-bold"
            >
              ×
            </button>
            <h3 className="text-xl font-semibold mb-4">Slot Details: {selectedSlot.slotName}</h3>
            <p><strong>Time:</strong> {selectedSlot.startTime} - {selectedSlot.endTime}</p>
            <p><strong>Turf Size:</strong> {selectedSlot.turfSizeDto?.sizeName}</p>
            <p><strong>Capacity:</strong> {selectedSlot.turfSizeDto?.capacity}</p>
            <p>
              <strong>Booked:</strong>{" "}
              {selectedSlot.booked ? (
                <span className="text-red-600 font-semibold">Yes</span>
              ) : (
                <span className="text-green-600 font-semibold">No</span>
              )}
            </p>
            {/* You can add more slot details here if needed */}
          </div>
        </div>
      )}
    </div>
  );
};

export default SlotTable;

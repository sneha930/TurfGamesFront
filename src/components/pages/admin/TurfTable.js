import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TurfTable = () => {
  const [turfs, setTurfs] = useState([]);
  const [selectedTurf, setSelectedTurf] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:9090/turf") // Update your API if needed
      .then((response) => {
        setTurfs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching turf list:", error);
      });
  }, []);

  const closeModal = () => setSelectedTurf(null);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Turfs</h2>
        <button
          onClick={() => navigate("/admin/dashboard/add-turf")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add Turf
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Address</th>
              <th className="py-2 px-4 border">Description</th>
              <th className="py-2 px-4 border">Total Sizes</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {turfs.map((turf) => (
              <tr key={turf.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border">{turf.name}</td>
                <td className="py-2 px-4 border">{turf.address}</td>
                <td className="py-2 px-4 border truncate max-w-[200px]">{turf.description}</td>
                <td className="py-2 px-4 border">{turf.turfSize?.length || 0}</td>
                <td className="py-2 px-4 border">
                  <button
                    onClick={() => setSelectedTurf(turf)}
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

      {/* Compact Modal for Turf Details */}
      {selectedTurf && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-xl p-4 shadow-lg w-[90%] max-w-md relative max-h-[80vh] overflow-y-auto">
            <button
              onClick={closeModal}
              className="absolute top-2 right-3 text-gray-500 hover:text-red-600 text-lg font-bold"
            >
              ×
            </button>

            <h3 className="text-lg font-semibold mb-3 text-gray-800">
              {selectedTurf.name}
            </h3>
            <p className="text-sm mb-1">
              <strong>📍 Address:</strong> {selectedTurf.address}
            </p>
            <p className="text-sm mb-3">
              <strong>📝 Description:</strong> {selectedTurf.description}
            </p>

            <div>
              <p className="text-sm font-semibold mb-1">⚽ Turf Sizes:</p>
              <ul className="list-disc pl-5 text-sm space-y-1">
                {selectedTurf.turfSize?.map((size, i) => (
                  <li key={i}>
                    {size.sizeName} - {size.capacity} players
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TurfTable;

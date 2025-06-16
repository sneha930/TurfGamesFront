import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddTurfForm = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [turfSize, setTurfSize] = useState([{ sizeName: "", capacity: "" }]);

  const navigate = useNavigate();

  const handleTurfSizeChange = (index, field, value) => {
    const updated = [...turfSize];
    updated[index][field] = value;
    setTurfSize(updated);
  };

  const addTurfSizeField = () => {
    setTurfSize([...turfSize, { sizeName: "", capacity: "" }]);
  };

  const removeTurfSizeField = (index) => {
    const updated = turfSize.filter((_, i) => i !== index);
    setTurfSize(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const turfData = { name, address, description, turfSize };

    try {
      const response = await axios.post("http://localhost:9090/turf", turfData);
      alert("Turf created successfully!");
      navigate("/admin/dashboard/turfs");
    } catch (error) {
      console.error("Failed to create turf", error);
      alert("Error creating turf. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-2xl">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Add New Turf</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Turf Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="e.g. Turf Lion"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="e.g. Baner"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            required
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="e.g. Good turf with various sizes"
          />
        </div>

        {/* Turf Sizes */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Turf Sizes</label>
          {turfSize.map((size, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={size.sizeName}
                onChange={(e) => handleTurfSizeChange(index, "sizeName", e.target.value)}
                placeholder="Size (e.g. 5v5)"
                required
                className="flex-1 px-3 py-2 border rounded-lg"
              />
              <input
                type="number"
                value={size.capacity}
                onChange={(e) => handleTurfSizeChange(index, "capacity", e.target.value)}
                placeholder="Capacity"
                required
                className="w-24 px-3 py-2 border rounded-lg"
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeTurfSizeField(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addTurfSizeField}
            className="text-sm text-blue-600 hover:underline mt-1"
          >
            + Add another size
          </button>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddTurfForm;

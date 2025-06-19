import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {

  const navigate = useNavigate();
  const[gameList, setGameList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:9090/games")
    .then(res => setGameList(res.data))
    .catch(err => console.log("GameListFetch failed: ", err));
  }, [])

  const [formData, setFormData] = useState({
    emailId: "",
    password: "",
    role: "",
    name: "",
    dob: "",
    favouriteGameDtos: [],
    addressDto: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      country: "",
      pincode: ""
    },
    contactDto: {
      primaryContact: "",
      homeContact: "",
      emergencyContact: ""
    }
  });

  const handleChange = (e) => {
    const { name, value} = e.target;  // Get field name and value

    // Check if it's an address field like "address.city"
    if (name.startsWith("addressDto.")) {
      const field = name.split(".")[1]; // Extracts "city" from "addressDto.city"
      setFormData((prev) => ({
        ...prev, // copy everything else
        addressDto: { ...prev.addressDto,  // copy existing address fields
          [field]: value // update only that one field (e.g., city)
        }
      }));
    } else if (name.startsWith("contactDto.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        contactDto: { ...prev.contactDto, [field]: value }
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleCheckboxChange = (e, game) => {
    // If a checkbox is checked, the game is added to favouriteGameDtos.
    // If unchecked, it filters that game out.true → checkbox is checked (user selected it), false → checkbox is unchecked (user deselected it)
     
    // Destructures the checked value from the checkbox that triggered the event.
  const { checked } = e.target;

  // Since form data depends on previous state, you use functional form of setState.
  // prevFormData is the latest snapshot of formData.
  setFormData((prevFormData) => {
    // Clones the current list of selected games (so original state isn't directly mutated).
    // This is necessary for safe React state updates.
    const currentGames = [...prevFormData.favouriteGameDtos];

    // First check if the game is not already in the list.
    // If it’s not in, push the game object to the list.
    // This prevents duplicates in the selection.
    if (checked) {
      // Add game object if not already present
      if (!currentGames.find((g) => g.id === game.id)) {
        currentGames.push(game);
      }

      // filter() removes the game whose ID matches the current one.
      // Returns a new updated formData with that game removed.
      // 💡 Why use return here?
      // When unchecked, we return early with the updated favouriteGameDtos.
    } else {
      // Remove game object by ID
      const updatedGames = currentGames.filter((g) => g.id !== game.id);
      return {
        ...prevFormData,
        favouriteGameDtos: updatedGames,
      };
    }

    // This is for the "checked" case.
    // After possibly adding the game, we return the new form data with the updated game list.
    return {
      ...prevFormData,
      favouriteGameDtos: currentGames,
    };
  });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Determine if isPlayer should be true
    const isPlayerFlag = formData.role === "PLAYER" || formData.role === "PLAYERADMIN";

    const dataToSend = {
    ...formData,
    isPlayer: isPlayerFlag
  };

    try {
      // Replace with your API endpoint
      console.log("Submitting:", formData);
      const response = await axios.post("http://localhost:9090/users/signup", dataToSend);
      console.log("Signup Success Response: ", response.data);
      alert("User registered successfully!");
      navigate("/signin")

      // Reset form fields
      setFormData({
        emailId: "",
        password: "",
        role: "PLAYER",
        name: "",
        dob: "",
        favouriteGameDtos: [],
        addressDto: {
          line1: "",
          line2: "",
          city: "",
          state: "",
          country: "",
          pincode: ""
        },
        contactDto: {
          primaryContact: "",
          homeContact: "",
          emergencyContact: ""
        }
      });

    } catch (error) {
      console.error("Signup error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">User Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Email */}
        <input
          type="email"
          name="emailId"
          placeholder="Email"
          value={formData.emailId}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        {/* Role */}
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="" disabled hidden>Select Role</option> {/* placeholder */}
          <option value="PLAYER">Player</option>
          <option value="ADMIN">Admin</option>
          <option value="PLAYERADMIN">Player+Admin</option>
        </select>

        <>
        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        {/* DOB */}
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <h3 className="font-semibold mt-4">Address</h3>
        <input
          type="text"
          name="addressDto.line1"
          placeholder="Line 1"
          value={formData.addressDto.line1}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="addressDto.line2"
          placeholder="Line 2"
          value={formData.addressDto.line2}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="addressDto.city"
          placeholder="City"
          value={formData.addressDto.city}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="addressDto.state"
          placeholder="State"
          value={formData.addressDto.state}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="addressDto.country"
          placeholder="Country"
          value={formData.addressDto.country}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="addressDto.pincode"
          placeholder="Pincode"
          value={formData.addressDto.pincode}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <h3 className="font-semibold mt-4">Contact</h3>
        <input
          type="text"
          name="contactDto.primaryContact"
          placeholder="Primary Contact"
          value={formData.contactDto.primaryContact}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="contactDto.homeContact"
          placeholder="Home Contact"
          value={formData.contactDto.homeContact}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="contactDto.emergencyContact"
          placeholder="Emergency Contact"
          value={formData.contactDto.emergencyContact}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        {(formData.role === "PLAYER" || formData.role === "PLAYERADMIN") && (
        <>
        <label className="block mb-1 font-medium">Select Favourite Games</label>
        {gameList.map((game) => (
          <div key={game.id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={game.id}
              checked={formData.favouriteGameDtos.some((g) => g.id === game.id)}
              onChange={(e) => handleCheckboxChange(e, game)}
            />
            <label htmlFor={game.id}>{game.name}</label>
          </div>
        ))}
        </>
      )}

      </>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;

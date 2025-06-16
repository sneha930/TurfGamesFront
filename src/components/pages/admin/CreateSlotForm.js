import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateSlotForm = () => {
    const [games, setGames] = useState([]);
    const [allTurfSizes, setAllTurfSizes] = useState([]);
    const navigate = useNavigate();
  
    const [game, setGame] = useState('');
    const [turfSize, setTurfSize] = useState('');
    const[slotName, setSlotName] = useState('');
    const[startTime, setStartTime] = useState('');
    const[endTime, setEndTime] = useState('');
    const [date, setDate] = useState('');
  
    const [gameId, setGameId] = useState('');
    const [turfSizeId, setTurfSizeId] = useState('');
  
  
    const handleSubmit = async(e) => {
      e.preventDefault();
  
      // Check if all fields are filled (you already use 'required' in input)
      // if(!game || !turfSize || !slotName || !startTime || !endTime || !date) {
      //   alert("Please fill all the fields");
      //   return;
      // }
  
      // ✅ Find the selected game object by ID
      const selectedGame = games.find(g => g.id.toString() === gameId);
  
      const bookingData = {
        game : selectedGame,
        turfSizeDto: turfSize,
        slotName,
        startTime,
        endTime,
        date,
        booked:true
      }
  
      try {
        const response = await axios.post("http://localhost:9090/gameslot", bookingData);
        console.log("Booking successful:", response.data);
        alert("Game slot created successfully");
  
      // Reset form after Submit
      setGame('');
      setTurfSize('');
      setSlotName('');
      setStartTime('');
      setEndTime('');
      setDate('');
      setTurfSizeId('');

      navigate("/admin/dashboard/slots")
  
      } catch(error) {
        console.log("Error booking slot", error);
        alert("Failed to book slot, please try again");
      }
    }
  
    // Fetch game list from Spring Boot backend
    useEffect(() => {
     axios.get("http://localhost:9090/games")
     .then((response) => {
        setGames(response.data)
        console.log(response.data);
     })
     .catch((error) => {
        console.log("Error fetching games", error);
     })
  
     axios.get("http://localhost:9090/turf")
     .then((response) => {
        setAllTurfSizes(response.data);
        
        console.log(response.data);
     })
     .catch((error) => {
        console.log("Error fetching turfSize", error);
     })
    }, []);
  
    return (
  
      <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-2xl">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Create Your Game Slot</h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
  
            {/* select game */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="game" className="block text-gray-700 font-medium mb-1">
              Select Game
              </label>
              <select
                id="game"
                name="game"
                value={gameId}
                onChange={(e) => setGameId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select a game</option>
                {games.map((game) => (
                  <option key={game.id} value={game.id}>{game.name}</option>
                ))}
              </select>
            </div>
  
              {/* Turf Size */}
              <div>
                <label htmlFor="turfSize" className="block text-gray-700 font-medium      mb-1">
                  Select Turf Size
                </label>
                <select
                  id="turfSize"
                  name="turfSize"
                  value={turfSizeId}
                  onChange={(e) => {
                    const selectedId = e.target.value;
                    setTurfSizeId(selectedId);
  
                    const selectedSize = allTurfSizes
                      .flatMap(t => t.turfSize)
                      .find(s => s.id.toString() === selectedId);
  
                    setTurfSize(selectedSize); // store full object
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Select Turf Size</option>
                  {allTurfSizes.map(turf =>
                    turf.turfSize.map(size => (
                      <option key={size.id} value={size.id}>
                        {turf.name}: {size.sizeName}
                      </option>
                    ))
                  )}
                </select>
  
              </div>
            </div>
  
            <label htmlFor="slotName" className="block text-gray-700 font-medium mb-1">
              Enter Slot Name
            </label>
            <input
              type="text"
              id="slotName"
              placeholder="Enter Slot Name"
              value={slotName}
              onChange={(e) => setSlotName(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
  
            {/* Start Time */}
          <div>
            <label htmlFor="startTime" className="block text-gray-700 font-medium mb-1">
              Start Time
            </label>
            <input
              type="time"
              id="startTime"
              name="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
  
          {/* End Time */}
          <div>
            <label htmlFor="endTime" className="block text-gray-700 font-medium mb-1">
              End Time
            </label>
            <input
              type="time"
              id="endTime"
              name="endTime"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
  
          {/* Date Picker */}
          <div>
            <label htmlFor="date" className="block text-gray-700 font-medium mb-1">
              Select Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
  
          </div>
  
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    );
}

export default CreateSlotForm;
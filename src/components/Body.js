import React, { useState } from "react";
import PlayerForm from "./PlayerForm";
import GameForm from "./GameForm";
import GameSlotBookingForm from "./GameSlotBookingForm";

const Body = () => {
  const [showPlayerForm, setShowPlayerForm] = useState(false);
  const [showGameForm, setShowGameForm] = useState(false);
  const [showGameSlotBookingForm, setShowGameSlotBookingForm] = useState(false);

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-gray-100 py-20">
      {/* Action Buttons */}
      <div className="bg-white p-10 rounded-lg shadow-lg flex space-x-8 mb-10">
        <button
          onClick={() => setShowPlayerForm(true)}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Add Player
        </button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => setShowGameForm(true)}>
          Add Game
        </button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => setShowGameSlotBookingForm(true)}>
          Create GameSlotBooking
        </button>
      </div>

      {/* Player Form */}
      {showPlayerForm && (
        <div className="w-full flex justify-center">
          <PlayerForm />
        </div>
      ) || showGameForm && (
        <div className="w-full flex justify-center">
          <GameForm />
        </div>
      ) || showGameSlotBookingForm && (
        <div className="w-full flex justify-center">
          <GameSlotBookingForm />
        </div>
      )
      }
      
    </div>
  );
};

export default Body;

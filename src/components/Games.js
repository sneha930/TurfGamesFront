import { useState, useEffect } from "react";
import GameForm from "./GameForm";
import GameCard from "./GameCard";

const Games = () => {

   const [showGameForm, setShowGameForm] = useState(false);
   const [gameInfo, setGameInfo] = useState(null);
   
   useEffect(() => {
      fetchGames();
   }, []);
   
   const fetchGames = async () => {
      try {
         const response = await fetch("http://localhost:9090/games");
         const json = await response.json();
         console.log(json)
         setGameInfo(json);
         } catch (error) {
            console.error("Failed to fetch games:", error);
         }
   };

   return (
      <div className="min-h-screen bg-gray-100 p-6">
         <div className="flex justify-between">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Games</h1>
            <button
            onClick={() => setShowGameForm(true)}
            className="px-1 py-0 m-1 bg-green-600 text-white rounded hover:bg-green-700"
         >
            Add New Game
         </button>
         </div>

        {showGameForm && (
        <div className="w-full flex justify-center">
          <GameForm />
        </div>
        )}

         {gameInfo === null || gameInfo.length === 0 ? (
            <h2 className="text-gray-600 text-lg">No data to show</h2>
         ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
               {gameInfo.map((game) => (
                  <GameCard key={game.id} game={game}/>
               ))}
            </div>
         )}
      </div>
   )
}

export default Games;
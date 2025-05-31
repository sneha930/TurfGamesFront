import React from 'react'

const GameCard = ({game}) => {

   console.log(game)

   const deleteGame = async() => {
      const confirmDelete = window.confirm("Are you sure you want to delete this game?")
      if(!confirmDelete) return;

      try {
         const res = await fetch(`http://localhost:9090/games/${game.id}`, {
            method: "DELETE",
         });
         if(res.ok) {
            alert("Game deleted successfully");
         } else {
            alert("Failed to delete game");
         }
      } catch (error) {
         console.error("Error deleting game:", error);
         alert("An error occurred.");
      }
   }

  return (
      <div key={game.id} className="bg-white text-gray-800 p-4 rounded-xl shadow border max-w-sm">
      <p className="text-lg font-semibold mb-1">{game.name}</p>
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-2 py-1 rounded-lg text-sm transition mr-2 my-1">Edit</button>
      <button onClick={deleteGame} className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-2 py-1 rounded-lg text-sm transition mr-2 my-1">Delete</button>
      </div>
  )
}

export default GameCard
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PlayerCard from './PlayerCard';
import PlayerForm from './PlayerForm';

const PlayerList = () => {
  const [players, setPlayers] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);

  const fetchPlayers = async () => {
    const res = await axios.get('http://localhost:9090/players');
    setPlayers(res.data);
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  return (
    <div className="p-6">
      <button
        className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
        onClick={() => setShowAddForm(!showAddForm)}
      >
        {showAddForm ? 'Hide Form' : 'Add New Player'}
      </button>

      {showAddForm && (
        <PlayerForm
          onSuccess={() => {
            setShowAddForm(false);
            fetchPlayers();
          }}
        />
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {players.map(player => (
          <PlayerCard key={player.id} player={player} onPlayerUpdated={fetchPlayers} />
        ))}
      </div>
    </div>
  );
};

export default PlayerList;

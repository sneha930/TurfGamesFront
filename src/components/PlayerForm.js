import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlayerForm = ({ existingPlayer = null, onSuccess, onCancel }) => {
  const isEdit = !!existingPlayer;

  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [primaryContact, setPrimaryContact] = useState('');
  const [homeContact, setHomeContact] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [pincode, setPincode] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (isEdit && existingPlayer) {
      setName(existingPlayer.name || '');
      setDob(existingPlayer.dob || '');
      setPrimaryContact(existingPlayer.contact?.primaryContact || '');
      setHomeContact(existingPlayer.contact?.homeContact || '');
      setEmergencyContact(existingPlayer.contact?.emergencyContact || '');
      setLine1(existingPlayer.address?.line1 || '');
      setLine2(existingPlayer.address?.line2 || '');
      setCity(existingPlayer.address?.city || '');
      setState(existingPlayer.address?.state || '');
      setCountry(existingPlayer.address?.country || '');
      setPincode(existingPlayer.address?.pincode || '');
    }
  }, [existingPlayer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    const playerData = {
      name,
      dob,
      contact: {
        primaryContact,
        homeContact,
        emergencyContact,
      },
      address: {
        line1,
        line2,
        city,
        state,
        country,
        pincode,
      },
    };

    try {
      if (isEdit) {
        await axios.put(`http://localhost:9090/players/${existingPlayer.id}`, playerData);
        alert('Player updated successfully!');
      } else {
        await axios.post('http://localhost:9090/players', playerData);
        alert('Player added successfully!');
        // Clear form after adding
        setName('');
        setDob('');
        setPrimaryContact('');
        setHomeContact('');
        setEmergencyContact('');
        setLine1('');
        setLine2('');
        setCity('');
        setState('');
        setCountry('');
        setPincode('');
      }

      onSuccess?.();

    } catch (error) {
      setErrorMessage(isEdit ? 'Error updating player' : 'Error adding player');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg my-2">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
        {isEdit ? 'Edit Player' : 'Add New Player'}
      </h2>

      {errorMessage && (
        <div className="bg-red-500 text-white p-3 rounded-lg mb-4 text-center">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              className="w-full p-3 border border-gray-300 rounded-lg"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Primary Contact</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={primaryContact}
            onChange={(e) => setPrimaryContact(e.target.value)}
            required
          />
        </div>

        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Home Contact</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg"
              value={homeContact}
              onChange={(e) => setHomeContact(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Emergency Contact</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg"
              value={emergencyContact}
              onChange={(e) => setEmergencyContact(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Address Line 1</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg"
              value={line1}
              onChange={(e) => setLine1(e.target.value)}
              required
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Address Line 2</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg"
              value={line2}
              onChange={(e) => setLine2(e.target.value)}
            />
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">State</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Country</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Pincode</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg mt-6 hover:bg-blue-600 transition-all"
          disabled={loading}
        >
          {loading ? (isEdit ? 'Updating...' : 'Adding Player...') : (isEdit ? 'Update Player' : 'Add Player')}
        </button>

        {isEdit && (
          <button
            type="button"
            onClick={onCancel}
            className="w-full p-3 bg-gray-300 text-gray-700 font-semibold rounded-lg mt-2 hover:bg-gray-400 transition-all"
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
};

export default PlayerForm;

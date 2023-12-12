import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import '../styles.css';

const AddRequestForm = ({ onSubmit, request, mode }) => {
  const [clients, setClients] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [gender, setGender] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    // Fetch clients when the component mounts
    Meteor.call('clients.get', (error, result) => {
      if (!error) {
        setClients(result);
      }
    });

    // Fetch breeds when the component mounts
    Meteor.call('breeds.get', (error, result) => {
      if (!error) {
        setBreeds(result);
      }
    });

    // If in update mode and request is provided, set the values from the selected request
    if (mode === 'update' && request) {
      setSelectedClient(request.client || null);
      setSelectedBreed(request.breed || null);
      setGender(request.gender || '');
      setDate(request.date || '');
    }
  }, [mode, request]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do any other form validation if needed

    const requestData = {
      client: selectedClient,
      breed: selectedBreed,
      gender,
      date,
    };

    onSubmit(requestData);
  };

  return (
    <form className="AddForm" onSubmit={handleSubmit}>
      <label>
        Client:
        <select
          value={selectedClient ? selectedClient._id : ''}
          onChange={(e) => {
            const selectedClientId = e.target.value;
            const clientObject = clients.find(client => client._id === selectedClientId);
            setSelectedClient(clientObject);
          }}
        >
          <option value="">Select Client</option>
          {clients.map((client) => (
            <option key={client._id} value={client._id}>
              {client.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Breed:
        <select
          value={selectedBreed ? selectedBreed._id : ''}
          onChange={(e) => {
            const selectedBreedId = e.target.value;
            const breedObject = breeds.find(breed => breed._id === selectedBreedId);
            setSelectedBreed(breedObject);
          }}
        >
          <option value="">Select Breed</option>
          {breeds.map((breed) => (
            <option key={breed._id} value={breed._id}>
              {breed.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Gender:
        <input
          type="text"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />
      </label>
      <label>
        Date:
        <input
          type="text"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>
      <button type="submit">
        {mode === 'add' ? 'Add Request' : 'Update Request'}
      </button>
    </form>
  );
};

export default AddRequestForm;
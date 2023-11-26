import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';

import './BreedList.css'; // Импортируем файл стилей

const BreedList = () => {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState(null);

  useEffect(() => {
    Meteor.call('breeds.get', (error, result) => {
      if (!error) {
        setBreeds(result);
      }
    });
  }, []);

  const handleBreedClick = (breed) => {
    setSelectedBreed(selectedBreed === breed ? null : breed);
  };

  const handleUpdateClick = () => {
    console.log(`Updating data for breed with ID: ${selectedBreed._id}`);
  };

  const handleDeleteClick = () => {
    console.log(`Deleting breed with ID: ${selectedBreed._id}`);
  };

  return (
    <div>
      <h2>Breeds List</h2>
      <table className="breeds-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            {selectedBreed && (
              <th>Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {breeds.map((breed, index) => (
            <tr
              key={breed._id}
              onClick={() => handleBreedClick(breed)}
              className={selectedBreed && selectedBreed._id === breed._id ? 'selected-row' : ''}
            >
              <td>{index + 1}</td>
              <td>{breed.name}</td>
              {selectedBreed && selectedBreed._id === breed._id && (
                <td>
                  <button className="update-button" onClick={handleUpdateClick}>Обновить данные</button>
                  <button className="delete-button" onClick={handleDeleteClick}>Удалить строку</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BreedList;
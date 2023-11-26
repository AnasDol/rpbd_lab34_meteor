import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import './BreedList.css';

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
    <div className="breeds-container">
      <h2>Breeds List</h2>
      <div className="table-container">
        <table className="breeds-table">
          <thead>
            <tr>
              <th style={{ width: '50px' }}>#</th>
              <th style={{ width: '200px' }}>Name</th>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedBreed && (
        <div className="buttons-container">
          <button className="update-button" onClick={handleUpdateClick}>Обновить данные</button>
          <button className="delete-button" onClick={handleDeleteClick}>Удалить строку</button>
        </div>
      )}
    </div>
  );
};

export default BreedList;
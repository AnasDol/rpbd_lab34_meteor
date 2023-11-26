import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';

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
    // Здесь можно добавить логику для обновления данных
    // Например, вызов метода Meteor для обновления данных в коллекции
    console.log(`Updating data for breed with ID: ${selectedBreed._id}`);
  };

  const handleDeleteClick = () => {
    // Здесь можно добавить логику для удаления данных
    // Например, вызов метода Meteor для удаления данных из коллекции
    console.log(`Deleting breed with ID: ${selectedBreed._id}`);
  };

  return (
    <div>
      <h2>Breeds List</h2>
      <table>
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
            <tr key={breed._id} onClick={() => handleBreedClick(breed)}>
              <td>{index + 1}</td>
              <td>{breed.name}</td>
              {selectedBreed && selectedBreed._id === breed._id && (
                <td>
                  <button onClick={handleUpdateClick}>Обновить данные</button>
                  <button onClick={handleDeleteClick}>Удалить строку</button>
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
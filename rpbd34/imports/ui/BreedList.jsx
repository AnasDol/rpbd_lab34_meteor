import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import './BreedList.css';
import AddBreedForm from './AddBreedForm';
import { Breeds } from '../api/breeds';

const BreedList = () => {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

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
    console.log(`Updating data for breed with ID `, selectedBreed != null ? selectedBreed._id : `null`);
  };

  const handleDeleteClick = () => {
    console.log(`Deleting breed with ID: `, selectedBreed != null ? selectedBreed._id : `null`);
    if (selectedBreed) {
      const breedId = selectedBreed._id;
  
      Meteor.call('breeds.remove', breedId, (error) => {
        if (error) {
          console.error('Error deleting breed:', error);
        } else {
          // Fetch the updated list of breeds after deletion
          Meteor.call('breeds.get', (error, result) => {
            if (!error) {
              setBreeds(result);
            } else {
              console.error('Error fetching updated breeds:', error);
            }
          });
  
          console.log(`Breed with ID ${breedId} deleted successfully!`);
          setSelectedBreed(null); // Clear the selected breed after deletion
        }
      });
    } else {
      console.warn('No breed selected for deletion.');
    }
  };

  const handleAddBreed = (breedData) => {
    console.log('Adding new breed', breedData);

    Meteor.call('breeds.insert', breedData, (error) => {
      if (error) {
        console.error('Error inserting breed:', error);
      } else {
        // Fetch the updated list of breeds after insertion
        Meteor.call('breeds.get', (error, result) => {
          if (!error) {
            setBreeds(result);
          } else {
            console.error('Error fetching updated breeds:', error);
          }
        });
        console.log('Breed inserted successfully!');
        setShowAddForm(false);
      }
    });

  };

  return (
    <div className="breeds-container">
      <h2>Breed List</h2>
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
      {showAddForm ? (
        <AddBreedForm onSubmit={handleAddBreed} />
      ) : (
        <div className="buttons-container">
          <button className="update-button" onClick={handleUpdateClick}>Обновить данные</button>
          <button className="delete-button" onClick={handleDeleteClick}>Удалить строку</button>
          <button className="add-new-button" onClick={() => setShowAddForm(true)}>Добавить новую запись</button>
        </div>
      )}
    </div>
  );
};

export default BreedList;
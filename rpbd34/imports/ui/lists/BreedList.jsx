import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import '../styles.css';
import AddBreedForm from '../forms/AddBreedForm';

const BreedList = () => {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formMode, setFormMode] = useState('add'); // 'add' or 'update'

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
    if (selectedBreed) {
      setFormMode('update');
      setShowAddForm(true);
    } else {
      console.warn('No breed selected for update.');
    }
  };

  const handleDeleteClick = () => {
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

  const handleAddClick = () => {
    setFormMode('add');
    setShowAddForm(true);
  };

  const handleAddBreed = (breedData) => {

    if (formMode === 'add') {
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
        }
      });

    } else if (formMode === 'update') {

      if (selectedBreed) {
        const breedId = selectedBreed._id;
        Meteor.call('breeds.update', breedId, breedData, (error) => {
          if (error) {
            console.error('Error updating breed:', error);
          } else {
            // Fetch the updated list of breeds after update
            Meteor.call('breeds.get', (error, result) => {
              if (!error) {
                setBreeds(result);
              } else {
                console.error('Error fetching updated breeds:', error);
              }
            });
            console.log(`Breed with ID ${breedId} updated successfully!`);
            setSelectedBreed(null); // Clear the selected breed after update
          }
        });
      } else {
        console.warn('No breed selected for update.');
      }
    }

    setShowAddForm(false);
  };

  return (
    <div className="collection-container">
      <h2>Breed List</h2>
      <div className="table-container">
        <table className="collection-table">
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
        <AddBreedForm onSubmit={handleAddBreed} breed={selectedBreed} mode={formMode} />
      ) : (
        <div>
          <div className="buttons-container">
            <button className="update-button" onClick={handleUpdateClick}>
              Обновить данные
            </button>
            <button className="delete-button" onClick={handleDeleteClick}>
              Удалить строку
            </button>
          </div>
          <div className="buttons-container">
            <button className="add-new-button" onClick={handleAddClick}>
              Добавить новую запись
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BreedList;
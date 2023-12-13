import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import '../styles.css';
import AddAnimalForm from '../forms/AddAnimalForm';

const AnimalList = () => {
  const [animals, setAnimals] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formMode, setFormMode] = useState('add'); // 'add' or 'update'

  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    Meteor.call('animals.get', (error, result) => {
      if (!error) {
        setAnimals(result);
      }
    });
  }, []);

  const handleAnimalClick = (animal) => {
    setSelectedAnimal(selectedAnimal === animal ? null : animal);
  };

  const handleUpdateClick = () => {
    if (selectedAnimal) {
      setFormMode('update');
      setShowAddForm(true);
    } else {
      console.warn('No animal selected for update.');
    }
  };

  const handleDeleteClick = () => {
    if (selectedAnimal) {
      const animalId = selectedAnimal._id;

      Meteor.call('animals.remove', authToken, animalId, (error) => {
        if (error) {
          console.error('Error deleting animal:', error);
        } else {
          // Fetch the updated list of animals after deletion
          Meteor.call('animals.get', (error, result) => {
            if (!error) {
              setAnimals(result);
            } else {
              console.error('Error fetching updated animals:', error);
            }
          });

          console.log(`Animal with ID ${animalId} deleted successfully!`);
          setSelectedAnimal(null); // Clear the selected animal after deletion
        }
      });
    } else {
      console.warn('No animal selected for deletion.');
    }
  };

  const handleAddClick = () => {
    setFormMode('add');
    setShowAddForm(true);
  };

  const handleAddAnimal = (animalData) => {
    if (formMode === 'add') {
      Meteor.call('animals.insert', authToken, animalData, (error) => {
        if (error) {
          console.error('Error inserting animal:', error);
        } else {
          Meteor.call('animals.get', (error, result) => {
            if (!error) {
              setAnimals(result);
            } else {
              console.error('Error fetching updated animals:', error);
            }
          });
          console.log('Animal inserted successfully!');
        }
      });
    } else if (formMode === 'update') {
      if (selectedAnimal) {
        const animalId = selectedAnimal._id;
        Meteor.call('animals.update', authToken, animalId, animalData, (error) => {
          if (error) {
            console.error('Error updating animal:', error);
          } else {
            // Fetch the updated list of animals after update
            Meteor.call('animals.get', (error, result) => {
              if (!error) {
                setAnimals(result);
              } else {
                console.error('Error fetching updated animals:', error);
              }
            });
            console.log(`Animal with ID ${animalId} updated successfully!`);
            setSelectedAnimal(null); // Clear the selected animal after update
          }
        });
      } else {
        console.warn('No animal selected for update.');
      }
    }

    setShowAddForm(false);
  };

  return (
    <div className="collection-container">
      <h2>Animal List</h2>
      <div className="table-container">
        <table className="collection-table">
          <thead>
            <tr>
              <th style={{ width: '50px' }}>#</th>
              <th style={{ width: '200px' }}>Name</th>
              <th style={{ width: '200px' }}>Age</th>
              <th style={{ width: '200px' }}>Gender</th>
              <th style={{ width: '200px' }}>Breed</th>
              <th style={{ width: '200px' }}>Appearance</th>
            </tr>
          </thead>
          <tbody>
            {animals.map((animal, index) => (
              <tr
                key={animal._id}
                onClick={() => handleAnimalClick(animal)}
                className={selectedAnimal && selectedAnimal._id === animal._id ? 'selected-row' : ''}
              >
                <td>{index + 1}</td>
                <td>{animal.name}</td>
                <td>{animal.age}</td>
                <td>{animal.gender}</td>
                <td>{animal.breed ? animal.breed.name : ''}</td>
                <td>{animal.appearance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showAddForm ? (
        <AddAnimalForm onSubmit={handleAddAnimal} animal={selectedAnimal} mode={formMode} />
      ) : (
        <div>
          <div className="buttons-container">
            <button className="update-button" onClick={handleUpdateClick}>
              Update Data
            </button>
            <button className="delete-button" onClick={handleDeleteClick}>
              Delete Row
            </button>
          </div>
          <div className="buttons-container">
            <button className="add-new-button" onClick={handleAddClick}>
              Add New Record
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimalList;
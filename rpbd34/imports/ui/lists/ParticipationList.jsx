import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import '../styles.css';
import AddParticipationForm from '../forms/AddParticipationForm';

const ParticipationList = () => {
  const [participations, setParticipations] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [exhibitions, setExhibitions] = useState([]);
  const [selectedParticipation, setSelectedParticipation] = useState(null);
  const [selectedAnimalId, setSelectedAnimalId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formMode, setFormMode] = useState('add'); // 'add' or 'update'

  const authToken = localStorage.getItem('authToken');

  useEffect(() => {

    if (selectedAnimalId) {
        Meteor.call('participations.getByAnimal', selectedAnimalId, (error, result) => {
          if (!error) {
            setParticipations(result);
          } else {
            console.error('Error fetching participations:', error);
          }
        });
      } else {
          Meteor.call('participations.get', (error, result) => {
              if (!error) {
                setParticipations(result);
              } else {
                console.error('Error fetching participations:', error);
              }
            });
      }

    Meteor.call('animals.get', (error, result) => {
      if (!error) {
        setAnimals(result);
      }
    });

    Meteor.call('exhibitions.get', (error, result) => {
      if (!error) {
        setExhibitions(result);
      }
    });
  }, [selectedAnimalId]);

  const handleParticipationClick = (participation) => {
    setSelectedParticipation(selectedParticipation === participation ? null : participation);
  };

  const handleUpdateClick = () => {
    if (selectedParticipation) {
      setFormMode('update');
      setShowAddForm(true);
    } else {
      console.warn('No participation selected for update.');
    }
  };

  const handleDeleteClick = () => {
    if (selectedParticipation) {
      const participationId = selectedParticipation._id;

      Meteor.call('participations.remove', authToken, participationId, (error) => {
        if (error) {
          console.error('Error deleting participation:', error);
        } else {
          // Fetch the updated list of participations after deletion

          if (selectedAnimalId) {
            Meteor.call('participations.getByAnimal', selectedAnimalId, (error, result) => {
              if (!error) {
                setParticipations(result);
              } else {
                console.error('Error fetching participations:', error);
              }
            });
          } else {
              Meteor.call('participations.get', (error, result) => {
                  if (!error) {
                    setParticipations(result);
                  } else {
                    console.error('Error fetching participations:', error);
                  }
                });
          }

          console.log(`Participation with ID ${participationId} deleted successfully!`);
          setSelectedParticipation(null); // Clear the selected participation after deletion
        }
      });
    } else {
      console.warn('No participation selected for deletion.');
    }
  };

  const handleAddClick = () => {
    setFormMode('add');
    setShowAddForm(true);
  };

  const handleAddParticipation = (participationData) => {

        if (formMode === 'add') {
            if (selectedAnimalId) {
                Meteor.call('participations.insert', authToken, participationData, (error) => {
                if (error) {
                    console.error('Error inserting participation:', error);
                } else {

                    if (selectedAnimalId) {
                        Meteor.call('participations.getByAnimal', selectedAnimalId, (error, result) => {
                          if (!error) {
                            setParticipations(result);
                          } else {
                            console.error('Error fetching participations:', error);
                          }
                        });
                      } else {
                          Meteor.call('participations.get', (error, result) => {
                              if (!error) {
                                setParticipations(result);
                              } else {
                                console.error('Error fetching participations:', error);
                              }
                            });
                      }
                }
                });
            } else {
                console.warn('Select animal to add participation.');
            }
        } 
          else if (formMode === 'update') {
            if (selectedParticipation) {
            const participationId = selectedParticipation._id;
            Meteor.call('participations.update', authToken, participationId, participationData, (error) => {
                if (error) {
                console.error('Error updating participation:', error);
                } else {
                // Fetch the updated list of participations after update

                if (selectedAnimalId) {
                    Meteor.call('participations.getByAnimal', selectedAnimalId, (error, result) => {
                      if (!error) {
                        setParticipations(result);
                      } else {
                        console.error('Error fetching participations:', error);
                      }
                    });
                  } else {
                      Meteor.call('participations.get', (error, result) => {
                          if (!error) {
                            setParticipations(result);
                          } else {
                            console.error('Error fetching participations:', error);
                          }
                        });
                  }

                console.log(`Participation with ID ${participationId} updated successfully!`);
                setSelectedParticipation(null); // Clear the selected participation after update
                }
            });
            } else {
            console.warn('No participation selected for update.');
            }
    } 

    setShowAddForm(false);
  };

  const handleAnimalSelectChange = (event) => {
    const animalId = event.target.value;
    setSelectedAnimalId(animalId);
  };

  return (
    <div className="collection-container">
      <h2>Participation List</h2>
      <div>
        <label>Select Animal:</label>
        <select onChange={handleAnimalSelectChange} value={selectedAnimalId || ''}>
          <option value="">All Animals</option>
          {animals.map((animal) => (
            <option key={animal._id} value={animal._id}>
              {animal.name}
            </option>
          ))}
        </select>
      </div>
      <div className="table-container">
        <table className="collection-table">
          <thead>
            <tr>
              <th style={{ width: '50px' }}>#</th>
              <th style={{ width: '200px' }}>Animal</th>
              <th style={{ width: '200px' }}>Exhibition</th>
              <th style={{ width: '200px' }}>Reward</th>
            </tr>
          </thead>
          <tbody>
            {participations.map((participation, index) => (
              <tr
                key={participation._id}
                onClick={() => handleParticipationClick(participation)}
                className={selectedParticipation && selectedParticipation._id === participation._id ? 'selected-row' : ''}
              >
                <td>{index + 1}</td>
                <td>
                  {participation.animal ? (
                    animals.find((animal) => animal._id === participation.animal._id)?.name || ''
                  ) : ''}
                </td>
                <td>
                  {participation.exhibition ? (
                    exhibitions.find((exhibition) => exhibition._id === participation.exhibition._id)?.name || ''
                  ) : ''}
                </td>
                <td>{participation.reward}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showAddForm ? (
        <AddParticipationForm onSubmit={handleAddParticipation} participation={selectedParticipation} selectedAnimal={animals.find(animal => animal._id === selectedAnimalId)} mode={formMode} />
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

export default ParticipationList;
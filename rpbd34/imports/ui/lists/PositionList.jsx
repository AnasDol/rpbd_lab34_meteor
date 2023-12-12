import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import '../styles.css';
import AddPositionForm from '../forms/AddPositionForm';

const PositionList = () => {
  const [positions, setPositions] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formMode, setFormMode] = useState('add'); // 'add' or 'update'

  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    Meteor.call('positions.get', (error, result) => {
      if (!error) {
        setPositions(result);
      }
    });
  }, []);

  const handlePositionClick = (position) => {
    setSelectedPosition(selectedPosition === position ? null : position);
  };

  const handleUpdateClick = () => {
    if (selectedPosition) {
      setFormMode('update');
      setShowAddForm(true);
    } else {
      console.warn('No position selected for update.');
    }
  };

  const handleDeleteClick = () => {
    if (selectedPosition) {
      const positionId = selectedPosition._id;

      Meteor.call('positions.remove', authToken, positionId, (error) => {
        if (error) {
          console.error('Error deleting position:', error);
        } else {
          // Fetch the updated list of positions after deletion
          Meteor.call('positions.get', (error, result) => {
            if (!error) {
              setPositions(result);
            } else {
              console.error('Error fetching updated positions:', error);
            }
          });

          console.log(`Position with ID ${positionId} deleted successfully!`);
          setSelectedPosition(null); // Clear the selected position after deletion
        }
      });
    } else {
      console.warn('No position selected for deletion.');
    }
  };

  const handleAddClick = () => {
    setFormMode('add');
    setShowAddForm(true);
  };

  const handleAddPosition = (positionData) => {
    
    if (formMode === 'add') {
      Meteor.call('positions.insert', authToken, positionData, (error) => {
        if (error) {
          console.error('Error inserting position:', error);
        } else {
          Meteor.call('positions.get', (error, result) => {
            if (!error) {
              setPositions(result);
            } else {
              console.error('Error fetching updated positions:', error);
            }
          });
          console.log('Position inserted successfully!');
        }
      });
    } else if (formMode === 'update') {
      if (selectedPosition) {
        const positionId = selectedPosition._id;
        Meteor.call('positions.update', authToken, positionId, positionData, (error) => {
          if (error) {
            console.error('Error updating position:', error);
          } else {
            // Fetch the updated list of positions after update
            Meteor.call('positions.get', (error, result) => {
              if (!error) {
                setPositions(result);
              } else {
                console.error('Error fetching updated positions:', error);
              }
            });
            console.log(`Position with ID ${positionId} updated successfully!`);
            setSelectedPosition(null); // Clear the selected position after update
          }
        });
      } else {
        console.warn('No position selected for update.');
      }
    }

    setShowAddForm(false);
  };

  return (
    <div className="collection-container">
      <h2>Position List</h2>
      <div className="table-container">
        <table className="collection-table">
          <thead>
            <tr>
              <th style={{ width: '50px' }}>#</th>
              <th style={{ width: '200px' }}>Name</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((position, index) => (
              <tr
                key={position._id}
                onClick={() => handlePositionClick(position)}
                className={selectedPosition && selectedPosition._id === position._id ? 'selected-row' : ''}
              >
                <td>{index + 1}</td>
                <td>{position.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showAddForm ? (
        <AddPositionForm onSubmit={handleAddPosition} position={selectedPosition} mode={formMode} />
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

export default PositionList;
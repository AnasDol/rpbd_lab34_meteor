import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import '../styles.css';
import AddExhibitionForm from '../forms/AddExhibitionForm';

const ExhibitionList = () => {
  const [exhibitions, setExhibitions] = useState([]);
  const [selectedExhibition, setSelectedExhibition] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formMode, setFormMode] = useState('add'); // 'add' or 'update'

  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    Meteor.call('exhibitions.get', (error, result) => {
      if (!error) {
        setExhibitions(result);
      }
    });
  }, []);

  const handleExhibitionClick = (exhibition) => {
    setSelectedExhibition(selectedExhibition === exhibition ? null : exhibition);
  };

  const handleUpdateClick = () => {
    if (selectedExhibition) {
      setFormMode('update');
      setShowAddForm(true);
    } else {
      console.warn('No exhibition selected for update.');
    }
  };

  const handleDeleteClick = () => {
    if (selectedExhibition) {
      const exhibitionId = selectedExhibition._id;

      Meteor.call('exhibitions.remove', authToken, exhibitionId, (error) => {
        if (error) {
          console.error('Error deleting exhibition:', error);
        } else {
          // Fetch the updated list of exhibitions after deletion
          Meteor.call('exhibitions.get', (error, result) => {
            if (!error) {
              setExhibitions(result);
            } else {
              console.error('Error fetching updated exhibitions:', error);
            }
          });

          console.log(`Exhibition with ID ${exhibitionId} deleted successfully!`);
          setSelectedExhibition(null); // Clear the selected exhibition after deletion
        }
      });
    } else {
      console.warn('No exhibition selected for deletion.');
    }
  };

  const handleAddClick = () => {
    setFormMode('add');
    setShowAddForm(true);
  };

  const handleAddExhibition = (exhibitionData) => {
    if (formMode === 'add') {
      Meteor.call('exhibitions.insert', authToken, exhibitionData, (error) => {
        if (error) {
          console.error('Error inserting exhibition:', error);
        } else {
          Meteor.call('exhibitions.get', (error, result) => {
            if (!error) {
              setExhibitions(result);
            } else {
              console.error('Error fetching updated exhibitions:', error);
            }
          });
          console.log('Exhibition inserted successfully!');
        }
      });
    } else if (formMode === 'update') {
      if (selectedExhibition) {
        const exhibitionId = selectedExhibition._id;
        Meteor.call('exhibitions.update', authToken, exhibitionId, exhibitionData, (error) => {
          if (error) {
            console.error('Error updating exhibition:', error);
          } else {
            // Fetch the updated list of exhibitions after update
            Meteor.call('exhibitions.get', (error, result) => {
              if (!error) {
                setExhibitions(result);
              } else {
                console.error('Error fetching updated exhibitions:', error);
              }
            });
            console.log(`Exhibition with ID ${exhibitionId} updated successfully!`);
            setSelectedExhibition(null); // Clear the selected exhibition after update
          }
        });
      } else {
        console.warn('No exhibition selected for update.');
      }
    }

    setShowAddForm(false);
  };

  return (
    <div className="exhibitions-container">
      <h2>Exhibition List</h2>
      <div className="table-container">
        <table className="exhibitions-table">
          <thead>
            <tr>
              <th style={{ width: '50px' }}>#</th>
              <th style={{ width: '200px' }}>Name</th>
              <th style={{ width: '200px' }}>Address</th>
              <th style={{ width: '200px' }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {exhibitions.map((exhibition, index) => (
              <tr
                key={exhibition._id}
                onClick={() => handleExhibitionClick(exhibition)}
                className={selectedExhibition && selectedExhibition._id === exhibition._id ? 'selected-row' : ''}
              >
                <td>{index + 1}</td>
                <td>{exhibition.name}</td>
                <td>{exhibition.address}</td>
                <td>{exhibition.date instanceof Date ? exhibition.date.toISOString().split('T')[0] : ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showAddForm ? (
        <AddExhibitionForm onSubmit={handleAddExhibition} exhibition={selectedExhibition} mode={formMode} />
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

export default ExhibitionList;
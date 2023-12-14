import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import '../styles.css';
import AddRequestForm from '../forms/AddRequestForm';

const RequestList = () => {
  const [requests, setRequests] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [clients, setClients] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formMode, setFormMode] = useState('add'); // 'add' or 'update'

  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    Meteor.call('requests.get', (error, result) => {
      if (!error) {
        setRequests(result);
      }
    });
  }, []);

  useEffect(() => {
    Meteor.call('clients.get', (error, result) => {
      if (!error) {
        setClients(result);
      }
    });
  }, []);

  useEffect(() => {
    Meteor.call('breeds.get', (error, result) => {
      if (!error) {
        setBreeds(result);
      }
    });
  }, []);

  const handleRequestClick = (request) => {
    setSelectedRequest(selectedRequest === request ? null : request);
  };

  const handleUpdateClick = () => {
    if (selectedRequest) {
      setFormMode('update');
      setShowAddForm(true);
    } else {
      console.warn('No request selected for update.');
    }
  };

  const handleDeleteClick = () => {
    if (selectedRequest) {
      const requestId = selectedRequest._id;

      Meteor.call('requests.remove', authToken, requestId, (error) => {
        if (error) {
          console.error('Error deleting request:', error);
        } else {
          // Fetch the updated list of requests after deletion
          Meteor.call('requests.get', (error, result) => {
            if (!error) {
              setRequests(result);
            } else {
              console.error('Error fetching updated requests:', error);
            }
          });

          console.log(`Request with ID ${requestId} deleted successfully!`);
          setSelectedRequest(null); // Clear the selected request after deletion
        }
      });
    } else {
      console.warn('No request selected for deletion.');
    }
  };

  const handleAddClick = () => {
    setFormMode('add');
    setShowAddForm(true);
  };

  const handleAddRequest = (requestData) => {
    if (formMode === 'add') {
      Meteor.call('requests.insert', authToken, requestData, (error) => {
        if (error) {
          console.error('Error inserting request:', error);
        } else {
          Meteor.call('requests.get', (error, result) => {
            if (!error) {
              setRequests(result);
            } else {
              console.error('Error fetching updated requests:', error);
            }
          });
          console.log('Request inserted successfully!');
        }
      });
    } else if (formMode === 'update') {
      if (selectedRequest) {
        const requestId = selectedRequest._id;
        Meteor.call('requests.update', authToken, requestId, requestData, (error) => {
          if (error) {
            console.error('Error updating request:', error);
          } else {
            // Fetch the updated list of requests after update
            Meteor.call('requests.get', (error, result) => {
              if (!error) {
                setRequests(result);
              } else {
                console.error('Error fetching updated requests:', error);
              }
            });
            console.log(`Request with ID ${requestId} updated successfully!`);
            setSelectedRequest(null); // Clear the selected request after update
          }
        });
      } else {
        console.warn('No request selected for update.');
      }
    }

    setShowAddForm(false);
  };

  return (
    <div className="collection-container">
      <h2>Request List</h2>
      <div className="table-container">
        <table className="collection-table">
          <thead>
            <tr>
              <th style={{ width: '50px' }}>#</th>
              <th style={{ width: '200px' }}>Client</th>
              <th style={{ width: '200px' }}>Breed</th>
              <th style={{ width: '200px' }}>Gender</th>
              <th style={{ width: '200px' }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request, index) => (
              <tr
                key={request._id}
                onClick={() => handleRequestClick(request)}
                className={selectedRequest && selectedRequest._id === request._id ? 'selected-row' : ''}
              >
                <td>{index + 1}</td>
                {/* <td>
                {request.client ? (
                    clients.find(client => client._id === request.client._id)?.lastName || ''
                ) : ''}
                </td> */}
                <td>
                  {request.client ? (
                    (() => {
                      const foundClient = clients.find(client => client._id === request.client._id);
                      return foundClient ? `${foundClient.firstName} ${foundClient.lastName}` : '';
                    })()
                  ) : ''}
                </td>
                <td>
                {request.breed ? (
                    breeds.find(breed => breed._id === request.breed._id)?.name || ''
                ) : ''}
                </td>
                <td>{request.gender}</td>
                <td>{request.date instanceof Date ? request.date.toISOString().split('T')[0] : ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showAddForm ? (
        <AddRequestForm onSubmit={handleAddRequest} request={selectedRequest} mode={formMode} />
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

export default RequestList;
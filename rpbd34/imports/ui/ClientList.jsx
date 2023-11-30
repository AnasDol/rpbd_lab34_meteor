import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import './ClientList.css';
import AddClientForm from './AddClientForm';

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formMode, setFormMode] = useState('add'); // 'add' or 'update'

  useEffect(() => {
    Meteor.call('clients.get', (error, result) => {
      if (!error) {
        setClients(result);
      }
    });
  }, []);

  const handleClientClick = (client) => {
    setSelectedClient(selectedClient === client ? null : client);
  };

  const handleUpdateClick = () => {
    if (selectedClient) {
      setFormMode('update');
      setShowAddForm(true);
    } else {
      console.warn('No client selected for update.');
    }
  };

  const handleDeleteClick = () => {
    if (selectedClient) {
      const clientId = selectedClient._id;

      Meteor.call('clients.remove', clientId, (error) => {
        if (error) {
          console.error('Error deleting client:', error);
        } else {
          // Fetch the updated list of clients after deletion
          Meteor.call('clients.get', (error, result) => {
            if (!error) {
              setClients(result);
            } else {
              console.error('Error fetching updated clients:', error);
            }
          });

          console.log(`Client with ID ${clientId} deleted successfully!`);
          setSelectedClient(null); // Clear the selected client after deletion
        }
      });
    } else {
      console.warn('No client selected for deletion.');
    }
  };

  const handleAddClick = () => {
    setFormMode('add');
    setShowAddForm(true);
  };

  const handleAddClient = (clientData) => {

    if (formMode === 'add') {
      Meteor.call('clients.insert', clientData, (error) => {
        if (error) {
          console.error('Error inserting client:', error);
        } else {
          // Fetch the updated list of clients after insertion
          Meteor.call('clients.get', (error, result) => {
            if (!error) {
              setClients(result);
            } else {
              console.error('Error fetching updated clients:', error);
            }
          });
          console.log('Client inserted successfully!');
        }
      });

    } else if (formMode === 'update') {

      if (selectedClient) {
        const clientId = selectedClient._id;
        Meteor.call('clients.update', clientId, clientData, (error) => {
          if (error) {
            console.error('Error updating client:', error);
          } else {
            // Fetch the updated list of clients after update
            Meteor.call('clients.get', (error, result) => {
              if (!error) {
                setClients(result);
              } else {
                console.error('Error fetching updated clients:', error);
              }
            });
            console.log(`Client with ID ${clientId} updated successfully!`);
            setSelectedClient(null); // Clear the selected client after update
          }
        });
      } else {
        console.warn('No client selected for update.');
      }
    }

    setShowAddForm(false);
  };

  return (
    <div className="clients-container">
      <h2>Clients List</h2>
      <div className="table-container">
        <table className="clients-table">
          <thead>
            <tr>
              <th style={{ width: '50px' }}>#</th>
              <th style={{ width: '200px' }}>Last Name</th>
              <th style={{ width: '200px' }}>First Name</th>
              <th style={{ width: '200px' }}>Patronymic</th>
              <th style={{ width: '300px' }}>Address</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client, index) => (
              <tr
                key={client._id}
                onClick={() => handleClientClick(client)}
                className={selectedClient && selectedClient._id === client._id ? 'selected-row' : ''}
              >
                <td>{index + 1}</td>
                <td>{client.last_name}</td>
                <td>{client.first_name}</td>
                <td>{client.patronymic}</td>
                <td>{client.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showAddForm ? (
        <AddClientForm onSubmit={handleAddClient} client={selectedClient} mode={formMode} />
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

export default ClientList;
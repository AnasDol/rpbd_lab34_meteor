import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import './BreedList.css';

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);

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
    console.log(`Updating data for client with ID: ${selectedClient._id}`);
  };

  const handleDeleteClick = () => {
    console.log(`Deleting client with ID: ${selectedClient._id}`);
  };

  return (
    <div className="breeds-container">
      <h2>Clients List</h2>
      <table className="breeds-table">
        <thead>
          <tr>
            <th style={{ width: '50px' }}>#</th>
            <th style={{ width: '200px' }}>Last Name</th>
            <th style={{ width: '200px' }}>First Name</th>
            <th style={{ width: '200px' }}>Patronymic</th>
            <th style={{ width: '200px' }}>Address</th>
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
      {selectedClient && (
        <div className="buttons-container">
          <button className="update-button" onClick={handleUpdateClick}>Обновить данные</button>
          <button className="delete-button" onClick={handleDeleteClick}>Удалить строку</button>
        </div>
      )}
    </div>
  );
};

export default ClientList;
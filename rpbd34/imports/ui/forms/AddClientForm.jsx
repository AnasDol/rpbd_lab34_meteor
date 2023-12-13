import React, { useState, useEffect } from 'react';
//import './ClientList.css';

const AddClientForm = ({ onSubmit, client, mode }) => {
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [patronymic, setPatronymic] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (mode === 'update' && client) {
      // If in update mode and client is provided, set the values from the selected client
      setLastName(client.lastName || '');
      setFirstName(client.firstName || '');
      setPatronymic(client.patronymic || '');
      setAddress(client.address || '');
    }
  }, [mode, client]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do any other form validation if needed

    const clientData = { lastName: lastName, firstName: firstName, patronymic, address };
    onSubmit(clientData);
  };

  return (
    <form className="AddForm" onSubmit={handleSubmit}>
      <label>
        Last Name:
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </label>
      <label>
        First Name:
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </label>
      <label>
        Patronymic:
        <input
          type="text"
          value={patronymic}
          onChange={(e) => setPatronymic(e.target.value)}
        />
      </label>
      <label>
        Address:
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </label>
      <button type="submit">{mode === 'add' ? 'Add Record' : 'Update Data'}</button>
    </form>
  );
};

export default AddClientForm;
import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import '../styles.css';

const AddUserForm = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleCreateUser = () => {

     // Check if the username is not empty
     if (!username) {
        console.error('Username cannot be empty.');
        return;
      }
  
      // Check if the password is not empty
      if (!password) {
        console.error('Password cannot be empty.');
        return;
      }
  
      // Check if the username is unique
      const existingUser = Meteor.users.findOne({ username });
      if (existingUser) {
        console.error('Username already exists. Choose a different one.');
        return;
      }

    Meteor.call('users.create', { username, password }, (error, newUserId) => {
      if (error) {
        console.error('Error creating user:', error.reason);
      } else {
        console.log('User created successfully.');
        onClose(); // Close the form
      }
    });
  };

  return (
    <div className="addForm">
      <h2>Create User</h2>
      <label>
        Username: 
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Password: 
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button onClick={handleCreateUser}>Create User</button>
    </div>
  );
};

export default AddUserForm;
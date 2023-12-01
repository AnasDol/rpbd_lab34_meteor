import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';

const UserManagement = () => {
  const [userId, setUserId] = useState('');
  const [role, setRole] = useState('');

  console.log(Meteor.userId());

  const handleAddRole = () => {
    Meteor.call('users.addRole', userId, role, (error) => {
      if (error) {
        console.error(error.reason);
      } else {
        console.log('Role added successfully!');
      }
    });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="User ID"
        onChange={(e) => setUserId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Role"
        onChange={(e) => setRole(e.target.value)}
      />
      <button onClick={handleAddRole}>Add Role</button>
    </div>
  );
};

export default UserManagement;
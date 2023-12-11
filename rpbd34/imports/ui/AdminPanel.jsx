import React, { useState, useEffect } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

const AdminPanel = () => {
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newRoles, setNewRoles] = useState('');
  
    //const users = useTracker(() => Meteor.users.find().fetch());

    Meteor.subscribe('allUsers');

    Tracker.autorun(function () {
      var users = Meteor.users.find().fetch();
      console.log(users);
    });
  
    const handleDeleteUser = (userId) => {
      Meteor.call('users.remove', userId, (error) => {
        if (error) {
          console.error('Error removing user:', error.reason);
        } else {
          console.log('User removed successfully!');
        }
      });
    };
  
    const handleAddUser = () => {
        Meteor.call('users.add', newUsername, newPassword, newRoles.split(','), (error) => {
          if (error) {
            console.error('Error adding user:', error.reason);
          } else {
            console.log('User added successfully!');
            // Clear the form fields after successful addition
            setNewUsername('');
            setNewPassword('');
            setNewRoles('');
          }
        });
      };
  
    return (
      <div>
        <h2>Admin Panel</h2>
        <form>
          <label>
            Username:
            <input type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
          </label>
          <label>
            Password:
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          </label>
          <label>
            Roles:
            <input type="text" value={newRoles} onChange={(e) => setNewRoles(e.target.value)} />
          </label>
          <button type="button" onClick={handleAddUser}>Add User</button>
        </form>
        <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Password</th>
            <th>Roles</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.services?.password?.bcrypt}</td>
              <td>{user.roles?.join(', ')}</td>
              <td>
                <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    );
  };

export default AdminPanel;
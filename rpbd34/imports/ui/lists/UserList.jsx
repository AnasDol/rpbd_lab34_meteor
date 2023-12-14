import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import '../styles.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const getUsers = Meteor.subscribe('allUsers');

    return () => {
      getUsers.stop();
    };
  }, []);

  useEffect(() => {
    const handle = Tracker.autorun(() => {
      const fetchedUsers = Meteor.users.find().fetch();
      console.log('fetchedUsers', fetchedUsers);
      setUsers(fetchedUsers);
    });

    // Cleanup the autorun to avoid memory leaks
    return () => {
      handle.stop();
    };
  }, []);

  const handleDeleteUser = () => {
    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
      console.error('Auth token not found.');
      return;
    }

    if (!selectedUser) {
      console.error('No user selected for deletion.');
      return;
    }

    Meteor.call('users.remove', authToken, selectedUser._id, (error, result) => {
      if (error) {
        console.error('Error removing user:', error.reason);
      } else {
        console.log('User removed successfully.');
        // Handle any additional logic after successful removal

        // Clear the selected user after successful removal
        setSelectedUser(null);
      }
    });
  };

  return (
    <div className="collection-container">
      <h2>User List</h2>
      <table className="collection-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className={selectedUser === user ? 'selected-row' : ''}>
              <td>{user.username}</td>
              <td>{user.emails && user.emails.length > 0 ? user.emails[0].address : 'No email'}</td>
              <td>
                {user.username !== 'admin' && (
                  <button
                    className="delete-button"
                    onClick={() => setSelectedUser(user)}
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedUser && (
        <div>
          <p>Selected User: {selectedUser.username}</p>
          <button className="delete-button" onClick={handleDeleteUser}>
            Confirm Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default UserList;
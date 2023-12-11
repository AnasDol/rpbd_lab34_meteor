import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

const UserList = () => {
  const [users, setUsers] = useState([]);

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

  return (
    <div>
      <h2>User List</h2>
      <ul>
      {users.map((user) => (
        <li key={user._id}>
            <strong>{user.username}</strong> - {user.emails && user.emails.length > 0 ? user.emails[0].address : 'No email'}
        </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
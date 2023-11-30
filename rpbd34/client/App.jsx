import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import Login from './components/Login';
import UserManagement from './components/UserManagement';

const App = () => {
  const user = useTracker(() => Meteor.user());

  return (
    <div>
      {user ? (
        <div>
          <h1>Hello, {user.username}!</h1>
          <UserManagement />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default App;
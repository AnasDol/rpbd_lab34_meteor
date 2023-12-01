import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Navigate } from 'react-router-dom'; // Import Navigate for redirects
import Login from './components/Login';
import UserManagement from './components/UserManagement';

const App = () => {
  const user = useTracker(() => Meteor.user());
  console.log(user);

  const handleLogout = () => {
    Meteor.logout((error) => {
      if (!error) {
        console.log('Logged out successfully!');
      }
    });
  };

  if (!user) {
    // Use Navigate for redirects
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h1>Hello, {user.username}!</h1>
      <button onClick={handleLogout}>Logout</button>
      <UserManagement />
    </div>
  );
};

export default App;
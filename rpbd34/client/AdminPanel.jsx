import React, { useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { useNavigate } from 'react-router-dom';
import UserList from '../imports/ui/UserList';

const AdminPanel = () => {

  const navigate = useNavigate();

  //useEffect(() => {

    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
      navigate('/login');
    } 
    else {
      Meteor.call('validateAuthToken', authToken, (error, isValid) => {
        if (error || !isValid) {
          console.error('Invalid token or authentication error');
          navigate('/login');
        }
      });
    }
  //}, [navigate]);

  const handleLogout = () => {
    Meteor.logout((error) => {
      if (error) {
        console.error('Logout error:', error.reason);
      }
    });
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
      <UserList />
    </div>
  );
};

export default AdminPanel;
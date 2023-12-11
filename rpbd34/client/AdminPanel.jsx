import React, { useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { useNavigate } from 'react-router-dom';
import UserList from '../imports/ui/UserList';

const AdminPanel = () => {

  const navigate = useNavigate();

 useEffect(() => {

    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
      navigate('/login');
      return;
    } 

    else {
      Meteor.call('validateAuthTokenAdmin', authToken, (error, isValid) => {
        if (error || !isValid) {
          console.error('Invalid token or authentication error');
          navigate('/login');
          return;
        }
      });
    }
  }, [navigate]);

  const handleLogout = () => {
    Meteor.logout((error) => {
      if (error) {
        console.error('Logout error:', error.reason);
      } else {
        // Remove the authToken from localStorage
        localStorage.removeItem('authToken');
  
        // Redirect to the home page after successful logout
        navigate('/login');
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
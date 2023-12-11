import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { useNavigate } from 'react-router-dom';
import UserList from '../imports/ui/UserList';
import AddUserForm from '../imports/ui/AddUserForm';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [showAddUserForm, setShowAddUserForm] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
      navigate('/login');
      return;
    } else {
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
        localStorage.removeItem('authToken');
        navigate('/login');
      }
    });
  };

  const handleAddUserClick = () => {
    setShowAddUserForm(true);
  };

  const handleCloseAddUserForm = () => {
    setShowAddUserForm(false);
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
      <button className="add-user-button" onClick={handleAddUserClick}>
        Add New User
      </button>
      <UserList />
      {showAddUserForm && <AddUserForm onClose={handleCloseAddUserForm} />}
    </div>
  );
};

export default AdminPanel;
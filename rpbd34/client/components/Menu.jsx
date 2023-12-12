import React from 'react';
import { Link } from 'react-router-dom';
import '../../imports/ui/styles.css';

import { useNavigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';

const Menu = ({ setActiveTab }) => {
  const navigate = useNavigate();

  const handleBreedListClick = () => {
    setActiveTab('breedList');
  };

  const handleClientListClick = () => {
    setActiveTab('clientList');
  };

  const handlePositionListClick = () => {
    setActiveTab('positionList');
  };

  const handleExhibitionListClick = () => {
    setActiveTab('exhibitionList');
  };

  const handleLogout = () => {
    Meteor.logout((error) => {
      if (error) {
        console.error('Logout error:', error.reason);
      } else {
        localStorage.removeItem('authToken');
        //navigate('/login');
      }
    });
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const user = useTracker(() => Meteor.user());
  const isAuthenticated = !!localStorage.getItem('authToken');

  return (
    <div className="menu-container">
      <div className="left-buttons">
        <button className="menu-button" onClick={handleBreedListClick}>
          Породы
        </button>
        <button className="menu-button" onClick={handleClientListClick}>
          Клиенты
        </button>
        <button className="menu-button" onClick={handlePositionListClick}>
          Позиции
        </button>
        <button className="menu-button" onClick={handleExhibitionListClick}>
          Выставки
        </button>
      </div>
      <div className="right-buttons">
        {isAuthenticated && (
          <div className="user-info">
            <p className="username">{user ? user.username : 'Unknown'}</p>
            <button className="logout-button" onClick={handleLogout}>
              Выйти
            </button>
          </div>
        )}
        {!isAuthenticated && (
          <button className="login-button" onClick={handleLogin}>
          Войти
        </button>
        )}
      </div>
    </div>
  );
};

export default Menu;
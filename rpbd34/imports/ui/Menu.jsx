import React from 'react';
import './Menu.css';

const Menu = ({ setActiveTab }) => {
  const handleBreedListClick = () => {
    setActiveTab('breedList');
  };

  const handleClientListClick = () => {
    setActiveTab('clientList');
  };

  const handleTaskListClick = () => {
    setActiveTab('taskList');
  };

  return (
    <div className="menu-container">
      <button className="menu-button" onClick={handleBreedListClick}>
        Породы
      </button>
      <button className="menu-button" onClick={handleClientListClick}>
        Клиенты
      </button>
      <button className="menu-button" onClick={handleTaskListClick}>
        Task List
      </button>
    </div>
  );
};

export default Menu;
import React from 'react';

const Menu = ({ setActiveTab }) => {
  const handleBreedListClick = () => {
    setActiveTab('breedList');
  };

  const handleTaskListClick = () => {
    setActiveTab('taskList');
  };

  return (
    <div className="menu-container">
      <button className="menu-button" onClick={handleBreedListClick}>
        Breed List
      </button>
      <button className="menu-button" onClick={handleTaskListClick}>
        Task List
      </button>
    </div>
  );
};

export default Menu;
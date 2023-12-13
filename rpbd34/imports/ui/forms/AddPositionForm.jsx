import React, { useState, useEffect } from 'react';
import '../styles.css';

const AddPositionForm = ({ onSubmit, position, mode }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    if (mode === 'update' && position) {
      setName(position.name || '');
    }
  }, [mode, position]);

  const handleSubmit = (e) => {
    
    e.preventDefault();

    const positionData = { name };
    onSubmit(positionData);
  };

  return (
    <form className="addForm" onSubmit={handleSubmit}>
      <label>
        Название породы:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <button type="submit">{mode === 'add' ? 'Добавить запись' : 'Обновить данные'}</button>
    </form>
  );
};

export default AddPositionForm;
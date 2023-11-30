import React, { useState } from 'react';
import './BreedList.css';

const AddBreedForm = ({ onSubmit }) => {
  const [breedName, setBreedName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Вызывайте переданную функцию onSubmit с данными формы
    onSubmit({ name: breedName });
  };

  return (
    <form id="addBreedForm" onSubmit={handleSubmit}>
      <label htmlFor="breedName">Название породы:</label>
      <input type="text" id="breedName" name="breedName" value={breedName} onChange={(e) => setBreedName(e.target.value)} required /><br />

      <input type="submit" value="Добавить породу" />
    </form>
  );
};

export default AddBreedForm;
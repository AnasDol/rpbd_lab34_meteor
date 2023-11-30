import React, { useState, useEffect } from 'react';

const AddBreedForm = ({ onSubmit, breed, mode }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    if (mode === 'update' && breed) {
      // If in update mode and breed is provided, set the name from the selected breed
      setName(breed.name || '');
    }
  }, [mode, breed]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do any other form validation if needed

    const breedData = { name };
    onSubmit(breedData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <button type="submit">{mode === 'add' ? 'Add Breed' : 'Update Breed'}</button>
    </form>
  );
};

export default AddBreedForm;
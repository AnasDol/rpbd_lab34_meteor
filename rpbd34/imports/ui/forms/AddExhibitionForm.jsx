import React, { useState, useEffect } from 'react';
//import './AddExhibitionForm.css';

const AddExhibitionForm = ({ onSubmit, exhibition, mode }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    if (mode === 'update' && exhibition) {
      // If in update mode and exhibition is provided, set the values from the selected exhibition
      setName(exhibition.name || '');
      setAddress(exhibition.address || '');
      setDate(exhibition.date || '');
    }
  }, [mode, exhibition]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do any other form validation if needed

    const exhibitionData = { name, address, date };
    onSubmit(exhibitionData);
  };

  return (
    <form className="AddForm" onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Address:
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </label>
      <label>
        Date:
        <input
          type="text"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>
      <button type="submit">{mode === 'add' ? 'Add Record' : 'Update Data'}</button>
    </form>
  );
};

export default AddExhibitionForm;
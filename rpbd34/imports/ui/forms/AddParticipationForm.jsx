import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import '../styles.css';

const AddParticipationForm = ({ onSubmit, participation, selectedAnimal, mode }) => {

  const [animal, setAnimal] = useState('');
  const [reward, setReward] = useState('');

  const [exhibitions, setExhibitions] = useState([]);
  const [selectedExhibition, setSelectedExhibition] = useState(null); // Updated state
 
  useEffect(() => {

    Meteor.call('exhibitions.get', (error, result) => {
        if (!error) {
            setExhibitions(result);
        }
      });

    // If in update mode and participation is provided, set the values from the selected participation
    if (mode === 'update' && participation) {
      setAnimal(participation.animal || null);
      setSelectedExhibition(participation.exhibition || null);
      setReward(participation.reward || '');
    }
  }, [mode, participation]);


  const handleSubmit = (e) => {
    e.preventDefault();
    // Do any other form validation if needed

    const participationData = {
      animal: selectedAnimal,
      exhibition: selectedExhibition,
      reward,
    };

    onSubmit(participationData);
  };

  return (
    <form className="AddForm" onSubmit={handleSubmit}>
        <label>
        Выставка:
        <select
          value={selectedExhibition ? selectedExhibition._id : ''} // Updated value
          onChange={(e) => {
            const selectedExhibitionId = e.target.value;
            const exhibitionObject = exhibitions.find(exhibition => exhibition._id === selectedExhibitionId);
            setSelectedExhibition(exhibitionObject);
          }}
        >
          <option value="">Select Exhibition</option>
          {exhibitions.map((exhibition) => (
            <option key={exhibition._id} value={exhibition._id}>
              {exhibition.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Награда:
        <input
          type="text"
          value={reward}
          onChange={(e) => setReward(e.target.value)}
        />
      </label>
      <button type="submit">
        {mode === 'add' ? 'Add participation' : 'Update participation'}
      </button>
    </form>
  );
};

export default AddParticipationForm;
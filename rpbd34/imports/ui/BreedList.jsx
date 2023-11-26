import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';

const BreedList = () => {
  const [breeds, setBreeds] = useState([]);

  useEffect(() => {
    Meteor.call('breeds.get', (error, result) => {
      if (!error) {
        setBreeds(result);
      }
    });
  }, []);

  return (
    <div>
      <h2>Breeds List</h2>
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {breeds.map((breed, index) => (
            <tr key={breed._id}>
              <td>{index + 1}</td>
              <td>{breed.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BreedList;
import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import '../styles.css';

const AddEmployeeForm = ({ onSubmit, employee, mode }) => {
  const [positions, setPositions] = useState([]);
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [patronymic, setPatronymic] = useState('');
  const [address, setAddress] = useState('');
  const [selectedPosition, setSelectedPosition] = useState(null); // Updated state
  const [salary, setSalary] = useState('');

  useEffect(() => {
    // Fetch positions when the component mounts
    Meteor.call('positions.get', (error, result) => {
      if (!error) {
        setPositions(result);
      }
    });

    // If in update mode and employee is provided, set the values from the selected employee
    if (mode === 'update' && employee) {
      setLastName(employee.lastName || '');
      setFirstName(employee.firstName || '');
      setPatronymic(employee.patronymic || '');
      setAddress(employee.address || '');
      setSelectedPosition(employee.position || null); // Updated state
      setSalary(employee.salary || '');
    }
  }, [mode, employee]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do any other form validation if needed

    const employeeData = {
      lastName,
      firstName,
      patronymic,
      address,
      position: selectedPosition, // Updated property
      salary,
    };

    onSubmit(employeeData);
  };

  return (
    <form className="AddForm" onSubmit={handleSubmit}>
      <label>
        Last Name:
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </label>
      <label>
        First Name:
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </label>
      <label>
        Patronymic:
        <input
          type="text"
          value={patronymic}
          onChange={(e) => setPatronymic(e.target.value)}
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
        Position:
        <select
          value={selectedPosition ? selectedPosition._id : ''} // Updated value
          onChange={(e) => {
            const selectedPositionId = e.target.value;
            const positionObject = positions.find(position => position._id === selectedPositionId);
            setSelectedPosition(positionObject);
          }}
        >
          <option value="">Select Position</option>
          {positions.map((position) => (
            <option key={position._id} value={position._id}>
              {position.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Salary:
        <input
          type="text"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />
      </label>
      <button type="submit">
        {mode === 'add' ? 'Add Employee' : 'Update Employee'}
      </button>
    </form>
  );
};

export default AddEmployeeForm;
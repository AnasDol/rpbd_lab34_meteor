import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import '../styles.css';

const AddAnimalForm = ({ onSubmit, animal, mode }) => {
  const [clients, setClients] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [mothers, setMothers] = useState([]);
  const [fathers, setFathers] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [selectedMother, setSelectedMother] = useState(null);
  const [selectedFather, setSelectedFather] = useState(null);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [appearance, setAppearance] = useState('');

  useEffect(() => {
    // Fetch clients when the component mounts
    Meteor.call('clients.get', (error, result) => {
      if (!error) {
        setClients(result);
      }
    });

    // Fetch employees when the component mounts
    Meteor.call('employees.get', (error, result) => {
      if (!error) {
        setEmployees(result);
      }
    });

    // Fetch breeds when the component mounts
    Meteor.call('breeds.get', (error, result) => {
      if (!error) {
        setBreeds(result);
      }
    });

    // Fetch animals for mothers when the component mounts
    Meteor.call('animals.get', 'female', (error, result) => {
      if (!error) {
        // If in update mode, exclude the current animal from the mothers list
        const filteredMothers = mode === 'update' && animal && animal.gender === 'female'
          ? result.filter(mother => mother._id !== animal._id)
          : result;
  
        setMothers(filteredMothers);
      }
    });
  
    // Fetch animals for fathers when the component mounts
    Meteor.call('animals.get', 'male', (error, result) => {
      if (!error) {
        // If in update mode, exclude the current animal from the fathers list
        const filteredFathers = mode === 'update' && animal && animal.gender === 'male'
          ? result.filter(father => father._id !== animal._id)
          : result;
  
        setFathers(filteredFathers);
      }
    });

    // If in update mode and animal is provided, set the values from the selected animal
    if (mode === 'update' && animal) {
      setSelectedClient(animal.client || null);
      setSelectedEmployee(animal.employee || null);
      setSelectedBreed(animal.breed || null);
      setSelectedMother(animal.mother || null);
      setSelectedFather(animal.father || null);
      setName(animal.name || '');
      setAge(animal.age || '');
      setGender(animal.gender || '');
      setAppearance(animal.appearance || '');
    }
  }, [mode, animal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do any other form validation if needed

    const animalData = {
      name,
      age,
      gender,
      breed: selectedBreed,
      appearance,
      client: selectedClient,
      employee: selectedEmployee,
      mother: selectedMother,
      father: selectedFather,
    };

    onSubmit(animalData);
  };

  return (
    <form className="addForm" onSubmit={handleSubmit}>
      
      
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        Age:
        <input
          type="text"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </label>
      <label>
        Gender:
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </label>
      <label>
        Breed:
        <select
          value={selectedBreed ? selectedBreed._id : ''}
          onChange={(e) => {
            const selectedBreedId = e.target.value;
            const breedObject = breeds.find(breed => breed._id === selectedBreedId);
            setSelectedBreed(breedObject);
          }}
        >
          <option value="">Select Breed</option>
          {breeds.map((breed) => (
            <option key={breed._id} value={breed._id}>
              {breed.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Appearance:
        <input
          type="text"
          value={appearance}
          onChange={(e) => setAppearance(e.target.value)}
        />
      </label>
      <label>
        Client:
        <select
          value={selectedClient ? selectedClient._id : ''}
          onChange={(e) => {
            const selectedClientId = e.target.value;
            const clientObject = clients.find(client => client._id === selectedClientId);
            setSelectedClient(clientObject);
          }}
        >
          <option value="">Не выбран</option>
          {clients.map((client) => (
            <option key={client._id} value={client._id}>
              {client.lastName} {client.firstName}
            </option>
          ))}
        </select>
      </label>
      <label>
        Vet:
        <select
          value={selectedEmployee ? selectedEmployee._id : ''}
          onChange={(e) => {
            const selectedEmployeeId = e.target.value;
            const employeeObject = employees.find(employee => employee._id === selectedEmployeeId);
            setSelectedEmployee(employeeObject);
          }}
        >
          <option value="">Select Employee</option>
            {employees
              .filter(employee => employee.position.name === 'ветеринар') // Фильтрация по должности ветеринара
              .map((employee) => (
                <option key={employee._id} value={employee._id}>
                  {employee.lastName} {employee.firstName}
                </option>
          ))}
        </select>
      </label>
      <label>
        Mother:
        <select
          value={selectedMother ? selectedMother._id : ''}
          onChange={(e) => {
            const selectedMotherId = e.target.value;
            const motherObject = mothers.find(mother => mother._id === selectedMotherId);
            setSelectedMother(motherObject);
          }}
        >
          <option value="">Select Mother</option>
          {mothers.map((mother) => (
            <option key={mother._id} value={mother._id}>
              {mother.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Father:
        <select
          value={selectedFather ? selectedFather._id : ''}
          onChange={(e) => {
            const selectedFatherId = e.target.value;
            const fatherObject = fathers.find(father => father._id === selectedFatherId);
            setSelectedFather(fatherObject);
          }}
        >
          <option value="">Не выбран</option>
          {fathers.map((father) => (
            <option key={father._id} value={father._id}>
              {father.name}
            </option>
          ))}
        </select>
      </label>
      <button type="submit">
        {mode === 'add' ? 'Add Animal' : 'Update Animal'}
      </button>
    </form>
  );
};

export default AddAnimalForm;
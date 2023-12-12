import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import '../styles.css';
import AddEmployeeForm from '../forms/AddEmployeeForm';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [formMode, setFormMode] = useState('add'); // 'add' or 'update'
  
    const authToken = localStorage.getItem('authToken');
  
    useEffect(() => {
      Meteor.call('employees.get', (error, result) => {
        if (!error) {
          setEmployees(result);
        }
      });
    }, []);
  
    const handleEmployeeClick = (employee) => {
      setSelectedEmployee(selectedEmployee === employee ? null : employee);
    };
  
  useEffect(() => {
    Meteor.call('employees.get', (error, result) => {
      if (!error) {
        setEmployees(result);
      }
    });
  }, []);


  const handleUpdateClick = () => {
    if (selectedEmployee) {
      setFormMode('update');
      setShowAddForm(true);
    } else {
      console.warn('No employee selected for update.');
    }
  };

  const handleDeleteClick = () => {
    if (selectedEmployee) {
      const employeeId = selectedEmployee._id;

      Meteor.call('employees.remove', authToken, employeeId, (error) => {
        if (error) {
          console.error('Error deleting employee:', error);
        } else {
          // Fetch the updated list of employees after deletion
          Meteor.call('employees.get', (error, result) => {
            if (!error) {
              setEmployees(result);
            } else {
              console.error('Error fetching updated employees:', error);
            }
          });

          console.log(`Employee with ID ${employeeId} deleted successfully!`);
          setSelectedEmployee(null); // Clear the selected employee after deletion
        }
      });
    } else {
      console.warn('No employee selected for deletion.');
    }
  };

  const handleAddClick = () => {
    setFormMode('add');
    setShowAddForm(true);
  };

  const handleAddEmployee = (employeeData) => {
    if (formMode === 'add') {
      Meteor.call('employees.insert', authToken, employeeData, (error) => {
        if (error) {
          console.error('Error inserting employee:', error);
        } else {
          Meteor.call('employees.get', (error, result) => {
            if (!error) {
              setEmployees(result);
            } else {
              console.error('Error fetching updated employees:', error);
            }
          });
          console.log('Employee inserted successfully!');
        }
      });
    } else if (formMode === 'update') {
      if (selectedEmployee) {
        const employeeId = selectedEmployee._id;
        Meteor.call('employees.update', authToken, employeeId, employeeData, (error) => {
          if (error) {
            console.error('Error updating employee:', error);
          } else {
            // Fetch the updated list of employees after update
            Meteor.call('employees.get', (error, result) => {
              if (!error) {
                setEmployees(result);
              } else {
                console.error('Error fetching updated employees:', error);
              }
            });
            console.log(`Employee with ID ${employeeId} updated successfully!`);
            setSelectedEmployee(null); // Clear the selected employee after update
          }
        });
      } else {
        console.warn('No employee selected for update.');
      }
    }

    setShowAddForm(false);
  };

  return (
    <div className="employees-container">
      <h2>Employee List</h2>
      <div className="table-container">
        <table className="employees-table">
          <thead>
            <tr>
              <th style={{ width: '50px' }}>#</th>
              <th style={{ width: '200px' }}>Last Name</th>
              <th style={{ width: '200px' }}>First Name</th>
              <th style={{ width: '200px' }}>Patronymic</th>
              <th style={{ width: '200px' }}>Address</th>
              <th style={{ width: '200px' }}>Position</th>
              <th style={{ width: '200px' }}>Salary</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr
                key={employee._id}
                onClick={() => handleEmployeeClick(employee)}
                className={selectedEmployee && selectedEmployee._id === employee._id ? 'selected-row' : ''}
              >
                <td>{index + 1}</td>
                <td>{employee.lastName}</td>
                <td>{employee.firstName}</td>
                <td>{employee.patronymic}</td>
                <td>{employee.address}</td>
                <td>{employee.position.name}</td>
                <td>{employee.salary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showAddForm ? (
        <AddEmployeeForm onSubmit={handleAddEmployee} employee={selectedEmployee} mode={formMode} />
      ) : (
        <div>
          <div className="buttons-container">
            <button className="update-button" onClick={handleUpdateClick}>
              Update Data
            </button>
            <button className="delete-button" onClick={handleDeleteClick}>
              Delete Row
            </button>
          </div>
          <div className="buttons-container">
            <button className="add-new-button" onClick={handleAddClick}>
              Add New Record
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import AdminPanel from './AdminPanel';
import BreedList from '../../imports/ui/lists/BreedList';
import ClientList from '../../imports/ui/lists/ClientList';
import Menu from './Menu';
import PositionList from '../../imports/ui/lists/PositionList';
import ExhibitionList from '../../imports/ui/lists/ExhibitionList';
import RequestList from '../../imports/ui/lists/RequestList';
import AnimalList from '../../imports/ui/lists/AnimalList';
import ParticipationList from '../../imports/ui/lists/ParticipationList';
import EmployeeList from '../../imports/ui/lists/EmployeeList';

const MainRouter = () => {
  const [activeTab, setActiveTab] = useState('breedList');
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    Meteor.call('animals.get', (error, result) => {
      if (!error) {
        setAnimals(result);
      }
    });
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
          <>
            <Menu setActiveTab={setActiveTab} />
            {activeTab === 'breedList' && <BreedList />}
            {activeTab === 'clientList' && <ClientList />}
            {activeTab === 'positionList' && <PositionList />}
            {activeTab === 'exhibitionList' && <ExhibitionList />}
            {activeTab === 'employeeList' && <EmployeeList />}
            {activeTab === 'requestList' && <RequestList />}
            {activeTab === 'animalList' && <AnimalList/>}
            {activeTab === 'participationList' && <ParticipationList/>}
          </>
          }
          />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
};

export default MainRouter;
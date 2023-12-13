import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import AdminPanel from './AdminPanel';
import UserList from '../../imports/ui/lists/UserList';
import BreedList from '../../imports/ui/lists/BreedList';
import ClientList from '../../imports/ui/lists/ClientList';
import AddUserForm from '../../imports/ui/forms/AddUserForm';
import Menu from './Menu';
import PositionList from '../../imports/ui/lists/PositionList';
import ExhibitionList from '../../imports/ui/lists/ExhibitionList';
import AddEmployeeForm from '../../imports/ui/forms/AddEmployeeForm';
import EmployeeList from '../../imports/ui/lists/EmployeeList';
import RequestList from '../../imports/ui/lists/RequestList';
import AnimalList from '../../imports/ui/lists/AnimalList';

const MainRouter = () => {
  const [activeTab, setActiveTab] = useState('breedList');

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
          </>
          }
          />
        <Route path="/breedList" element={<BreedList />} />
        <Route path="/clientList" element={<ClientList />} />
        <Route path="/addemployeeform" element={<AddEmployeeForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/userlist" element={<UserList />} />
        <Route path="/adduserform" element={<AddUserForm />} />
      </Routes>
    </Router>
  );
};

export default MainRouter;
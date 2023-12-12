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
          </>
          }
          />
        <Route path="/breedList" element={<BreedList />} />
        <Route path="/clientList" element={<ClientList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/userlist" element={<UserList />} />
        <Route path="/adduserform" element={<AddUserForm />} />
      </Routes>
    </Router>
  );
};

export default MainRouter;
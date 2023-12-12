import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Login from './components/Login';
import AdminPanel from './AdminPanel';
import UserList from '../imports/ui/UserList';
import BreedList from '../imports/ui/BreedList';
import ClientList from '../imports/ui/ClientList';
import TaskList from '../imports/ui/TaskList';
import AddUserForm from '../imports/ui/AddUserForm';
import Menu from './Menu';

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
            {activeTab === 'taskList' && <TaskList />}
          </>
          }
          />
        <Route path="/breedList" element={<BreedList />} />
        <Route path="/clientList" element={<ClientList />} />
        <Route path="/taskList" element={<TaskList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/userlist" element={<UserList />} />
        <Route path="/adduserform" element={<AddUserForm />} />
      </Routes>
    </Router>
  );
};

export default MainRouter;
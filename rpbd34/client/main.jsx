import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import BreedList from '../imports/ui/BreedList';
import TaskList from '../imports/ui/TaskList';
import Menu from '../imports/ui/Menu';
import ClientList from '../imports/ui/ClientList';
import AddClientForm from '../imports/ui/AddClientForm';
import App from './App'

Meteor.startup(() => {
  const App = () => {
    const [activeTab, setActiveTab] = useState('breedList');

    return (
      <>
        <App/>
      </>
    )

    // return (
    //   <>
    //     <Menu setActiveTab={setActiveTab} />
    //     {activeTab === 'breedList' && <BreedList />}
    //     {activeTab === 'clientList' && <ClientList />}
    //     {activeTab === 'taskList' && <TaskList />}
    //   </>
    // );
  };

  render(<App />, document.getElementById('app'));
});


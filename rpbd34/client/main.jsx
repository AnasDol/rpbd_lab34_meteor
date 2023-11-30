// import React from 'react';
// import { Meteor } from 'meteor/meteor';
// import { render } from 'react-dom';

// import BreedList from '../imports/ui/BreedList';

// Meteor.startup(() => {
//   render(
//     <>
//       <BreedList/>
//     </>,
//     document.getElementById('app')
//   );
// });

import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import BreedList from '../imports/ui/BreedList';
import TaskList from '../imports/ui/TaskList';
import Menu from '../imports/ui/Menu';

Meteor.startup(() => {
  const App = () => {
    const [activeTab, setActiveTab] = useState('breedList');

    return (
      <>
        <Menu setActiveTab={setActiveTab} />
        {activeTab === 'breedList' && <BreedList />}
        {activeTab === 'taskList' && <TaskList />}
      </>
    );
  };

  render(<App />, document.getElementById('app'));
});


import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import TaskList from '../imports/ui/TaskList';
import AddTaskForm from '../imports/ui/AddTaskForm';

Meteor.startup(() => {
  render(
    <>
      <TaskList />
      <AddTaskForm />
    </>,
    document.getElementById('app')
  );
});


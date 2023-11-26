import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import CollectionList from '../imports/ui/CollectionList';
import AddTaskForm from '../imports/ui/AddTaskForm';

Meteor.startup(() => {
  render(
    <>
      <CollectionList collectionName="tasks" />
      <AddTaskForm />
    </>,
    document.getElementById('app')
  );
});


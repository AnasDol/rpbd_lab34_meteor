import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import CollectionList from '../imports/ui/CollectionList';
import AddTaskForm from '../imports/ui/AddTaskForm';
import BreedList from '../imports/ui/BreedList';

Meteor.startup(() => {
  render(
    <>
      <CollectionList collectionName="tasks" />
      <AddTaskForm />
      <BreedList />
    </>,
    document.getElementById('app')
  );
});


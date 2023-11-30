import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import BreedList from '../imports/ui/BreedList';

Meteor.startup(() => {
  render(
    <>
      <BreedList/>
    </>,
    document.getElementById('app')
  );
});


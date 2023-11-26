import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import BreedList from '../imports/ui/BreedList';
import ClientList from '../imports/ui/ClientList';

Meteor.startup(() => {
  render(
    <>
      <BreedList/>
    </>,
    document.getElementById('app')
  );
});

// import BreedList from '../imports/ui/BreedList';
// 

// const App = () => {
//   const [activeComponent, setActiveComponent] = useState('breeds');

//   const handleMenuClick = (component) => {
//     setActiveComponent(component);
//   };
// }


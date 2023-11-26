import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';

const CollectionList = ({ collectionName }) => {
  const [collectionData, setCollectionData] = useState([]);

  useEffect(() => {
    Meteor.call(`${collectionName}.get`, (error, result) => {
      if (!error) {
        setCollectionData(result);
      }
    });
  }, [collectionName]);

  return (
    <ul>
      {collectionData.map(item => (
        <li key={item._id}>{item.text}</li>
        // Замените item.text на соответствующее поле в вашей коллекции
      ))}
    </ul>
  );
};

CollectionList.propTypes = {
  collectionName: PropTypes.string.isRequired,
};

export default CollectionList;
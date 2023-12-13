import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Participations as Records } from '../collections/participations';

Meteor.methods({

  // 'participations.get': function (genderFilter) {
  //   const query = genderFilter ? { gender: genderFilter } : {};
  //   return Records.find(query).fetch();
  // },

    'participations.get'() {
        return Records.find().fetch();
    },

    'participations.getByAnimal': function (animalId) {
      check(animalId, String);
  
      // Fetch participations where the 'animal' field matches the specified animalId
      return Records.find({ 'animal._id': animalId }).fetch();
    },

    'participations.insert': function (authToken, data) {
        const isUser = Meteor.call('validateAuthToken', authToken);
        if (!isUser) {
          throw new Meteor.Error('not-authorized', 'Only authorized users can insert records.');
        }
        check(data, Object);
        Records.insert(data);
    },

    'participations.update' : function (authToken, idToUpdate, data) {
        const isUser = Meteor.call('validateAuthToken', authToken);
        if (!isUser) {
          throw new Meteor.Error('not-authorized', 'Only authorized users can update records.');
        }
        const recordToUpdate = Records.findOne({ _id: idToUpdate });
        if (!recordToUpdate) {
          throw new Meteor.Error('record-not-found', 'Record not found.');
        }
        check(idToUpdate, String);
        check(data, Object);
        Records.update(idToUpdate, { $set: data });
    },

    'participations.remove': function (authToken, idToRemove) {
        const isUser = Meteor.call('validateAuthToken', authToken);
        if (!isUser) {
          throw new Meteor.Error('not-authorized', 'Only authorized users can remove records.');
        }
        const recordToRemove = Records.findOne({ _id: idToRemove });
        if (!recordToRemove) {
          throw new Meteor.Error('record-not-found', 'Record not found.');
        }
        Records.remove({ _id: recordToRemove._id });
        return true;
      },

  });
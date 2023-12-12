import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Positions } from '../collections/positions';

Meteor.methods({

    'positions.get'() {
        return Positions.find().fetch();
    },

    'positions.insert': function (authToken, data) {
        const isUser = Meteor.call('validateAuthToken', authToken);
        if (!isUser) {
          throw new Meteor.Error('not-authorized', 'Only authorized users can insert records.');
        }
        check(data, Object);
        Positions.insert(data);
    },

    'positions.update' : function (authToken, idToUpdate, data) {
        const isUser = Meteor.call('validateAuthToken', authToken);
        if (!isUser) {
          throw new Meteor.Error('not-authorized', 'Only authorized users can update records.');
        }
        const recordToUpdate = Positions.findOne({ _id: idToUpdate });
        if (!recordToUpdate) {
          throw new Meteor.Error('record-not-found', 'Record not found.');
        }
        check(idToUpdate, String);
        check(data, Object);
        Positions.update(idToUpdate, { $set: data });
    },

    'positions.remove': function (authToken, idToRemove) {
        const isUser = Meteor.call('validateAuthToken', authToken);
        if (!isUser) {
          throw new Meteor.Error('not-authorized', 'Only authorized users can remove records.');
        }
        const recordToRemove = Positions.findOne({ _id: idToRemove });
        if (!recordToRemove) {
          throw new Meteor.Error('record-not-found', 'Record not found.');
        }
        Positions.remove({ _id: recordToRemove._id });
        return true;
      },


  });
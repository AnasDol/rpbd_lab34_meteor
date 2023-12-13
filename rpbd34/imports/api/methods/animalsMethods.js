import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Animals as Records } from '../collections/animals';

Meteor.methods({

    'animals.get'() {
        return Records.find().fetch();
    },

    'animals.insert': function (authToken, data) {
        const isUser = Meteor.call('validateAuthToken', authToken);
        if (!isUser) {
          throw new Meteor.Error('not-authorized', 'Only authorized users can insert records.');
        }
        check(data, Object);
        Records.insert(data);
    },

    'animals.update' : function (authToken, idToUpdate, data) {
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

    'animals.remove': function (authToken, idToRemove) {
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
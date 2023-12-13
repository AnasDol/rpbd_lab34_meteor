import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Positions as Records } from '../collections/positions';

Meteor.methods({
  'positions.get'() {
    return Records.find().fetch();
  },

  'positions.insert': function (authToken, data) {
    const isUser = Meteor.call('validateAuthToken', authToken);
    if (!isUser) {
      throw new Meteor.Error('not-authorized', 'Only authorized users can insert records.');
    }

    check(data, {
      name: String, // Добавляем проверку для уникальности поля name
    });

    if (Records.findOne({ name: data.name })) {
      throw new Meteor.Error('duplicate-name', 'Record with the same name already exists.');
    }

    Records.insert(data);
  },

  'positions.update': function (authToken, idToUpdate, data) {
    const isUser = Meteor.call('validateAuthToken', authToken);
    if (!isUser) {
      throw new Meteor.Error('not-authorized', 'Only authorized users can update records.');
    }

    check(idToUpdate, String);
    check(data, {
      name: String, // Добавляем проверку для уникальности поля name
      // Добавьте другие поля, если они есть в вашем объекте
    });

    const existingRecord = Records.findOne({ name: data.name, _id: { $ne: idToUpdate } });
    if (existingRecord) {
      throw new Meteor.Error('duplicate-name', 'Record with the same name already exists.');
    }

    const recordToUpdate = Records.findOne({ _id: idToUpdate });
    if (!recordToUpdate) {
      throw new Meteor.Error('record-not-found', 'Record not found.');
    }

    Records.update(idToUpdate, { $set: data });
  },

  'positions.remove': function (authToken, idToRemove) {
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
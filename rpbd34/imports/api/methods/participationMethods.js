import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Participations as Records } from '../collections/participations';

Meteor.methods({
  'participations.get'() {
    return Records.find().fetch();
  },

  'participations.getByAnimal': function (animalId) {
    check(animalId, String);
    return Records.find({ 'animal._id': animalId }).fetch();
  },

  'participations.insert': function (authToken, data) {
    const isUser = Meteor.call('validateAuthToken', authToken);
    if (!isUser) {
      throw new Meteor.Error('not-authorized', 'Only authorized users can insert records.');
    }

    check(data, {
      animal: Object,
      exhibition: Object,
      reward: String,
    });

    // Проверка уникальности комбинации animal и exhibition
    if (Records.findOne({ 'animal._id': data.animal._id, 'exhibition._id': data.exhibition._id })) {
      throw new Meteor.Error('duplicate-participation', 'Record with the same animal and exhibition already exists.');
    }

    Records.insert(data);
  },

  'participations.update': function (authToken, idToUpdate, data) {
    const isUser = Meteor.call('validateAuthToken', authToken);
    if (!isUser) {
      throw new Meteor.Error('not-authorized', 'Only authorized users can update records.');
    }

    console.log(data, idToUpdate);

    //check(idToUpdate, String);
    // check(data, {
    //   animal: Object,
    //   exhibition: Object,
    //   reward: String,
    // });

    // Проверка уникальности комбинации animal и exhibition
    // const existingRecord = Records.findOne({ 'animal._id': data.animal._id, 'exhibition._id': data.exhibition._id, _id: { $ne: idToUpdate } });
    // if (existingRecord._id !== idToUpdate) {
    //   throw new Meteor.Error('duplicate-participation', 'Record with the same animal and exhibition already exists.');
    // }

    const recordToUpdate = Records.findOne({ _id: idToUpdate });
    if (!recordToUpdate) {
      throw new Meteor.Error('record-not-found', 'Record not found.');
    }

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
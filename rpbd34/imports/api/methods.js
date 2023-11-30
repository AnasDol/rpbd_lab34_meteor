import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Tasks } from './tasks';
import { Breeds } from './breeds';
import { Clients } from './clients';

Meteor.methods({
    'tasks.insert'(text) {
      Tasks.insert({
        text,
        createdAt: new Date(),
      });
    },
    'tasks.get'() {
      return Tasks.find().fetch();
    },
    'breeds.get'() {
        return Breeds.find().fetch();
    },

     'breeds.insert'(breedData) {
      Breeds.insert(breedData);
    },
    'breeds.remove'(breedId) {
      // if (!Meteor.userId()) {
      //   throw new Meteor.Error('not-authorized', 'You are not authorized to remove breeds.');
      // }
      check(breedId, String);
      Breeds.remove(breedId);
    },
    'breeds.update'(breedId, breedData) {
      check(breedId, String);
      check(breedData, Object);
      Breeds.update(breedId, { $set: breedData });
    },

  'clients.get'() {
    return Clients.find().fetch();
  },
   'clients.insert'(clientData) {
    Clients.insert(clientData);
  },
  'clients.remove'(clientId) {
    // if (!Meteor.userId()) {
    //   throw new Meteor.Error('not-authorized', 'You are not authorized to remove breeds.');
    // }
    check(clientId, String);
    Clients.remove(clientId);
  },
  'clients.update'(clientId, clientData) {
    check(clientId, String);
    check(clientData, Object);
    Clients.update(clientId, { $set: clientData });
  },






  });
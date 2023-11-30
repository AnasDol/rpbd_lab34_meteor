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
     'clients.get'() {
       return Clients.find().fetch();
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
  });
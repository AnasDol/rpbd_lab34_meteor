import { Meteor } from 'meteor/meteor';
import { Tasks } from './tasks';

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
});
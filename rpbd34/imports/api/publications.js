import { Meteor } from 'meteor/meteor';

Meteor.publish('userData', function () {
  if (this.userId) {
    return Meteor.users.find(this.userId, {
      fields: { roles: 1, username: 1 },
    });
  } else {
    this.ready();
  }
});
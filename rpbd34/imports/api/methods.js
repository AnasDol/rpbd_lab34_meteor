import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Tasks } from './tasks';
import { Breeds } from './breeds';
import { Clients } from './clients';
import { Roles } from 'meteor/alanning:roles';

Meteor.methods({
  validateAuthToken: function (token) {
    // Perform your token validation logic here
    // For example, check if the token is valid and corresponds to an active user
    const user = Meteor.users.findOne({ _id: token });

    // Return a boolean indicating whether the token is valid
    return !!user;
  },
  'loginUser' (username, password) {
    const user = Meteor.users.findOne({ username });

    if (user && Accounts._checkPassword(user, password)) {
      // Log the user in and return the authentication token
      const authToken = Accounts._generateStampedLoginToken();
      Accounts._insertLoginToken(user._id, authToken);
      return authToken.token;
    } else {
      throw new Meteor.Error('invalid-login', 'Invalid username or password');
    }
  },
  'users.add'(username, password, roles) {
    // Check if the current user has the 'admin' role
    if (!this.userId || !Roles.userIsInRole(this.userId, 'admin')) {
      throw new Meteor.Error('not-authorized', 'You are not authorized to add users.');
    }

    // Validate input parameters
    check(username, String);
    check(password, String);
    check(roles, Array);

    // Create the new user
    const userId = Accounts.createUser({
      username,
      password,
    });

    // Assign roles to the new user
    Roles.addUsersToRoles(userId, roles);

    return userId;
  },
  'users.addRole'(userId, role) {
    console.log(this.userId);
    console.log(Roles.userIsInRole(this.userId, 'admin'));
    if (!this.userId || !Roles.userIsInRole(this.userId, 'admin')) {
      console.error('Not authorized to add roles:', this.userId);
      throw new Meteor.Error('not-authorized', 'You are not authorized to add roles.');
    }
    Roles.addUsersToRoles(userId, role);
    console.log(`Role '${role}' added to user ID '${userId}' by admin.`);
  },
  'users.remove'(userId) {
    // Check if the calling user is authorized to remove users (admin)
    if (!this.userId || !Roles.userIsInRole(this.userId, 'admin')) {
      throw new Meteor.Error('not-authorized', 'You are not authorized to remove users.');
    }
    check(userId, String);
    // Perform the user removal
    Meteor.users.remove(userId);
  },




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
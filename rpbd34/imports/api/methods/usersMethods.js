import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';

Meteor.methods({
  'users.create': function ({ username, password }) {
    const newUserId = Accounts.createUser({
      username,
      password,
      roles: ['user'],
    });

    return newUserId;
  },

  validateAuthTokenAdmin: function (token) {
    const user = Meteor.users.findOne({ _id: token });
    const isAdmin = user.username == 'admin';
    return !!user && isAdmin;
  },

  validateAuthToken: function (token) {
    const user = Meteor.users.findOne({ _id: token });
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

  'users.remove': function (authToken, userIdToRemove) {
    // Validate that the current user is an admin
    const isAdmin = Meteor.call('validateAuthTokenAdmin', authToken);

    if (!isAdmin) {
      throw new Meteor.Error('not-authorized', 'Only admins can remove users.');
    }

    // Find the user by ID and remove them
    const userToRemove = Meteor.users.findOne({ _id: userIdToRemove });

    if (!userToRemove) {
      throw new Meteor.Error('user-not-found', 'User not found.');
    }

    Meteor.users.remove({ _id: userToRemove._id });
    return true; // Indicate successful removal
  },

  });
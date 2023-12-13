import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles'; // Add this import

import { Accounts } from 'meteor/accounts-base';

import '/imports/api/methods/usersMethods.js';

import '/imports/api/methods/breedMethods.js';
import '/imports/api/methods/clientMethods.js';
import '/imports/api/methods/positionMethods.js';
import '/imports/api/methods/exhibitionMethods.js';
import '/imports/api/methods/employeeMethods.js';
import '/imports/api/methods/requestMethods.js';
import '/imports/api/methods/animalsMethods.js';
import '/imports/api/methods/participationMethods.js';

Meteor.startup(async () => {

  Accounts.config({
    forbidClientAccountCreation: false, // Allow clients to create accounts
  });

  // Create an admin user
  const adminUsername = 'admin';
  const adminPassword = 'adminPassword';

  // Create the admin user if not exists
  if (!Meteor.users.findOne({ username: adminUsername })) {
    Roles.createRole('admin');
    const adminUserId = Accounts.createUser({
      username: adminUsername,
      password: adminPassword,
    });
    Roles.addUsersToRoles(adminUserId, 'admin');
  }

  // Create the 'user' role if not exists
  const allRoles = Roles.getAllRoles().fetch();
  const userRoleExists = allRoles.some(role => role.name === 'user');

  if (!userRoleExists) {
    //Roles.createRole('user');
  }
  // Create a function to dynamically create users
  const createDynamicUser = (username, password, roles) => {
    // Check if the user already exists
    if (!Meteor.users.findOne({ username })) {
      const userId = Accounts.createUser({
        username,
        password,
      });

      // Assign roles to the new user
      Roles.addUsersToRoles(userId, roles);
      console.log(`User '${username}' created successfully with roles: ${roles.join(', ')}`);
    } else {
      console.log(`User '${username}' already exists.`);
    }
  };

  // Example: Create a dynamic user
  createDynamicUser('tetetet', '1234', ['user']);

  // Ensure that the admin has the 'admin' role
  const adminUser = Meteor.users.findOne({ username: adminUsername });
  if (adminUser && !Roles.userIsInRole(adminUser._id, 'admin')) {
    Roles.addUsersToRoles(adminUser._id, 'admin');
    console.log(`Admin user '${adminUsername}' now has the 'admin' role.`);
  }

  Meteor.publish('allUsers', function () {
    if (this.userId) {
      return Meteor.users.find({}, { fields: { username: 1, emails: 1, profile: 1 } });
    } else {
      this.ready();
    }
  });

});

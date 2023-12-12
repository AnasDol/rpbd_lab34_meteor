import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles'; // Add this import

import { Breeds } from '../imports/api/collections/breeds';
import { Clients } from '../imports/api/collections/clients';

import { Accounts } from 'meteor/accounts-base';
import '/imports/api/methods.js';

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

  // Проверка, пуста ли коллекция breeds
  if (Breeds.find().count() === 0) {
    // Если пуста, добавьте примеры данных
    Breeds.insert({ name: 'Example Breed 1' });
    Breeds.insert({ name: 'Example Breed 2' });
    Breeds.insert({ name: 'Example Breed 3' });
    Breeds.insert({ name: 'Example Breed 4' });
    Breeds.insert({ name: 'Example Breed 5' });
    Breeds.insert({ name: 'Example Breed 6' });
    Breeds.insert({ name: 'Example Breed 7' });
    Breeds.insert({ name: 'Example Breed 8' });
    Breeds.insert({ name: 'Example Breed 9' });
    Breeds.insert({ name: 'Example Breed 10' });
    Breeds.insert({ name: 'Example Breed 11' });
    Breeds.insert({ name: 'Example Breed 12' });
    Breeds.insert({ name: 'Example Breed 1' });
    Breeds.insert({ name: 'Example Breed 2' });
    Breeds.insert({ name: 'Example Breed 3' });
    Breeds.insert({ name: 'Example Breed 4' });
    Breeds.insert({ name: 'Example Breed 5' });
    Breeds.insert({ name: 'Example Breed 6' });
    Breeds.insert({ name: 'Example Breed 7' });
    Breeds.insert({ name: 'Example Breed 8' });
    Breeds.insert({ name: 'Example Breed 9' });
    Breeds.insert({ name: 'Example Breed 10' });
    Breeds.insert({ name: 'Example Breed 11' });
    Breeds.insert({ name: 'Example Breed 12' });
    // Добавьте столько записей, сколько вам нужно
  }

  if (Clients.find().count() === 0) {
    // Если пуста, добавьте примеры данных
    Clients.insert({
      last_name: 'Иванов',
      first_name: 'Иван',
      patronymic: 'Иванович',
      address: 'ул. Примерная, 123'
    });
  }
});

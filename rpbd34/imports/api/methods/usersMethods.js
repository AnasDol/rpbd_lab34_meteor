import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.methods({
  validateAuthTokenAdmin: function (token) {
    const user = Meteor.users.findOne({ _id: token });
    const isAdmin = user?.username === 'admin';
    return !!user && isAdmin;
  },

  validateAuthToken: function (token) {
    const user = Meteor.users.findOne({ _id: token });
    return !!user;
  },

  'users.create': function ({ username, password }) {
    // Проверка уникальности имени пользователя
    if (Meteor.users.findOne({ username })) {
      throw new Meteor.Error('duplicate-username', 'Username is already taken.');
    }

    const newUserId = Accounts.createUser({
      username,
      password,
      roles: ['user'],
    });

    return newUserId;
  },

  'users.remove': function (authToken, userIdToRemove) {
    // Проверка, что текущий пользователь — админ
    const isAdmin = Meteor.call('validateAuthTokenAdmin', authToken);

    if (!isAdmin) {
      throw new Meteor.Error('not-authorized', 'Only admins can remove users.');
    }

    // Проверка, что пользователь не удаляет сам себя
    const currentUser = Meteor.users.findOne({ _id: authToken });

    if (currentUser && currentUser._id === userIdToRemove) {
      throw new Meteor.Error('self-delete', 'Users cannot delete themselves.');
    }

    // Найти пользователя по ID и удалить его
    const userToRemove = Meteor.users.findOne({ _id: userIdToRemove });

    if (!userToRemove) {
      throw new Meteor.Error('user-not-found', 'User not found.');
    }

    Meteor.users.remove({ _id: userToRemove._id });
    return true; // Успешное удаление
  },
});
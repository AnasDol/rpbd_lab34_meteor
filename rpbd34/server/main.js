import { Meteor } from 'meteor/meteor';
import { LinksCollection } from '/imports/api/links';

import '../imports/api/methods';
import { Tasks } from '../imports/api/tasks';
import { Breeds } from '../imports/api/breeds';

Meteor.startup(async () => {

  if (Tasks.find().count() === 0) {
    // Если коллекция пуста, добавляем начальные элементы
    Tasks.insert({ text: 'Сделать что-то важное' });
    Tasks.insert({ text: 'Завершить проект' });
    Tasks.insert({ text: 'Подготовить отчет' });
  }

  // Проверка, пуста ли коллекция breeds
  if (Breeds.find().count() === 0) {
    // Если пуста, добавьте примеры данных
    Breeds.insert({ name: 'Example Breed 1' });
    Breeds.insert({ name: 'Example Breed 2' });
    // Добавьте столько записей, сколько вам нужно
  }




  
  // If the Links collection is empty, add some data.
  // if (await LinksCollection.find().countAsync() === 0) {
  //   await insertLink({
  //     title: 'Do the Tutorial',
  //     url: 'https://www.meteor.com/tutorials/react/creating-an-app',
  //   });

  //   await insertLink({
  //     title: 'Follow the Guide',
  //     url: 'https://guide.meteor.com',
  //   });

  //   await insertLink({
  //     title: 'Read the Docs',
  //     url: 'https://docs.meteor.com',
  //   });

  //   await insertLink({
  //     title: 'Discussions',
  //     url: 'https://forums.meteor.com',
  //   });
  //}

  // We publish the entire Links collection to all clients.
  // In order to be fetched in real-time to the clients
  // Meteor.publish("links", function () {
  //   return LinksCollection.find();
  // });
});

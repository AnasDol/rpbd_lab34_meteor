import { Meteor } from 'meteor/meteor';
import { LinksCollection } from '/imports/api/links';

import '../imports/api/methods';
import { Tasks } from '../imports/api/tasks';
import { Breeds } from '../imports/api/breeds';
import { Clients } from '../imports/api/clients';

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

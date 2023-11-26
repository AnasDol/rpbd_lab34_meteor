import { Meteor } from 'meteor/meteor';
import { Tasks } from './tasks';
import { Breeds } from './breeds';

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
  });
  
// export const createCollectionMethods = (collection) => {
//   Meteor.methods({
//     [`${collection}.insert`](data) {
//       collection.insert(data);
//     },
//     [`${collection}.get`]() {
//       return collection.find().fetch();
//     },
//   });
// };
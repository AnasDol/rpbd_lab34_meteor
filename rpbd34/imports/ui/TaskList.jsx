import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    Meteor.call('tasks.get', (error, result) => {
      if (!error) {
        setTasks(result);
      }
    });
  }, []);

  return (
    <ul>
      {tasks.map(task => (
        <li key={task._id}>{task.text}</li>
      ))}
    </ul>
  );
};

export default TaskList;
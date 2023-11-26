import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';

const AddTaskForm = () => {
  const [taskText, setTaskText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    Meteor.call('tasks.insert', taskText, (error) => {
      if (!error) {
        setTaskText(''); // Очищаем поле ввода после успешного добавления задачи
      } else {
        console.error(error.reason);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Введите задачу"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
      />
      <button type="submit">Добавить задачу</button>
    </form>
  );
};

export default AddTaskForm;
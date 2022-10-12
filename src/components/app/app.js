import React, { useState } from 'react';

import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import Footer from '../Footer';
import './app.css';

const App = () => {
  let maxId = 100;
  const createTodoItem = (label, min, sec) => {
    return {
      label,
      completed: false,
      id: maxId++,
      timer: new Date(),
      min,
      sec,
      time: `${min}:${sec}`,
    };
  };
  const [taskDate, setTaskDate] = useState([
    createTodoItem('Completed task', 30, 10),
    createTodoItem('Editing task', 30, 10),
    createTodoItem('Active task', 30, 10),
  ]);
  const [filter, setFilter] = useState('All');
  const clearTasks = () => {
    setTaskDate(({ taskDate }) => {
      taskDate.filter((item) => !item.completed);
    });
  };

  const filters = (tasks, filter) => {
    switch (filter) {
      case 'All': {
        return taskDate;
      }
      case 'Completed': {
        return taskDate.filter((item) => item.completed);
      }
      case 'Active': {
        return taskDate.filter((item) => !item.completed);
      }
      default: {
        return taskDate;
      }
    }
  };
  const filterClicked = (e) => {
    setFilter(e.target.textContent);
  };
  const deleteItem = (id) => {
    const idx = taskDate.findIndex((el) => el.id === id);
    const newArray = [...taskDate.slice(0, idx), ...taskDate.slice(idx + 1)];
    setTaskDate(newArray);
  };
  const AddItem = (text, minutes, seconds) => {
    const newItem = createTodoItem(text, minutes, seconds);
    const newArray = [...taskDate, newItem];
    setTaskDate(newArray);
  };

  const onToggleCompleted = (id) => {
    const newArray = taskDate.map((item) => (item.id === id ? { ...item, completed: !item.completed } : { ...item }));
    setTaskDate(newArray);
  };
  const onTimer = (id, tm) => {
    const newArray = taskDate.map((item) => (item.id === id ? { ...item, time: (item.time = tm) } : { ...item }));
    setTaskDate(newArray);
  };

  const tasks = filters(taskDate, filter);
  const countLeft = tasks.filter((item) => !item.completed).length;
  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm AddItem={AddItem} />
      </header>
      <section className="main">
        <TaskList task={tasks} onDeleted={deleteItem} onToggleCompleted={onToggleCompleted} onTimer={onTimer} />
        <Footer filterCompleted={filterClicked} countLeft={countLeft} clearTasks={clearTasks} filter={filter} />
      </section>
    </section>
  );
};
export default App;

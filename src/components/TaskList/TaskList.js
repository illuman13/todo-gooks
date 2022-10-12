import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Task from '../Task';

import './TaskList.css';

const TaskList = ({ task, onDeleted, onToggleCompleted, onTimer }) => {
  TaskList.defaultProps = {
    task: [],
    onDeleted: () => {},
    onToggleCompleted: () => {},
  };
  TaskList.propTypes = {
    task: PropTypes.arrayOf(PropTypes.object),
    onDeleted: PropTypes.func,
    onToggleCompleted: PropTypes.func,
  };
  const [str, setStr] = useState(null);
  const timeOut = (time) => {
    setStr(time);
  };
  const el = task.map((item) => {
    const { id } = item;
    return (
      <Task
        key={id}
        {...item}
        minut={Number(item.min)}
        second={Number(item.sec)}
        timeOut={timeOut}
        getDate={item.timer}
        onDeleted={() => onDeleted(id)}
        onTimer={() => onTimer(id, str)}
        onToggleCompleted={() => onToggleCompleted(id)}
      />
    );
  });

  return <ul className="todo-list">{el}</ul>;
};

export default TaskList;

import React from 'react';
import './Footer.css';
import PropTypes from 'prop-types';

import TasksFilter from '../TasksFilter';

const Footer = ({ filterCompleted, countLeft, clearTasks, filter }) => {
  Footer.propTypes = {
    filterCompleted: PropTypes.func.isRequired,
    countLeft: PropTypes.node.isRequired,
    clearTasks: PropTypes.func.isRequired,
    filter: PropTypes.string.isRequired,
  };
  return (
    <footer className="footer">
      <span className="todo-count">{countLeft} items left</span>
      <TasksFilter filter={filter} filterCompleted={filterCompleted} />
      <button className="clear-completed" onClick={clearTasks}>
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;

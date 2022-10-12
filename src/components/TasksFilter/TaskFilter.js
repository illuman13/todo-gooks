import React from 'react';
import PropTypes from 'prop-types';

const TaskFilter = ({ filterCompleted, filter }) => {
  TaskFilter.propTypes = {
    filterCompleted: PropTypes.func.isRequired,
    filter: PropTypes.string.isRequired,
  };
  const createBtn = (label, state, func) => {
    return (
      <button onClick={func} className={`${label === state ? 'selected' : ''}`}>
        {label}
      </button>
    );
  };
  return (
    <ul className="filters">
      <li key="23">{createBtn('All', filter, filterCompleted)}</li>
      <li key="24">{createBtn('Active', filter, filterCompleted)}</li>
      <li key="25">{createBtn('Completed', filter, filterCompleted)}</li>
    </ul>
  );
};

export default TaskFilter;

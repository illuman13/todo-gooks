import React, { useState } from 'react';
import './NewTaskForm.css';
import PropTypes from 'prop-types';

const NewTaskForm = ({ AddItem }) => {
  const [label, setLabel] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');

  const onLabelChange = (e) => {
    setLabel(e.target.value);
  };
  const onMinChange = (e) => {
    setMin(e.target.value);
  };
  const onSecChange = (e) => {
    setSec(e.target.value);
  };

  const onSubmit = (e) => {
    if (e.code === 'Enter') {
      AddItem(label, min, sec);
      setLabel('');
      setMin('');
      setSec('');
    }
  };
  return (
    <form className="new-todo-form" onKeyDown={onSubmit}>
      <input className="new-todo" type="text" placeholder="Task" onChange={onLabelChange} value={label} autoFocus />
      <input
        className="new-todo-form__timer"
        onChange={onMinChange}
        value={min}
        type="number"
        placeholder="Min"
        autoFocus
      />
      <input
        className="new-todo-form__timer"
        onChange={onSecChange}
        value={sec}
        type="number"
        placeholder="Sec"
        autoFocus
      />
    </form>
  );
};
NewTaskForm.propTypes = {
  AddItem: PropTypes.func.isRequired,
};
export default NewTaskForm;

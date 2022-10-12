import React, { useState, useEffect, useRef } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

const Task = ({
  label,
  onDeleted,
  id,
  onToggleCompleted,
  completed,
  time,
  getDate,
  onTimer,
  minut,
  second,
  timeOut,
}) => {
  Task.defaultProps = {
    getDate: new Date(),
  };
  Task.propTypes = {
    getDate: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    onDeleted: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    onToggleCompleted: PropTypes.func.isRequired,
    completed: PropTypes.bool.isRequired,
  };
  const [nowTime, setNowTime] = useState(formatDistanceToNow(getDate, { includeSeconds: true }));
  const [min, setMin] = useState(minut);
  const [sec, setSec] = useState(second);
  const [interval, controlInterval] = useState(null);
  const isMounted = useRef(false);
  const data = () => {
    setNowTime(formatDistanceToNow(getDate, { includeSeconds: true }));
  };
  useEffect(() => {
    const timerID = setInterval(() => data(), 500);
    if (isMounted.current) {
      onTimer();
    } else {
      isMounted.current = true;
    }
    return () => {
      clearInterval(timerID);
    };
  }, [sec]);
  useEffect(() => {
    return () => clearInterval(interval);
  }, []);
  let stopInterval;
  const startTimer = (duration) => {
    clearInterval(interval);
    let timer = duration,
      minutes,
      seconds;
    stopInterval = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);
      minutes = minutes < 10 ? '0' + minutes : minutes;
      seconds = seconds < 10 ? '0' + seconds : seconds;
      if (duration === 3599) {
        timer = -1;
      }
      setMin(minutes);
      setSec(seconds);
      if (duration === 0) {
        if (++timer < 0) {
          timer = duration;
        }
      } else {
        if (timer-- <= 0) {
          clearInterval(stopInterval);
          timer = duration;
        }
      }
      timeOut(`${minutes}:${seconds}`);
    }, 1000);
    controlInterval(stopInterval);
  };
  return (
    <li className={`${completed ? 'completed' : ''}`} key={id}>
      <div className="view">
        <input className="toggle" type="checkbox" id={id} onClick={onToggleCompleted} readOnly checked={completed} />
        <label htmlFor={id}>
          <span className="title">{label}</span>
          <span className="description">
            <button className="icon icon-play" onClick={() => startTimer(60 * Number(min) + Number(sec))} />
            <button className="icon icon-pause" onClick={() => clearInterval(interval)} />
            {time}
          </span>
          <span className="description">created {nowTime} ago</span>
        </label>
        <button className="icon icon-edit" />
        <button className="icon icon-destroy" onClick={onDeleted} />
      </div>
      {/*<input type="text" className="edit" onKeyDown={this.KeyPress} />*/}
    </li>
  );
};

export default Task;

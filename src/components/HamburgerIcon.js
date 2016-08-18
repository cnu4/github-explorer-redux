import React from 'react';
import classNames from 'classnames';
import '../styles/hamburgerIcon.scss';

export default (props) => (
  <div
    id={props.id}
    className="nav-icon"
  >
    <div className="nav-icon-bars">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
);

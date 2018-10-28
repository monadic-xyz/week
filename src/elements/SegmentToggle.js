import React from 'react';
import { NavLink } from 'react-router-dom';

export default () => (
  <nav>
    <ul>
      <li>
        <NavLink to="/tasks/open">Open</NavLink>
      </li>
      <li>
        <NavLink to="/tasks/archived">Archived</NavLink>
      </li>
    </ul>
  </nav>
);

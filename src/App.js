import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Tasks from 'pages/Tasks';

export default () => (
  <Router>
    <Route path="/tasks/:segment(archived|open)" component={Tasks} />
  </Router>
);

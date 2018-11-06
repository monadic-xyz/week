import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Tasks from 'pages/Tasks';

export default () => (
  <Router>
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/tasks/open" />} />
      <Route path="/tasks/:segment(archived|open)" component={Tasks} />
    </Switch>
  </Router>
);

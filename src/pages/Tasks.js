import React, { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';

import { GlobalStyle } from 'styles';

import firebase from 'sources/firebase';

import Header from 'elements/Header';
import List from 'elements/List';
import SegmentTitle from 'elements/SegmentTitle';
import SegmentToggle from 'elements/SegmentToggle';

import Search from 'components/Search';
import Task from 'components/Task';
import { TaskContext, TaskProvider } from 'providers/TaskProvider';

const defaultFilter = {
  archived: false,
  done: null,
  label: [],
  owner: null,
  query: null,
};

const cleanFilter = (filter, term) => ({
  ...filter,
  archived: undefined,
  done: undefined,
  query: term,
});

const parseFilter = search => {
  const extractedFilter = queryString.parse(search);
  return {
    ...defaultFilter,
    ...extractedFilter,
  };
};

const getWeek = date => {
  const time = new Date(date.getTime());

  time.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  time.setDate(time.getDate() + 3 - ((time.getDay() + 6) % 7));
  // January 4 is always in week 1.
  const week1 = new Date(time.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from time to week1.
  return (
    1 +
    Math.round(
      ((time.getTime() - week1.getTime()) / 86400000 -
        3 +
        ((week1.getDay() + 6) % 7)) /
        7
    )
  );
};

const today = new Date();

export default class Tasks extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      search: PropTypes.string.isRequired,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.object.isRequired,
      url: PropTypes.string.isRequired,
    }).isRequired,
  };

  state = {
    filter: defaultFilter,
    segment: 'open',
  };

  componentWillMount() {
    this.update(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.update(nextProps);
  }

  search = term => {
    const { history, match } = this.props;
    const { filter } = this.state;
    const search = queryString.stringify(cleanFilter(filter, term));

    history.push(`${match.url}?${search}`);
  };

  update = props => {
    const { location, match } = props;

    this.setState({
      filter: {
        ...parseFilter(location.search),
        archived: match.params.segment === 'archived',
      },
      segment: match.params.segment,
    });
  };

  render() {
    const { filter, segment } = this.state;

    return (
      <>
        <Header>
          <SegmentTitle>Week {getWeek(today)}</SegmentTitle>
          <SegmentToggle />
          <Search onSubmit={this.search} term={filter.query || ''} />
        </Header>
        <TaskProvider db={firebase.firestore()} filter={filter}>
          <TaskContext.Consumer>
            {tasks => (
              <List>
                <>
                  {segment === 'open' && (
                    <li key="add-task">
                      <Task />
                    </li>
                  )}
                  {tasks.tasks.map(task => (
                    <li key={task.id}>
                      <Task task={task} />
                    </li>
                  ))}
                </>
              </List>
            )}
          </TaskContext.Consumer>
        </TaskProvider>
        <GlobalStyle />
      </>
    );
  }
}

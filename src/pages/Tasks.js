import React, { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';

import { GlobalStyle } from 'styles';

import firebase from 'sources/firebase';

import Header from 'elements/Header';
import List from 'elements/List';
import ListItem from 'elements/ListItem';
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
          <SegmentTitle>{segment}</SegmentTitle>
          <SegmentToggle />
          <Search onSubmit={this.search} term={filter.query || ''} />
        </Header>
        <TaskProvider db={firebase.firestore()} filter={filter}>
          <TaskContext.Consumer>
            {tasks => (
              <List>
                <>
                  {segment === 'open' && (
                    <ListItem key="add-task">
                      <Task />
                    </ListItem>
                  )}
                  {tasks.tasks.map(task => (
                    <ListItem key={task.id}>
                      <Task task={task} />
                    </ListItem>
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

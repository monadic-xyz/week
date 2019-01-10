import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getWeek } from 'libs/date';
import {
  cleanFilter,
  defaultFilter,
  filterTasks,
  filterToQuery,
  parseFilterFromQuery,
} from 'libs/filter';
import { GlobalStyle } from 'styles';

import firebase from 'sources/firebase';

import Header from 'elements/Header';
import List from 'elements/List';
import SegmentTitle from 'elements/SegmentTitle';
import SegmentToggle from 'elements/SegmentToggle';

import Search from 'components/Search';
import FilterBar from 'components/FilterBar';
import Task from 'components/Task';
import Shortcuts from 'components/Shortcuts';

import { TaskContext, TaskProvider } from 'providers/TaskProvider';
import {
  CollaboratorContext,
  CollaboratorProvider,
} from '../providers/CollaboratorProvider';

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

  clear = () => {
    const { history, match } = this.props;

    history.push(match.url);
  };

  selectLabel = label => {
    const { history, match } = this.props;
    const { filter } = this.state;

    filter.label.push(label);

    const search = filterToQuery(cleanFilter(filter, null));

    history.push(`${match.url}?${search}`);
  };

  selectOwner = owner => {
    const { history, match } = this.props;
    const { filter } = this.state;

    filter.owner = owner;

    const search = filterToQuery(cleanFilter(filter, null));

    history.push(`${match.url}?${search}`);
  };

  search = term => {
    const { history, match } = this.props;
    const { filter } = this.state;
    const search = filterToQuery(cleanFilter(filter, term));

    history.push(`${match.url}?${search}`);
  };

  update = props => {
    const { location, match } = props;

    this.setState({
      filter: {
        ...parseFilterFromQuery(location.search),
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
          <SegmentTitle>Week {getWeek(new Date())}</SegmentTitle>
          <SegmentToggle />
          <Search onSubmit={this.search} term={filter.query || ''} />
        </Header>
        <FilterBar filter={filter} onClear={this.clear} />
        <CollaboratorProvider db={firebase.firestore()}>
          <CollaboratorContext.Consumer>
            {collaborators => (
              <TaskProvider db={firebase.firestore()} filter={filter}>
                <TaskContext.Consumer>
                  {tasks => (
                    <List>
                      <>
                        {segment === 'open' && (
                          <li key="add-task">
                            <Task collaborators={collaborators} />
                          </li>
                        )}
                        {tasks.tasks &&
                          filterTasks(tasks.tasks, filter).map(task => (
                            <li key={task.id}>
                              <Task
                                collaborators={collaborators}
                                onLabelSelect={this.selectLabel}
                                onOwnerSelect={this.selectOwner}
                                task={task}
                              />
                            </li>
                          ))}
                      </>
                    </List>
                  )}
                </TaskContext.Consumer>
              </TaskProvider>
            )}
          </CollaboratorContext.Consumer>
        </CollaboratorProvider>
        <GlobalStyle />
        <Shortcuts />
      </>
    );
  }
}

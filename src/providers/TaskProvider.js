import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FilterProp } from 'libs/filter';

const buildQuery = (db, filter) => {
  let query = db.collection('tasks');

  query = query.where('archived', '==', filter.archived);

  if (filter.done) {
    query = query.where('done', '==', filter.done);
  }

  // filter.label.forEach(label => {
  //   query = query.where('labels', 'array-contains', label);
  // });

  let orderBy = [['done'], ['owner'], ['createdAt', 'desc']];

  if (filter.owner && filter.owner !== '') {
    query = query.where('owner', '==', filter.owner);

    orderBy = [['done'], ['createdAt', 'desc']];
  }

  orderBy.forEach(order => {
    query = query.orderBy(...order);
  });

  return query;
};

const defaultTask = {
  archived: false,
  archivedAt: null,
  done: false,
  doneAt: null,
};

export const TaskContext = React.createContext();

export class TaskProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    db: PropTypes.shape({
      collection: PropTypes.func.isRequired,
    }).isRequired,
    filter: FilterProp.isRequired,
  };

  state = {
    tasks: [],
    unsubscribe: null,
  };

  componentDidMount() {
    const { db, filter } = this.props;

    this.setState({
      unsubscribe: buildQuery(db, filter).onSnapshot(this.onSnapshot),
    });
  }

  componentWillReceiveProps(next) {
    const { unsubscribe } = this.state;
    unsubscribe();
    this.setState({
      unsubscribe: buildQuery(next.db, next.filter).onSnapshot(this.onSnapshot),
      tasks: [],
    });
  }

  shouldComponentUpdate(_, nextState) {
    const { tasks } = this.state;

    if (JSON.stringify(tasks) !== JSON.stringify(nextState.tasks)) {
      return true;
    }

    return false;
  }

  componentWillUnmount() {
    const { unsubscribe } = this.state;
    unsubscribe();
  }

  add = (desc, owner, labels) => {
    const { db } = this.props;

    db.collection('tasks').add({
      ...defaultTask,
      createdAt: new Date(),
      desc,
      labels,
      owner,
      updatedAt: new Date(),
    });
  };

  archive = id =>
    this.update(id, {
      archivedAt: new Date(),
      archived: true,
    });

  unArchive = id =>
    this.update(id, {
      archivedAt: null,
      archived: false,
    });

  complete = id => this.update(id, { done: true, doneAt: new Date() });

  edit = (id, desc, owner, labels) =>
    this.update(id, {
      desc,
      labels,
      owner,
      updatedAt: new Date(),
    });

  reopen = id => this.update(id, { done: false, doneAt: null });

  onSnapshot = snapshot => {
    this.setState({
      tasks: snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data(),
      })),
    });
  };

  update = (id, fields) => {
    const { db } = this.props;

    db.collection('tasks')
      .doc(id)
      .update(fields);
  };

  render() {
    const { children } = this.props;
    const { tasks } = this.state;
    const ctx = {
      add: this.add,
      archive: this.archive,
      unArchive: this.unArchive,
      complete: this.complete,
      edit: this.edit,
      reopen: this.reopen,
      tasks,
    };

    return <TaskContext.Provider value={ctx}>{children}</TaskContext.Provider>;
  }
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';

const buildQuery = (db, filter) => {
  let query = db.collection('tasks');

  query = query.where('archived', '==', filter.archived);

  if (filter.done) {
    query = query.where('done', '==', filter.done);
  }

  filter.label.forEach(label => {
    query = query.where('labels', 'array-contains', label);
  });

  if (filter.owner && filter.owner !== '') {
    query = query.where('owner', '==', filter.owner);
  }

  // TODO(xla): Implement task description text search.

  [['done'], ['createdAt', 'desc']].forEach(order => {
    query = query.orderBy(...order);
  });

  return query;
};

const NullableBool = (props, name, componentName) => {
  if (props[name] !== null && typeof props[name] !== 'boolean') {
    return new Error(
      `${componentName} requires ${name} to either be a boolean or null`
    );
  }
};

const NullableString = (props, name, componentName) => {
  if (props[name] !== null && typeof props[name] !== 'string') {
    return new Error(
      `${componentName} requires ${name} to either be a string or null`
    );
  }
};

const FilterProp = PropTypes.exact({
  archived: PropTypes.bool.isRequired,
  done: NullableBool,
  label: PropTypes.arrayOf(PropTypes.string).isRequired,
  owner: NullableString,
  query: NullableString,
});

const defaultTask = {
  archived: false,
  archivedAt: null,
  done: false,
  doneAt: null,
};

export const TaskContext = React.createContext();

export class TaskProvider extends Component {
  static defaultProps = {};

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
    this.setState({
      unsubscribe: buildQuery(next.db, next.filter).onSnapshot(this.onSnapshot),
    });
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
      complete: this.complete,
      edit: this.edit,
      reopen: this.reopen,
      tasks,
    };

    return <TaskContext.Provider value={ctx}>{children}</TaskContext.Provider>;
  }
}

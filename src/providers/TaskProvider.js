import React, { Component } from 'react';
import PropTypes from 'prop-types';

export const TaskContext = React.createContext();

export class TaskProvider extends Component {
  static defaultProps = {
    filters: [['archived', '==', false]],
    orders: [['done'], ['createdAt', 'desc']],
  };

  static propTypes = {
    children: PropTypes.node.isRequired,
    db: PropTypes.object.isRequired,
    filters: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.bool]))),
    orders: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  };

  constructor(props) {
    super(props);

    const { db, filters, orders } = this.props;

    this.state = {
      db,
      filters,
      orders,
      tasks: [],
      unsubscribe: null,
    };
  }

  componentDidMount() {
    const { filters, orders } = this.state;

    this.setState({
      unsubscribe: this.buildQuqery(filters, orders).onSnapshot(this.onUpdate),
    });
  }

  componentWillUnmount() {
    const { unsubscribe } = this.state;
    unsubscribe();
  }

  buildQuqery = (filters, orders) => {
    const { db } = this.state;
    let query = db.collection('tasks');

    filters.forEach(filter => {
      const field = filter[0];
      const comparator = filter[1];
      const value = filter[2];

      query = query.where(field, comparator, value);
    });

    orders.forEach(order => {
      query = query.orderBy(...order);
    });

    return query;
  };

  changeFilters = filters => {
    const { orders } = this.state;

    this.setState({
      filters,
      unsubscribe: this.buildQuqery(filters, orders).onSnapshot(this.onUpdate),
    });
  };

  onUpdate = snapshot => {
    this.setState({
      tasks: snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data(),
      })),
    });
  };

  render() {
    const { children } = this.props;
    const { tasks } = this.state;
    const ctx = { changeFilters: this.changeFilters, tasks };

    return <TaskContext.Provider value={ctx}>{children}</TaskContext.Provider>;
  }
}

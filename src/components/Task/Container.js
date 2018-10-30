import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { TaskContext } from 'providers/TaskProvider';

import Form from './Form';
import TaskItem from './TaskItem';

export default class Task extends Component {
  static contextType = TaskContext;

  static defaultProps = {
    task: undefined,
  };

  static propTypes = {
    task: PropTypes.shape({
      data: PropTypes.shape({
        desc: PropTypes.string.isRequired,
      }).isRequired,
      id: PropTypes.string.isRequired,
    }),
  };

  state = {
    editing: false,
  };

  render() {
    const { add, edit } = this.context;
    const { task } = this.props;
    const { editing } = this.state;

    if (!task) {
      return <Form onSubmit={add} />;
    }

    if (task && editing) {
      return (
        <Form
          desc={task.data.desc}
          onSubmit={(desc, owner, labels) => edit(task.id, desc, owner, labels)}
        />
      );
    }

    return (
      <TaskItem
        {...task.data}
        onEdit={() => null}
        onArchive={() => null}
        onDone={() => null}
      />
    );
  }
}

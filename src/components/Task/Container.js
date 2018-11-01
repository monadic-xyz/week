import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { extractLabels, extractOwner, stripOwner } from 'libs/description';

import { TaskContext } from 'providers/TaskProvider';

import Form from './Form';
import TaskItem from './TaskItem';

const deriveStateFromTask = task => {
  const desc = (task && task.data.desc) || '';

  return {
    desc,
    editing: task === undefined,
    labels: extractLabels(desc),
    owner: extractOwner(desc),
  };
};

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

  constructor(props) {
    super(props);
    this.state = deriveStateFromTask(props.task);
  }

  state = {
    desc: '',
    editing: false,
    labels: [],
    owner: undefined,
  };

  componentWillReceiveProps(next) {
    const { task } = next;
    this.setState(deriveStateFromTask(task));
  }

  onSubmit = e => {
    e.preventDefault();

    const { add, edit } = this.context;
    const { task } = this.props;
    const { desc, labels, owner } = this.state;

    if (!desc || !owner) return;

    if (!task) {
      add(desc, owner, labels);
    } else if (task) {
      edit(task.id, desc, owner, labels);
    }

    if (task) {
      this.setState({
        editing: false,
      });
    }
  };

  setEditing = () => {
    this.setState({
      editing: true,
    });
  };

  updateDesc = desc => {
    this.setState({
      desc,
      labels: extractLabels(desc),
      owner: extractOwner(desc),
    });
  };

  render() {
    const { archive, complete, reopen, unArchive } = this.context;
    const { desc, owner, editing } = this.state;
    const { task } = this.props;

    return (
      <>
        {editing ? (
          <Form
            desc={desc}
            disabled={!owner || !desc || stripOwner(desc).trim() === ''}
            editing={editing}
            newTask={task !== undefined}
            onSubmit={this.onSubmit}
            updateDesc={e => {
              this.updateDesc(e.target.value);
            }}
          />
        ) : (
          <TaskItem
            {...task.data}
            onArchive={() => archive(task.id)}
            onUnArchive={() => unArchive(task.id)}
            onDone={() => {
              if (task.data.done) {
                return reopen(task.id);
              }
              complete(task.id);
            }}
            onEdit={this.setEditing}
          />
        )}
      </>
    );
  }
}

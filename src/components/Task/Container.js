import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { TaskContext } from 'providers/TaskProvider';

import Form from './Form';
import TaskItem from './TaskItem';

const extractLabels = str => {
  const matches = [];
  const re = /(?=\S)#([-_a-zA-Z0-9]+)/gm;

  for (;;) {
    const match = re.exec(str);
    if (match === null) break;
    matches.push(match[1]);
  }

  return matches;
};

const extractOwner = str => {
  const re = new RegExp(/(?=\S)=([a-zA-Z0-9-_$]+)/);
  const match = re.exec(str);

  if (!match) return null;

  return match[1];
};

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

  state = {
    desc: '',
    editing: false,
    labels: [],
    owner: undefined,
  };

  componentWillMount() {
    const { task } = this.props;
    this.setState(deriveStateFromTask(task));
  }

  componentWillReceiveProps(next) {
    const { task } = this.props;
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
  };

  updateDesc = desc => {
    this.setState({
      desc,
      labels: extractLabels(desc),
      owner: extractOwner(desc),
    });
  };

  render() {
    const { desc, owner, editing } = this.state;
    const { task } = this.props;

    if (editing) {
      return (
        <Form
          desc={desc}
          disabled={!desc || !owner}
          onSubmit={this.onSubmit}
          updateDesc={e => {
            this.updateDesc(e.target.value);
          }}
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

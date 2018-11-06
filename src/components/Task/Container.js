import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { extractLabels, extractOwner, stripOwner } from 'libs/description';

import { TaskContext } from 'providers/TaskProvider';

import Modal from 'components/Modal';

import Form from './Form';
import TaskItem from './TaskItem';

const deriveStateFromTask = (task, desc) => {
  const d = (task && task.data.desc) || desc;

  return {
    desc: d,
    editing: task === undefined,
    labels: task && task.data ? task.data.labels : [],
    owner: task && task.data ? task.data.owner : null,
  };
};

export default class Task extends Component {
  static contextType = TaskContext;

  static defaultProps = {
    task: undefined,
  };

  static propTypes = {
    collaborators: PropTypes.array.isRequired,
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

  constructor(props) {
    super(props);
    this.state = deriveStateFromTask(props.task, '');
    this.wrapper = React.createRef();
  }

  componentWillReceiveProps(next) {
    const { task } = next;
    const { desc } = this.state;
    this.setState(deriveStateFromTask(task, desc));
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
    } else {
      this.setState({
        desc: '',
        labels: [],
        owner: null,
      });
    }
  };

  toggleEditing = () => {
    const { task } = this.props;
    if (task) {
      this.setState(prevState => ({
        editing: !prevState.editing,
      }));
    }
  };

  updateDesc = desc => {
    const { collaborators } = this.props;
    const owner = extractOwner(desc);
    const contains = collaborators.map(c => c.data.name).includes(owner);

    this.setState({
      desc,
      labels: extractLabels(desc),
      owner: contains ? owner : null,
    });
  };

  render() {
    const { archive, complete, reopen, unArchive } = this.context;
    const { desc, owner, editing } = this.state;
    const { task } = this.props;
    let topModal = '0';
    let leftModal = '0';
    if (this.wrapper.current) {
      const { top, left } = this.wrapper.current.getBoundingClientRect();
      topModal = top;
      leftModal = left;
    }

    if (editing && !task) {
      return (
        <div ref={this.wrapper}>
          <Form
            desc={desc}
            disabled={!owner || !desc || stripOwner(desc).trim() === ''}
            editing={editing}
            newTask={task !== undefined}
            onEscape={this.toggleEditing}
            onSubmit={this.onSubmit}
            updateDesc={e => {
              this.updateDesc(e.target.value);
            }}
          />
        </div>
      );
    }
    if (editing && task) {
      return (
        <div ref={this.wrapper}>
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
            onEdit={this.toggleEditing}
          />
          <Modal on top={topModal} left={leftModal} toggle={this.toggleEditing}>
            <Form
              desc={desc}
              disabled={!owner || !desc || stripOwner(desc).trim() === ''}
              editing={editing}
              newTask={task !== undefined}
              onEscape={this.toggleEditing}
              onSubmit={this.onSubmit}
              updateDesc={e => {
                this.updateDesc(e.target.value);
              }}
            />
          </Modal>
        </div>
      );
    }

    return (
      <div ref={this.wrapper}>
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
          onEdit={this.toggleEditing}
        />
      </div>
    );
  }
}

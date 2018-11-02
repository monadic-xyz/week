import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { extractLabels, extractOwner, stripOwner } from 'libs/description';

import { TaskContext } from 'providers/TaskProvider';

import Modal from 'components/Modal';

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
    this.wrapper = React.createRef();
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

  toggleEditing = () => {
    const { task } = this.props;
    if (task) {
      this.setState(prevState => ({
        editing: !prevState.editing,
      }));
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

    return (
      <div ref={this.wrapper}>
        {editing ? (
          !task ? (
            <Form
              desc={desc}
              disabled={!owner || !desc || stripOwner(desc).trim() === ''}
              editing={editing}
              newTask={task !== undefined}
              onSubmit={this.onSubmit}
              updateDesc={e => {
                this.updateDesc(e.target.value);
              }}
              onEscape={this.toggleEditing}
            />
          ) : (
            <>
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
              <Modal
                on
                top={topModal}
                left={leftModal}
                toggle={this.toggleEditing}
              >
                <Form
                  desc={desc}
                  disabled={!owner || !desc || stripOwner(desc).trim() === ''}
                  editing={editing}
                  newTask={task !== undefined}
                  onSubmit={this.onSubmit}
                  updateDesc={e => {
                    this.updateDesc(e.target.value);
                  }}
                  onEscape={this.toggleEditing}
                />
              </Modal>
            </>
          )
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
            onEdit={this.toggleEditing}
          />
        )}
      </div>
    );
  }
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { extractLabels, extractOwner, stripOwner } from 'libs/description';

import { TaskContext } from 'providers/TaskProvider';

import Modal from 'components/Modal';

import TaskForm from './TaskForm';
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
    onLabelSelect: () => {},
    onOwnerSelect: () => {},
    task: undefined,
  };

  static propTypes = {
    collaborators: PropTypes.array.isRequired,
    onLabelSelect: PropTypes.func,
    onOwnerSelect: PropTypes.func,
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

  onSubmit = () => {
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

  selectLabel = label => {
    const { onLabelSelect } = this.props;

    onLabelSelect(label);
  };

  selectOwner = () => {
    const { task, onOwnerSelect } = this.props;

    onOwnerSelect(task.data.owner);
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
    const { collaborators, task } = this.props;
    const { desc, owner, editing } = this.state;
    let topModal = 0;
    let widthModal = 0;
    let wrapperRect = {};
    if (this.wrapper.current) {
      const { width } = this.wrapper.current.getBoundingClientRect();
      topModal = this.wrapper.current.offsetTop;
      widthModal = width;
      wrapperRect = this.wrapper.current.getBoundingClientRect();
    }

    if (editing && !task) {
      return (
        <div ref={this.wrapper}>
          <TaskForm
            collaborators={collaborators}
            desc={desc}
            disabled={!owner || !desc || stripOwner(desc).trim() === ''}
            editing={editing}
            newTask
            onEscape={this.toggleEditing}
            onSubmit={this.onSubmit}
            updateDesc={this.updateDesc}
            wrapperRect={wrapperRect}
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
            onLabelSelect={this.selectLabel}
            onOwnerSelect={this.selectOwner}
          />
          <Modal
            on
            top={topModal}
            toggle={this.toggleEditing}
            width={widthModal}
          >
            <TaskForm
              collaborators={collaborators}
              desc={desc}
              disabled={!owner || !desc || stripOwner(desc).trim() === ''}
              editing={editing}
              newTask={false}
              onEscape={this.toggleEditing}
              onSubmit={this.onSubmit}
              updateDesc={this.updateDesc}
              wrapperRect={wrapperRect}
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
          onLabelSelect={this.selectLabel}
          onOwnerSelect={this.selectOwner}
        />
      </div>
    );
  }
}

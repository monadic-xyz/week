import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import TaskForm from 'components/TaskForm';

export default class Task extends Component {
  static defaultProps = {
    task: undefined,
  };

  static propTypes = {
    add: PropTypes.func.isRequired,
    archive: PropTypes.func.isRequired,
    complete: PropTypes.func.isRequired,
    edit: PropTypes.func.isRequired,
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
    const { add, edit, task } = this.props;
    const { editing } = this.state;

    let children = <TaskForm onSubmit={add} />;

    if (task && editing) {
      children = (
        <TaskForm
          onSubmit={(desc, owner, labels) => edit(task.id, desc, owner, labels)}
          taks={task}
        />
      );
    }

    if (task && !editing) {
      children = <div>{task.data.desc}</div>;
    }

    return <ListItem>{children}</ListItem>;
  }
}

const ListItem = styled.div`
  padding: 15px 25px;
`;

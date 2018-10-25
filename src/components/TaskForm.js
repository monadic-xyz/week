import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Button, Select, Title } from 'elements';
import firebase from 'firestore';
import { colors, extractLabels } from 'utils';

export default class TaskFrom extends Component {
  static defaultProps = {
    task: null,
  };

  static propTypes = {
    employees: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      })
    ).isRequired,
    task: PropTypes.shape({
      id: PropTypes.string,
      desc: PropTypes.string,
      owner: PropTypes.string,
      done: PropTypes.bool,
      archived: PropTypes.bool,
    }),
    toggle: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    const { task } = this.props;
    if (task) {
      this.action = this.editTask;
      this.state = {
        desc: task.data.desc,
        owner: task.data.owner,
      };
    } else {
      this.action = this.addTask;
      this.state = {
        desc: '',
        owner: '',
      };
    }

    this.collection = firebase.firestore().collection('tasks');
  }

  addTask = () => {
    const { desc, owner } = this.state;

    this.collection.add({
      desc,
      owner,
      done: false,
      archived: false,
      createdAt: new Date(),
      labels: extractLabels(desc),
    });
  };

  editTask = () => {
    const { desc, owner } = this.state;
    const { task } = this.props;

    this.collection.doc(task.id).update({
      desc,
      owner,
      labels: extractLabels(desc),
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const { toggle } = this.props;

    this.action();
    toggle();
  };

  updateDescription = e => {
    this.setState({
      desc: e.target.value,
    });
  };

  updateOwner = e => {
    this.setState({
      owner: e.target.value,
    });
  };

  render() {
    const { employees, task } = this.props;
    const { desc, owner } = this.state;

    return (
      <Form onSubmit={this.onSubmit}>
        <Title>{task ? 'Edit Task' : 'Add new task'}</Title>
        <Row>
          <Wrapper>
            <Input
              type="text"
              name="desc"
              placeholder="Add a new task here"
              onChange={this.updateDescription}
              value={desc}
              autoFocus
            />
            <span>for</span>
            <Select
              options={employees.map(employee => employee.name)}
              name="owner"
              onChange={this.updateOwner}
              value={owner}
            />
          </Wrapper>
          <Button type="submit" disabled={!desc || !owner}>
            {task ? 'Edit Task' : 'Add Task'}
          </Button>
        </Row>
        <Info>
          Anything you add between [ ] will be rendered as a label. Label it [demo] and it will show up in the top right
          corner as this weeks' demo.
        </Info>
      </Form>
    );
  }
}

const Form = styled.form`
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 1060px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const Info = styled.p`
  color: ${colors.grey};
  font-size: 14px;
  line-height: 125%;
  margin-top: 24px;
  max-width: 540px;
`;

const Input = styled.input`
  background-color: ${colors.almostWhite};
  border: 1px solid ${colors.lightGrey};
  border-radius: 4px;
  color: ${colors.black};
  flex: 1;
  font-size: 16px;
  height: 36px;
  min-width: 540px;
  padding-left: 12px;
`;

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  padding-right: 24px;

  > span {
    padding: 0 12px;
  }
`;

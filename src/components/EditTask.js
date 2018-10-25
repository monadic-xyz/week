import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Select, Button, Title } from '../elements';
import { colors } from '../utils';

import firebase from '../firestore';

const db = firebase.firestore();

export default class EditTask extends Component {
  static propTypes = {
    desc: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    employees: PropTypes.array.isRequired,
    toggle: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.colRef = db.collection('tasks');
    this.state = {
      desc: '',
      owner: '',
    };
  }

  componentDidMount() {
    const { desc, owner } = this.props;

    this.setState({
      desc,
      owner,
    });
  }

  updateInput = e => {
    this.setState({
      desc: e.target.value,
    });
  };

  updateSelect = e => {
    this.setState({
      owner: e.target.value,
    });
  };

  EditTask = (e, id) => {
    const { desc, owner } = this.state;
    const { toggle } = this.props;
    e.preventDefault();
    db.collection('tasks')
      .doc(`${id}`)
      .update({
        desc,
        owner,
      });
    this.setState({
      desc: '',
      owner: '',
    });
    toggle();
  };

  render() {
    const { desc, owner } = this.state;
    const { id, employees } = this.props;
    return (
      <EditTaskForm onSubmit={e => this.EditTask(e, id)}>
        <Title>Edit task</Title>
        <InputRow>
          <LeftWrapper>
            <TaskInput type="text" name="desc" onChange={this.updateInput} value={desc} autoFocus />
            <span>for</span>
            <Select
              options={employees.map(employee => employee.name)}
              name="owner"
              onChange={this.updateSelect}
              value={owner}
            />
          </LeftWrapper>
          <Button type="submit" disabled={!owner || !desc}>
            Save
          </Button>
        </InputRow>
      </EditTaskForm>
    );
  }
}

const EditTaskForm = styled.form`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  background-color: white;
  max-width: 1060px;
`;
const InputRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const LeftWrapper = styled.div`
  > span {
    padding: 0 12px;
  }
  display: flex;
  flex: 1;
  align-items: center;
  padding-right: 24px;
`;
const TaskInput = styled.input`
  height: 36px;
  font-size: 16px;
  padding-left: 12px;
  flex: 1;
  min-width: 540px;
  border: 1px solid ${colors.lightGrey};
  border-radius: 4px;
  background-color: ${colors.almostWhite};
  color: ${colors.darkGray};
`;

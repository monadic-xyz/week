import React, { Component } from 'react';
import styled from 'styled-components';
import { Select, Button } from '../elements';
import { colors } from '../utils';

import firebase from '../firestore'
const db = firebase.firestore();

export default class Tasks extends Component {
  constructor() {
    super();
    this.colRef = db.collection('tasks');
    this.state = {
      desc: "",
      owner: "",
      done: false,
      archived: false,
      createdAt: "",
    };
  }

  updateInput = e => {
    this.setState({
      desc: e.target.value
    });
  }

  updateSelect = e => {
    this.setState({
      owner: e.target.value
    });
  }

  addTask = e => {
    e.preventDefault();
    db.collection("tasks").add({
      desc: this.state.desc,
      owner: this.state.owner,
      done: this.state.done,
      archived: this.state.archived,
      createdAt: new Date(),
    });
    this.setState({
      desc: "",
      owner: "",
      done: false,
      archived: false,
      createdAt: ""
    });
    this.props.toggle();
  };

  render() {
    const {employees} = this.props;

    return (
      <AddTaskForm onSubmit={this.addTask}>
        <LeftWrapper>
          <TaskInput
            type="text"
            name="desc"
            placeholder="Add a new task here"
            onChange={this.updateInput}
            value={this.state.desc}
            />
          <span>for</span>
          <Select
            options={employees}
            defaultText={"Assign"}
            name="owner"
            onChange={this.updateSelect}
            value={this.state.owner}
            />
        </LeftWrapper>
        <Button
          type="submit"
          disabled={!this.state.owner || !this.state.desc}
        >
          Add task
        </Button>
      </AddTaskForm>
    )
  }
}


const AddTaskForm = styled.form`
  display: flex;
  justify-content: space-between;
  background-color: white;
  max-width: 1060px;
`

const LeftWrapper = styled.div`
  > span {
    padding: 0 12px;
  }
  display: flex;
  flex: 1;
  align-items: center;
  padding-right: 24px;
`
const TaskInput = styled.input`
  height: 36px;
  font-size: 16px;
  padding-left: 12px;
  flex: 1;
  min-width: 540px;
  border: 1px solid ${colors.lightGrey};
  border-radius: 4px;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  background-color: ${colors.almostWhite};
  color: ${colors.darkGray}
`


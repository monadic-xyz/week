import React, { Component } from 'react';
import styled from 'styled-components';
import { Select, Button, Title } from '../elements';
import { colors } from '../utils';

import firebase from '../firestore'
const db = firebase.firestore();

export default class AddTask extends Component {
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
    console.log("empl: ",employees[0].name);


    return (
      <AddTaskForm onSubmit={this.addTask}>
        <Title>Add new task</Title>
        <InputRow>
          <LeftWrapper>
            <TaskInput
              type="text"
              name="desc"
              placeholder="Add a new task here"
              onChange={this.updateInput}
              value={this.state.desc}
              autoFocus
              />
            <span>for</span>
            <Select
              options={employees.map( employee => employee = employee.name)}
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
        </InputRow>
        <InfoText>
          Anything you add between [ ] will be rendered as a label. Label it [demo] and it will show up in the top right corner as this weeks' demo.
        </InfoText>
      </AddTaskForm>
    )
  }
}


const AddTaskForm = styled.form`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  background-color: white;
  max-width: 1060px;
`
const InputRow = styled.div`
 display: flex;
 flex-direction: row;
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
  color: ${colors.black}
`

const InfoText = styled.p`
  margin-top: 24px;
  font-size: 14px;
  line-height: 125%;
  color: ${colors.grey};
  max-width: 540px;
`


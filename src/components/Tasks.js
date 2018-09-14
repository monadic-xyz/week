import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Select, Button } from '../elements';
import TaskListItem from './TaskListItem'

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
      archived: this.state.archived
    });
    this.setState({
      desc: "",
      owner: "",
      done: false,
      archived: false,
    });
  };

  render() {
    const {tasks, employees} = this.props
    return (
      <Fragment>
        <TaskTitle>This weeks' tasks</TaskTitle>
        <Tasklist>
        {tasks && tasks
          .filter(task => task.data.archived === false)
          .map(task => <TaskListItem key={task.id} id={task.id} {...task.data}/>)}
        </Tasklist>
        <AddTaskForm onSubmit={this.addTask}>
          <LeftWrapper>
            <TaskInput
              type="text"
              name="desc"
              placeholder="Describe task"
              onChange={this.updateInput}
              value={this.state.desc}
              />
            <span>for</span>
            <Select
              options={employees}
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
        <TaskTitle>Archived Tasks</TaskTitle>
        <Tasklist>
        {tasks && tasks
          .filter(task => task.data.archived === true)
          .map(task => <TaskListItem key={task.id} id={task.id} {...task.data}/>)}
        </Tasklist>
      </Fragment>
    )
  }
}




const TaskTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  padding: 24px 0;
`
const Tasklist = styled.ul`
  font-size: 16px;
`


const AddTaskForm = styled.form`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
`
const LeftWrapper = styled.div`
  > span {
    padding: 0 12px;
  }
`
const TaskInput = styled.input`
  height: 36px;
  font-size: 16px;
  padding-left: 12px;
`


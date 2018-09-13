import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { colors } from '../utils';
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
    const userRef = db.collection("tasks").add({
      desc: this.state.desc,
      owner: this.state.owner,
      done: this.state.done,
      archived: this.state.archived
    });
    this.setState({
      desc: "",
      owner: "",
      done: false,
      archived: false
    });
  };

  render() {
    const {tasks, employees} = this.props
    return (
      <Fragment>
        <TaskTitle>This weeks' tasks</TaskTitle>
        <Tasklist>
        {tasks && tasks.map(task => <TaskListItem key={task.id} id={task.id} {...task.data}/>)}
        </Tasklist>
        <form onSubmit={this.addTask}>
          <input
            type="text"
            name="desc"
            placeholder="Describe task"
            onChange={this.updateInput}
            value={this.state.desc}
          />
          <span> for </span>
          <Select
            options={employees}
            name="owner"
            onChange={this.updateSelect}
            value={this.state.owner}
          />
          <Button type="submit">Add task</Button>
        </form>
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




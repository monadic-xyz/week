import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { colors } from '../utils';
import { Select, Button } from '../elements';

import firebase from '../firestore'
const db = firebase.firestore();


const TaskListItem = ({desc, owner, done, archived}) => (
  <TaskListItemContainer>
    <TaskBtn done={done} onClick={this.updateTask}>{desc}</TaskBtn>
    <MetaData>
      <Owner>{owner}</Owner>
      <ArchiveBtn>Archive</ArchiveBtn>
    </MetaData>
  </TaskListItemContainer>
)


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

  updateTask = () => {
    console.log("clicked");
    this.setState({
      done: !this.state.done
    });
    const userRef = db.collection("tasks").update({
      done: this.state.done,
    });
    this.setState({
      done: !this.state.done
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
        {tasks && tasks.map(task => <TaskListItem id={task.id} {...task.data}/>)}
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






const TaskListItemContainer = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;;
  &:nth-child(odd) {
    background-color: ${colors.almostWhite};
  }
`

const MetaData = styled.div`
  display: flex;
  flex-direction: row;
`

const Date = styled.p`

`
const Owner = styled.p`
  border: 1px solid RGBA(36, 243, 139, 1.00);
  border-radius: 2px;
  padding: 4px;
  margin-left: 16px;
  background-color: rgba(36, 243, 139, .25);
`
const ArchiveBtn = styled.button`
  background: none;
  color: ${colors.blue};
  margin-left: 16px;
  &:hover {
    text-decoration: underline;
  }
`
const TaskBtn = styled.button`
  background: none;
  &:hover {
    text-decoration: line-through;
  }
  &:active {
    color: ${colors.darkGrey};
  }

  ${({ done }) => done && `
    color: ${colors.grey};
    text-decoration: line-through;
    &:hover {
      color: ${colors.black}
    }
  `}
`


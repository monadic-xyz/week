import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Select, Button } from '../elements';
import { colors } from '../utils';
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
      createdAt: "",
      searchInput: ""
    };
  }

  handleSearch = e => {
    this.setState({
      searchInput: e.target.value
    });
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
  };

  render() {
    const {tasks, employees} = this.props
    return (
      <Fragment>
        <TaskHeader>
          <TaskTitle>This weeks' tasks</TaskTitle>
          <FilterBox
            // onSubmit={this.addTask}
          >
            <LeftWrapper>
              <SearchInput
                type="text"
                name="search"
                placeholder="Search for tasks, labels or people"
                onChange={this.handleSearch}
                value={this.state.searchInput}
                />
            </LeftWrapper>
            <Button
              type="submit"
              // disabled={!this.state.owner || !this.state.desc}
            >
              Add new task
            </Button>
          </FilterBox>
        </TaskHeader>
        <Tasklist>
        {tasks && tasks
          .filter(task => (
            this.state.searchInput === ''
            || task.data.desc.toLowerCase().includes(this.state.searchInput.toLowerCase())
            || task.data.owner.toLowerCase().includes(this.state.searchInput.toLowerCase()
          )))
          .filter(task => task.data.archived === false)
          .sort((a, b) => a.data.desc.toLowerCase() > b.data.desc.toLowerCase())
          .sort((a, b) => (a.data.done === b.data.done)? 0 : a.data.done ? 1 : -1)
          .map(task => <TaskListItem key={task.id} id={task.id} {...task.data}/>)}
        </Tasklist>
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
        <TaskTitle>Archived Tasks</TaskTitle>
        <Tasklist>
          {tasks && tasks
            .filter(task => task.data.archived === true)
            .map(task => <TaskListItem key={task.id} id={task.id} {...task.data}/>)
          }
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
const TaskHeader = styled.div`
`

const FilterBox = styled.form`
  display: flex;
  justify-content: space-between;
  margin: 24px 0;
`

const SearchInput = styled.input`
  font-size: 16px;
  height: 36px;
  padding-left: 16px;
  flex: 1;
  border: 1px solid ${colors.lightGrey};
  border-radius: 4px;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  background-color: ${colors.almostWhite};
  color: ${colors.darkGray}
`
const AddTaskForm = styled.form`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
  margin-bottom: 48px;
  border: 1px solid ${colors.lightGrey};
  border-radius: 4px;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  padding: 24px;
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
  border: 1px solid ${colors.lightGrey};
  border-radius: 4px;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  background-color: ${colors.almostWhite};
  color: ${colors.darkGray}
`


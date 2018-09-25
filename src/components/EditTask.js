import React, { Component } from 'react';
import styled from 'styled-components';
import { Select, Button, Title } from '../elements';
import { colors } from '../utils';

import firebase from '../firestore'
const db = firebase.firestore();

export default class EditTask extends Component {
  constructor() {
    super();
    this.colRef = db.collection('tasks');
    this.state = {
      desc: "",
      owner: "",
    };
  }

  componentDidMount() {
    this.setState({
      desc: this.props.desc,
      owner: this.props.owner,
    })
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

  EditTask = (e, id) => {
    e.preventDefault();
    db.collection("tasks").doc(`${id}`).update({
      desc: this.state.desc,
      owner: this.state.owner,
    });
    this.setState({
      desc: "",
      owner: "",
    });
    this.props.toggle();
  };

  render() {
    const {id, employees} = this.props;
    return (
      <EditTaskForm onSubmit={(e) => this.EditTask(e, id)}>
       <Title>Edit task</Title>
        <InputRow>
          <LeftWrapper>
            <TaskInput
              type="text"
              name="desc"
              onChange={this.updateInput}
              value={this.state.desc}
              autoFocus
              />
            <span>for</span>
            <Select
              options={employees.map( employee => employee = employee.name)}
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
            Save
          </Button>
        </InputRow>
      </EditTaskForm>
    )
  }
}


const EditTaskForm = styled.form`
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
  color: ${colors.darkGray}
`


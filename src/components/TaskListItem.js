import React, { Component } from 'react';
import styled from 'styled-components';
import { colors } from '../utils';

import firebase from '../firestore'
const db = firebase.firestore();


export default class TaskListItem extends Component {
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

  updateTask = (id, done) => {
    var doneUpdate = {}
    doneUpdate = { done: !done};
    db.collection("tasks").doc(`${id}`).update(doneUpdate)
  }
  archiveTask = (id, archived) => {
    var archiveUpdate = {}
    archiveUpdate = { archived: !archived};
    db.collection("tasks").doc(`${id}`).update(archiveUpdate)
  }

  render() {
    const {id, desc, owner, done, archived} = this.props
    return (
      <TaskListItemContainer>
        <TaskBtn done={done} onClick={() => this.updateTask(id, done)}>{desc}</TaskBtn>
        <MetaData>
          <Owner>{owner}</Owner>
          <ArchiveBtn archived={archived} onClick={() => this.archiveTask(id, archived)}>Archive</ArchiveBtn>
        </MetaData>
      </TaskListItemContainer>

    )
  }
}

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
  text-align: left;
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


import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { colors, Toggle, Modal, labelParser } from '../utils';
import EditTask from './EditTask';

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

  completeTask = (id, done) => {
    var doneUpdate = {}
    doneUpdate = { done: !done};
    db.collection("tasks").doc(`${id}`).update(doneUpdate)
  }
  archiveTask = (id, archived) => {
    var archiveUpdate = {}
    archiveUpdate = { archived: !archived};
    db.collection("tasks").doc(`${id}`).update(archiveUpdate)
  }
  deleteTask = (id) => {
    db.collection("tasks").doc(`${id}`).delete()
    .then(function() {
      console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
  }

  render() {
    const {id, desc, owner, done, archived} = this.props
    return (
      <TaskListItemContainer>
        <Task done={done} onClick={() => this.completeTask(id, done)}>
          {desc && labelParser(desc)}
        </Task>
        <MetaData>
          {/* <Timestamp time={createdAt.seconds} /> */}
          <Owner>{owner}</Owner>
            { !archived
              ?
              <Toggle>
                {({on, toggle}) => (
                  <Fragment>
                    <ActionBtn
                      archived={archived}
                      onClick={toggle}
                    >
                      Edit
                    </ActionBtn>
                    <Modal on={on} toggle={toggle}>
                      <EditTask
                        desc={desc}
                        owner={owner}
                        id={id}
                        employees={this.props.employees}
                        toggle={toggle}
                      />
                    </Modal>
                  </Fragment>
                )}
              </Toggle>
              :
              <ActionBtn
                onClick={() => this.deleteTask(id)}
              >
                Delete
              </ActionBtn>
            }
          <ActionBtn
            archived={archived}
            onClick={() => this.archiveTask(id, archived)}
          >
            {archived ? "Unarchive" : "Archive"}
          </ActionBtn>
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
  padding: 16px;
  &:nth-child(odd) {
    background-color: ${colors.almostWhite};
  }
`
const Task = styled.button`
  background: none;
  text-align: left;
  &:hover {
    text-decoration: line-through;
    cursor: pointer;
  }
  &:active {
    color: ${colors.darkGrey};
  }
  &:focus {
    outline: 0;
  }

  ${({ done }) => done && `
    color: ${colors.grey};
    text-decoration: line-through;
    &:hover {
      color: ${colors.black}
    }
  `}
`
const MetaData = styled.div`
  display: flex;
  flex-direction: row;
`
const Owner = styled.p`
  border-radius: 2px;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  color: white;
  padding: 4px;
  margin-left: 16px;
  background-color: ${colors.green};
  /* opacity: .75; */
  font-weight: bold;
  font-size: 14px;
`
const ActionBtn = styled.button`
  background: none;
  color: ${colors.blue};
  margin-left: 16px;
  &:hover {
    text-decoration: underline;
  }
`
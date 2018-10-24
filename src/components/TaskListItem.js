import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import Label from '../elements/Label';
import { colors, Toggle, Modal, labelParser, media } from '../utils';
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
    const {id, desc, owner, done, archived, onLabelPress} = this.props
    return (
      <TaskListItemContainer>
        <Task done={done} onClick={() => this.completeTask(id, done)}>
          {desc && labelParser(desc)}
        </Task>
        <MetaData>
          <OwnerLabel
            backgroundColor={colors.lightGrey}
            onClick={() => onLabelPress()}
            bold
            color={colors.black}>
            {owner}
          </OwnerLabel>
          <div>
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
          </div>
        </MetaData>
      </TaskListItemContainer>

    )
  }
}

const TaskListItemContainer = styled.li`
  padding: 24px;
  border: 1px solid ${colors.lightGrey};
  border-radius: 4px;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  margin: 0;
  ${media.wide`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    max-width: 100%;
    margin: 0;
    border: none;
    border-radius: none;
    -webkit-border-radius: none;
    -moz-border-radius: none;
    padding: 16px;
    &:nth-child(odd) {
      background-color: ${colors.almostWhite};
    }
  `}
  ${media.tablet`
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    border: 1px solid ${colors.lightGrey};
    border-radius: 4px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    &:nth-child(odd) {
      background-color: white;
    }
  `}
`
const Task = styled.button`
  align-items: baseline;
  background: none;
  display: flex;
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
  align-items: baseline;
  display: flex;
  flex-direction: row;
  margin-left: 0;
  margin-top: 24px;
  justify-content: space-between;
  align-self: flex-end;
  ${media.wide`
    margin-left: 16px;
    margin-top: 0;
  `}
  ${media.tablet`
    margin-left: 0
    margin-top: 24px;
  `}
`

const ActionBtn = styled.button`
  background: none;
  color: ${colors.blue};
  margin-left: 16px;
  &:hover {
    text-decoration: underline;
  }
`
const OwnerLabel = styled(Label)`
  &:hover {
    cursor: pointer;
  }
`
import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Button, Title } from '../elements';
import { colors, Modal, Toggle, media } from '../utils';
import TaskListItem from './TaskListItem'
import AddTask from './AddTask'

export default class Tasks extends Component {
  constructor() {
    super();
    this.state = {
      searchInput: ""
    };
  }

  handleSearch = e => {
    this.setState({
      searchInput: e.target.value
    });
  }

  render() {
    const {tasks} = this.props
    return (
      <Fragment>
        <SectionTitle>This weeks' tasks</SectionTitle>
        <FilterBox>
          <SearchInput
            type="text"
            name="search"
            placeholder="Search for tasks, labels or people"
            onChange={this.handleSearch}
            value={this.state.searchInput}
          />
          <Toggle>
            {({on, toggle}) => (
              <Fragment>
                <AddButton
                  onClick={toggle}
                >
                  Add new task
                </AddButton>
                <Modal on={on} toggle={toggle}>
                  <AddTask {...this.props} toggle={toggle}/>
                </Modal>
              </Fragment>
            )}
          </Toggle>
        </FilterBox>
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
            .map(task => <TaskListItem employees={this.props.employees} key={task.id} id={task.id} {...task.data}/>)
          }
        </Tasklist>
        <SectionTitle>Archived Tasks</SectionTitle>
        <Tasklist>
          {tasks && tasks
            .filter(task => (
              this.state.searchInput === ''
              || task.data.desc.toLowerCase().includes(this.state.searchInput.toLowerCase())
              || task.data.owner.toLowerCase().includes(this.state.searchInput.toLowerCase()
            )))
            .filter(task => task.data.archived === true)
            .sort((a, b) => a.data.desc.toLowerCase() > b.data.desc.toLowerCase())
            .sort((a, b) => (a.data.done === b.data.done)? 0 : a.data.done ? 1 : -1)
            .map(task => <TaskListItem key={task.id} id={task.id} {...task.data}/>)
          }
        </Tasklist>
      </Fragment>
    )
  }
}


const SectionTitle = styled(Title)`
  margin-top: 48px;
`
const Tasklist = styled.ul`
  display: grid;
  grid-column-gap: 24px;
  grid-row-gap: 24px;
  grid-template-columns: repeat(4, 1fr);
  ${media.extraWide`
    grid-template-columns: repeat(3, 1fr);
  `}
  ${media.wide`
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    grid-row-gap: 0;
  `}
  ${media.tablet`
    display: grid;
    grid-column-gap: 0;
    grid-row-gap: 24px;
    grid-template-columns: 1fr;
  `}
`

const FilterBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 24px 0;
  position: sticky;
  top: 0;
  background-color: white;
  ${media.tablet`
    flex-direction: column;
  `}
`

const SearchInput = styled.input`
  font-size: 16px;
  height: 36px;
  padding-left: 16px;
  margin-right: 24px;
  flex: 1;
  border: 1px solid ${colors.lightGrey};
  border-radius: 4px;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  background-color: ${colors.almostWhite};
  color: ${colors.darkGrey};
  max-width: 960px;
  ${media.tablet`
    margin-right: 0;
    margin-bottom: 16px;
    padding: 9px 16px;
  `}
`

const AddButton = styled(Button)`
  ${media.tablet`
    width: 100%;
  `}
`

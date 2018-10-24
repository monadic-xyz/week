import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Button, Title } from '../elements';
import { colors, Modal, Toggle, media } from '../utils';
import TaskListItem from './TaskListItem'
import AddTask from './AddTask'

export default class Tasks extends Component {
  state = {
    searchInput: "",
    openTasks: true,
  };

  toggleOpenTasks = () => {
    this.setState(prevState => ({
      openTasks: !prevState.openTasks
    }));
  }

  handleSearch = e => {
    this.setState({
      searchInput: e.target.value
    });
  }

  handleLabelSearch = label => {
    this.setState({
      searchInput: label
    });
  }


  render() {
    const {tasks} = this.props;
    const {openTasks} = this.state;
    return (
      <Fragment>
        <TitleContainer>
          <Title>{openTasks ? 'This weeks\' tasks' : 'Archived Tasks'}</Title>
          <Nav>
            <Option on={openTasks} onClick={() => this.toggleOpenTasks()}>Open</Option>
            <Option on={!openTasks} onClick={() => this.toggleOpenTasks()}>Archived</Option>
          </Nav>
        </TitleContainer>
        <FilterBox>
          <SearchInput
            type="search"
            name="search"
            placeholder="Search for tasks, labels or people"
            onChange={this.handleSearch}
            value={this.state.searchInput}
          />
          {openTasks &&
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
          }
        </FilterBox>
        <Tasklist>
          {tasks && tasks
            .filter(task => (
              this.state.searchInput === ''
              || task.data.desc.toLowerCase().includes(this.state.searchInput.toLowerCase())
              || task.data.owner.toLowerCase().includes(this.state.searchInput.toLowerCase()
            )))
            .filter(task => task.data.archived === !openTasks)
            .sort((a, b) => a.data.desc.toLowerCase() > b.data.desc.toLowerCase())
            .sort((a, b) => (a.data.done === b.data.done)? 0 : a.data.done ? 1 : -1)
            .map(task => <TaskListItem onLabelPress={() => this.handleLabelSearch(task.data.owner)} employees={this.props.employees} key={task.id} id={task.id} {...task.data}/>)
          }
        </Tasklist>
      </Fragment>
    )
  }
}


const TitleContainer = styled.div`
  margin: 48px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
const Nav = styled.div`
  border-radius: 4px;
  border: 1px solid ${colors.lightGrey};
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 36px;
`
const Option = styled.span`
  &:hover {
    cursor: pointer;
  }
  ${({ on }) =>
    on &&
    `
    background-color: ${colors.blue};
    color: white;
    font-weight: bold;
  `};
  padding: 10px 16px;
  display: flex;
  align-self: center;
  border-top-left-radius: 4px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 4px;
  &:nth-child(even) {
    border-top-left-radius: 0px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 0px;

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
  padding-bottom: 24px;
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

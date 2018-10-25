import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { TaskContext } from 'providers/TaskProvider';
import { Button, Title, Nav } from 'elements';
import { colors, Modal, Toggle, media } from 'utils';
import AddTask from 'components/AddTask';
import TaskListItem from 'components/TaskListItem';

export default class Tasks extends Component {
  state = {
    searchInput: '',
    activeTab: 'Open',
  };

  filterTasks = tasks =>
    tasks.filter(task => {
      const { searchInput } = this.state;

      return (
        searchInput === '' ||
        task.data.desc.toLowerCase().includes(searchInput.toLowerCase()) ||
        task.data.owner.toLowerCase().includes(searchInput.toLowerCase())
      );
    });

  setActiveTab = option => {
    this.setState({ activeTab: option });
  };

  handleSearch = e => {
    this.setState({
      searchInput: e.target.value,
    });
  };

  handleLabelSearch = label => {
    this.setState({
      searchInput: label,
    });
  };

  render() {
    const { activeTab, searchInput } = this.state;

    return (
      <TaskContext.Consumer>
        {tasks => (
          <Fragment>
            <TitleContainer>
              <Title>{activeTab === 'Open' ? "This weeks' tasks" : 'Archived Tasks'}</Title>
              <Nav
                onOptionClick={option => {
                  this.setActiveTab(option);
                  tasks.changeFilters([['archived', '==', option === 'Archived']]);
                }}
                options={['Open', 'Archived']}
                activeOption={activeTab}
              />
            </TitleContainer>
            <FilterBox>
              <SearchInput
                type="search"
                name="search"
                placeholder="Search for tasks, labels or people"
                onChange={this.handleSearch}
                value={searchInput}
              />
              {activeTab === 'Open' && (
                <Toggle>
                  {({ on, toggle }) => (
                    <Fragment>
                      <AddButton onClick={toggle}>Add new task</AddButton>
                      <Modal on={on} toggle={toggle}>
                        <AddTask {...this.props} toggle={toggle} />
                      </Modal>
                    </Fragment>
                  )}
                </Toggle>
              )}
            </FilterBox>
            <Tasklist>
              {tasks.tasks &&
                this.filterTasks(tasks.tasks).map(task => {
                  const { employees } = this.props;
                  return (
                    <TaskListItem
                      onLabelPress={() => this.handleLabelSearch(task.data.owner)}
                      employees={employees}
                      key={task.id}
                      id={task.id}
                      {...task.data}
                    />
                  );
                })}
            </Tasklist>
          </Fragment>
        )}
      </TaskContext.Consumer>
    );
  }
}

const TitleContainer = styled.div`
  margin: 48px 0 24px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

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
`;

const FilterBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 24px 0;
  position: sticky;
  top: 0;
  background-color: white;
  ${media.tablet`
    flex-direction: column;
  `};
`;

const SearchInput = styled.input`
  font-size: 16px;
  height: 36px;
  padding-left: 12px;
  flex: 1;
  appearance: none;
  border: 1px solid ${colors.lightGrey};
  border-radius: 4px;
  background-color: ${colors.almostWhite};
  color: ${colors.darkGrey};
  max-width: 960px;
  ${media.tablet`
    margin-right: 0;
    margin-bottom: 16px;
    padding: 9px 16px;
  `};
`;

const AddButton = styled(Button)`
  margin-left: 24px;
  ${media.tablet`
    width: 100%;
  `};
`;

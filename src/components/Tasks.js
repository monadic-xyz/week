import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Select, Button } from '../elements';


const TaskListItem = () => (
  <TaskListItemContainer>
    <span>Task description</span> for <span>Julien</span> - created: 2 weeks ago
  </TaskListItemContainer>
)

const TaskListItemContainer = styled.li`
  padding-bottom: 12px;

`

export default ({employees}) => (
  <Fragment>
    <TaskTitle>This weeks' tasks</TaskTitle>
    <Tasklist>
      <TaskListItem />
      <TaskListItem />
      <TaskListItem />
    </Tasklist>
    <form>
      <input type="text" name="email" placeholder="New task" />
      <span> for </span>
      <Select options={employees} />
      <Button CTA="Add task" />
    </form>
  </Fragment>
)

const TaskTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  padding: 24px 0;
`
const Tasklist = styled.ul`
  font-size: 16px;
`

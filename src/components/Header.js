import React, { Component } from 'react';
import styled from 'styled-components';
import { colors } from 'utils';
import { TaskContext } from 'providers/TaskProvider';

Date.prototype.getWeek = function() {
  const date = new Date(this.getTime());
  date.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
  // January 4 is always in week 1.
  const week1 = new Date(date.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7);
};
const today = new Date();

export default class Header extends Component {
  static contextType = TaskContext;

  filterDemoTask() {
    const { tasks } = this.context;
    if (tasks.length === 0) {
      return { desc: null, owner: null };
    }

    const filtered = tasks
      .filter(task => task.data.desc.includes('[demo]') && !task.data.archived && !task.data.done)
      .map(task => ({
        desc: task.data.desc,
        owner: task.data.owner,
      }));

    if (filtered.length === 0) {
      return { desc: null, owner: null };
    }

    return filtered[0];
  }

  render() {
    const { desc, owner } = this.filterDemoTask();

    return (
      <Container>
        <WeekNumber>Week {today.getWeek()}</WeekNumber>
        {desc && (
          <DemoContainer>
            <DemoLabel>demo</DemoLabel>
            <span>
              {desc.replace(/ *\[[^)]*\] */g, '')} by {owner}
            </span>
          </DemoContainer>
        )}
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 24px;
`;
const DemoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const WeekNumber = styled.h2`
  font-size: 24px;
  font-weight: bold;
`;
const DemoLabel = styled.h4`
  background-color: ${colors.pink};
  display: inline-block;
  padding: 4px;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px;
  color: ${colors.white};
  font-family: monospace;
  font-size: 14px;
  margin-right: 4px;
`;

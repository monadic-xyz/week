import React from 'react';
import styled from 'styled-components';
import { Select } from '../elements';

Date.prototype.getWeek = function() {
  var date = new Date(this.getTime());
   date.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  // January 4 is always in week 1.
  var week1 = new Date(date.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
}
const today = new Date();

export default ({employees}) => (
  <Header>
    <WeekNumber>Week {today.getWeek()}</WeekNumber>
    <div>
      <span>Demo: </span>
      <Select options={employees} />
    </div>
  </Header>
)

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 24px;
`
const WeekNumber = styled.h2`
  font-size: 24px;
  font-weight: bold;
`
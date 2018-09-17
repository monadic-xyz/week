import React from 'react';
import styled from 'styled-components';
import {colors} from '../utils';

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


export default ({owner, desc}) => (
  <Header>
    <WeekNumber>Week {today.getWeek()}</WeekNumber>
    {
      desc &&
      <DemoContainer>
        <DemoLabel>demo</DemoLabel>
        <Topic>{desc.replace(/ *\[[^)]*\] */g, "")} by {owner}</Topic>
      </DemoContainer>
    }
  </Header>
)

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 24px;
`
const DemoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
const WeekNumber = styled.h2`
  font-size: 24px;
  font-weight: bold;
`
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
`
const Topic = styled.span`

`
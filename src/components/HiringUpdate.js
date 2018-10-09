import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Select, Button } from '../elements';

const HiringUpdate = () => (
  <Fragment>
    <HiringTitle>Hiring Update</HiringTitle>
    <HiringList>
      <HiringListItem>Person name + next step</HiringListItem>
      <HiringListItem>Person name + next step</HiringListItem>
      <HiringListItem>Person name + next step</HiringListItem>
      <HiringListItem>Person name + next step</HiringListItem>
      <HiringListItem>Person name + next step</HiringListItem>
    </HiringList>
    <form>
      <input type="text" name="email" placeholder="New person" />
      <span> process: </span>
      <Select options={['reach out', 'interested', 'interviewing', 'Offer made', 'Pass']} />
      <Button CTA="Add person" />
    </form>
  </Fragment>
);

const HiringTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  padding: 24px 0;
`;
const HiringList = styled.ul`
  font-size: 16px;
`;
const HiringListItem = styled.li``;

export default HiringUpdate;

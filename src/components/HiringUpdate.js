import React from 'react';
import styled from 'styled-components';
import { Select, Button } from '../elements';

export default () => (
  <>
    <HiringTitle>Hiring Update</HiringTitle>
    <HiringList>
      <li>Person name + next step</li>
      <li>Person name + next step</li>
      <li>Person name + next step</li>
      <li>Person name + next step</li>
      <li>Person name + next step</li>
    </HiringList>
    <form>
      <input type="text" name="email" placeholder="New person" />
      <span> process: </span>
      <Select options={['reach out', 'interested', 'interviewing', 'Offer made', 'Pass']} />
      <Button CTA="Add person" />
    </form>
  </>
);

const HiringTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  padding: 24px 0;
`;
const HiringList = styled.ul`
  font-size: 16px;
`;

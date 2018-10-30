import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { colors } from 'styles';

export default () => (
  <Nav>
    <NavItem activeClassName="active" to="/tasks/open">
      Open
    </NavItem>
    <NavItem activeClassName="active" to="/tasks/archived">
      Archived
    </NavItem>{' '}
  </Nav>
);

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
`;
const NavItem = styled(NavLink)`
  font-size: 18px;
  &:nth-child(1) {
    margin-right: 24px;
  }
  color: ${colors.grey};
  &.active {
    font-family: GTAmericaMonoMedium, monospace;
    color: ${colors.blue};
  }
`;

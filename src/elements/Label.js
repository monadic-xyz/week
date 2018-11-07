import styled from 'styled-components';

import { lightGrey, darkGrey } from 'styles';

export default styled.button`
  background-color: ${props => props.backgroundColor || lightGrey};
  color: ${props => props.color || darkGrey};
  border-radius: 2px;
  height: 24px;
  padding: 1px 6px 4px 6px;
  display: inline-block;
  margin-left: 8px;
  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
  &:hover {
    cursor: pointer;
  }
  ${({ done }) =>
    done &&
    `
    opacity: .5;
  `};
`;

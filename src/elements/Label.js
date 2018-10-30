import styled from 'styled-components';

import { lightGrey, darkGrey } from 'styles';

export default styled.button`
  background-color: ${props => props.backgroundColor || lightGrey};
  color: ${props => props.color || darkGrey};
  border-radius: 2px;
  height: 24px;
  padding: 1px 6px 5px 6px;
  display: inline-block;
  &:hover {
    cursor: pointer;
  }
  ${({ done }) =>
    done &&
    `
    opacity: .5;
  `};
`;

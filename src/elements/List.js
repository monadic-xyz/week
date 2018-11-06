import styled from 'styled-components';

import { colors } from 'styles';

export default styled.ul`
  list-style: none;
  > li {
    border-radius: 4px;
    &:nth-child(odd) {
      background-color: ${colors.almostWhite};
    }
  }
`;

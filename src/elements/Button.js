import styled from 'styled-components';

import { colors } from 'styles';

export default styled.button`
  height: 34px;
  padding: 0px 12px 4px 12px;
  border: 2px solid ${colors.blue};
  color: ${colors.blue};
  border-radius: 4px;
  font-family: GTAmericaMonoMedium, monospace;
  cursor: pointer;
  &:disabled,
  &[disabled] {
    cursor: default;
    border-color: ${colors.lightGrey};
    color: ${colors.lightGrey};
  }
`;

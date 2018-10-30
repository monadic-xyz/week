import styled from 'styled-components';

import { lightGrey, darkGrey } from 'styles';

export default styled.span`
  background-color: ${props => props.backgroundColor || lightGrey};
  color: ${props => props.color || darkGrey};
  border-radius: 2px;
  height: 24px;
  padding: 1px 6px;
`;

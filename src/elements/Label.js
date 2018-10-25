import styled from 'styled-components';
import { white, yellow } from '../utils/colors';

export default styled.span`
  background-color: ${props => props.backgroundColor || yellow};
  color: ${props => props.color || white};
  border-radius: 2px;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  font-family: sans-serif;
  font-size: 14px;
  ${({ monospace }) =>
    monospace &&
    `
    font-family: 'Inconsolata', monospace;
    font-size: 16px;
  `};

  font-weight: ${props => (props.bold ? 'bold' : 'normal')};
  margin: 0px 4px;
  padding: ${props => (props.bold ? '6px' : '3px 6px 4px 6px')};
`;

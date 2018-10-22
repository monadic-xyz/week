import styled from 'styled-components';
import colors from '../utils/colors';

export default styled.span`
  background-color: ${props => props.backgroundColor || colors.yellow};
  color: ${props => props.color || colors.white};
  border-radius: 2px;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  font-family: ${props => props.monospace ? 'monospace' : 'sans-serif'};
  font-size: 14px;
  font-weight: ${props => props.bold ? 'bold' : 'normal'};
  margin: 0px 4px;
  padding: ${props => props.bold ? '8px 7px 5px 7px' : '7px 5px 3px 5px'};
`
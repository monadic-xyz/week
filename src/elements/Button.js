// import React from 'react';
import styled from 'styled-components';
import { colors } from '../utils';

export default styled.button`
  height: 36px;
  width: 160px;
  font-size: 16px;
  font-weight: bold;
  background-color: ${colors.blue};
  color: ${colors.white};
  border-radius: 4px;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  -webkit-transition-duration: 0.2s;
	-moz-transition-duration: 0.2s;
	transition-duration: 0.2s;
  &:hover {
    background-color: ${colors.darkBlue};
  }
  &:active {
    -webkit-box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.1);
	  -moz-box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.1);
	  box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.1);
  }
`
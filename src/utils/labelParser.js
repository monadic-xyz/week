import React, { Fragment } from 'react';
import styled from 'styled-components';
import colors from './colors';

export default (desc) => {
  if (desc.includes('[demo]')) {
    const parts = desc.split(/\[(.*?)\]/);
    for (var i = 1; i < parts.length; i += 2) {
      parts[i] = <Label pink key={i}>{parts[i]}</Label>
    }
    return <Fragment>{parts}</Fragment>;
  } else {
    const parts = desc.split(/\[(.*?)\]/);
    for (i = 1; i < parts.length; i += 2) {
      parts[i] = <Label key={i}>{parts[i]}</Label>
    }
    return <Fragment>{parts}</Fragment>;
  }
}

const Label = styled.span`
  background-color: ${props => props.pink ? colors.pink : colors.yellow};
  display:inline-block;
  padding: 4px;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px;
  color: ${props => props.pink ? colors.white : colors.black};
  font-family: monospace;
  font-size: 14px;
  margin-left: 4px;
`
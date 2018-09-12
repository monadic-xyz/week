import React from 'react';
import styled from 'styled-components';


export default ({options}) => (
  <Select>
    {options.map( option => <option value={option}>{option}</option>)}
  </Select>
)

const Select = styled.select`
  height: 32px;
  width: 120px;
  font-size: 14px;
  &:focus {
    font-size: 14px;
  }
`
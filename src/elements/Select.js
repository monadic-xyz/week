import React from 'react';
import styled from 'styled-components';


export default ({options, onChange, value}) => (
  <Select onChange={onChange} value={value}>
    {options.map( option => <option key={option} value={option}>{option}</option>)}
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
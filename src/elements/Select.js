import React from 'react';
import styled from 'styled-components';


export default ({options, onChange, value, defaultText}) => (
  <Select onChange={onChange} value={value}>
    {
      (defaultText && defaultText !== "") ? <option key={defaultText} value={defaultText}>{defaultText}</option> : null
    }
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
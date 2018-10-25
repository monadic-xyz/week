import React from 'react';
import styled from 'styled-components';
import { colors } from '../utils';

const Nav = ({activeOption, options, onOptionClick}) => (
  <NavContainer>
    {options.map((option) => (
      <Option
        active={activeOption === option}
        key={option.toLowerCase()}
        onClick={() => onOptionClick(option)}
      >
        {option}
      </Option>
      ))
    }
  </NavContainer>
);

export default Nav;

const NavContainer = styled.div`
  border-radius: 4px;
  border: 1px solid ${colors.lightGrey};
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 36px;
`
const Option = styled.span`
  &:hover {
    cursor: pointer;
  }
  ${({ active }) =>
    active &&
    `
    background-color: ${colors.pink};
    color: white;
    font-weight: bold;
  `};
  padding: 10px 16px;
  display: flex;
  align-self: center;
  border-top-left-radius: 4px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 4px;
  &:nth-child(even) {
    border-top-left-radius: 0px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 0px;
`
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Select = ({ options, onChange, value, defaultText }) => (
  <SelectContainer onChange={onChange} value={value}>
    {defaultText && defaultText !== '' ? (
      <option key={defaultText} value={defaultText}>
        {defaultText}
      </option>
    ) : null}
    {options.map(option => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </SelectContainer>
);

Select.defaultProps = {
  value: '',
  defaultText: '',
};
Select.propTypes = {
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  defaultText: PropTypes.string,
};

export default Select;

const SelectContainer = styled.select`
  height: 32px;
  width: 120px;
  font-size: 14px;
  &:focus {
    font-size: 14px;
  }
`;

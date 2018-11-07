import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import colors, { lightGrey } from 'styles/colors';
import { CrossIcon } from 'elements/icons';

const FilterLabel = ({ owner, text }) => {
  const labelBGColor = colors.strToHex(text);
  return (
    <Container
      onClick={() => null}
      color={colors.invertColor(labelBGColor, true)}
      backgroundColor={owner ? lightGrey : labelBGColor}
    >
      <span>{text}</span>
      <CrossIcon color={colors.invertColor(labelBGColor, true)} />
    </Container>
  );
};

export default FilterLabel;

FilterLabel.defaultProps = {
  owner: false,
};

FilterLabel.propTypes = {
  owner: PropTypes.bool,
  text: PropTypes.string.isRequired,
};

const Container = styled.button`
  display: grid;
  grid-template-columns: auto 16px;
  grid-column-gap: 6px;
  align-items: center;
  background-color: ${props => props.backgroundColor};
  border-radius: 2px;
  height: 24px;
  padding: 0px 6px;
  margin-right: 8px;
  > span {
    color: ${props => props.color};
    padding-bottom: 5px;
    white-space: nowrap;
  }
  &:hover {
    cursor: pointer;
  }
`;

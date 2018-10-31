import React from 'react';
import PropTypes from 'prop-types';

import { colors } from 'styles';

const CheckIcon = ({ color }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="13" cy="13" r="10" stroke={color} strokeWidth="2" />
  </svg>
);

CheckIcon.defaultProps = {
  color: colors.grey,
};
CheckIcon.propTypes = {
  color: PropTypes.string,
};

export default CheckIcon;

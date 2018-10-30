import React from 'react';
import PropTypes from 'prop-types';

import { colors } from 'styles';

const CheckIcon = ({ color }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="11" stroke={color} strokeWidth="2" />
  </svg>
);

CheckIcon.defaultProps = {
  color: colors.grey,
};
CheckIcon.propTypes = {
  color: PropTypes.string,
};

export default CheckIcon;

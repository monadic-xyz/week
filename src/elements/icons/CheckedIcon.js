import React from 'react';
import PropTypes from 'prop-types';

import { colors } from 'styles';

const CheckedIcon = ({ color }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill={color} />
    <path
      d="M7 13.5L10 16.5L17.5 9"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

CheckedIcon.defaultProps = {
  color: colors.grey,
};
CheckedIcon.propTypes = {
  color: PropTypes.string,
};

export default CheckedIcon;

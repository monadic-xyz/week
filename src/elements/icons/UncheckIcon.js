import React from 'react';
import PropTypes from 'prop-types';

import { colors } from 'styles';

const UncheckIcon = ({ color }) => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="12" fill={color} />
    <path
      d="M7 13.5L10 16.5L17.5 9"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

UncheckIcon.defaultProps = {
  color: colors.grey,
};
UncheckIcon.propTypes = {
  color: PropTypes.string,
};

export default UncheckIcon;

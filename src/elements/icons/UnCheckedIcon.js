import React from 'react';
import PropTypes from 'prop-types';

import { colors } from 'styles';

const UnCheckedIcon = ({ color }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" />
  </svg>
);

UnCheckedIcon.defaultProps = {
  color: colors.grey,
};
UnCheckedIcon.propTypes = {
  color: PropTypes.string,
};

export default UnCheckedIcon;

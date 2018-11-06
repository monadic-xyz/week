import React from 'react';
import PropTypes from 'prop-types';

import { colors } from 'styles';

const PlusIcon = ({ color }) => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <rect x="11" y="3" width="2" height="18" rx="1" fill={color} />
    <rect
      x="3"
      y="13"
      width="2"
      height="18"
      rx="1"
      transform="rotate(-90 3 13)"
      fill={color}
    />
  </svg>
);

PlusIcon.defaultProps = {
  color: colors.grey,
};
PlusIcon.propTypes = {
  color: PropTypes.string,
};

export default PlusIcon;

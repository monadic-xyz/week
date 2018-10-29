import React from 'react';
import PropTypes from 'prop-types';

import { colors } from 'styles';

const EditIcon = ({ color }) => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <rect
      x="17.7279"
      y="19.142"
      width="18"
      height="2"
      rx="1"
      transform="rotate(-135 17.7279 19.142)"
      fill={color}
    />
  </svg>
);

EditIcon.defaultProps = {
  color: colors.grey,
};
EditIcon.propTypes = {
  color: PropTypes.string,
};

export default EditIcon;

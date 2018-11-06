import React from 'react';
import PropTypes from 'prop-types';

import { colors } from 'styles';

const ArchiveIcon = ({ color }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M20 13C20 12.4477 19.5523 12 19 12C18.4477 12 18 12.4477 18 13H20ZM6 13C6 12.4477 5.55228 12 5 12C4.44772 12 4 12.4477 4 13H6ZM17 17H7V19H17V17ZM18 13V16H20V13H18ZM6 16V13H4V16H6ZM7 17C6.44772 17 6 16.5523 6 16H4C4 17.6569 5.34315 19 7 19V17ZM17 19C18.6569 19 20 17.6569 20 16H18C18 16.5523 17.5523 17 17 17V19Z"
      fill={color}
    />
    <path
      d="M7 6L12 11L17 6"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

ArchiveIcon.defaultProps = {
  color: colors.grey,
};
ArchiveIcon.propTypes = {
  color: PropTypes.string,
};

export default ArchiveIcon;

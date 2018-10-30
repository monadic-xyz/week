import React from 'react';
import PropTypes from 'prop-types';

import { colors } from 'styles';

const CloseIcon = ({ color }) => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.9388 19.1141C18.3948 19.5654 19.1342 19.5654 19.5902 19.1141C20.0462 18.6628 20.0462 17.9311 19.5902 17.4798L13.8932 11.842L19.2726 6.51843C19.7286 6.06714 19.7286 5.33544 19.2726 4.88414C18.8165 4.43284 18.0772 4.43284 17.6212 4.88414L12.2418 10.2077L6.37881 4.40547C5.92278 3.95418 5.18341 3.95418 4.72739 4.40547C4.27136 4.85677 4.27136 5.58847 4.72739 6.03976L10.5904 11.842L4.40977 17.9585C3.95374 18.4098 3.95374 19.1415 4.40977 19.5928C4.8658 20.0441 5.60516 20.0441 6.06119 19.5928L12.2418 13.4762L17.9388 19.1141Z"
      fill={color}
    />
  </svg>
);

CloseIcon.defaultProps = {
  color: colors.grey,
};
CloseIcon.propTypes = {
  color: PropTypes.string,
};

export default CloseIcon;

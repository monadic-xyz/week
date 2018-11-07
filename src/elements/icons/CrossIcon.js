import React from 'react';
import PropTypes from 'prop-types';

import { colors } from 'styles';

const CrossIcon = ({ color }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.8239 4.17599C11.5893 3.94134 11.2088 3.94134 10.9742 4.17599L7.99997 7.15018L5.02585 4.17605C4.79119 3.94139 4.41073 3.94139 4.17608 4.17605C3.94142 4.41071 3.94142 4.79116 4.17608 5.02582L7.1502 7.99995L4.17599 10.9742C3.94134 11.2088 3.94134 11.5893 4.17599 11.8239C4.41065 12.0586 4.79111 12.0586 5.02576 11.8239L7.99997 8.84972L10.9742 11.824C11.2089 12.0586 11.5894 12.0586 11.824 11.824C12.0587 11.5893 12.0587 11.2089 11.824 10.9742L8.84974 7.99995L11.8239 5.02576C12.0586 4.79111 12.0586 4.41065 11.8239 4.17599Z"
      fill={color}
    />
  </svg>
);

CrossIcon.defaultProps = {
  color: colors.darkGrey,
};
CrossIcon.propTypes = {
  color: PropTypes.string,
};

export default CrossIcon;

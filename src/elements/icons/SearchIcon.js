import React from 'react';
import PropTypes from 'prop-types';

import { colors } from 'styles';

const SearchIcon = ({ color }) => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19 10C19 12.7614 16.7614 15 14 15C11.2385 15 8.99997 12.7614 8.99997 10C8.99997 7.23858 11.2385 5 14 5C16.7614 5 19 7.23858 19 10ZM21 10C21 13.866 17.866 17 14 17C12.4019 17 10.9289 16.4645 9.7506 15.5631L5.12129 20.1924C4.73077 20.5829 4.0976 20.5829 3.70708 20.1924C3.31655 19.8019 3.31655 19.1687 3.70708 18.7782L8.35081 14.1344C7.50151 12.976 6.99997 11.5465 6.99997 10C6.99997 6.13401 10.134 3 14 3C17.866 3 21 6.13401 21 10Z"
      fill={color}
    />
  </svg>
);

SearchIcon.defaultProps = {
  color: colors.grey,
};
SearchIcon.propTypes = {
  color: PropTypes.string,
};

export default SearchIcon;

import React from 'react';
import PropTypes from 'prop-types';

const ListItem = ({ desc }) => <div>{desc}</div>;

ListItem.propTypes = {
  desc: PropTypes.string.isRequired,
};

export default ListItem;

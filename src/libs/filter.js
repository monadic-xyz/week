import PropTypes from 'prop-types';
import queryString from 'query-string';

import { NullableBool, NullableString } from 'libs/props';

export const FilterProp = PropTypes.exact({
  archived: PropTypes.bool.isRequired,
  done: NullableBool,
  label: PropTypes.arrayOf(PropTypes.string).isRequired,
  owner: NullableString,
  query: NullableString,
});

export const cleanFilter = (filter, term) => ({
  ...filter,
  archived: undefined,
  done: undefined,
  query: term,
});

export const defaultFilter = () => ({
  archived: false,
  done: null,
  label: [],
  owner: null,
  query: null,
});

export const parseFilterFromQuery = search => ({
  ...defaultFilter(),
  ...queryString.parse(search),
});

export const filterToQuery = filter => queryString.stringify(filter);

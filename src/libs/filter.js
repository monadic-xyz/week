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

export const cleanFilter = (filter, term) => {
  const f = {
    ...filter,
    archived: undefined,
    done: undefined,
    query: term,
  };

  f.label = [...new Set(f.label)];

  if (f.label.length === 0) {
    f.label = undefined;
  }
  if (f.owner === null || f.owner === '') {
    f.owner = undefined;
  }
  if (f.query === null || f.query === '') {
    f.query = undefined;
  }

  return f;
};

export const defaultFilter = () => ({
  archived: false,
  done: null,
  label: [],
  owner: null,
  query: null,
});

export const filterTasks = (tasks, filter) =>
  tasks.filter(task => {
    let hasLabels = true;

    if (filter.label.length > 0) {
      filter.label.forEach(label => {
        if (hasLabels) {
          hasLabels = task.data.labels.includes(label);
        }
      });
    }

    if (!hasLabels) {
      return false;
    }

    let hasQuery = true;

    if (filter.query !== null && filter.query !== '') {
      hasQuery = task.data.desc
        .toLowerCase()
        .includes(filter.query.toLowerCase());
    }

    return hasQuery;
  });

export const filterToQuery = filter => queryString.stringify(filter);

export const parseFilterFromQuery = search => {
  const f = {
    ...defaultFilter(),
    ...queryString.parse(search),
  };

  // Convert manually to a list if only one label is given.
  if (typeof f.label === 'string') {
    f.label = [f.label];
  }

  return f;
};

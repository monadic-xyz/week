import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { FilterProp } from 'libs/filter';

import FilterLabel from 'elements/FilterLabel';

import { colors } from 'styles';

class FilterBar extends Component {
  static propTypes = {
    filter: FilterProp.isRequired,
    onClear: PropTypes.func.isRequired,
  };

  state = {};

  render() {
    const { filter, onClear } = this.props;
    const hasLabels = filter.label.length > 0;
    const hasOwner = !!filter.owner;

    console.log(filter);

    // Botth labels and owner are present.
    if (hasLabels && hasOwner) {
      return (
        <FilterContainer onClick={() => null}>
          <span>Filtered by </span>
          <FilterLabel owner text={filter.owner} />
          <span> with </span>
          <Labels>
            {filter.label.map(label => (
              <FilterLabel key={label} text={label} />
            ))}
          </Labels>
          <ClearButton onClick={onClear}>clear filters</ClearButton>
        </FilterContainer>
      );
    }

    // Only labels are present, but not owner.
    if (hasLabels && !hasOwner) {
      return (
        <FilterContainer onClick={() => null}>
          <span>Filtered by </span>
          <Labels>
            {filter.label.map(label => (
              <FilterLabel key={label} text={label} />
            ))}
          </Labels>
          <ClearButton onClick={onClear}>clear filters</ClearButton>
        </FilterContainer>
      );
    }

    // Only owner is present, not labels.
    if (!hasLabels && hasOwner) {
      return (
        <FilterContainer>
          <span>Filtered by </span>
          <FilterLabel owner text={filter.owner} />
          <ClearButton onClick={onClear}>clear filters</ClearButton>
        </FilterContainer>
      );
    }

    // No filter present.
    return null;
  }
}

export default FilterBar;

const FilterContainer = styled.div`
  display: grid;
  grid-template-columns: 110px min-content 44px min-content auto;
  grid-template-rows: 24px;
  margin-bottom: 16px;
  padding: 0 16px;
`;

const ClearButton = styled.button`
  justify-self: end;
  font-family: GTAmericaMonoMedium, monospace;
  color: ${colors.blue};
  &:hover {
    cursor: pointer;
  }
`;

const Labels = styled.div`
  display: flex;
`;

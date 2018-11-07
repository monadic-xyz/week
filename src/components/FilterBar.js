import React, { Component } from 'react';
import styled from 'styled-components';

import FilterLabel from 'elements/FilterLabel';

import { colors } from 'styles';

class FilterBar extends Component {
  state = {};

  render() {
    return (
      <FilterContainer onClick={() => null}>
        <span>Filtered by </span>
        <FilterLabel owner text="owner" />
        <span> with </span>
        <Labels>
          <FilterLabel text="label" />
          <FilterLabel text="key-binding" />
          <FilterLabel text="pabaeq" />
        </Labels>
        <ClearButton onClick={() => null}>clear filters</ClearButton>
      </FilterContainer>
    );
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
const Labels = styled.div`
  display: flex;
`;

const ClearButton = styled.button`
  justify-self: end;
  font-family: GTAmericaMonoMedium, monospace;
  color: ${colors.blue};
  &:hover {
    cursor: pointer;
  }
`;

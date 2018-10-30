import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { colors } from 'styles';

import Toggle from 'containers/Toggle';
import { SearchIcon, CloseIcon } from 'elements/icons';

export default class Search extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    term: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    const { term } = props;
    this.state = {
      term,
    };
  }

  componentWillReceiveProps(next) {
    const { term } = next;

    this.setState({
      term,
    });
  }

  updateTerm = e => {
    this.setState({
      term: e.target.value,
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const { onSubmit } = this.props;
    const { term } = this.state;

    onSubmit(term);
  };

  render() {
    const { term } = this.state;
    return (
      <Toggle enabled={term !== null && term !== ''}>
        {({ enabled, toggle }) => (
          <SearchContainer enabled={enabled}>
            <SearchBtn onClick={toggle} type="button">
              {enabled ? <CloseIcon /> : <SearchIcon />}
            </SearchBtn>
            <form onSubmit={this.onSubmit}>
              <input
                value={term}
                onChange={this.updateTerm}
                placeholder="Search for tasks, labels or people"
              />
            </form>
          </SearchContainer>
        )}
      </Toggle>
    );
  }
}

const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  > form {
    width: 0;
    transition: width 0.6s ease-in-out;
    overflow: hidden;
    ${({ enabled }) =>
      enabled &&
      css`
        width: 320px;
      `};
  }
  > form input {
    min-width: 320px;
    border-bottom: 1px solid ${colors.grey};
    padding-bottom: 4px;
  }
`;
const SearchBtn = styled.button`
  height: 24px;
  width: 24px;
  margin-right: 6px;
`;

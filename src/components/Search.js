import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Toggle from 'containers/Toggle';
import { SearchIcon } from 'elements/icons';
import styled from 'styled-components';

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
          <>
            <SearchBtn onClick={toggle} type="button">
              <SearchIcon name="search" />
            </SearchBtn>
            {enabled && (
              <form onSubmit={this.onSubmit}>
                <input
                  value={term}
                  onChange={this.updateTerm}
                  placeholder="Search for tasks"
                />
              </form>
            )}
          </>
        )}
      </Toggle>
    );
  }
}

const SearchBtn = styled.button`
  height: 24px;
  width: 24px;
`;

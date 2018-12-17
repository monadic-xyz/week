import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Mousetrap from 'mousetrap';
import styled, { css } from 'styled-components';

import { colors } from 'styles';

import { SearchIcon, CloseIcon } from 'elements/icons';

export default class Search extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    term: PropTypes.string.isRequired,
  };

  state = {
    enabled: false,
    focused: false,
    term: '',
  };

  constructor(props) {
    super(props);

    this.input = React.createRef();

    const { term } = props;
    this.state = {
      enabled: term !== null && term !== '',
      focused: false,
      term,
    };
  }

  componentWillMount() {
    Mousetrap.bind('/', this.shortcut);
  }

  componentWillReceiveProps(next) {
    const { term } = next;

    this.setState({
      enabled: term !== null && term !== '',
      term,
    });
  }

  componentWillUnmount() {
    Mousetrap.unbind('/', this.shortcut);
  }

  escape = () => {
    const { focused } = this.state;
    const { onSubmit } = this.props;
    if (focused) this.input.current.blur();
    this.setState({
      term: '',
      enabled: false,
    });
    onSubmit('');
  };

  shortcut = e => {
    const { enabled, focused } = this.state;

    if (!enabled) {
      this.setState({
        enabled: true,
      });
    }

    if (!focused) {
      e.preventDefault();
      this.focus();
    }
  };

  focus = () => {
    this.input.current.focus();
  };

  onBlur = () => {
    const { term } = this.state;
    this.setState({
      enabled: term !== null && term !== '',
      focused: false,
    });
    Mousetrap.unbind('esc', this.escape);
  };

  onFocus = e => {
    e.target.select();
    Mousetrap.bind('esc', this.escape);

    this.setState({
      focused: true,
    });
  };

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
    if (term === '') {
      this.setState({
        focused: false,
      });
    }
  };

  onToggle = () => {
    const { enabled, focused } = this.state;

    const { onSubmit } = this.props;

    if (!focused) {
      this.focus();
    }

    if (enabled) {
      this.setState({
        term: '',
        enabled: false,
      });
      onSubmit('');
    }

    this.setState({
      enabled: !enabled,
    });
  };

  render() {
    const { enabled, term } = this.state;
    return (
      <SearchContainer enabled={enabled}>
        <SearchBtn onClick={this.onToggle} type="button">
          {enabled ? <CloseIcon /> : <SearchIcon />}
        </SearchBtn>
        <form onSubmit={this.onSubmit}>
          <input
            className="mousetrap"
            onBlur={this.onBlur}
            onChange={this.updateTerm}
            onFocus={this.onFocus}
            placeholder="Search for tasks, labels or people"
            value={term}
            ref={this.input}
          />
        </form>
      </SearchContainer>
    );
  }
}

const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  > form {
    width: 0;
    transition: width 0.2s ease-in-out;
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
  &:first-child {
    margin-right: 6px;
  }
  &:hover {
    cursor: pointer;
  }
`;

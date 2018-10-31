import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { colors } from 'styles';
import { PlusIcon } from 'elements/icons';

import Button from 'elements/Button';

export default class TaskForm extends Component {
  static propTypes = {
    desc: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    updateDesc: PropTypes.func.isRequired,
  };

  state = {
    focussed: false,
  };

  onFocus = () => {
    this.setState(prevState => ({
      focussed: !prevState.focussed,
    }));
  };

  render() {
    const { desc, disabled, onSubmit, updateDesc } = this.props;
    const { focussed } = this.state;
    return (
      <Form onSubmit={onSubmit}>
        <PlusIcon color={focussed ? colors.blue : colors.grey} />
        <input
          onChange={updateDesc}
          onFocus={this.onFocus}
          onBlur={this.onFocus}
          placeholder="Type here to add a new task. =name to assign / #label to annotate"
          value={desc}
        />
        <Button type="submit" disabled={disabled}>
          Add
        </Button>
      </Form>
    );
  }
}

const Form = styled.form`
  display: flex;
  height: 58px;
  padding: 0 16px;
  border-radius: 4px;
  align-items: center;
  > input {
    padding-left: 16px;
    width: 100%;
  }
`;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Mousetrap from 'mousetrap';
import styled from 'styled-components';

import { colors } from 'styles';
import { PlusIcon, EditIcon } from 'elements/icons';

import Button from 'elements/Button';

export default class TaskForm extends Component {
  static propTypes = {
    desc: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired,
    editing: PropTypes.bool.isRequired,
    onEscape: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    newTask: PropTypes.bool.isRequired,
    updateDesc: PropTypes.func.isRequired,
  };

  state = {
    focused: false,
  };

  constructor(props) {
    super(props);

    this.input = React.createRef();
  }

  onFocus = () => {
    Mousetrap.bind('esc', this.onEscape);
    this.setState({
      focused: true,
    });
  };

  onBlur = () => {
    Mousetrap.unbind('esc', this.onEscape);
    this.setState({
      focused: true,
    });
  };

  onEscape = () => {
    const { onEscape } = this.props;

    this.input.current.blur();
    onEscape();
  };

  render() {
    const {
      desc,
      disabled,
      editing,
      onSubmit,
      newTask,
      updateDesc,
    } = this.props;
    const { focused } = this.state;
    return (
      <Form onSubmit={onSubmit}>
        {editing && newTask ? (
          <EditIcon color={colors.blue} />
        ) : (
          <PlusIcon color={focused ? colors.blue : colors.grey} />
        )}

        <input
          className="mousetrap"
          onChange={updateDesc}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          placeholder="Type here to add a new task. =name to assign / #label to annotate"
          value={desc}
          ref={this.input}
        />
        <AlignedButton type="submit" disabled={disabled}>
          Save
        </AlignedButton>
      </Form>
    );
  }
}

const Form = styled.form`
  display: grid;
  grid-template-columns: 24px auto min-content;
  grid-template-rows: 58px;
  grid-gap: 0px 16px;
  padding: 0 16px;
  align-items: center;
  > input {
    width: 100%;
    padding-bottom: 4px;
  }
`;

const AlignedButton = styled(Button)`
  justify-self: end;
`;

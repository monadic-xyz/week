import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Mousetrap from 'mousetrap';
import styled from 'styled-components';

import { colors } from 'styles';
import { PlusIcon, EditIcon } from 'elements/icons';

import Button from 'elements/Button';

export default class TaskForm extends Component {
  static defaultProps = {
    desc: '',
  };

  static propTypes = {
    collaborators: PropTypes.array.isRequired,
    desc: PropTypes.string,
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
      focused: false,
    });
  };

  onEscape = () => {
    const { onEscape } = this.props;

    this.input.current.blur();
    onEscape();
  };

  render() {
    const {
      collaborators,
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
        <Autocomplete active>
          {collaborators.map(collaborator => (
            <AutocompleteItem
              key={collaborator.id}
              selected={collaborator.data.name === 'Angie'}
            >
              {collaborator.data.name}
            </AutocompleteItem>
          ))}
        </Autocomplete>
      </Form>
    );
  }
}

const Autocomplete = styled.ul`
  background: ${colors.white};
  display: ${props => (props.active ? 'block' : 'none')};
  min-width: 180px;
  position: absolute;
  border: 1px solid ${colors.lightGrey};
  border-radius: 4px;
  box-shadow: 0px 4px 8px rgba(51, 51, 51, 0.12);
`;

const AutocompleteItem = styled.li`
  background-color: ${props => (props.selected ? colors.blue : colors.white)};
  color: ${props => (props.selected ? colors.white : colors.black)};
  height: 36px;
  border-bottom: 1px solid ${colors.lightGrey};
  padding: 6px 12px 0 12px;
  &:first-child {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  &:last-child {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`;

const Form = styled.form`
  align-items: center;
  display: grid;
  grid-gap: 0px 16px;
  grid-template-columns: 24px auto min-content;
  grid-template-rows: 58px;
  padding: 0 16px;
  position: relative;
  > input {
    padding-bottom: 4px;
    width: 100%;
  }
`;

const AlignedButton = styled(Button)`
  justify-self: end;
`;

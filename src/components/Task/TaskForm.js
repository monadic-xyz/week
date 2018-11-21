import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import getCaretCoordinates from 'textarea-caret';

import { colors } from 'styles';

import Button from 'elements/Button';
import { PlusIcon, EditIcon } from 'elements/icons';

const keys = {
  arrowDown: 'ArrowDown',
  arrowUp: 'ArrowUp',
  backspace: 'Backspace',
  enter: 'Enter',
  escape: 'Escape',
  equals: '=',
  space: ' ',
};

const getSelection = (element, startPoint) => {
  const caret = getCaretCoordinates(element, element.selectionEnd);
  const text = startPoint
    ? element.value.substr(startPoint, element.selectionStart)
    : '';

  return {
    cursor: {
      height: caret.height,
      left: caret.left,
      top: caret.top,
      selectionStart: element.selectionStart,
      selectionEnd: element.selectionEnd,
    },
    text,
  };
};

const filteredCollaborators = (collaborators, text) => {
  if (!text || text === '') {
    return collaborators;
  }

  return collaborators.filter(c =>
    c.data.name.toLowerCase().includes(text.toLowerCase()),
  );
};

export default class TaskForm extends Component {
  static defaultState = {
    focused: false,
    selectedId: undefined,
    selectionText: '',
    selectionLeft: 0,
    selectionTop: 0,
    triggered: false,
    triggerCursorLeft: null,
    triggerStartPosition: null,
    value: '',
  };

  static defaultProps = {
    desc: '',
    newTask: false,
  };

  static propTypes = {
    collaborators: PropTypes.array.isRequired,
    desc: PropTypes.string,
    disabled: PropTypes.bool.isRequired,
    editing: PropTypes.bool.isRequired,
    newTask: PropTypes.bool,
    onEscape: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    updateDesc: PropTypes.func.isRequired,
    wrapperRect: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    const { editing, newTask } = props;

    this.input = React.createRef();
    this.state = TaskForm.defaultState;

    if (props.desc !== '') {
      this.state.value = props.desc;
    }

    if (editing && !newTask) {
      this.state.focused = true;
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { collaborators, desc } = this.props;
    const { focused, triggered } = this.state;

    if (
      collaborators.length !== nextProps.collaborators ||
      desc !== nextProps.desc ||
      focused !== nextState.focused ||
      triggered !== nextState.triggered
    ) {
      return true;
    }

    return false;
  }

  handleBlur = () => {
    this.setState({
      focused: false,
      triggered: false,
    });
  };

  handleChange = event => {
    const { collaborators, editing, updateDesc, wrapperRect } = this.props;
    const {
      selectedId,
      triggered,
      triggerCursorLeft,
      triggerStartPosition,
    } = this.state;

    const state = {
      value: event.target.value,
    };

    if (triggered) {
      const { height, left } = event.target.getBoundingClientRect();
      const { cursor, text } = getSelection(event.target, triggerStartPosition);
      const collabs = filteredCollaborators(collaborators, text);
      const idx = collabs.findIndex(c => c.id === selectedId);

      if (idx === -1 && collabs.length > 0) {
        state.selectedId = collabs[0].id;
      }

      state.triggerCursorLeft = triggerCursorLeft || cursor.left;
      state.selectionLeft = left + state.triggerCursorLeft;
      state.selectionText = text;
      state.selectionTop = event.target.offsetTop + height;

      if (editing) {
        state.selectionLeft -= wrapperRect.left;
      }
    }

    updateDesc(state.value);

    this.setState(state);
  };

  handleFocus = () => {
    const { triggerStartPosition } = this.state;

    this.setState({
      focused: true,
      triggered: !!triggerStartPosition,
    });
  };

  handleKeyDown = event => {
    const { key } = event;
    const { selectionStart } = event.target;
    const { collaborators, disabled, onEscape } = this.props;
    const {
      selectedId,
      selectionText,
      triggered,
      triggerStartPosition,
      value,
    } = this.state;
    const collabs = filteredCollaborators(collaborators, selectionText);

    switch (key) {
      // Exit form.
      case keys.escape:
        this.input.current.blur();
        onEscape();
        break;

      // Enter autocomplete mode, if we not already in it.
      case keys.equals:
        if (!triggered) {
          this.setState({
            selectedId: collabs.length > 0 ? collabs[0].id : undefined,
            triggered: true,
            triggerStartPosition: selectionStart + 1,
          });
        }
        break;

      // Navigate DOWN
      case keys.arrowDown:
        if (triggered) {
          const idx = collabs.findIndex(c => c.id === selectedId);

          if (idx < collabs.length - 1) {
            this.setState({
              selectedId: collabs[idx + 1].id,
            });
          }
        }
        break;

      // Navigate up.
      case keys.arrowUp:
        if (triggered) {
          const idx = collabs.findIndex(c => c.id === selectedId);

          if (idx > 0) {
            this.setState({
              selectedId: collabs[idx - 1].id,
            });
          }
        }
        break;

      // Cancel on backspae.
      case keys.backspace:
        if (selectionStart <= triggerStartPosition) {
          this.setState({
            selectedId: undefined,
            selectionText: '',
            selectionLeft: 0,
            selectionTop: 0,
            triggered: false,
            triggerCursorLeft: null,
            triggerStartPosition: null,
          });
        }
        break;

      // Confirm.
      case keys.enter:
        // Confirm current selection if autocomplete is on.
        if (triggered) {
          const idx = collabs.findIndex(c => c.id === selectedId);
          const { name } = collabs[idx].data;
          const head = value.slice(0, triggerStartPosition - 1);
          const tail = value.slice(
            triggerStartPosition + name.length,
            value.length,
          );

          this.setState({
            selectedId: undefined,
            selectionText: '',
            selectionLeft: 0,
            selectionTop: 0,
            triggered: false,
            triggerCursorLeft: null,
            triggerStartPosition: null,
            value: `${head}=${name} ${tail}`,
          });
        } else if (!disabled) {
          // Submit the form.
          const { onSubmit } = this.props;

          onSubmit();

          this.resetState();
        }
        break;

      // Cancel on space.
      case keys.space:
        if (triggered) {
          this.setState({
            selectedId: undefined,
            selectionText: '',
            selectionLeft: 0,
            selectionTop: 0,
            triggered: false,
            triggerCursorLeft: null,
            triggerStartPosition: null,
          });
        }
        break;

      // Nothing ot be done here.
      default:
        break;
    }
  };

  handleSubmit = e => {
    e.preventDefault();

    const { onSubmit } = this.props;

    onSubmit();
    this.resetState();
  };

  resetState = () => {
    this.setState(TaskForm.defaultState);
  };

  render() {
    const { collaborators, disabled, editing, newTask } = this.props;
    const {
      focused,
      selectedId,
      selectionLeft,
      selectionText,
      selectionTop,
      triggered,
      value,
    } = this.state;
    const collabs = filteredCollaborators(collaborators, selectionText);

    return (
      <Form onSubmit={this.handleSubmit}>
        {editing && !newTask ? (
          <EditIcon color={focused ? colors.blue : colors.grey} />
        ) : (
            <PlusIcon color={focused ? colors.blue : colors.grey} />
          )}

        <input
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onKeyDown={this.handleKeyDown}
          placeholder="Type here to add a new task. =name to assign / #label to annotate"
          value={value}
          ref={this.input}
        />
        <AlignedButton type="submit" disabled={disabled}>
          Save
        </AlignedButton>
        <Autocomplete
          active={triggered && collabs.length > 0}
          left={selectionLeft}
          top={selectionTop}
        >
          {collabs.map(collaborator => (
            <AutocompleteItem
              key={collaborator.id}
              selected={collaborator.id === selectedId}
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
  border: 1px solid ${colors.lightGrey};
  border-radius: 4px;
  box-shadow: 0px 4px 8px rgba(51, 51, 51, 0.12);
  display: ${props => (props.active ? 'block' : 'none')};
  min-width: 180px;
  position: absolute;
  left: ${props => `${props.left}px`};
  top: ${props => `${props.top}px`};
`;

const AutocompleteItem = styled.li`
  background-color: ${props => (props.selected ? colors.blue : colors.white)};
  border-bottom: 1px solid ${colors.lightGrey};
  color: ${props => (props.selected ? colors.white : colors.black)};
  height: 36px;
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
  > input {
    padding-bottom: 4px;
    width: 100%;
  }
`;

const AlignedButton = styled(Button)`
  justify-self: end;
`;

import React, { Component } from 'react';
import getCaretCoordinates from 'textarea-caret';

const keys = {
  arrowDown: 40,
  arrowUp: 38,
  backspace: 8,
  enter: 13,
  escape: 27,
  space: 32,
  trigger: 61,
};

const getSelection = (element, startPoint) => {
  const caret = getCaretCoordinates(element, element.selectionEnd);
  const text = startPoint
    ? element.value.substr(startPoint, element.selectionStart)
    : '';

  return {
    cursor: {
      height: caret.height,
      left: caret.top,
      top: caret.top,
      selectionStart: element.selectionStart,
      selectionEnd: element.selectionEnd,
    },
    text,
  };
};

export default class InputTrigger extends Component {
  static log(...args) {
    console.log('InputTrigger', ...args);
  }

  state = {
    triggered: false,
    triggerStartPosition: null,
    value: '',
  };

  constructor(props) {
    super(props);

    this.input = React.createRef();
  }

  componentDidMount() {
    InputTrigger.log('componentDidMount');
  }

  shouldComponentUpdate(_, nextState) {
    const { triggered, value } = this.state;

    if (value !== nextState.value || triggered !== nextState.triggered) {
      return true;
    }

    return false;
  }

  handleChange = event => {
    this.setState({
      value: event.target.value,
    });
  };

  handleKeyDown = event => {
    const { key, which } = event;
    const { selectionStart } = event.target;
    const { triggered, triggerStartPosition } = this.state;

    console.log('key down --', key, which);

    // Handle ESC first so we can blur in all cases.
    if (key === this.escapeKey) {
      this.input.current.blur();
    }

    if (!triggered) {
      if (which === keys.trigger) {
        this.setState({
          triggered: true,
          triggerStartPosition: selectionStart + 1,
        });
      }

      return;
    }

    switch (which) {
      // ARROW DOWN
      case keys.arrowDown:
        break;

      // ARROW UP
      case keys.arrowUp:
        break;

      // BACKSPACE
      case keys.backspace:
        if (selectionStart <= triggerStartPosition) {
          this.setState({
            triggered: false,
            triggerStartPosition: null,
          });
        }
        break;

      // ENTER
      case keys.enter:
        break;

      // SPACE
      case keys.space:
        this.setState({
          triggered: false,
          triggerStartPosition: null,
        });
        break;

      default:
        setTimeout(() => {
          InputTrigger.log(
            'key down --',
            getSelection(this.input.current, triggerStartPosition),
            this.input.current.selectionStart,
            this.input.current.selectionEnd,
            triggerStartPosition
          );
        }, 0);

        break;
    }
  };

  handleBlur = event => {
    InputTrigger.log('blur --', event);

    this.setState({
      triggered: false,
    });
  };

  handleFocus = event => {
    InputTrigger.log('focus --', event);

    const { triggerStartPosition } = this.state;

    if (triggerStartPosition) {
      this.setState({
        triggered: true,
      });
    }
  };

  render() {
    const { ...props } = this.props;
    const { value } = this.state;

    InputTrigger.log('render --', this.state);

    return (
      <input
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onFocus={this.handleFocus}
        onKeyDown={this.handleKeyDown}
        ref={this.input}
        value={value}
        {...props}
      />
    );
  }
}

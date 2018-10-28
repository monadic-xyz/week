import React, { Component } from 'react';
import PropTypes from 'prop-types';

const extractLabels = str => {
  const matches = [];
  const re = new RegExp(/\[(.*?)\]/gu);
  for (;;) {
    const match = re.exec(str);
    if (match === null) break;
    matches.push(match[1]);
  }
  return matches;
};

export default class TaskForm extends Component {
  static defaultProps = {
    desc: '',
  };

  static propTypes = {
    desc: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    desc: '',
  };

  componentWillMount() {
    const { desc } = this.props;
    this.setState({
      desc,
    });
  }

  componentWillReceiveProps(next) {
    const { desc } = this.props;
    this.setState({
      desc,
    });
  }

  onSubmit = e => {
    e.preventDefault();

    const { onSubmit } = this.props;
    const { desc } = this.state;
    const owner = 'xla';
    onSubmit(desc, owner, extractLabels(desc));
  };

  updateDesc = e => {
    this.setState({
      desc: e.target.value,
    });
  };

  render() {
    const { desc } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <input
          onChange={this.updateDesc}
          placeholder="Type here to add a new task. =name to assign / #label to annotate"
          value={desc}
        />
        <button type="submit" disabled={!desc}>
          add
        </button>
      </form>
    );
  }
}

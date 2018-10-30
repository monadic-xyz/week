import React, { Component } from 'react';
import PropTypes from 'prop-types';

const extractLabels = str => {
  const matches = [];
  const re = /(?=\S)#([-_a-zA-Z0-9]+)/gm;

  for (;;) {
    const match = re.exec(str);
    if (match === null) break;
    matches.push(match[1]);
  }

  return matches;
};

const extractOwner = str => {
  const re = new RegExp(/(?=\S)=([a-zA-Z0-9-_$]+)/);
  const match = re.exec(str);

  if (!match) return null;

  return match[1];
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
    labels: [],
    owner: undefined,
  };

  componentWillMount() {
    const { desc } = this.props;
    this.setState({
      desc,
      labels: extractLabels(desc),
      owner: extractOwner(desc),
    });
  }

  componentWillReceiveProps(next) {
    const { desc } = next;
    this.setState({
      desc,
      labels: extractLabels(desc),
      owner: extractOwner(desc),
    });
  }

  onSubmit = e => {
    e.preventDefault();

    const { onSubmit } = this.props;
    const { desc, owner, labels } = this.state;
    onSubmit(desc, owner, labels);
  };

  updateDesc = e => {
    const desc = e.target.value;
    this.setState({
      desc: e.target.value,
      labels: extractLabels(desc),
      owner: extractOwner(desc),
    });
  };

  render() {
    const { desc, owner } = this.state;
    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          return desc && owner && this.onSubmit(e);
        }}
      >
        <input
          onChange={this.updateDesc}
          placeholder="Type here to add a new task. =name to assign / #label to annotate"
          value={desc}
        />
        <button type="submit" disabled={!desc || !owner}>
          save
        </button>
      </form>
    );
  }
}

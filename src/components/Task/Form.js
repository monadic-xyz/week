import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { colors } from 'styles';
import { PlusIcon } from 'elements/icons';

import Button from 'elements/Button';

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
      <Form
        onSubmit={e => {
          e.preventDefault();
          return desc && owner && this.onSubmit(e);
        }}
      >
        <PlusIcon color={colors.blue} />
        <input
          onChange={this.updateDesc}
          placeholder="Type here to add a new task. =name to assign / #label to annotate"
          value={desc}
        />
        <Button type="submit" disabled={!desc || !owner}>
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
  background: ${colors.almostWhite};
  > input {
    padding-left: 16px;
    width: 100%;
  }
`;

import React, { Component } from 'react';

export default class Debugger extends Component {
  render() {
    return <pre>{JSON.stringify(this.props, null, 2)}</pre>;
  }
}

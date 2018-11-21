import { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

export default class Portal extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor() {
    super();
    this.root = document.getElementById('portal');
  }

  render() {
    const { children } = this.props;
    return ReactDOM.createPortal(children, this.root);
  }
}

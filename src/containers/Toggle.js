import { Component } from 'react';
import PropTypes from 'prop-types';

export default class Toggle extends Component {
  static defaultProps = {
    enabled: false,
  };

  static propTypes = {
    children: PropTypes.func.isRequired,
    enabled: PropTypes.bool,
  };

  state = {
    enabled: false,
  };

  componentWillMount() {
    const { enabled } = this.props;

    this.setState({
      enabled,
    });
  }

  componentWillReceiveProps(next) {
    const { enabled } = next;
    this.setState({ enabled });
  }

  toggle = () => {
    const { enabled } = this.state;
    this.setState({
      enabled: !enabled,
    });
  };

  render() {
    const { children } = this.props;
    const { enabled } = this.state;

    return children({ enabled, toggle: this.toggle });
  }
}

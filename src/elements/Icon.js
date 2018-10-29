import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { colors } from 'styles';

export default class Icon extends Component {
  static defaultProps = {
    color: colors.grey,
  };

  render() {
    const { color, name } = this.props;
    switch (name) {
      case 'search':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M19 10C19 12.7614 16.7614 15 14 15C11.2385 15 8.99997 12.7614 8.99997 10C8.99997 7.23858 11.2385 5 14 5C16.7614 5 19 7.23858 19 10ZM21 10C21 13.866 17.866 17 14 17C12.4019 17 10.9289 16.4645 9.7506 15.5631L5.12129 20.1924C4.73077 20.5829 4.0976 20.5829 3.70708 20.1924C3.31655 19.8019 3.31655 19.1687 3.70708 18.7782L8.35081 14.1344C7.50151 12.976 6.99997 11.5465 6.99997 10C6.99997 6.13401 10.134 3 14 3C17.866 3 21 6.13401 21 10Z"
              fill={color}
            />
          </svg>
        );
      case 'archive':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path
              d="M20 13C20 12.4477 19.5523 12 19 12C18.4477 12 18 12.4477 18 13H20ZM6 13C6 12.4477 5.55228 12 5 12C4.44772 12 4 12.4477 4 13H6ZM17 17H7V19H17V17ZM18 13V16H20V13H18ZM6 16V13H4V16H6ZM7 17C6.44772 17 6 16.5523 6 16H4C4 17.6569 5.34315 19 7 19V17ZM17 19C18.6569 19 20 17.6569 20 16H18C18 16.5523 17.5523 17 17 17V19Z"
              fill={color}
            />
            <path
              d="M7 6L12 11L17 6"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      case 'unarchive':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path
              d="M20 13C20 12.4477 19.5523 12 19 12C18.4477 12 18 12.4477 18 13H20ZM6 13C6 12.4477 5.55228 12 5 12C4.44772 12 4 12.4477 4 13H6ZM17 17H7V19H17V17ZM18 13V16H20V13H18ZM6 16V13H4V16H6ZM7 17C6.44772 17 6 16.5523 6 16H4C4 17.6569 5.34315 19 7 19V17ZM17 19C18.6569 19 20 17.6569 20 16H18C18 16.5523 17.5523 17 17 17V19Z"
              fill={color}
            />
            <path
              d="M17 9L12 4L7 9"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      case 'plus':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24">
            <rect x="11" y="3" width="2" height="18" rx="1" fill={color} />
            <rect
              x="3"
              y="13"
              width="2"
              height="18"
              rx="1"
              transform="rotate(-90 3 13)"
              fill={color}
            />
          </svg>
        );
      case 'edit':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24">
            <rect
              x="17.7279"
              y="19.142"
              width="18"
              height="2"
              rx="1"
              transform="rotate(-135 17.7279 19.142)"
              fill={color}
            />
          </svg>
        );
      case 'check':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="11" stroke={color} strokeWidth="2" />
          </svg>
        );
      case 'uncheck':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="12" fill={color} />
            <path
              d="M7 13.5L10 16.5L17.5 9"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      default:
        return null;
    }
  }
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
};

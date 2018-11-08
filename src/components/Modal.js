import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';
import Portal from './Portal';

export default class Modal extends Component {
  static defaultProps = {
    top: null,
    width: '1060px',
  };

  static propTypes = {
    children: PropTypes.node.isRequired,
    toggle: PropTypes.func.isRequired,
    on: PropTypes.bool.isRequired,
    top: PropTypes.number,
    width: PropTypes.number,
  };

  render() {
    const { children, toggle, on, top, width } = this.props;
    return (
      <Portal>
        {on && (
          <ModalWrapper>
            <ModalCard top={top || false} width={width}>
              <div>{children}</div>
            </ModalCard>
            <Background onClick={toggle} />
            <Global />
          </ModalWrapper>
        )}
      </Portal>
    );
  }
}

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ModalCard = styled.div`
  border-radius: 4px;
  background-color: white;
  z-index: 10;
  min-width: ${props => props.width};
  ${({ top }) =>
    top &&
    `
    position: absolute;
    top: ${top}px;
  `};
`;
const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: black;
  opacity: 0.3;
`;

const Global = createGlobalStyle`
  body {
    overflow-x: hidden;
    overflow-y: hidden;
  }
`;

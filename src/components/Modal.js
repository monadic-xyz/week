import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';
import Portal from './Portal';

export default class Modal extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    toggle: PropTypes.func.isRequired,
    on: PropTypes.bool.isRequired,
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
  };

  render() {
    const { children, toggle, on, top, left } = this.props;
    return (
      <Portal>
        {on && (
          <ModalWrapper>
            <ModalCard top={top} left={left}>
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
  min-width: 1060px;
  position: absolute;
  top: ${props => `${props.top}px`};
  left: ${props => `${props.left + 8}px`};
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

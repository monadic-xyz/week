import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { colors } from 'styles';

import Portal from './Portal';

export default class Modal extends Component {
  static defaultProps = {
    on: false,
    top: null,
    width: '1060px',
  };

  static propTypes = {
    children: PropTypes.node.isRequired,
    toggle: PropTypes.func.isRequired,
    on: PropTypes.bool,
    top: PropTypes.number,
    width: PropTypes.number,
  };

  render() {
    const { children, toggle, on, top, width } = this.props;
    return (
      <Portal>
        {on && (
          <>
            <ModalWrapper>
              <ModalCard top={top || false} width={width}>
                <div>{children}</div>
              </ModalCard>
            </ModalWrapper>
            <Background onClick={toggle} />
          </>
        )}
      </Portal>
    );
  }
}

const ModalWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalCard = styled.div`
  background-color: ${colors.white};
  border-radius: 4px;
  min-width: ${props => `${props.width}px`};
  position: fixed;
  z-index: 10;

  ${({ top }) =>
    top &&
    `
    position: absolute;
    top: ${top}px;
  `};
`;

const Background = styled.div`
  background: ${colors.black};
  opacity: 0.3;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
`;

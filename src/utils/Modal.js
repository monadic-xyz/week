import React, {Component} from 'react';
import styled from 'styled-components';
import Portal from './Portal';
import colors from './colors'

export default class Modal extends Component {
  render() {
    const { children, toggle, on } = this.props;
    return (
      <Portal>
        {on &&
          <ModalWrapper>
            <ModalCard>

              {/* <CloseButton onClick={toggle}>close</CloseButton> */}
              <div>{children}</div>
            </ModalCard>
            <Background onClick={toggle}/>
          </ModalWrapper>
        }
      </Portal>
    )
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
`
const ModalCard = styled.div`
  position: relative;
  background: white;
  padding: 32px 24px;
  min-width: 480px;
  z-index: 10;
  -webkit-box-shadow: 0px 4px 16px rgba(51, 51, 51, 0.08);
  -moz-box-shadow: 0px 4px 16px rgba(51, 51, 51, 0.08);
  box-shadow: 0px 4px 16px rgba(51, 51, 51, 0.08);
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
`
const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: black;
  opacity: .3;
`
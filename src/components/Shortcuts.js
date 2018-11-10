import React from 'react';
import styled from 'styled-components';

import { darkGrey, lightGrey } from 'styles/colors';

import SegmentTitle from 'elements/SegmentTitle';

import Modal from 'components/Modal';

const keybindings = [
  { key: '/', helpText: 'Open & focus search' },
  { key: 'n', helpText: 'Create new task' },
  { key: 'esc', helpText: 'Escape any operation' },
  { key: 'd', helpText: 'Mark task as done' },
  { key: 'j', helpText: 'Go to next task' },
  { key: 'e', helpText: 'Edit a task' },
  { key: 'k', helpText: 'Go to previous task' },
  { key: 'a', helpText: 'Archive a task' },
];

export default () => (
  <>
    <Modal width="160px" toggle={() => null}>
      <ModalContent>
        <SegmentTitle>Keyboard shortcuts</SegmentTitle>
        <Grid>
          {keybindings.map(keybinding => (
            <ShortcutItem>
              <span>{keybinding.key}</span>
              <p>{keybinding.helpText}</p>
            </ShortcutItem>
          ))}
        </Grid>
      </ModalContent>
    </Modal>
    <Hint>Press 'h' to see heyboard shortcuts</Hint>
  </>
);

const ModalContent = styled.div`
  padding: 48px;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 24px;
  grid-gap: 16px 48px;
  margin-top: 48px;
`;
const ShortcutItem = styled.div`
  display: flex;
  > span {
    height: 24px;
    width: auto;
    border-radius: 2px;
    background-color: ${lightGrey};
    padding: 1px 7px 0 7px;
    margin-right: 12px;
  }
`;

const Hint = styled.div`
  background-color: white;
  bottom: 0;
  color: ${darkGrey};
  font-size: 13px;
  opacity: 0.3;
  padding: 12px 24px;
  position: fixed;
  right: 0px;
  transition: opacity 0.2s ease-in-out;
  &:hover {
    opacity: 1;
  }
`;

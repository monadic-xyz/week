import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ArchiveIcon, CheckIcon, EditIcon, UncheckIcon } from 'elements/icons';
import Label from 'elements/Label';
import { colors } from 'styles';

const replaceLabels = desc => {
  const parts = desc.split(/(?=\S)#([-_a-zA-Z0-9]+)/gm);

  for (let i = 1; i < parts.length; i += 2) {
    const labelColor = colors.strToHex(parts[i]);
    parts[i] = (
      <Label
        key={i}
        backgroundColor={labelColor}
        color={colors.invertColor(labelColor, true)}
      >
        {parts[i]}
      </Label>
    );
  }

  return parts;
};

const removeOwner = desc => desc.replace(/(?=\S)=([a-zA-Z0-9-_$]+)/, '');

const TaskItem = ({ desc, done, onDone, owner, onEdit, onArchive }) => (
  <ListItemContainer>
    {done ? (
      <Action onClick={onDone}>
        <UncheckIcon />
      </Action>
    ) : (
      <Action onClick={onDone}>
        <CheckIcon />
      </Action>
    )}
    <p>{replaceLabels(removeOwner(desc))}</p>
    <Label>{owner}</Label>
    <Action onClick={onEdit}>
      <EditIcon padding />
    </Action>
    <Action onClick={onArchive}>
      <ArchiveIcon padding />
    </Action>
  </ListItemContainer>
);

TaskItem.propTypes = {
  desc: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
};

export default TaskItem;

const ListItemContainer = styled.div`
  display: flex;
  height: 58px;
  padding: 0 16px;
  align-items: center;
  > p {
    padding-left: 16px;
    width: 100%;
  }
`;

const Action = styled.button`
  padding-left: 12px;
  &:hover {
    cursor: pointer;
  }
  &:nth-child(1) {
    padding: 0;
  }
`;

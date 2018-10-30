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

const ListItem = ({ desc, owner, done, onEdit, onArchive }) => (
  <ListItemContainer>
    {done ? <UncheckIcon /> : <CheckIcon />}
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

ListItem.propTypes = {
  desc: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
};

export default ListItem;

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
`;

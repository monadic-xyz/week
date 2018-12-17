import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { stripOwner } from 'libs/description';

import { colors } from 'styles';

import {
  ArchiveIcon,
  CheckedIcon,
  EditIcon,
  UnarchiveIcon,
  UnCheckedIcon,
} from 'elements/icons';
import Label from 'elements/Label';

const replaceLabels = (desc, done, labels) => {
  let parts = desc.split(/(?=\S)#([-_a-zA-Z0-9]+)/gm);

  parts = parts.filter(p => {
    const text = p.trim();

    return text !== '' && text.length > 0;
  });

  return parts.map((p, i) => {
    if (labels.includes(p)) {
      const labelColor = colors.strToHex(parts[i]);

      return (
        <Label
          key={i}
          backgroundColor={labelColor}
          color={colors.invertColor(labelColor, true)}
          done={done}
        >
          {parts[i]}
        </Label>
      );
    }

    return <span key={i}>{parts[i].trim()}</span>;
  });
};

const TaskItem = ({
  archived,
  desc,
  done,
  labels,
  onDone,
  owner,
  onEdit,
  onArchive,
  onUnArchive,
  onOwnerSelect,
}) => (
    <ListItemContainer archived={archived}>
      {done ? (
        <Action onClick={onDone}>
          <CheckedIcon />
        </Action>
      ) : (
          <Action onClick={onDone}>
            <UnCheckedIcon />
          </Action>
        )}
      <Description done={done}>
        {replaceLabels(stripOwner(desc), done, labels)}
      </Description>
      <Label onClick={onOwnerSelect}>{owner}</Label>
      {!archived ? (
        <>
          <Action onClick={onEdit}>
            <EditIcon padding />
          </Action>
          <Action onClick={onArchive}>
            <ArchiveIcon padding />
          </Action>
        </>
      ) : (
          <>
            <Action onClick={onUnArchive}>
              <UnarchiveIcon padding />
            </Action>
          </>
        )}
    </ListItemContainer>
  );

TaskItem.propTypes = {
  archived: PropTypes.bool.isRequired,
  desc: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired,
  labels: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
  onUnArchive: PropTypes.func.isRequired,
  onOwnerSelect: PropTypes.func.isRequired,
  owner: PropTypes.string.isRequired,
};

export default TaskItem;

const Action = styled.button`
  &:hover {
    cursor: pointer;
  }
`;

const Description = styled.p`
  padding: 12px 0;
  line-height: 150%;
  > span {
    margin-left: 8px;
    &:first-child {
      margin-left: 0;
    }
    &:last-child {
      margin-right: 0;
    }
    ${({ done }) =>
    done &&
    `
    color: ${colors.grey};
    text-decoration: line-through;
  `};
  }
`;

const ListItemContainer = styled.div`
  display: grid;
  grid-template-columns: ${props =>
    props.archived
      ? '24px auto min-content 24px;'
      : '24px auto min-content 24px 24px;'};
  grid-template-rows: minmax(58px, auto);
  grid-gap: 0px 16px;
  padding: 0 16px;
  align-items: center;
`;

import React, { Fragment } from 'react';
import colors, { white, pink } from './colors';

import Label from '../elements/Label';

export default desc => {
  const parts = desc.split(/\[(.*?)\]/);
  if (desc.includes('[demo]')) {
    for (let i = 1; i < parts.length; i += 2) {
      parts[i] = (
        <Label backgroundColor={pink} color={white} monospace key={i}>
          {parts[i]}
        </Label>
      );
    }
    return <Fragment>{parts}</Fragment>;
  }

  for (let i = 1; i < parts.length; i += 2) {
    const labelColor = colors.strToHex(parts[i]);

    parts[i] = (
      <Label backgroundColor={labelColor} color={colors.invertColor(labelColor, true)} monospace key={i}>
        {parts[i]}
      </Label>
    );
  }
  return <Fragment>{parts}</Fragment>;
};

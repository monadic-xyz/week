import React from 'react';
import { Label } from '../elements';
import colors, { white, pink } from './colors';

export const extractLabels = str => {
  const matches = [];
  const re = new RegExp(/\[(.*?)\]/gu);
  while (true) {
    const match = re.exec(str);
    if (match === null) break;
    matches.push(match[1]);
  }
  return matches;
};

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
    return <>{parts}</>;
  }
  for (let i = 1; i < parts.length; i += 2) {
    const labelColor = colors.strToHex(parts[i]);

    parts[i] = (
      <Label backgroundColor={labelColor} color={colors.invertColor(labelColor, true)} monospace key={i}>
        {parts[i]}
      </Label>
    );
  }
  return <>{parts}</>;
};

import React, { Fragment } from 'react';
import colors from './colors';

import Label from '../elements/Label';

export default (desc) => {
  if (desc.includes('[demo]')) {
    const parts = desc.split(/\[(.*?)\]/);
    for (var i = 1; i < parts.length; i += 2) {
      parts[i] = <Label
        backgroundColor={colors.pink}
        color={colors.white}
        monospace
        key={i}>
          {parts[i]}
        </Label>
    }
    return <Fragment>{parts}</Fragment>;
  } else {
    const parts = desc.split(/\[(.*?)\]/);
    for (i = 1; i < parts.length; i += 2) {
      const labelColor = colors.strToHex(parts[i]);

      parts[i] = <Label
        backgroundColor={labelColor}
        color={colors.invertColor(labelColor, true)}
        monospace
        key={i}>
        {parts[i]}
        </Label>
    }
    return <Fragment>{parts}</Fragment>;
  }
}

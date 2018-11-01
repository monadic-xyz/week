const reLabels = /(?=\S)#([-_a-zA-Z0-9]+)/gm;
const reOwner = /(?=\S)=([a-zA-Z0-9-_$]+)/;

export const stripOwner = desc => desc.replace(reOwner, '');

export const extractLabels = str => {
  const matches = [];

  for (;;) {
    const match = reLabels.exec(str);
    if (match === null) break;
    matches.push(match[1]);
  }

  return matches;
};

export const extractOwner = str => {
  const re = new RegExp(/(?=\S)=([a-zA-Z0-9-_$]+)/);
  const match = re.exec(str);

  if (!match) return null;

  return match[1];
};

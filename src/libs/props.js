export const NullableBool = (props, name, componentName) => {
  if (props[name] !== null && typeof props[name] !== 'boolean') {
    return new Error(
      `${componentName} requires ${name} to either be a boolean or null`,
    );
  }
};

export const NullableString = (props, name, componentName) => {
  if (props[name] !== null && typeof props[name] !== 'string') {
    return new Error(
      `${componentName} requires ${name} to either be a string or null`,
    );
  }
};

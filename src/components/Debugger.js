import React from 'react';

const Debugger = props => <pre>{JSON.stringify(props, null, 2)}</pre>;

export default Debugger;

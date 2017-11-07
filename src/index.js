import React from 'react';
import ReactDOM from 'react-dom';
import Promise from 'bluebird';

import App from './App';

// setup promises
global.Promise = Promise;

const { document } = global;

ReactDOM.render(<App />, document.getElementById('root'));

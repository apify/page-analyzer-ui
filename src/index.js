import React from 'react';
import ReactDOM from 'react-dom';
import Promise from 'bluebird';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

// setup promises
global.Promise = Promise;

const { document } = global;

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

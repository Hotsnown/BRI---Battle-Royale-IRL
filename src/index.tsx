import React from 'react';
import './index.css';
import App from './client/App';
import * as serviceWorker from './serviceWorker';

import { render } from 'react-dom';

import './client/assets/css/index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

render((<App/>), document.getElementById('root'))
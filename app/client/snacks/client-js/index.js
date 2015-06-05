/*eslint-env node*/

'use strict';

let React = require('react');
let AppView = require('./AppView.jsx');

React.render(
    React.createElement(AppView),
    document.getElementById('app') //eslint-disable-line no-undef
);

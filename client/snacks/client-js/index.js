/*eslint-env node*/

'use strict';

let React = require('react');
let AppView = require('./AppView.jsx');

let results = {
   OCR: {
      HP: 89,
      IBM: 3
   },
   'Image Tagging': {
      HP: 20,
      IBM: 89
   }
};

React.render(
    React.createElement(AppView, {results}),
    document.getElementById('app') //eslint-disable-line no-undef
);

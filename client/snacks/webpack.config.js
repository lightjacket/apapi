/*eslint-env node*/

var webpack = require('webpack');

module.exports = {
	entry: [
		__dirname + '/client-js/index.js' // Your appʼs entry point
	],
	output: {
		path: __dirname + '/client-dist/',
		filename: 'bundle.js'
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			exclude: /node_modules\//,
			loaders: ['babel-loader?stage=1&optional=runtime']
		}]
	}
};

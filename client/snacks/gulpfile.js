'use strict';

var gulp = require('gulp');
var babel = require('gulp-babel');
var WebpackDevServer = require("webpack-dev-server");
var webpack = require("webpack");

gulp.task('recompile', function() {
	return gulp.src('server-js/*.js*')
		.pipe(babel({
			stage: 1,
			optional: ['runtime']
		}))
		.pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
	gulp.watch('server-js/*.js*', ['recompile']);
});

gulp.task('webpack', function() {

});

gulp.task('default', ['recompile', 'watch', 'webpack']);

gulp.task('webpack', function() {

	var config = {
		entry: [
			'webpack/hot/only-dev-server',
			__dirname + '/client-js/index.js' // Your appʼs entry point
		],
		output: {
			path: __dirname + '/client-dist/',
			publicPath: "/",
			filename: 'bundle.js',
		},
		module: {
			loaders: [{
				test: /\.jsx?$/,
				exclude: /node_modules\//,
				loaders: ['react-hot', 'babel-loader?stage=1&optional=runtime']
			}]
		},
		devtool: 'source-map',
		plugins: [
			new webpack.HotModuleReplacementPlugin(),
			new webpack.NoErrorsPlugin()
		]
	};

	var server = new WebpackDevServer(webpack(config), {
		// webpack-dev-server options
		// or: contentBase: "http://localhost/",

		hot: true,
		// Enable special support for Hot Module Replacement
		// Page is no longer updated, but a "webpackHotUpdate" message is send to the content
		// Use "webpack/hot/dev-server" as additional module in your entry point
		// Note: this does _not_ add the `HotModuleReplacementPlugin` like the CLI option does.

		watchOptions: {
			aggregateTimeout: 300,
			poll: 100
		},
		stats: {
			colors: true
		}
	});
	server.listen(12346, "localhost", function() {});
});

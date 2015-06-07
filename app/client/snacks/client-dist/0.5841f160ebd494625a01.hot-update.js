webpackHotUpdate(0,{

/***/ 179:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _inherits = __webpack_require__(158)['default'];

	var _get = __webpack_require__(175)['default'];

	var _createClass = __webpack_require__(163)['default'];

	var _classCallCheck = __webpack_require__(166)['default'];

	var React = __webpack_require__(2);
	var Link = __webpack_require__(180).Link;

	var ResultOptions = (function (_React$Component) {
		function ResultOptions() {
			_classCallCheck(this, ResultOptions);

			_get(Object.getPrototypeOf(ResultOptions.prototype), 'constructor', this).call(this);
			this.state = {
				open: false,
				selected: []
			};
		}

		_inherits(ResultOptions, _React$Component);

		_createClass(ResultOptions, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				this.setState({ open: this.props.open });
			}
		}, {
			key: 'toggleOpen',
			value: function toggleOpen() {
				this.setState({ open: !this.state.open });
			}
		}, {
			key: 'getSelectedViews',
			value: function getSelectedViews(refTag) {
				return Array.prototype.map.call(React.findDOMNode(this.refs[refTag]).getElementsByTagName('option'), function (c) {
					return c.selected ? c.value : null;
				}).filter(function (c) {
					return c;
				});
			}
		}, {
			key: 'changeView',
			value: function changeView() {
				var selected = this.getSelectedViews('api');
				var params = { displayOpen: true };
				if (selected.length === 1 && selected[0] === 'all') {
					params.view = 'all';
				} else {
					params.view = 'api';
					params.api = selected[0];
				}
				params.categories = this.getSelectedViews('categories').join(',');
				params.providers = this.getSelectedViews('providers').join(',');
				if (this.props.id) {
					params.id = this.props.id;
				}
				this.props.changeView(params);
			}
		}, {
			key: 'render',
			value: function render() {
				var _this = this;

				console.log('ResultOptions render');
				var controls = null;
				if (this.state.open) {
					controls = React.createElement(
						'div',
						null,
						React.createElement(
							'select',
							{ ref: 'api', value: this.props.api ? [this.props.api] : ['all'], multiple: 'multiple', onChange: function (e) {
									return _this.changeView(e);
								} },
							React.createElement(
								'option',
								{ value: 'all' },
								'All'
							),
							React.createElement(
								'option',
								{ value: 'OCR' },
								'OCR'
							),
							React.createElement(
								'option',
								{ value: 'Image Tagging' },
								'Image tagging'
							),
							React.createElement(
								'option',
								{ value: 'Speech Recognition' },
								'Speech to text'
							)
						),
						React.createElement(
							'select',
							{ ref: 'categories', value: this.props.api ? this.props.categories : ['aggregate'], multiple: 'multiple', onChange: function (e) {
									return _this.changeView(e);
								} },
							React.createElement(
								'option',
								{ value: 'aggregate' },
								'Aggregate'
							),
							React.createElement(
								'option',
								{ value: 'accuracy' },
								'Accuracy'
							),
							React.createElement(
								'option',
								{ value: 'speed' },
								'Speed'
							)
						),
						React.createElement(
							'select',
							{ ref: 'providers', value: this.props.provider ? this.props.provider : this.props.providers, multiple: 'multiple', onChange: function (e) {
									return _this.changeView(e);
								} },
							this.props.providers.map(function (p) {
								return React.createElement(
									'option',
									{ value: p },
									p
								);
							})
						)
					);
				}

				return React.createElement(
					'div',
					null,
					React.createElement(
						'div',
						{ onClick: function () {
								return _this.toggleOpen();
							} },
						'Display Options ',
						this.state.open ? 'v' : '>'
					),
					React.createElement(
						'div',
						null,
						controls
					)
				);
			}
		}]);

		return ResultOptions;
	})(React.Component);

	module.exports = ResultOptions;

/***/ }

})
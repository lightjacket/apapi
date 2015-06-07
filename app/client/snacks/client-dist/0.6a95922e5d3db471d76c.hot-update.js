webpackHotUpdate(0,[
/* 0 */,
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/*eslint-env node*/

	'use strict';

	var _inherits = __webpack_require__(158)['default'];

	var _createClass = __webpack_require__(163)['default'];

	var _classCallCheck = __webpack_require__(166)['default'];

	var _Object$keys = __webpack_require__(167)['default'];

	var _ = __webpack_require__(172);

	var aggregateResults = function aggregateResults(results) {
	   results.forEach(function (result) {
	      if (result.scoretypename === 'speed') {
	         result.value = Math.floor(4000 / result.value);
	      }
	   });
	   var aggregatedResults = {};
	   results.forEach(function (result) {
	      if (!aggregatedResults[result.apiname]) {
	         aggregatedResults[result.apiname] = {
	            value: result.value,
	            scoretypename: 'aggregate',
	            apiname: result.apiname,
	            apitypename: result.apitypename,
	            constituentCount: 1
	         };
	      } else {
	         aggregatedResults[result.apiname].value += result.value;
	         aggregatedResults[result.apiname].constituentCount++;
	      }
	   });
	   _Object$keys(aggregatedResults).forEach(function (k) {
	      aggregatedResults[k].value = Math.floor(aggregatedResults[k].value / aggregatedResults[k].constituentCount);
	      results.push(aggregatedResults[k]);
	   });
	   return results;
	};

	var getResults = function getResults(id) {
	   return fetch('http://localhost:3000/getResult' + (id ? '/' + id : '')).then(function (r) {
	      return r.json().then(function (result) {
	         return aggregateResults(result);
	      });
	   });
	};

	var React = __webpack_require__(2);
	var AllView = __webpack_require__(173);
	var ApiView = __webpack_require__(219);

	var Router = __webpack_require__(180);
	var Route = Router.Route;
	var DefaultRoute = Router.DefaultRoute;
	var RouteHandler = Router.RouteHandler;
	var Navigation = Router.Navigation;
	var ResultOptions = __webpack_require__(179);

	var SuperAppView = (function (_React$Component) {
	   function SuperAppView() {
	      _classCallCheck(this, SuperAppView);

	      if (_React$Component != null) {
	         _React$Component.apply(this, arguments);
	      }
	   }

	   _inherits(SuperAppView, _React$Component);

	   _createClass(SuperAppView, [{
	      key: 'render',
	      value: function render() {

	         var paneStyle = {
	            width: '95%',
	            height: '95%',
	            marginRight: '2.5%',
	            marginLeft: '2.5%'
	         };

	         return React.createElement(
	            'div',
	            { style: paneStyle },
	            React.createElement(RouteHandler, null)
	         );
	      }
	   }]);

	   return SuperAppView;
	})(React.Component);

	var AppView = React.createClass({
	   displayName: 'AppView',

	   mixins: [Navigation],
	   getInitialState: function getInitialState() {
	      return {
	         header: '',
	         results: []
	      };
	   },
	   componentDidMount: function componentDidMount() {
	      this.filterResults();
	   },
	   componentDidUpdate: function componentDidUpdate(prevProps) {
	      if (prevProps !== this.props) {
	         this.filterResults();
	      }
	   },
	   filterResults: function filterResults() {
	      var _this = this;

	      var query = this.props.query;

	      getResults().then(function (results) {
	         if (query.id) {
	            results = results.filter(function (result) {
	               return result.testdataid === query.id;
	            });
	         }
	         if (!query.view) {
	            query.view = 'all';
	         }
	         if (query.view === 'api') {
	            if (!query.api) {
	               query.api = results[0].apitypename;
	            }
	            results = results.filter(function (result) {
	               return result.apitypename === query.api;
	            });
	         }
	         if (query.categories) {
	            query.categories = query.categories.split(',');
	            results = results.filter(function (result) {
	               return query.categories.indexOf(result.scoretypename) !== -1;
	            });
	         }
	         _this.setState({ results: results });
	         _this.setHeader(query.api || 'Aggregate Results');
	      });
	   },
	   changeView: function changeView(q) {
	      this.transitionTo('/', {}, q);
	      if (q.view === 'api') {
	         this.setHeader(q.api);
	      } else {
	         this.setHeader('Aggregate Results');
	      }
	   },
	   setHeader: function setHeader(text) {
	      this.setState({ header: text });
	   },
	   render: function render() {
	      var _this2 = this;

	      console.log('App view render');
	      var query = this.props.query || {};
	      var results = this.state.results;
	      console.log('app view results: ', results);
	      if (query.providers) {
	         if (!(query.providers instanceof Array)) {
	            query.providers = query.providers.split(',');
	         }
	         results = results.filter(function (result) {
	            return query.providers.indexOf(result.apiname) !== -1;
	         });
	      }
	      var view = ({
	         api: React.createElement(ApiView, { results: results, query: query, changeView: function (q) {
	               return _this2.changeView(q);
	            } }),
	         all: React.createElement(AllView, { results: results, query: query, changeView: function (q) {
	               return _this2.changeView(q);
	            } })
	      })[query.view || 'all'];
	      if (this.state.results.length === 0) {
	         view = null;
	      }
	      var possibleProviders = this.state.results.reduce(function (p, c) {
	         if (p.indexOf(c.apiname) === -1) {
	            p.push(c.apiname);
	         }
	         return p;
	      }, []);
	      return React.createElement(
	         'div',
	         null,
	         React.createElement(
	            'div',
	            { className: 'about' },
	            React.createElement(
	               'div',
	               { className: 'container' },
	               React.createElement(
	                  'section',
	                  { className: 'title-section' },
	                  React.createElement(
	                     'h1',
	                     { className: 'title-header' },
	                     this.state.header
	                  )
	               )
	            )
	         ),
	         React.createElement(
	            'div',
	            { className: 'contact' },
	            React.createElement(ResultOptions, {
	               api: query.api,
	               categories: query.categories,
	               providers: possibleProviders,
	               provider: _.intersection(query.providers, possibleProviders),
	               open: query.displayOpen === 'true',
	               changeView: function (q) {
	                  return _this2.changeView(q);
	               } }),
	            view
	         )
	      );
	   }
	});

	var routes = React.createElement(
	   Route,
	   { path: '/', handler: SuperAppView },
	   React.createElement(DefaultRoute, { handler: AppView })
	);

	Router.run(routes, Router.HashLocation, function (Root) {
	   React.render(React.createElement(Root, null), document.getElementById('app'));
	});

/***/ }
])
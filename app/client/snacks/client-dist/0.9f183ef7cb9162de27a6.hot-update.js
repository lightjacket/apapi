webpackHotUpdate(0,{

/***/ 1:
/***/ function(module, exports, __webpack_require__) {

	/*eslint-env node*/

	'use strict';

	var _inherits = __webpack_require__(2)['default'];

	var _createClass = __webpack_require__(7)['default'];

	var _classCallCheck = __webpack_require__(10)['default'];

	var _get = __webpack_require__(11)['default'];

	var _Promise = __webpack_require__(17)['default'];

	var testResults = [{
	   scores: [{
	      type: 'speed',
	      value: 90
	   }, {
	      type: 'accuracy',
	      value: 30
	   }],
	   api: { name: 'HP OCR', apitype: { name: 'OCR' } }
	}, {
	   scores: [{
	      type: 'speed',
	      value: 20
	   }, {
	      type: 'accuracy',
	      value: 40
	   }],
	   api: { name: 'IBM OCR', apitype: { name: 'OCR' } }
	}, {
	   scores: [{
	      type: 'speed',
	      value: 90
	   }, {
	      type: 'accuracy',
	      value: 30
	   }],
	   api: { name: 'HP Image Tagging', apitype: { name: 'Image Tagging' } }
	}, {
	   scores: [{
	      type: 'speed',
	      value: 20
	   }, {
	      type: 'accuracy',
	      value: 40
	   }],
	   api: { name: 'IBM Image Tagging', apitype: { name: 'Image Tagging' } }
	}];

	var aggregateResults = function aggregateResults(results) {
	   results.forEach(function (result) {
	      var scores = result.scores;
	      scores.push({
	         type: 'aggregate',
	         value: scores.reduce(function (p, c) {
	            return p + c.value;
	         }, 0) / scores.length
	      });
	   });
	   return results;
	};

	var getResults = function getResults() {
	   return new _Promise(function (resolve) {
	      resolve(aggregateResults(testResults));
	   });
	};

	var React = __webpack_require__(45);
	var AllView = __webpack_require__(201);
	var ApiView = __webpack_require__(206);

	var Router = __webpack_require__(207);
	var Route = Router.Route;
	var DefaultRoute = Router.DefaultRoute;
	var RouteHandler = Router.RouteHandler;

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

	var AppView = (function (_React$Component2) {
	   function AppView() {
	      _classCallCheck(this, AppView);

	      if (_React$Component2 != null) {
	         _React$Component2.apply(this, arguments);
	      }
	   }

	   _inherits(AppView, _React$Component2);

	   _createClass(AppView, [{
	      key: 'render',
	      value: function render() {
	         var query = this.props.query;

	         var view = ({
	            api: React.createElement(ApiViewWithResults, { query: query }),
	            all: React.createElement(AllViewWithResults, { query: query })
	         })[query.view];
	         return view;
	      }
	   }]);

	   return AppView;
	})(React.Component);

	var ViewWithResults = (function (_React$Component3) {
	   function ViewWithResults() {
	      var _this = this;

	      _classCallCheck(this, ViewWithResults);

	      _get(Object.getPrototypeOf(ViewWithResults.prototype), 'constructor', this).call(this);
	      getResults().then(function (results) {
	         var query = _this.props.query;

	         if (query.view === 'api' && !query.api) {
	            query.api = results[0].api.apitype.name;
	         }
	         results = results.filter(function (result) {
	            return result.api.apitype.name === query.api;
	         });
	         if (query.categories) {
	            query.categories = query.categories.split(',');
	            results.forEach(function (result) {
	               result.scores = result.scores.filter(function (score) {
	                  return query.categories.indexOf(score.type) !== -1;
	               });
	            });
	         }
	         _this.setState({ results: results });
	      });
	      this.state = { results: [] };
	   }

	   _inherits(ViewWithResults, _React$Component3);

	   return ViewWithResults;
	})(React.Component);

	var ApiViewWithResults = (function (_ViewWithResults) {
	   function ApiViewWithResults() {
	      _classCallCheck(this, ApiViewWithResults);

	      if (_ViewWithResults != null) {
	         _ViewWithResults.apply(this, arguments);
	      }
	   }

	   _inherits(ApiViewWithResults, _ViewWithResults);

	   _createClass(ApiViewWithResults, [{
	      key: 'render',
	      value: function render() {
	         return React.createElement(ApiView, { results: this.state.results });
	      }
	   }]);

	   return ApiViewWithResults;
	})(ViewWithResults);

	var AllViewWithResults = (function (_ViewWithResults2) {
	   function AllViewWithResults() {
	      _classCallCheck(this, AllViewWithResults);

	      if (_ViewWithResults2 != null) {
	         _ViewWithResults2.apply(this, arguments);
	      }
	   }

	   _inherits(AllViewWithResults, _ViewWithResults2);

	   _createClass(AllViewWithResults, [{
	      key: 'render',
	      value: function render() {
	         return React.createElement(AllView, { results: this.state.results });
	      }
	   }]);

	   return AllViewWithResults;
	})(ViewWithResults);

	var routes = React.createElement(
	   Route,
	   { path: 'index.html', handler: SuperAppView },
	   React.createElement(DefaultRoute, { handler: AppView })
	);

	Router.run(routes, Router.HistoryLocation, function (Root) {
	   React.render(React.createElement(Root, null), document.body);
	});

/***/ },

/***/ 17:
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(18), __esModule: true };

/***/ },

/***/ 18:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(19);
	__webpack_require__(25);
	__webpack_require__(30);
	__webpack_require__(33);
	module.exports = __webpack_require__(5).core.Promise;

/***/ },

/***/ 19:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(20)
	  , tmp = {};
	tmp[__webpack_require__(21)('toStringTag')] = 'z';
	if(__webpack_require__(5).FW && cof(tmp) != 'z'){
	  __webpack_require__(24)(Object.prototype, 'toString', function toString(){
	    return '[object ' + cof.classof(this) + ']';
	  }, true);
	}

/***/ },

/***/ 20:
/***/ function(module, exports, __webpack_require__) {

	var $        = __webpack_require__(5)
	  , TAG      = __webpack_require__(21)('toStringTag')
	  , toString = {}.toString;
	function cof(it){
	  return toString.call(it).slice(8, -1);
	}
	cof.classof = function(it){
	  var O, T;
	  return it == undefined ? it === undefined ? 'Undefined' : 'Null'
	    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T : cof(O);
	};
	cof.set = function(it, tag, stat){
	  if(it && !$.has(it = stat ? it : it.prototype, TAG))$.hide(it, TAG, tag);
	};
	module.exports = cof;

/***/ },

/***/ 21:
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(5).g
	  , store  = __webpack_require__(22)('wks');
	module.exports = function(name){
	  return store[name] || (store[name] =
	    global.Symbol && global.Symbol[name] || __webpack_require__(23).safe('Symbol.' + name));
	};

/***/ },

/***/ 22:
/***/ function(module, exports, __webpack_require__) {

	var $      = __webpack_require__(5)
	  , SHARED = '__core-js_shared__'
	  , store  = $.g[SHARED] || $.hide($.g, SHARED, {})[SHARED];
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },

/***/ 23:
/***/ function(module, exports, __webpack_require__) {

	var sid = 0;
	function uid(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++sid + Math.random()).toString(36));
	}
	uid.safe = __webpack_require__(5).g.Symbol || uid;
	module.exports = uid;

/***/ },

/***/ 24:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(5).hide;

/***/ },

/***/ 25:
/***/ function(module, exports, __webpack_require__) {

	var set   = __webpack_require__(5).set
	  , $at   = __webpack_require__(26)(true)
	  , ITER  = __webpack_require__(23).safe('iter')
	  , $iter = __webpack_require__(27)
	  , step  = $iter.step;

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(29)(String, 'String', function(iterated){
	  set(this, ITER, {o: String(iterated), i: 0});
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var iter  = this[ITER]
	    , O     = iter.o
	    , index = iter.i
	    , point;
	  if(index >= O.length)return step(1);
	  point = $at(O, index);
	  iter.i += point.length;
	  return step(0, point);
	});

/***/ },

/***/ 26:
/***/ function(module, exports, __webpack_require__) {

	// true  -> String#at
	// false -> String#codePointAt
	var $ = __webpack_require__(5);
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String($.assertDefined(that))
	      , i = $.toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l
	      || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	        ? TO_STRING ? s.charAt(i) : a
	        : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },

/***/ 27:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $                 = __webpack_require__(5)
	  , cof               = __webpack_require__(20)
	  , classof           = cof.classof
	  , assert            = __webpack_require__(28)
	  , assertObject      = assert.obj
	  , SYMBOL_ITERATOR   = __webpack_require__(21)('iterator')
	  , FF_ITERATOR       = '@@iterator'
	  , Iterators         = __webpack_require__(22)('iterators')
	  , IteratorPrototype = {};
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	setIterator(IteratorPrototype, $.that);
	function setIterator(O, value){
	  $.hide(O, SYMBOL_ITERATOR, value);
	  // Add iterator for FF iterator protocol
	  if(FF_ITERATOR in [])$.hide(O, FF_ITERATOR, value);
	}

	module.exports = {
	  // Safari has buggy iterators w/o `next`
	  BUGGY: 'keys' in [] && !('next' in [].keys()),
	  Iterators: Iterators,
	  step: function(done, value){
	    return {value: value, done: !!done};
	  },
	  is: function(it){
	    var O      = Object(it)
	      , Symbol = $.g.Symbol;
	    return (Symbol && Symbol.iterator || FF_ITERATOR) in O
	      || SYMBOL_ITERATOR in O
	      || $.has(Iterators, classof(O));
	  },
	  get: function(it){
	    var Symbol = $.g.Symbol
	      , getIter;
	    if(it != undefined){
	      getIter = it[Symbol && Symbol.iterator || FF_ITERATOR]
	        || it[SYMBOL_ITERATOR]
	        || Iterators[classof(it)];
	    }
	    assert($.isFunction(getIter), it, ' is not iterable!');
	    return assertObject(getIter.call(it));
	  },
	  set: setIterator,
	  create: function(Constructor, NAME, next, proto){
	    Constructor.prototype = $.create(proto || IteratorPrototype, {next: $.desc(1, next)});
	    cof.set(Constructor, NAME + ' Iterator');
	  }
	};

/***/ },

/***/ 28:
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(5);
	function assert(condition, msg1, msg2){
	  if(!condition)throw TypeError(msg2 ? msg1 + msg2 : msg1);
	}
	assert.def = $.assertDefined;
	assert.fn = function(it){
	  if(!$.isFunction(it))throw TypeError(it + ' is not a function!');
	  return it;
	};
	assert.obj = function(it){
	  if(!$.isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};
	assert.inst = function(it, Constructor, name){
	  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
	  return it;
	};
	module.exports = assert;

/***/ },

/***/ 29:
/***/ function(module, exports, __webpack_require__) {

	var $def            = __webpack_require__(15)
	  , $redef          = __webpack_require__(24)
	  , $               = __webpack_require__(5)
	  , cof             = __webpack_require__(20)
	  , $iter           = __webpack_require__(27)
	  , SYMBOL_ITERATOR = __webpack_require__(21)('iterator')
	  , FF_ITERATOR     = '@@iterator'
	  , KEYS            = 'keys'
	  , VALUES          = 'values'
	  , Iterators       = $iter.Iterators;
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCE){
	  $iter.create(Constructor, NAME, next);
	  function createMethod(kind){
	    function $$(that){
	      return new Constructor(that, kind);
	    }
	    switch(kind){
	      case KEYS: return function keys(){ return $$(this); };
	      case VALUES: return function values(){ return $$(this); };
	    } return function entries(){ return $$(this); };
	  }
	  var TAG      = NAME + ' Iterator'
	    , proto    = Base.prototype
	    , _native  = proto[SYMBOL_ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , _default = _native || createMethod(DEFAULT)
	    , methods, key;
	  // Fix native
	  if(_native){
	    var IteratorPrototype = $.getProto(_default.call(new Base));
	    // Set @@toStringTag to native iterators
	    cof.set(IteratorPrototype, TAG, true);
	    // FF fix
	    if($.FW && $.has(proto, FF_ITERATOR))$iter.set(IteratorPrototype, $.that);
	  }
	  // Define iterator
	  if($.FW)$iter.set(proto, _default);
	  // Plug for library
	  Iterators[NAME] = _default;
	  Iterators[TAG]  = $.that;
	  if(DEFAULT){
	    methods = {
	      keys:    IS_SET            ? _default : createMethod(KEYS),
	      values:  DEFAULT == VALUES ? _default : createMethod(VALUES),
	      entries: DEFAULT != VALUES ? _default : createMethod('entries')
	    };
	    if(FORCE)for(key in methods){
	      if(!(key in proto))$redef(proto, key, methods[key]);
	    } else $def($def.P + $def.F * $iter.BUGGY, NAME, methods);
	  }
	};

/***/ },

/***/ 30:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(31);
	var $           = __webpack_require__(5)
	  , Iterators   = __webpack_require__(27).Iterators
	  , ITERATOR    = __webpack_require__(21)('iterator')
	  , ArrayValues = Iterators.Array
	  , NL          = $.g.NodeList
	  , HTC         = $.g.HTMLCollection
	  , NLProto     = NL && NL.prototype
	  , HTCProto    = HTC && HTC.prototype;
	if($.FW){
	  if(NL && !(ITERATOR in NLProto))$.hide(NLProto, ITERATOR, ArrayValues);
	  if(HTC && !(ITERATOR in HTCProto))$.hide(HTCProto, ITERATOR, ArrayValues);
	}
	Iterators.NodeList = Iterators.HTMLCollection = ArrayValues;

/***/ },

/***/ 31:
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(5)
	  , setUnscope = __webpack_require__(32)
	  , ITER       = __webpack_require__(23).safe('iter')
	  , $iter      = __webpack_require__(27)
	  , step       = $iter.step
	  , Iterators  = $iter.Iterators;

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	__webpack_require__(29)(Array, 'Array', function(iterated, kind){
	  $.set(this, ITER, {o: $.toObject(iterated), i: 0, k: kind});
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var iter  = this[ITER]
	    , O     = iter.o
	    , kind  = iter.k
	    , index = iter.i++;
	  if(!O || index >= O.length){
	    iter.o = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	setUnscope('keys');
	setUnscope('values');
	setUnscope('entries');

/***/ },

/***/ 32:
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.31 Array.prototype[@@unscopables]
	var $           = __webpack_require__(5)
	  , UNSCOPABLES = __webpack_require__(21)('unscopables');
	if($.FW && !(UNSCOPABLES in []))$.hide(Array.prototype, UNSCOPABLES, {});
	module.exports = function(key){
	  if($.FW)[][UNSCOPABLES][key] = true;
	};

/***/ },

/***/ 33:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $        = __webpack_require__(5)
	  , ctx      = __webpack_require__(35)
	  , cof      = __webpack_require__(20)
	  , $def     = __webpack_require__(15)
	  , assert   = __webpack_require__(28)
	  , forOf    = __webpack_require__(36)
	  , setProto = __webpack_require__(38).set
	  , same     = __webpack_require__(34)
	  , species  = __webpack_require__(39)
	  , SPECIES  = __webpack_require__(21)('species')
	  , RECORD   = __webpack_require__(23).safe('record')
	  , PROMISE  = 'Promise'
	  , global   = $.g
	  , process  = global.process
	  , asap     = process && process.nextTick || __webpack_require__(40).set
	  , P        = global[PROMISE]
	  , isFunction     = $.isFunction
	  , isObject       = $.isObject
	  , assertFunction = assert.fn
	  , assertObject   = assert.obj
	  , Wrapper;

	function testResolve(sub){
	  var test = new P(function(){});
	  if(sub)test.constructor = Object;
	  return P.resolve(test) === test;
	}

	var useNative = function(){
	  var works = false;
	  function P2(x){
	    var self = new P(x);
	    setProto(self, P2.prototype);
	    return self;
	  }
	  try {
	    works = isFunction(P) && isFunction(P.resolve) && testResolve();
	    setProto(P2, P);
	    P2.prototype = $.create(P.prototype, {constructor: {value: P2}});
	    // actual Firefox has broken subclass support, test that
	    if(!(P2.resolve(5).then(function(){}) instanceof P2)){
	      works = false;
	    }
	  } catch(e){ works = false; }
	  return works;
	}();

	// helpers
	function isPromise(it){
	  return isObject(it) && (useNative ? cof.classof(it) == 'Promise' : RECORD in it);
	}
	function sameConstructor(a, b){
	  // library wrapper special case
	  if(!$.FW && a === P && b === Wrapper)return true;
	  return same(a, b);
	}
	function getConstructor(C){
	  var S = assertObject(C)[SPECIES];
	  return S != undefined ? S : C;
	}
	function isThenable(it){
	  var then;
	  if(isObject(it))then = it.then;
	  return isFunction(then) ? then : false;
	}
	function notify(record){
	  var chain = record.c;
	  if(chain.length)asap(function(){
	    var value = record.v
	      , ok    = record.s == 1
	      , i     = 0;
	    function run(react){
	      var cb = ok ? react.ok : react.fail
	        , ret, then;
	      try {
	        if(cb){
	          if(!ok)record.h = true;
	          ret = cb === true ? value : cb(value);
	          if(ret === react.P){
	            react.rej(TypeError('Promise-chain cycle'));
	          } else if(then = isThenable(ret)){
	            then.call(ret, react.res, react.rej);
	          } else react.res(ret);
	        } else react.rej(value);
	      } catch(err){
	        react.rej(err);
	      }
	    }
	    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
	    chain.length = 0;
	  });
	}
	function isUnhandled(promise){
	  var record = promise[RECORD]
	    , chain  = record.a || record.c
	    , i      = 0
	    , react;
	  if(record.h)return false;
	  while(chain.length > i){
	    react = chain[i++];
	    if(react.fail || !isUnhandled(react.P))return false;
	  } return true;
	}
	function $reject(value){
	  var record = this
	    , promise;
	  if(record.d)return;
	  record.d = true;
	  record = record.r || record; // unwrap
	  record.v = value;
	  record.s = 2;
	  record.a = record.c.slice();
	  setTimeout(function(){
	    asap(function(){
	      if(isUnhandled(promise = record.p)){
	        if(cof(process) == 'process'){
	          process.emit('unhandledRejection', value, promise);
	        } else if(global.console && isFunction(console.error)){
	          console.error('Unhandled promise rejection', value);
	        }
	      }
	      record.a = undefined;
	    });
	  }, 1);
	  notify(record);
	}
	function $resolve(value){
	  var record = this
	    , then, wrapper;
	  if(record.d)return;
	  record.d = true;
	  record = record.r || record; // unwrap
	  try {
	    if(then = isThenable(value)){
	      wrapper = {r: record, d: false}; // wrap
	      then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	    } else {
	      record.v = value;
	      record.s = 1;
	      notify(record);
	    }
	  } catch(err){
	    $reject.call(wrapper || {r: record, d: false}, err); // wrap
	  }
	}

	// constructor polyfill
	if(!useNative){
	  // 25.4.3.1 Promise(executor)
	  P = function Promise(executor){
	    assertFunction(executor);
	    var record = {
	      p: assert.inst(this, P, PROMISE),       // <- promise
	      c: [],                                  // <- awaiting reactions
	      a: undefined,                           // <- checked in isUnhandled reactions
	      s: 0,                                   // <- state
	      d: false,                               // <- done
	      v: undefined,                           // <- value
	      h: false                                // <- handled rejection
	    };
	    $.hide(this, RECORD, record);
	    try {
	      executor(ctx($resolve, record, 1), ctx($reject, record, 1));
	    } catch(err){
	      $reject.call(record, err);
	    }
	  };
	  __webpack_require__(43)(P.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var S = assertObject(assertObject(this).constructor)[SPECIES];
	      var react = {
	        ok:   isFunction(onFulfilled) ? onFulfilled : true,
	        fail: isFunction(onRejected)  ? onRejected  : false
	      };
	      var promise = react.P = new (S != undefined ? S : P)(function(res, rej){
	        react.res = assertFunction(res);
	        react.rej = assertFunction(rej);
	      });
	      var record = this[RECORD];
	      record.c.push(react);
	      if(record.a)record.a.push(react);
	      if(record.s)notify(record);
	      return promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	}

	// export
	$def($def.G + $def.W + $def.F * !useNative, {Promise: P});
	cof.set(P, PROMISE);
	species(P);
	species(Wrapper = $.core[PROMISE]);

	// statics
	$def($def.S + $def.F * !useNative, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    return new (getConstructor(this))(function(res, rej){ rej(r); });
	  }
	});
	$def($def.S + $def.F * (!useNative || testResolve(true)), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    return isPromise(x) && sameConstructor(x.constructor, this)
	      ? x : new this(function(res){ res(x); });
	  }
	});
	$def($def.S + $def.F * !(useNative && __webpack_require__(44)(function(iter){
	  P.all(iter)['catch'](function(){});
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C      = getConstructor(this)
	      , values = [];
	    return new C(function(res, rej){
	      forOf(iterable, false, values.push, values);
	      var remaining = values.length
	        , results   = Array(remaining);
	      if(remaining)$.each.call(values, function(promise, index){
	        C.resolve(promise).then(function(value){
	          results[index] = value;
	          --remaining || res(results);
	        }, rej);
	      });
	      else res(results);
	    });
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C = getConstructor(this);
	    return new C(function(res, rej){
	      forOf(iterable, false, function(promise){
	        C.resolve(promise).then(res, rej);
	      });
	    });
	  }
	});

/***/ },

/***/ 34:
/***/ function(module, exports, __webpack_require__) {

	module.exports = Object.is || function is(x, y){
	  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	};

/***/ },

/***/ 35:
/***/ function(module, exports, __webpack_require__) {

	// Optional / simple context binding
	var assertFunction = __webpack_require__(28).fn;
	module.exports = function(fn, that, length){
	  assertFunction(fn);
	  if(~length && that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  } return function(/* ...args */){
	      return fn.apply(that, arguments);
	    };
	};

/***/ },

/***/ 36:
/***/ function(module, exports, __webpack_require__) {

	var ctx  = __webpack_require__(35)
	  , get  = __webpack_require__(27).get
	  , call = __webpack_require__(37);
	module.exports = function(iterable, entries, fn, that){
	  var iterator = get(iterable)
	    , f        = ctx(fn, that, entries ? 2 : 1)
	    , step;
	  while(!(step = iterator.next()).done){
	    if(call(iterator, f, step.value, entries) === false){
	      return call.close(iterator);
	    }
	  }
	};

/***/ },

/***/ 37:
/***/ function(module, exports, __webpack_require__) {

	var assertObject = __webpack_require__(28).obj;
	function close(iterator){
	  var ret = iterator['return'];
	  if(ret !== undefined)assertObject(ret.call(iterator));
	}
	function call(iterator, fn, value, entries){
	  try {
	    return entries ? fn(assertObject(value)[0], value[1]) : fn(value);
	  } catch(e){
	    close(iterator);
	    throw e;
	  }
	}
	call.close = close;
	module.exports = call;

/***/ },

/***/ 38:
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var $      = __webpack_require__(5)
	  , assert = __webpack_require__(28);
	function check(O, proto){
	  assert.obj(O);
	  assert(proto === null || $.isObject(proto), proto, ": can't set as prototype!");
	}
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} // eslint-disable-line
	    ? function(buggy, set){
	        try {
	          set = __webpack_require__(35)(Function.call, $.getDesc(Object.prototype, '__proto__').set, 2);
	          set({}, []);
	        } catch(e){ buggy = true; }
	        return function setPrototypeOf(O, proto){
	          check(O, proto);
	          if(buggy)O.__proto__ = proto;
	          else set(O, proto);
	          return O;
	        };
	      }()
	    : undefined),
	  check: check
	};

/***/ },

/***/ 39:
/***/ function(module, exports, __webpack_require__) {

	var $       = __webpack_require__(5)
	  , SPECIES = __webpack_require__(21)('species');
	module.exports = function(C){
	  if($.DESC && !(SPECIES in C))$.setDesc(C, SPECIES, {
	    configurable: true,
	    get: $.that
	  });
	};

/***/ },

/***/ 40:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $      = __webpack_require__(5)
	  , ctx    = __webpack_require__(35)
	  , cof    = __webpack_require__(20)
	  , invoke = __webpack_require__(41)
	  , cel    = __webpack_require__(42)
	  , global             = $.g
	  , isFunction         = $.isFunction
	  , html               = $.html
	  , process            = global.process
	  , setTask            = global.setImmediate
	  , clearTask          = global.clearImmediate
	  , postMessage        = global.postMessage
	  , addEventListener   = global.addEventListener
	  , MessageChannel     = global.MessageChannel
	  , counter            = 0
	  , queue              = {}
	  , ONREADYSTATECHANGE = 'onreadystatechange'
	  , defer, channel, port;
	function run(){
	  var id = +this;
	  if($.has(queue, id)){
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	}
	function listner(event){
	  run.call(event.data);
	}
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if(!isFunction(setTask) || !isFunction(clearTask)){
	  setTask = function(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(isFunction(fn) ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function(id){
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if(cof(process) == 'process'){
	    defer = function(id){
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Modern browsers, skip implementation for WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is object
	  } else if(addEventListener && isFunction(postMessage) && !global.importScripts){
	    defer = function(id){
	      postMessage(id, '*');
	    };
	    addEventListener('message', listner, false);
	  // WebWorkers
	  } else if(isFunction(MessageChannel)){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listner;
	    defer = ctx(port.postMessage, port, 1);
	  // IE8-
	  } else if(ONREADYSTATECHANGE in cel('script')){
	    defer = function(id){
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set:   setTask,
	  clear: clearTask
	};

/***/ },

/***/ 41:
/***/ function(module, exports, __webpack_require__) {

	// Fast apply
	// http://jsperf.lnkit.com/fast-apply/5
	module.exports = function(fn, args, that){
	  var un = that === undefined;
	  switch(args.length){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	    case 5: return un ? fn(args[0], args[1], args[2], args[3], args[4])
	                      : fn.call(that, args[0], args[1], args[2], args[3], args[4]);
	  } return              fn.apply(that, args);
	};

/***/ },

/***/ 42:
/***/ function(module, exports, __webpack_require__) {

	var $        = __webpack_require__(5)
	  , document = $.g.document
	  , isObject = $.isObject
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },

/***/ 43:
/***/ function(module, exports, __webpack_require__) {

	var $redef = __webpack_require__(24);
	module.exports = function(target, src){
	  for(var key in src)$redef(target, key, src[key]);
	  return target;
	};

/***/ },

/***/ 44:
/***/ function(module, exports, __webpack_require__) {

	var SYMBOL_ITERATOR = __webpack_require__(21)('iterator')
	  , SAFE_CLOSING    = false;
	try {
	  var riter = [7][SYMBOL_ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }
	module.exports = function(exec){
	  if(!SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[SYMBOL_ITERATOR]();
	    iter.next = function(){ safe = true; };
	    arr[SYMBOL_ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },

/***/ 201:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _inherits = __webpack_require__(2)['default'];

	var _get = __webpack_require__(11)['default'];

	var _createClass = __webpack_require__(7)['default'];

	var _classCallCheck = __webpack_require__(10)['default'];

	var _Object$keys = __webpack_require__(202)['default'];

	var React = __webpack_require__(45);
	var ScoreGraph = __webpack_require__(204);

	var AllView = (function (_React$Component) {
		function AllView() {
			_classCallCheck(this, AllView);

			_get(Object.getPrototypeOf(AllView.prototype), 'constructor', this).call(this);
			this.state = {};
		}

		_inherits(AllView, _React$Component);

		_createClass(AllView, [{
			key: 'render',
			value: function render() {
				var resultsByApi = {};
				this.props.results.forEach(function (result) {
					var score = result.scores.filter(function (s) {
						return s.type === 'aggregate';
					})[0].value;
					if (!resultsByApi[result.api.apitype.name]) {
						resultsByApi[result.api.apitype.name] = [{ title: result.api.name, score: score }];
					} else {
						resultsByApi[result.api.apitype.name].push({ title: result.api.name, score: score });
					}
				});

				var scoreGraphs = _Object$keys(resultsByApi).map(function (type) {
					return React.createElement(ScoreGraph, { showTitle: true, title: type, scores: resultsByApi[type] });
				});

				return React.createElement(
					'div',
					null,
					React.createElement(
						'h2',
						null,
						'Aggregate Results'
					),
					scoreGraphs
				);
			}
		}]);

		return AllView;
	})(React.Component);

	module.exports = AllView;

/***/ },

/***/ 205:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _inherits = __webpack_require__(2)['default'];

	var _get = __webpack_require__(11)['default'];

	var _createClass = __webpack_require__(7)['default'];

	var _classCallCheck = __webpack_require__(10)['default'];

	var React = __webpack_require__(45);

	var ScoreLine = (function (_React$Component) {
		function ScoreLine() {
			_classCallCheck(this, ScoreLine);

			_get(Object.getPrototypeOf(ScoreLine.prototype), 'constructor', this).call(this);
			this.state = {
				animated: false
			};
		}

		_inherits(ScoreLine, _React$Component);

		_createClass(ScoreLine, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				var _this = this;

				setTimeout(function () {
					return _this.setState({ animated: true });
				}, 17);
			}
		}, {
			key: 'render',
			value: function render() {
				return React.createElement(
					'div',
					{ className: 'apiRow' },
					React.createElement(
						'div',
						{ className: 'scoreHolder' },
						React.createElement('div', { className: 'resultScore', style: {
								width: (this.state.animated ? this.props.score : 0) + '%'
							} })
					),
					React.createElement(
						'div',
						{ className: 'providerName' },
						this.props.title
					),
					React.createElement(
						'div',
						{ className: 'scoreLabel', style: {
								color: this.props.score < 40 ? 'red' : 'green'
							} },
						this.props.score
					)
				);
			}
		}]);

		return ScoreLine;
	})(React.Component);

	module.exports = ScoreLine;

/***/ },

/***/ 206:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _inherits = __webpack_require__(2)['default'];

	var _get = __webpack_require__(11)['default'];

	var _createClass = __webpack_require__(7)['default'];

	var _classCallCheck = __webpack_require__(10)['default'];

	var _Object$keys = __webpack_require__(202)['default'];

	var React = __webpack_require__(45);
	var ScoreGraph = __webpack_require__(204);

	var ApiView = (function (_React$Component) {
		function ApiView() {
			_classCallCheck(this, ApiView);

			_get(Object.getPrototypeOf(ApiView.prototype), 'constructor', this).call(this);
			this.state = {};
		}

		_inherits(ApiView, _React$Component);

		_createClass(ApiView, [{
			key: 'render',
			value: function render() {
				var resultsByCategory = {};
				this.props.results.forEach(function (result) {
					result.scores.forEach(function (score) {
						if (!resultsByCategory[score.type]) {
							resultsByCategory[score.type] = [{ title: result.api.name, score: score.value }];
						} else {
							resultsByCategory[score.type].push({ title: result.api.name, score: score.value });
						}
					});
				});

				var scoreGraphs = _Object$keys(resultsByCategory).map(function (type) {
					return React.createElement(ScoreGraph, { showTitle: true, title: type, scores: resultsByCategory[type] });
				});

				return React.createElement(
					'div',
					null,
					React.createElement(
						'h2',
						null,
						this.props.results[0] ? this.props.results[0].api.apitype.name : ''
					),
					scoreGraphs
				);
			}
		}]);

		return ApiView;
	})(React.Component);

	module.exports = ApiView;

/***/ }

})
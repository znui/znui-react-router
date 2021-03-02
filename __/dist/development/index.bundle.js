(function(e, a) { for(var i in a) e[i] = a[i]; }(this, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./HashHandler.js":
/*!************************!*\
  !*** ./HashHandler.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var RequestHandler = __webpack_require__(/*! ./RequestHandler */ "./RequestHandler.js");

module.exports = zn.Class(RequestHandler, {
  events: ['hashchange', 'handler'],
  properties: {},
  methods: {
    init: function init(argv, events) {
      this.__initEvents(events);

      if (this["super"].caller) {
        this["super"](argv);
      } else {
        this.constructor._super_.prototype.init(argv, events);
      }

      if (this._main.length && !location.hash) {
        location.hash = this._main.pop();
      } else {
        this.__hashchange();
      }

      window.addEventListener('hashchange', this.__hashchange.bind(this), false);
    },
    __initEvents: function __initEvents(events) {
      if (events && _typeof(events) == 'object') {
        for (var event in events) {
          this.on(event, events[event], this);
        }
      }
    },
    __hashchange: function __hashchange(event) {
      var _return = this.fire('hashchange', event);

      if (_return === false) return false;

      var _hash = this.__parseHash(),
          _request = this.createRequest(_hash, event);

      _return = this.fire('handler', event, _hash);
      if (_return === false) return false;
      this.doRequest(_request);
    },
    __parseHash: function __parseHash() {
      var _hash = location.hash,
          _search = location.search,
          _hashSplitIndex = _hash.indexOf('?');

      if (_search && _search.indexOf('?') !== -1) {
        _search = _search.replace('?', '');
      }

      if (_hashSplitIndex !== -1) {
        _search = _search + '&' + _hash.substring(_hashSplitIndex + 1);
        _hash = _hash.substring(0, _hashSplitIndex);
      }

      return {
        path: _hash.substring(1),
        search: zn.querystring.parse(_search)
      };
    }
  }
});

/***/ }),

/***/ "./HashRouter.js":
/*!***********************!*\
  !*** ./HashRouter.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var React = znui.React || __webpack_require__(/*! react */ "react");

var HashHandler = __webpack_require__(/*! ./HashHandler */ "./HashHandler.js");

var error = __webpack_require__(/*! ./error/index.js */ "./error/index.js");

module.exports = React.createClass({
  displayName: 'ZRHashRouter',
  getInitialState: function getInitialState() {
    return {
      component: null,
      Component: null,
      ComponentProps: null
    };
  },
  componentDidMount: function componentDidMount() {
    this.__initHandler();
  },
  __initHandler: function __initHandler() {
    this._handler = new HashHandler(this.props, {
      hashchange: this.__hashchange,
      handler: this.__handler,
      request: this.__request,
      notfound: this.__notfound,
      pluginloaded: this.__pluginLoaded
    });
    this.props.onInitHandler && this.props.onInitHandler(this._handler, this);
  },
  __hashchange: function __hashchange(sender, event) {
    this.props.onHashChange && this.props.onHashChange(event, this);
  },
  __handler: function __handler(sender, event, data) {
    this.props.onHandler && this.props.onHandler(event, data, this);
  },
  __request: function __request(sender, request, route) {
    if (route.component && _typeof(route.component) == 'object' && route.component.$$typeof) {
      this.setState({
        component: route.component
      });
    } else {
      this.setState({
        Component: route.component,
        ComponentProps: zn.extend({}, route.props, {
          application: this.props.application,
          request: request,
          router: this,
          route: route
        })
      });
    }

    this.props.onRequest && this.props.onRequest(request, route, this);
  },
  __notfound: function __notfound(sender, request) {
    this.notfound(request);
    this.props.onNotFound && this.props.onNotFound(request, this);
  },
  __pluginLoaded: function __pluginLoaded(sender, data) {
    this.props.onPluginLoaded && this.props.onPluginLoaded(data, this);
  },
  push: function push() {},
  forward: function forward() {},
  notfound: function notfound(request) {
    this.setState({
      Component: error.Error404,
      ComponentProps: {
        request: request
      }
    });
  },
  render: function render() {
    return /*#__PURE__*/React.createElement("div", {
      className: znui.react.classname("zr-hash-router", this.props.className),
      style: this.props.style
    }, this.state.component, this.state.Component && /*#__PURE__*/React.createElement(this.state.Component, this.state.ComponentProps));
  }
});

/***/ }),

/***/ "./PathMatcher.js":
/*!************************!*\
  !*** ./PathMatcher.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

module.exports = zn.Class({
  events: ['pluginLoading', 'pluginLoaded', 'routeLoading', 'routeLoaded'],
  properties: {
    pathSeparator: null,
    pathParameterSymbol: null
  },
  methods: {
    init: function init(argv, events) {
      this.__initEvents(events);

      this._pathSeparator = argv.pathSeparator || '/';
      this._pathParameterSymbol = argv.pathParameterSymbol || ':';
    },
    __initEvents: function __initEvents(events) {
      if (events && _typeof(events) == 'object') {
        for (var event in events) {
          this.on(event, events[event], this);
        }
      }
    },
    formatRoute: function formatRoute(route, parent) {
      var _return = this.fire('routeLoading', route, parent);

      if (_return === false) {
        return;
      }

      if (parent) {
        route.__parent__ = parent;
      }

      route.paths = this.__parseRoutePaths(route.path);
      route.props = zn.extend({}, route.props);

      if (route.exact == null && route.path.indexOf(this._pathParameterSymbol) === -1) {
        route.exact = true;
      }

      return this.fire('routeLoaded', route), route;
    },
    formatRoutes: function formatRoutes(routes, parent) {
      var _this = this;

      switch (zn.type(routes)) {
        case 'object':
          var _routes = [];

          for (var path in routes) {
            _routes.push(this.__loadPathAndComponent(path, routes[path], parent));
          }

          return _routes;

        case 'array':
          return routes.map(function (route) {
            return _this.formatRoute(route, parent);
          });

        case 'function':
          return this.formatRoutes(routes.call(null, parent, this), parent);
      }
    },
    getRouteForRequest: function getRouteForRequest(request, routes) {
      var _routes = routes,
          _route = null,
          _data = null;

      for (var i = 0, _len = _routes.length; i < _len; i++) {
        _route = _routes[i];
        _data = this.__matchRouteAndRequest(_route, request);

        if (_data) {
          break;
        }
      }

      if (!_data || !_route) {
        return;
      }

      return request.params = _data, _route;
    },
    getRoutesFromRoute: function getRoutesFromRoute(route) {
      var _routes = [],
          _component = route.component;

      if (route.routes) {
        _routes = this.formatRoutes(route.routes, route);
      }

      if (route.plugins) {
        var _plugins = this.__loadPlugins(route.plugins, route);

        _routes = _routes.concat(_plugins.routes);

        if (!_component && _plugins.main.length) {
          _component = _plugins.main.pop();
        }
      }

      return {
        routes: _routes,
        component: _component
      };
    },
    __isReactComponent: function __isReactComponent(component) {
      if (component && zn.is(component, 'function') && (component.prototype.render || component.displayName || component.prototype.isReactComponent)) {
        return true;
      }

      return false;
    },
    __loadPathAndComponent: function __loadPathAndComponent(path, component, parent) {
      var _route = {
        path: path
      };

      switch (zn.type(component)) {
        case 'string':
          _route.component = zn.path(window, component);
          break;

        case 'function':
          if (!this.__isReactComponent(component)) {
            _route.component = component.call(this, path, this);
          } else {
            _route.component = component;
          }

          break;

        case 'object':
          if (component.$$typeof) {
            _route.component = component;
          } else if (component.constructor.toString().indexOf('function Object') == 0) {
            zn.extend(_route, component);

            if (_route.extension !== false) {
              this.__initRoute(_route);
            }
          }

          break;
      }

      return this.formatRoute(_route, parent);
    },
    __initRoute: function __initRoute(route) {
      if (route.routes) {
        route.__routes__ = this.formatRoutes(route.routes, route);
      }

      if (route.plugins) {
        var _plugins = this.__loadPlugins(route.plugins, route);

        if (route.__routes__) {
          route.__routes__ = route.__routes__.concat(_plugins.routes);
        } else {
          route.__routes__ = _plugins.routes;
        }

        route.main = _plugins.main;

        if (!route.component && _plugins.main.length) {
          route.component = _plugins.main.pop();
        }
      }

      return route;
    },
    __loadPlugins: function __loadPlugins(plugins, parent) {
      var _plugins = plugins || [],
          _plugin = null,
          _routes = [],
          _main = [],
          _pluginMain = null;

      switch (zn.type(plugins)) {
        case 'object':
          _plugins = [plugins];
          break;

        case 'function':
          _plugins = plugins(this);
          break;
      }

      if (_plugins && _plugins.length) {
        plugins.forEach(function (plugin) {
          _plugin = this.__loadPlugin(plugin, parent);

          if (_plugin) {
            if (_plugin.__routes__) {
              _routes = _routes.concat(_plugin.__routes__);
            }

            if (_plugin.main) {
              _pluginMain = _plugin.main;

              switch (zn.type(_main)) {
                case 'string':
                  _pluginMain = _plugin.routes[_pluginMain] || zn.path(_plugin.components, _pluginMain) || zn.path(window, _pluginMain);
                  break;

                case 'function':
                  if (_pluginMain.constructor.toString() == "function Function() { [native code] }") {
                    _pluginMain = _pluginMain(this);
                  }

                  break;

                default:
                  return;
              }

              _main.push(_pluginMain);
            }
          }
        }.bind(this));
      }

      return {
        routes: _routes,
        main: _main
      };
    },
    __loadPlugin: function __loadPlugin(plugin, parent) {
      var _plugin = plugin || {},
          _return = this.fire('pluginLoading', plugin, parent);

      if (_return === false) {
        return;
      }

      switch (zn.type(plugin)) {
        case 'object':
          _plugin = _plugin;
          break;

        case 'function':
          _plugin = _plugin(this);
          break;
      }

      if (_plugin.namespace && _plugin.components) {
        zn.path(window, _plugin.namespace, _plugin.components);
      }

      _plugin.__routes__ = this.formatRoutes(_plugin.routes || [], parent);
      return this.fire('pluginLoaded', _plugin), _plugin;
    },
    __matchRouteAndRequest: function __matchRouteAndRequest(route, request) {
      var _paths = route.paths,
          _path = null,
          _params = {},
          _urlUnmatchs = [],
          _hasChecked = false,
          _temp = null,
          _temps = request.path.split(this._pathSeparator);

      if (route.routes && Object.keys(route.routes).length) {
        if (route.exact == null) {
          route.exact = false;
        }
      }

      if (route.exact) {
        if (route.path === request.path) {
          return request.unmatchs = _urlUnmatchs, _params;
        }

        if (_temps.length !== _paths.length) {
          return false;
        }
      }

      for (var i = 0, _len = _temps.length; i < _len; i++) {
        _temp = _temps[i];

        if (!_temp) {
          continue;
        }

        _path = _paths[i];
        _hasChecked = true;

        if (!_path) {
          _urlUnmatchs.push(_temp);

          continue;
        }

        if (!_path.isParameter && _temp !== _path.key) {
          return false;
        }

        if (_path.isParameter) {
          _params[_path.key] = _temp;
        }
      }

      if (!_hasChecked) {
        return false;
      }

      return request.unmatchs = _urlUnmatchs, _params;
    },
    __parseRoutePaths: function __parseRoutePaths(path) {
      var _paths = [],
          _temp = null,
          _temps = path.split(this._pathSeparator);

      for (var i = 0, _len = _temps.length; i < _len; i++) {
        _temp = _temps[i];

        if (!_temp) {
          continue;
        }

        if (/^:\w[\w\d]*$/.test(_temp)) {
          _temp = _temp.replace(/^:/, '');
          _paths[i] = {
            key: _temp,
            isParameter: true
          };
        } else {
          _paths[i] = {
            key: _temp
          };
        }
      }

      return _paths;
    }
  }
});

/***/ }),

/***/ "./RequestHandler.js":
/*!***************************!*\
  !*** ./RequestHandler.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var PathMatcher = __webpack_require__(/*! ./PathMatcher */ "./PathMatcher.js");

module.exports = zn.Class({
  events: ['request', 'notfound', 'pluginLoading', 'pluginLoaded'],
  properties: {
    requests: null,
    routes: null,
    plugins: null,
    main: null,
    matcher: null
  },
  methods: {
    init: function init(argv, events) {
      this._requests = [];
      this._routes = [];
      this._plugins = [];
      this._main = [];
      this._matcher = new PathMatcher(argv, {
        pluginLoaded: function (sender, plugin) {
          this.fire('pluginLoaded', plugin);
        }.bind(this)
      });

      this.__initEvents(events);

      this.loadPlugins(argv.plugins);
      this.loadRoutes(argv.routes);

      if (argv.main) {
        this._main.push(argv.main);
      }
    },
    __initEvents: function __initEvents(events) {
      if (events && _typeof(events) == 'object') {
        for (var event in events) {
          this.on(event, events[event], this);
        }
      }
    },
    createRequest: function createRequest(request, event) {
      request.event = event;
      return this._requests.push(request), request;
    },
    doRequest: function doRequest(request) {
      var _route = this._matcher.getRouteForRequest(request, this._routes);

      request.matcher = this._matcher;

      if (_route) {
        this.fire('request', request, _route);
      } else {
        this.fire('notfound', request);
      }
    },
    loadPlugins: function loadPlugins(plugins) {
      var _plugins = plugins || [];

      switch (zn.type(plugins)) {
        case 'string':
          _plugins = [plugins];
          break;

        case 'function':
          _plugins = plugins(this);
          break;
      }

      if (_plugins && _plugins.length) {
        plugins.forEach(function (plugin) {
          this.loadPlugin(plugin);
        }.bind(this));
      }

      return this;
    },
    loadPlugin: function loadPlugin(plugin) {
      var _plugin = plugin || {},
          _return = this.fire('pluginLoading', plugin);

      if (_return === false) {
        return;
      }

      switch (zn.type(plugin)) {
        case 'object':
          _plugin = _plugin;
          break;

        case 'function':
          _plugin = _plugin(this);
          break;
      }

      if (_plugin.main) {
        this._main.push(_plugin.main);
      }

      if (_plugin.namespace && _plugin.components) {
        zn.path(window, _plugin.namespace, _plugin.components);
      }

      var _routes = this._matcher.formatRoutes(_plugin.routes || []);

      _plugin.__routes__ = _routes;

      this._plugins.push(_plugin);

      this.fire('pluginLoaded', _plugin);
      return this._routes = this._routes.concat(_routes), _routes;
    },
    loadRoutes: function loadRoutes(routes) {
      var _routes = this._matcher.formatRoutes(routes);

      return this._routes = this._routes.concat(_routes), _routes;
    },
    loadRoute: function loadRoute(route) {
      this._routes.push(this._matcher.formatRoute(route));
    }
  }
});

/***/ }),

/***/ "./Route.js":
/*!******************!*\
  !*** ./Route.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var React = znui.React || __webpack_require__(/*! react */ "react");

var error = __webpack_require__(/*! ./error/index.js */ "./error/index.js");

var ZRRoute = React.createClass({
  displayName: 'ZRRoute',
  __handler: function __handler() {
    var _request = this.props.request,
        _matcher = _request.matcher,
        _newRequest = {
      path: _request.path.replace(this.props.route.path, ''),
      search: _request.search,
      event: _request.event,
      matcher: _matcher
    },
        _routes = this.props.route.__routes__,
        _route = null,
        _component = null;

    if (!_routes) {
      var _fRoute = _matcher.getRoutesFromRoute(this.props.route);

      _routes = _fRoute.routes;
      _component = _fRoute.component;
    }

    _route = _matcher.getRouteForRequest(_newRequest, _routes);

    if (_route) {
      return {
        Component: _route.component || _component,
        ComponentProps: zn.extend({}, _route.props, {
          application: this.props.application,
          parent: this,
          parentRequest: _request,
          route: _route,
          router: this.props.router,
          request: _newRequest
        })
      };
    } else {
      return {
        Component: error.Error404,
        ComponentProps: {
          application: this.props.application,
          parent: this,
          parentRequest: _request,
          router: this.props.router,
          request: _newRequest
        }
      };
    }
  },
  __getComponent: function __getComponent() {
    return this.__handler();
  },
  render: function render() {
    if (this.props.request && this.props.route && this.props.route.routes) {
      var _Component = this.__getComponent();

      return /*#__PURE__*/React.createElement("div", {
        className: znui.react.classname("zr-route", this.props.className),
        style: this.props.style
      }, _Component.Component && /*#__PURE__*/React.createElement(_Component.Component, _Component.ComponentProps));
    } else {
      return null;
    }
  }
});
module.exports = ZRRoute;

/***/ }),

/***/ "./Util.js":
/*!*****************!*\
  !*** ./Util.js ***!
  \*****************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = zn.Class({
  "static": true,
  methods: {
    init: function init() {
      this.fixWindowHashChange();
    },
    fixWindowHashChange: function fixWindowHashChange() {
      // Let this snippet run before your hashchange event binding code
      if (!window.HashChangeEvent) {
        (function () {
          var lastURL = document.URL;
          window.addEventListener("hashchange", function (event) {
            Object.defineProperty(event, "oldURL", {
              enumerable: true,
              configurable: true,
              value: lastURL
            });
            Object.defineProperty(event, "newURL", {
              enumerable: true,
              configurable: true,
              value: document.URL
            });
            lastURL = document.URL;
          });
        })();
      }
    }
  }
});

/***/ }),

/***/ "./error/Error404.js":
/*!***************************!*\
  !*** ./error/Error404.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var React = znui.React || __webpack_require__(/*! react */ "react");

module.exports = React.createClass({
  displayName: 'Error404',
  render: function render() {
    return /*#__PURE__*/React.createElement("div", {
      className: znui.react.classname('zr-router-error-404', this.props.className),
      style: this.props.style
    }, /*#__PURE__*/React.createElement("div", {
      className: "error-header"
    }, /*#__PURE__*/React.createElement("h3", null, "ERROR: 404")), /*#__PURE__*/React.createElement("div", {
      className: "error-body"
    }, "The path ", /*#__PURE__*/React.createElement("span", {
      className: "path"
    }, this.props.request.path), " is not found."), /*#__PURE__*/React.createElement("div", {
      className: "error-footer"
    }));
  }
});

/***/ }),

/***/ "./error/index.js":
/*!************************!*\
  !*** ./error/index.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  'Error404': __webpack_require__(/*! ./Error404.js */ "./error/Error404.js")
};

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./Util.js */ "./Util.js");

module.exports = {
  HashRouter: __webpack_require__(/*! ./HashRouter.js */ "./HashRouter.js"),
  Route: __webpack_require__(/*! ./Route */ "./Route.js")
};

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["React"]; }());

/***/ })

/******/ })));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vSGFzaEhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vSGFzaFJvdXRlci5qcyIsIndlYnBhY2s6Ly8vLi9QYXRoTWF0Y2hlci5qcyIsIndlYnBhY2s6Ly8vLi9SZXF1ZXN0SGFuZGxlci5qcyIsIndlYnBhY2s6Ly8vLi9Sb3V0ZS5qcyIsIndlYnBhY2s6Ly8vLi9VdGlsLmpzIiwid2VicGFjazovLy8uL2Vycm9yL0Vycm9yNDA0LmpzIiwid2VicGFjazovLy8uL2Vycm9yL2luZGV4LmpzIiwid2VicGFjazovLy8uL2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcIlJlYWN0XCIiXSwibmFtZXMiOlsiUmVxdWVzdEhhbmRsZXIiLCJyZXF1aXJlIiwibW9kdWxlIiwiZXhwb3J0cyIsInpuIiwiQ2xhc3MiLCJldmVudHMiLCJwcm9wZXJ0aWVzIiwibWV0aG9kcyIsImluaXQiLCJhcmd2IiwiX19pbml0RXZlbnRzIiwiY2FsbGVyIiwiY29uc3RydWN0b3IiLCJfc3VwZXJfIiwicHJvdG90eXBlIiwiX21haW4iLCJsZW5ndGgiLCJsb2NhdGlvbiIsImhhc2giLCJwb3AiLCJfX2hhc2hjaGFuZ2UiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiYmluZCIsImV2ZW50Iiwib24iLCJfcmV0dXJuIiwiZmlyZSIsIl9oYXNoIiwiX19wYXJzZUhhc2giLCJfcmVxdWVzdCIsImNyZWF0ZVJlcXVlc3QiLCJkb1JlcXVlc3QiLCJfc2VhcmNoIiwic2VhcmNoIiwiX2hhc2hTcGxpdEluZGV4IiwiaW5kZXhPZiIsInJlcGxhY2UiLCJzdWJzdHJpbmciLCJwYXRoIiwicXVlcnlzdHJpbmciLCJwYXJzZSIsIlJlYWN0Iiwiem51aSIsIkhhc2hIYW5kbGVyIiwiZXJyb3IiLCJjcmVhdGVDbGFzcyIsImRpc3BsYXlOYW1lIiwiZ2V0SW5pdGlhbFN0YXRlIiwiY29tcG9uZW50IiwiQ29tcG9uZW50IiwiQ29tcG9uZW50UHJvcHMiLCJjb21wb25lbnREaWRNb3VudCIsIl9faW5pdEhhbmRsZXIiLCJfaGFuZGxlciIsInByb3BzIiwiaGFzaGNoYW5nZSIsImhhbmRsZXIiLCJfX2hhbmRsZXIiLCJyZXF1ZXN0IiwiX19yZXF1ZXN0Iiwibm90Zm91bmQiLCJfX25vdGZvdW5kIiwicGx1Z2lubG9hZGVkIiwiX19wbHVnaW5Mb2FkZWQiLCJvbkluaXRIYW5kbGVyIiwic2VuZGVyIiwib25IYXNoQ2hhbmdlIiwiZGF0YSIsIm9uSGFuZGxlciIsInJvdXRlIiwiJCR0eXBlb2YiLCJzZXRTdGF0ZSIsImV4dGVuZCIsImFwcGxpY2F0aW9uIiwicm91dGVyIiwib25SZXF1ZXN0Iiwib25Ob3RGb3VuZCIsIm9uUGx1Z2luTG9hZGVkIiwicHVzaCIsImZvcndhcmQiLCJFcnJvcjQwNCIsInJlbmRlciIsInJlYWN0IiwiY2xhc3NuYW1lIiwiY2xhc3NOYW1lIiwic3R5bGUiLCJzdGF0ZSIsInBhdGhTZXBhcmF0b3IiLCJwYXRoUGFyYW1ldGVyU3ltYm9sIiwiX3BhdGhTZXBhcmF0b3IiLCJfcGF0aFBhcmFtZXRlclN5bWJvbCIsImZvcm1hdFJvdXRlIiwicGFyZW50IiwiX19wYXJlbnRfXyIsInBhdGhzIiwiX19wYXJzZVJvdXRlUGF0aHMiLCJleGFjdCIsImZvcm1hdFJvdXRlcyIsInJvdXRlcyIsInR5cGUiLCJfcm91dGVzIiwiX19sb2FkUGF0aEFuZENvbXBvbmVudCIsIm1hcCIsImNhbGwiLCJnZXRSb3V0ZUZvclJlcXVlc3QiLCJfcm91dGUiLCJfZGF0YSIsImkiLCJfbGVuIiwiX19tYXRjaFJvdXRlQW5kUmVxdWVzdCIsInBhcmFtcyIsImdldFJvdXRlc0Zyb21Sb3V0ZSIsIl9jb21wb25lbnQiLCJwbHVnaW5zIiwiX3BsdWdpbnMiLCJfX2xvYWRQbHVnaW5zIiwiY29uY2F0IiwibWFpbiIsIl9faXNSZWFjdENvbXBvbmVudCIsImlzIiwiaXNSZWFjdENvbXBvbmVudCIsInRvU3RyaW5nIiwiZXh0ZW5zaW9uIiwiX19pbml0Um91dGUiLCJfX3JvdXRlc19fIiwiX3BsdWdpbiIsIl9wbHVnaW5NYWluIiwiZm9yRWFjaCIsInBsdWdpbiIsIl9fbG9hZFBsdWdpbiIsImNvbXBvbmVudHMiLCJuYW1lc3BhY2UiLCJfcGF0aHMiLCJfcGF0aCIsIl9wYXJhbXMiLCJfdXJsVW5tYXRjaHMiLCJfaGFzQ2hlY2tlZCIsIl90ZW1wIiwiX3RlbXBzIiwic3BsaXQiLCJPYmplY3QiLCJrZXlzIiwidW5tYXRjaHMiLCJpc1BhcmFtZXRlciIsImtleSIsInRlc3QiLCJQYXRoTWF0Y2hlciIsInJlcXVlc3RzIiwibWF0Y2hlciIsIl9yZXF1ZXN0cyIsIl9tYXRjaGVyIiwicGx1Z2luTG9hZGVkIiwibG9hZFBsdWdpbnMiLCJsb2FkUm91dGVzIiwibG9hZFBsdWdpbiIsImxvYWRSb3V0ZSIsIlpSUm91dGUiLCJfbmV3UmVxdWVzdCIsIl9mUm91dGUiLCJwYXJlbnRSZXF1ZXN0IiwiX19nZXRDb21wb25lbnQiLCJfQ29tcG9uZW50IiwiZml4V2luZG93SGFzaENoYW5nZSIsIkhhc2hDaGFuZ2VFdmVudCIsImxhc3RVUkwiLCJkb2N1bWVudCIsIlVSTCIsImRlZmluZVByb3BlcnR5IiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsInZhbHVlIiwiSGFzaFJvdXRlciIsIlJvdXRlIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7OztBQ2xGQSxJQUFJQSxjQUFjLEdBQUdDLG1CQUFPLENBQUMsNkNBQUQsQ0FBNUI7O0FBQ0FDLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQkMsRUFBRSxDQUFDQyxLQUFILENBQVNMLGNBQVQsRUFBeUI7QUFDdENNLFFBQU0sRUFBRSxDQUFDLFlBQUQsRUFBZSxTQUFmLENBRDhCO0FBRXRDQyxZQUFVLEVBQUUsRUFGMEI7QUFHdENDLFNBQU8sRUFBRTtBQUNMQyxRQUFJLEVBQUUsY0FBVUMsSUFBVixFQUFnQkosTUFBaEIsRUFBdUI7QUFDekIsV0FBS0ssWUFBTCxDQUFrQkwsTUFBbEI7O0FBQ0EsVUFBRyxjQUFXTSxNQUFkLEVBQXNCO0FBQ2xCLHNCQUFXRixJQUFYO0FBQ0gsT0FGRCxNQUVLO0FBQ0QsYUFBS0csV0FBTCxDQUFpQkMsT0FBakIsQ0FBeUJDLFNBQXpCLENBQW1DTixJQUFuQyxDQUF3Q0MsSUFBeEMsRUFBOENKLE1BQTlDO0FBQ0g7O0FBRUQsVUFBRyxLQUFLVSxLQUFMLENBQVdDLE1BQVgsSUFBcUIsQ0FBQ0MsUUFBUSxDQUFDQyxJQUFsQyxFQUF1QztBQUNuQ0QsZ0JBQVEsQ0FBQ0MsSUFBVCxHQUFnQixLQUFLSCxLQUFMLENBQVdJLEdBQVgsRUFBaEI7QUFDSCxPQUZELE1BRUs7QUFDRCxhQUFLQyxZQUFMO0FBQ0g7O0FBQ0RDLFlBQU0sQ0FBQ0MsZ0JBQVAsQ0FBd0IsWUFBeEIsRUFBc0MsS0FBS0YsWUFBTCxDQUFrQkcsSUFBbEIsQ0FBdUIsSUFBdkIsQ0FBdEMsRUFBb0UsS0FBcEU7QUFDSCxLQWZJO0FBZ0JMYixnQkFBWSxFQUFFLHNCQUFVTCxNQUFWLEVBQWlCO0FBQzNCLFVBQUdBLE1BQU0sSUFBSSxRQUFPQSxNQUFQLEtBQWlCLFFBQTlCLEVBQXVDO0FBQ25DLGFBQUksSUFBSW1CLEtBQVIsSUFBaUJuQixNQUFqQixFQUF3QjtBQUNwQixlQUFLb0IsRUFBTCxDQUFRRCxLQUFSLEVBQWVuQixNQUFNLENBQUNtQixLQUFELENBQXJCLEVBQThCLElBQTlCO0FBQ0g7QUFDSjtBQUNKLEtBdEJJO0FBdUJMSixnQkFBWSxFQUFFLHNCQUFVSSxLQUFWLEVBQWdCO0FBQzFCLFVBQUlFLE9BQU8sR0FBRyxLQUFLQyxJQUFMLENBQVUsWUFBVixFQUF3QkgsS0FBeEIsQ0FBZDs7QUFDQSxVQUFHRSxPQUFPLEtBQUssS0FBZixFQUFzQixPQUFPLEtBQVA7O0FBQ3RCLFVBQUlFLEtBQUssR0FBRyxLQUFLQyxXQUFMLEVBQVo7QUFBQSxVQUNJQyxRQUFRLEdBQUcsS0FBS0MsYUFBTCxDQUFtQkgsS0FBbkIsRUFBMEJKLEtBQTFCLENBRGY7O0FBR0FFLGFBQU8sR0FBRyxLQUFLQyxJQUFMLENBQVUsU0FBVixFQUFxQkgsS0FBckIsRUFBNEJJLEtBQTVCLENBQVY7QUFDQSxVQUFHRixPQUFPLEtBQUssS0FBZixFQUFzQixPQUFPLEtBQVA7QUFFdEIsV0FBS00sU0FBTCxDQUFlRixRQUFmO0FBQ0gsS0FqQ0k7QUFrQ0xELGVBQVcsRUFBRSx1QkFBVztBQUNwQixVQUFJRCxLQUFLLEdBQUdYLFFBQVEsQ0FBQ0MsSUFBckI7QUFBQSxVQUNJZSxPQUFPLEdBQUdoQixRQUFRLENBQUNpQixNQUR2QjtBQUFBLFVBRUlDLGVBQWUsR0FBR1AsS0FBSyxDQUFDUSxPQUFOLENBQWMsR0FBZCxDQUZ0Qjs7QUFHQSxVQUFHSCxPQUFPLElBQUlBLE9BQU8sQ0FBQ0csT0FBUixDQUFnQixHQUFoQixNQUF1QixDQUFDLENBQXRDLEVBQXdDO0FBQ3BDSCxlQUFPLEdBQUdBLE9BQU8sQ0FBQ0ksT0FBUixDQUFnQixHQUFoQixFQUFxQixFQUFyQixDQUFWO0FBQ0g7O0FBQ0QsVUFBR0YsZUFBZSxLQUFLLENBQUMsQ0FBeEIsRUFBMEI7QUFDdEJGLGVBQU8sR0FBR0EsT0FBTyxHQUFHLEdBQVYsR0FBZUwsS0FBSyxDQUFDVSxTQUFOLENBQWdCSCxlQUFlLEdBQUcsQ0FBbEMsQ0FBekI7QUFDQVAsYUFBSyxHQUFHQSxLQUFLLENBQUNVLFNBQU4sQ0FBZ0IsQ0FBaEIsRUFBbUJILGVBQW5CLENBQVI7QUFDSDs7QUFFRCxhQUFPO0FBQ0hJLFlBQUksRUFBRVgsS0FBSyxDQUFDVSxTQUFOLENBQWdCLENBQWhCLENBREg7QUFFSEosY0FBTSxFQUFFL0IsRUFBRSxDQUFDcUMsV0FBSCxDQUFlQyxLQUFmLENBQXFCUixPQUFyQjtBQUZMLE9BQVA7QUFJSDtBQWxESTtBQUg2QixDQUF6QixDQUFqQixDOzs7Ozs7Ozs7Ozs7O0FDREEsSUFBSVMsS0FBSyxHQUFHQyxJQUFJLENBQUNELEtBQUwsSUFBYzFDLG1CQUFPLENBQUMsb0JBQUQsQ0FBakM7O0FBQ0EsSUFBSTRDLFdBQVcsR0FBRzVDLG1CQUFPLENBQUMsdUNBQUQsQ0FBekI7O0FBQ0EsSUFBSTZDLEtBQUssR0FBRzdDLG1CQUFPLENBQUMsMENBQUQsQ0FBbkI7O0FBQ0FDLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQndDLEtBQUssQ0FBQ0ksV0FBTixDQUFrQjtBQUNsQ0MsYUFBVyxFQUFDLGNBRHNCO0FBRWxDQyxpQkFBZSxFQUFDLDJCQUFVO0FBQ3pCLFdBQU87QUFDTkMsZUFBUyxFQUFFLElBREw7QUFFTkMsZUFBUyxFQUFFLElBRkw7QUFHTkMsb0JBQWMsRUFBRTtBQUhWLEtBQVA7QUFLQSxHQVJpQztBQVNsQ0MsbUJBQWlCLEVBQUMsNkJBQVU7QUFDM0IsU0FBS0MsYUFBTDtBQUNBLEdBWGlDO0FBWWxDQSxlQUFhLEVBQUUseUJBQVc7QUFDekIsU0FBS0MsUUFBTCxHQUFnQixJQUFJVixXQUFKLENBQWdCLEtBQUtXLEtBQXJCLEVBQTRCO0FBQzNDQyxnQkFBVSxFQUFFLEtBQUtwQyxZQUQwQjtBQUUzQ3FDLGFBQU8sRUFBRSxLQUFLQyxTQUY2QjtBQUczQ0MsYUFBTyxFQUFFLEtBQUtDLFNBSDZCO0FBSTNDQyxjQUFRLEVBQUUsS0FBS0MsVUFKNEI7QUFLM0NDLGtCQUFZLEVBQUUsS0FBS0M7QUFMd0IsS0FBNUIsQ0FBaEI7QUFPQSxTQUFLVCxLQUFMLENBQVdVLGFBQVgsSUFBNEIsS0FBS1YsS0FBTCxDQUFXVSxhQUFYLENBQXlCLEtBQUtYLFFBQTlCLEVBQXdDLElBQXhDLENBQTVCO0FBQ0EsR0FyQmlDO0FBc0JsQ2xDLGNBQVksRUFBRSxzQkFBVThDLE1BQVYsRUFBa0IxQyxLQUFsQixFQUF3QjtBQUNyQyxTQUFLK0IsS0FBTCxDQUFXWSxZQUFYLElBQTJCLEtBQUtaLEtBQUwsQ0FBV1ksWUFBWCxDQUF3QjNDLEtBQXhCLEVBQStCLElBQS9CLENBQTNCO0FBQ0EsR0F4QmlDO0FBeUJsQ2tDLFdBQVMsRUFBRSxtQkFBVVEsTUFBVixFQUFrQjFDLEtBQWxCLEVBQXlCNEMsSUFBekIsRUFBOEI7QUFDeEMsU0FBS2IsS0FBTCxDQUFXYyxTQUFYLElBQXdCLEtBQUtkLEtBQUwsQ0FBV2MsU0FBWCxDQUFxQjdDLEtBQXJCLEVBQTRCNEMsSUFBNUIsRUFBa0MsSUFBbEMsQ0FBeEI7QUFDQSxHQTNCaUM7QUE0QmxDUixXQUFTLEVBQUUsbUJBQVVNLE1BQVYsRUFBa0JQLE9BQWxCLEVBQTJCVyxLQUEzQixFQUFpQztBQUMzQyxRQUFHQSxLQUFLLENBQUNyQixTQUFOLElBQW1CLFFBQU9xQixLQUFLLENBQUNyQixTQUFiLEtBQTBCLFFBQTdDLElBQXlEcUIsS0FBSyxDQUFDckIsU0FBTixDQUFnQnNCLFFBQTVFLEVBQXNGO0FBQ3JGLFdBQUtDLFFBQUwsQ0FBYztBQUNidkIsaUJBQVMsRUFBRXFCLEtBQUssQ0FBQ3JCO0FBREosT0FBZDtBQUdBLEtBSkQsTUFJSztBQUNKLFdBQUt1QixRQUFMLENBQWM7QUFDYnRCLGlCQUFTLEVBQUVvQixLQUFLLENBQUNyQixTQURKO0FBRWJFLHNCQUFjLEVBQUVoRCxFQUFFLENBQUNzRSxNQUFILENBQVUsRUFBVixFQUFjSCxLQUFLLENBQUNmLEtBQXBCLEVBQTJCO0FBQzFDbUIscUJBQVcsRUFBRSxLQUFLbkIsS0FBTCxDQUFXbUIsV0FEa0I7QUFFMUNmLGlCQUFPLEVBQUVBLE9BRmlDO0FBRzFDZ0IsZ0JBQU0sRUFBRSxJQUhrQztBQUkxQ0wsZUFBSyxFQUFFQTtBQUptQyxTQUEzQjtBQUZILE9BQWQ7QUFTQTs7QUFDRCxTQUFLZixLQUFMLENBQVdxQixTQUFYLElBQXdCLEtBQUtyQixLQUFMLENBQVdxQixTQUFYLENBQXFCakIsT0FBckIsRUFBOEJXLEtBQTlCLEVBQXFDLElBQXJDLENBQXhCO0FBQ0EsR0E3Q2lDO0FBOENsQ1IsWUFBVSxFQUFFLG9CQUFVSSxNQUFWLEVBQWtCUCxPQUFsQixFQUEwQjtBQUNyQyxTQUFLRSxRQUFMLENBQWNGLE9BQWQ7QUFDQSxTQUFLSixLQUFMLENBQVdzQixVQUFYLElBQXlCLEtBQUt0QixLQUFMLENBQVdzQixVQUFYLENBQXNCbEIsT0FBdEIsRUFBK0IsSUFBL0IsQ0FBekI7QUFDQSxHQWpEaUM7QUFrRGxDSyxnQkFBYyxFQUFFLHdCQUFVRSxNQUFWLEVBQWtCRSxJQUFsQixFQUF1QjtBQUN0QyxTQUFLYixLQUFMLENBQVd1QixjQUFYLElBQTZCLEtBQUt2QixLQUFMLENBQVd1QixjQUFYLENBQTBCVixJQUExQixFQUFnQyxJQUFoQyxDQUE3QjtBQUNBLEdBcERpQztBQXFEbENXLE1BQUksRUFBRSxnQkFBVyxDQUVoQixDQXZEaUM7QUF3RGxDQyxTQUFPLEVBQUUsbUJBQVcsQ0FFbkIsQ0ExRGlDO0FBMkRsQ25CLFVBQVEsRUFBRSxrQkFBVUYsT0FBVixFQUFrQjtBQUMzQixTQUFLYSxRQUFMLENBQWM7QUFDYnRCLGVBQVMsRUFBRUwsS0FBSyxDQUFDb0MsUUFESjtBQUViOUIsb0JBQWMsRUFBRTtBQUNmUSxlQUFPLEVBQUVBO0FBRE07QUFGSCxLQUFkO0FBTUEsR0FsRWlDO0FBbUVsQ3VCLFFBQU0sRUFBRSxrQkFBVTtBQUNqQix3QkFDQztBQUFLLGVBQVMsRUFBRXZDLElBQUksQ0FBQ3dDLEtBQUwsQ0FBV0MsU0FBWCxDQUFxQixnQkFBckIsRUFBdUMsS0FBSzdCLEtBQUwsQ0FBVzhCLFNBQWxELENBQWhCO0FBQThFLFdBQUssRUFBRSxLQUFLOUIsS0FBTCxDQUFXK0I7QUFBaEcsT0FDRyxLQUFLQyxLQUFMLENBQVd0QyxTQURkLEVBRUcsS0FBS3NDLEtBQUwsQ0FBV3JDLFNBQVgsaUJBQXdCLHlCQUFNLEtBQU4sQ0FBWSxTQUFaLEVBQTBCLEtBQUtxQyxLQUFMLENBQVdwQyxjQUFyQyxDQUYzQixDQUREO0FBTUE7QUExRWlDLENBQWxCLENBQWpCLEM7Ozs7Ozs7Ozs7Ozs7QUNIQWxELE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQkMsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDdEJDLFFBQU0sRUFBRSxDQUFDLGVBQUQsRUFBa0IsY0FBbEIsRUFBa0MsY0FBbEMsRUFBa0QsYUFBbEQsQ0FEYztBQUV0QkMsWUFBVSxFQUFDO0FBQ1BrRixpQkFBYSxFQUFFLElBRFI7QUFFUEMsdUJBQW1CLEVBQUU7QUFGZCxHQUZXO0FBTXRCbEYsU0FBTyxFQUFFO0FBQ0xDLFFBQUksRUFBRSxjQUFVQyxJQUFWLEVBQWdCSixNQUFoQixFQUF1QjtBQUN6QixXQUFLSyxZQUFMLENBQWtCTCxNQUFsQjs7QUFDQSxXQUFLcUYsY0FBTCxHQUFzQmpGLElBQUksQ0FBQytFLGFBQUwsSUFBc0IsR0FBNUM7QUFDQSxXQUFLRyxvQkFBTCxHQUE0QmxGLElBQUksQ0FBQ2dGLG1CQUFMLElBQTRCLEdBQXhEO0FBQ0gsS0FMSTtBQU1ML0UsZ0JBQVksRUFBRSxzQkFBVUwsTUFBVixFQUFpQjtBQUMzQixVQUFHQSxNQUFNLElBQUksUUFBT0EsTUFBUCxLQUFpQixRQUE5QixFQUF1QztBQUNuQyxhQUFJLElBQUltQixLQUFSLElBQWlCbkIsTUFBakIsRUFBd0I7QUFDcEIsZUFBS29CLEVBQUwsQ0FBUUQsS0FBUixFQUFlbkIsTUFBTSxDQUFDbUIsS0FBRCxDQUFyQixFQUE4QixJQUE5QjtBQUNIO0FBQ0o7QUFDSixLQVpJO0FBYUxvRSxlQUFXLEVBQUUscUJBQVV0QixLQUFWLEVBQWlCdUIsTUFBakIsRUFBd0I7QUFDakMsVUFBSW5FLE9BQU8sR0FBRyxLQUFLQyxJQUFMLENBQVUsY0FBVixFQUEwQjJDLEtBQTFCLEVBQWlDdUIsTUFBakMsQ0FBZDs7QUFDQSxVQUFHbkUsT0FBTyxLQUFLLEtBQWYsRUFBcUI7QUFDakI7QUFDSDs7QUFFRCxVQUFHbUUsTUFBSCxFQUFVO0FBQ052QixhQUFLLENBQUN3QixVQUFOLEdBQW1CRCxNQUFuQjtBQUNIOztBQUNEdkIsV0FBSyxDQUFDeUIsS0FBTixHQUFjLEtBQUtDLGlCQUFMLENBQXVCMUIsS0FBSyxDQUFDL0IsSUFBN0IsQ0FBZDtBQUNBK0IsV0FBSyxDQUFDZixLQUFOLEdBQWNwRCxFQUFFLENBQUNzRSxNQUFILENBQVUsRUFBVixFQUFjSCxLQUFLLENBQUNmLEtBQXBCLENBQWQ7O0FBQ0EsVUFBR2UsS0FBSyxDQUFDMkIsS0FBTixJQUFlLElBQWYsSUFBdUIzQixLQUFLLENBQUMvQixJQUFOLENBQVdILE9BQVgsQ0FBbUIsS0FBS3VELG9CQUF4QixNQUFrRCxDQUFDLENBQTdFLEVBQWdGO0FBQUVyQixhQUFLLENBQUMyQixLQUFOLEdBQWMsSUFBZDtBQUFxQjs7QUFFdkcsYUFBTyxLQUFLdEUsSUFBTCxDQUFVLGFBQVYsRUFBeUIyQyxLQUF6QixHQUFpQ0EsS0FBeEM7QUFDSCxLQTNCSTtBQTRCTDRCLGdCQUFZLEVBQUUsc0JBQVVDLE1BQVYsRUFBa0JOLE1BQWxCLEVBQXlCO0FBQUE7O0FBQ25DLGNBQU8xRixFQUFFLENBQUNpRyxJQUFILENBQVFELE1BQVIsQ0FBUDtBQUNJLGFBQUssUUFBTDtBQUNJLGNBQUlFLE9BQU8sR0FBRyxFQUFkOztBQUNBLGVBQUksSUFBSTlELElBQVIsSUFBZ0I0RCxNQUFoQixFQUF1QjtBQUNuQkUsbUJBQU8sQ0FBQ3RCLElBQVIsQ0FBYSxLQUFLdUIsc0JBQUwsQ0FBNEIvRCxJQUE1QixFQUFrQzRELE1BQU0sQ0FBQzVELElBQUQsQ0FBeEMsRUFBZ0RzRCxNQUFoRCxDQUFiO0FBQ0g7O0FBQ0QsaUJBQU9RLE9BQVA7O0FBQ0osYUFBSyxPQUFMO0FBQ0ksaUJBQU9GLE1BQU0sQ0FBQ0ksR0FBUCxDQUFXLFVBQUNqQyxLQUFEO0FBQUEsbUJBQVMsS0FBSSxDQUFDc0IsV0FBTCxDQUFpQnRCLEtBQWpCLEVBQXdCdUIsTUFBeEIsQ0FBVDtBQUFBLFdBQVgsQ0FBUDs7QUFDSixhQUFLLFVBQUw7QUFDSSxpQkFBTyxLQUFLSyxZQUFMLENBQWtCQyxNQUFNLENBQUNLLElBQVAsQ0FBWSxJQUFaLEVBQWtCWCxNQUFsQixFQUEwQixJQUExQixDQUFsQixFQUFtREEsTUFBbkQsQ0FBUDtBQVZSO0FBWUgsS0F6Q0k7QUEwQ0xZLHNCQUFrQixFQUFFLDRCQUFVOUMsT0FBVixFQUFtQndDLE1BQW5CLEVBQTBCO0FBQzFDLFVBQUlFLE9BQU8sR0FBR0YsTUFBZDtBQUFBLFVBQ0lPLE1BQU0sR0FBRyxJQURiO0FBQUEsVUFFSUMsS0FBSyxHQUFHLElBRlo7O0FBR0EsV0FBSSxJQUFJQyxDQUFDLEdBQUcsQ0FBUixFQUFXQyxJQUFJLEdBQUdSLE9BQU8sQ0FBQ3JGLE1BQTlCLEVBQXNDNEYsQ0FBQyxHQUFHQyxJQUExQyxFQUFnREQsQ0FBQyxFQUFqRCxFQUFvRDtBQUNoREYsY0FBTSxHQUFHTCxPQUFPLENBQUNPLENBQUQsQ0FBaEI7QUFDQUQsYUFBSyxHQUFHLEtBQUtHLHNCQUFMLENBQTRCSixNQUE1QixFQUFvQy9DLE9BQXBDLENBQVI7O0FBQ0EsWUFBR2dELEtBQUgsRUFBUztBQUNMO0FBQ0g7QUFDSjs7QUFFRCxVQUFHLENBQUNBLEtBQUQsSUFBVSxDQUFDRCxNQUFkLEVBQXNCO0FBQ2xCO0FBQ0g7O0FBRUQsYUFBTy9DLE9BQU8sQ0FBQ29ELE1BQVIsR0FBaUJKLEtBQWpCLEVBQXdCRCxNQUEvQjtBQUNILEtBM0RJO0FBNERMTSxzQkFBa0IsRUFBRSw0QkFBVTFDLEtBQVYsRUFBZ0I7QUFDaEMsVUFBSStCLE9BQU8sR0FBRyxFQUFkO0FBQUEsVUFDSVksVUFBVSxHQUFHM0MsS0FBSyxDQUFDckIsU0FEdkI7O0FBRUEsVUFBR3FCLEtBQUssQ0FBQzZCLE1BQVQsRUFBaUI7QUFDYkUsZUFBTyxHQUFHLEtBQUtILFlBQUwsQ0FBa0I1QixLQUFLLENBQUM2QixNQUF4QixFQUFnQzdCLEtBQWhDLENBQVY7QUFDSDs7QUFFRCxVQUFHQSxLQUFLLENBQUM0QyxPQUFULEVBQWtCO0FBQ2QsWUFBSUMsUUFBUSxHQUFHLEtBQUtDLGFBQUwsQ0FBbUI5QyxLQUFLLENBQUM0QyxPQUF6QixFQUFrQzVDLEtBQWxDLENBQWY7O0FBQ0ErQixlQUFPLEdBQUdBLE9BQU8sQ0FBQ2dCLE1BQVIsQ0FBZUYsUUFBUSxDQUFDaEIsTUFBeEIsQ0FBVjs7QUFDQSxZQUFHLENBQUNjLFVBQUQsSUFBZUUsUUFBUSxDQUFDRyxJQUFULENBQWN0RyxNQUFoQyxFQUF3QztBQUNwQ2lHLG9CQUFVLEdBQUdFLFFBQVEsQ0FBQ0csSUFBVCxDQUFjbkcsR0FBZCxFQUFiO0FBQ0g7QUFDSjs7QUFFRCxhQUFPO0FBQ0hnRixjQUFNLEVBQUVFLE9BREw7QUFFSHBELGlCQUFTLEVBQUVnRTtBQUZSLE9BQVA7QUFJSCxLQS9FSTtBQWdGTE0sc0JBQWtCLEVBQUUsNEJBQVV0RSxTQUFWLEVBQW9CO0FBQ3BDLFVBQUdBLFNBQVMsSUFBSTlDLEVBQUUsQ0FBQ3FILEVBQUgsQ0FBTXZFLFNBQU4sRUFBaUIsVUFBakIsQ0FBYixLQUE4Q0EsU0FBUyxDQUFDbkMsU0FBVixDQUFvQm9FLE1BQXBCLElBQThCakMsU0FBUyxDQUFDRixXQUF4QyxJQUF1REUsU0FBUyxDQUFDbkMsU0FBVixDQUFvQjJHLGdCQUF6SCxDQUFILEVBQWdKO0FBQzVJLGVBQU8sSUFBUDtBQUNIOztBQUVELGFBQU8sS0FBUDtBQUNILEtBdEZJO0FBdUZMbkIsMEJBQXNCLEVBQUUsZ0NBQVUvRCxJQUFWLEVBQWdCVSxTQUFoQixFQUEyQjRDLE1BQTNCLEVBQWtDO0FBQ3RELFVBQUlhLE1BQU0sR0FBRztBQUFFbkUsWUFBSSxFQUFFQTtBQUFSLE9BQWI7O0FBRUEsY0FBT3BDLEVBQUUsQ0FBQ2lHLElBQUgsQ0FBUW5ELFNBQVIsQ0FBUDtBQUNJLGFBQUssUUFBTDtBQUNJeUQsZ0JBQU0sQ0FBQ3pELFNBQVAsR0FBbUI5QyxFQUFFLENBQUNvQyxJQUFILENBQVFsQixNQUFSLEVBQWdCNEIsU0FBaEIsQ0FBbkI7QUFDQTs7QUFDSixhQUFLLFVBQUw7QUFDSSxjQUFHLENBQUMsS0FBS3NFLGtCQUFMLENBQXdCdEUsU0FBeEIsQ0FBSixFQUF3QztBQUNwQ3lELGtCQUFNLENBQUN6RCxTQUFQLEdBQW1CQSxTQUFTLENBQUN1RCxJQUFWLENBQWUsSUFBZixFQUFxQmpFLElBQXJCLEVBQTJCLElBQTNCLENBQW5CO0FBQ0gsV0FGRCxNQUVLO0FBQ0RtRSxrQkFBTSxDQUFDekQsU0FBUCxHQUFtQkEsU0FBbkI7QUFDSDs7QUFDRDs7QUFDSixhQUFLLFFBQUw7QUFDSSxjQUFHQSxTQUFTLENBQUNzQixRQUFiLEVBQXVCO0FBQ25CbUMsa0JBQU0sQ0FBQ3pELFNBQVAsR0FBbUJBLFNBQW5CO0FBQ0gsV0FGRCxNQUVNLElBQUdBLFNBQVMsQ0FBQ3JDLFdBQVYsQ0FBc0I4RyxRQUF0QixHQUFpQ3RGLE9BQWpDLENBQXlDLGlCQUF6QyxLQUErRCxDQUFsRSxFQUFvRTtBQUN0RWpDLGNBQUUsQ0FBQ3NFLE1BQUgsQ0FBVWlDLE1BQVYsRUFBa0J6RCxTQUFsQjs7QUFDQSxnQkFBR3lELE1BQU0sQ0FBQ2lCLFNBQVAsS0FBcUIsS0FBeEIsRUFBOEI7QUFDMUIsbUJBQUtDLFdBQUwsQ0FBaUJsQixNQUFqQjtBQUNIO0FBQ0o7O0FBQ0Q7QUFwQlI7O0FBdUJBLGFBQU8sS0FBS2QsV0FBTCxDQUFpQmMsTUFBakIsRUFBeUJiLE1BQXpCLENBQVA7QUFDSCxLQWxISTtBQW1ITCtCLGVBQVcsRUFBRSxxQkFBVXRELEtBQVYsRUFBZ0I7QUFDekIsVUFBR0EsS0FBSyxDQUFDNkIsTUFBVCxFQUFpQjtBQUNiN0IsYUFBSyxDQUFDdUQsVUFBTixHQUFtQixLQUFLM0IsWUFBTCxDQUFrQjVCLEtBQUssQ0FBQzZCLE1BQXhCLEVBQWdDN0IsS0FBaEMsQ0FBbkI7QUFDSDs7QUFFRCxVQUFHQSxLQUFLLENBQUM0QyxPQUFULEVBQWtCO0FBQ2QsWUFBSUMsUUFBUSxHQUFHLEtBQUtDLGFBQUwsQ0FBbUI5QyxLQUFLLENBQUM0QyxPQUF6QixFQUFrQzVDLEtBQWxDLENBQWY7O0FBQ0EsWUFBR0EsS0FBSyxDQUFDdUQsVUFBVCxFQUFxQjtBQUNqQnZELGVBQUssQ0FBQ3VELFVBQU4sR0FBbUJ2RCxLQUFLLENBQUN1RCxVQUFOLENBQWlCUixNQUFqQixDQUF3QkYsUUFBUSxDQUFDaEIsTUFBakMsQ0FBbkI7QUFDSCxTQUZELE1BRUs7QUFDRDdCLGVBQUssQ0FBQ3VELFVBQU4sR0FBbUJWLFFBQVEsQ0FBQ2hCLE1BQTVCO0FBQ0g7O0FBRUQ3QixhQUFLLENBQUNnRCxJQUFOLEdBQWFILFFBQVEsQ0FBQ0csSUFBdEI7O0FBQ0EsWUFBRyxDQUFDaEQsS0FBSyxDQUFDckIsU0FBUCxJQUFvQmtFLFFBQVEsQ0FBQ0csSUFBVCxDQUFjdEcsTUFBckMsRUFBNkM7QUFDekNzRCxlQUFLLENBQUNyQixTQUFOLEdBQWtCa0UsUUFBUSxDQUFDRyxJQUFULENBQWNuRyxHQUFkLEVBQWxCO0FBQ0g7QUFDSjs7QUFFRCxhQUFPbUQsS0FBUDtBQUNILEtBdklJO0FBd0lMOEMsaUJBQWEsRUFBRSx1QkFBVUYsT0FBVixFQUFtQnJCLE1BQW5CLEVBQTBCO0FBQ3JDLFVBQUlzQixRQUFRLEdBQUdELE9BQU8sSUFBSSxFQUExQjtBQUFBLFVBQ0lZLE9BQU8sR0FBRyxJQURkO0FBQUEsVUFFSXpCLE9BQU8sR0FBRyxFQUZkO0FBQUEsVUFHSXRGLEtBQUssR0FBRyxFQUhaO0FBQUEsVUFJSWdILFdBQVcsR0FBRyxJQUpsQjs7QUFLQSxjQUFPNUgsRUFBRSxDQUFDaUcsSUFBSCxDQUFRYyxPQUFSLENBQVA7QUFDSSxhQUFLLFFBQUw7QUFDSUMsa0JBQVEsR0FBRyxDQUFDRCxPQUFELENBQVg7QUFDQTs7QUFDSixhQUFLLFVBQUw7QUFDSUMsa0JBQVEsR0FBR0QsT0FBTyxDQUFDLElBQUQsQ0FBbEI7QUFDQTtBQU5SOztBQVFBLFVBQUdDLFFBQVEsSUFBSUEsUUFBUSxDQUFDbkcsTUFBeEIsRUFBZ0M7QUFDNUJrRyxlQUFPLENBQUNjLE9BQVIsQ0FBZ0IsVUFBVUMsTUFBVixFQUFpQjtBQUM3QkgsaUJBQU8sR0FBRyxLQUFLSSxZQUFMLENBQWtCRCxNQUFsQixFQUEwQnBDLE1BQTFCLENBQVY7O0FBQ0EsY0FBR2lDLE9BQUgsRUFBVztBQUNQLGdCQUFHQSxPQUFPLENBQUNELFVBQVgsRUFBdUI7QUFDbkJ4QixxQkFBTyxHQUFHQSxPQUFPLENBQUNnQixNQUFSLENBQWVTLE9BQU8sQ0FBQ0QsVUFBdkIsQ0FBVjtBQUNIOztBQUNELGdCQUFHQyxPQUFPLENBQUNSLElBQVgsRUFBaUI7QUFDYlMseUJBQVcsR0FBR0QsT0FBTyxDQUFDUixJQUF0Qjs7QUFDQSxzQkFBT25ILEVBQUUsQ0FBQ2lHLElBQUgsQ0FBUXJGLEtBQVIsQ0FBUDtBQUNJLHFCQUFLLFFBQUw7QUFDSWdILDZCQUFXLEdBQUdELE9BQU8sQ0FBQzNCLE1BQVIsQ0FBZTRCLFdBQWYsS0FBK0I1SCxFQUFFLENBQUNvQyxJQUFILENBQVF1RixPQUFPLENBQUNLLFVBQWhCLEVBQTRCSixXQUE1QixDQUEvQixJQUEyRTVILEVBQUUsQ0FBQ29DLElBQUgsQ0FBUWxCLE1BQVIsRUFBZ0IwRyxXQUFoQixDQUF6RjtBQUNBOztBQUNKLHFCQUFLLFVBQUw7QUFDSSxzQkFBR0EsV0FBVyxDQUFDbkgsV0FBWixDQUF3QjhHLFFBQXhCLE1BQXNDLHVDQUF6QyxFQUFpRjtBQUM3RUssK0JBQVcsR0FBR0EsV0FBVyxDQUFDLElBQUQsQ0FBekI7QUFDSDs7QUFDRDs7QUFDSjtBQUNJO0FBVlI7O0FBYUFoSCxtQkFBSyxDQUFDZ0UsSUFBTixDQUFXZ0QsV0FBWDtBQUNIO0FBQ0o7QUFDSixTQXhCZSxDQXdCZHhHLElBeEJjLENBd0JULElBeEJTLENBQWhCO0FBeUJIOztBQUNELGFBQU87QUFDSDRFLGNBQU0sRUFBRUUsT0FETDtBQUVIaUIsWUFBSSxFQUFFdkc7QUFGSCxPQUFQO0FBSUgsS0FyTEk7QUFzTExtSCxnQkFBWSxFQUFFLHNCQUFVRCxNQUFWLEVBQWtCcEMsTUFBbEIsRUFBeUI7QUFDbkMsVUFBSWlDLE9BQU8sR0FBR0csTUFBTSxJQUFJLEVBQXhCO0FBQUEsVUFDSXZHLE9BQU8sR0FBRyxLQUFLQyxJQUFMLENBQVUsZUFBVixFQUEyQnNHLE1BQTNCLEVBQW1DcEMsTUFBbkMsQ0FEZDs7QUFFQSxVQUFHbkUsT0FBTyxLQUFLLEtBQWYsRUFBcUI7QUFDakI7QUFDSDs7QUFFRCxjQUFPdkIsRUFBRSxDQUFDaUcsSUFBSCxDQUFRNkIsTUFBUixDQUFQO0FBQ0ksYUFBSyxRQUFMO0FBQ0lILGlCQUFPLEdBQUdBLE9BQVY7QUFDQTs7QUFDSixhQUFLLFVBQUw7QUFDSUEsaUJBQU8sR0FBR0EsT0FBTyxDQUFDLElBQUQsQ0FBakI7QUFDQTtBQU5SOztBQVFBLFVBQUdBLE9BQU8sQ0FBQ00sU0FBUixJQUFxQk4sT0FBTyxDQUFDSyxVQUFoQyxFQUE0QztBQUN4Q2hJLFVBQUUsQ0FBQ29DLElBQUgsQ0FBUWxCLE1BQVIsRUFBZ0J5RyxPQUFPLENBQUNNLFNBQXhCLEVBQW1DTixPQUFPLENBQUNLLFVBQTNDO0FBQ0g7O0FBQ0RMLGFBQU8sQ0FBQ0QsVUFBUixHQUFxQixLQUFLM0IsWUFBTCxDQUFrQjRCLE9BQU8sQ0FBQzNCLE1BQVIsSUFBZ0IsRUFBbEMsRUFBc0NOLE1BQXRDLENBQXJCO0FBRUEsYUFBTyxLQUFLbEUsSUFBTCxDQUFVLGNBQVYsRUFBMEJtRyxPQUExQixHQUFvQ0EsT0FBM0M7QUFDSCxLQTNNSTtBQTRNTGhCLDBCQUFzQixFQUFFLGdDQUFVeEMsS0FBVixFQUFpQlgsT0FBakIsRUFBeUI7QUFDN0MsVUFBSTBFLE1BQU0sR0FBRy9ELEtBQUssQ0FBQ3lCLEtBQW5CO0FBQUEsVUFDSXVDLEtBQUssR0FBRyxJQURaO0FBQUEsVUFFSUMsT0FBTyxHQUFHLEVBRmQ7QUFBQSxVQUdJQyxZQUFZLEdBQUcsRUFIbkI7QUFBQSxVQUlJQyxXQUFXLEdBQUcsS0FKbEI7QUFBQSxVQUtJQyxLQUFLLEdBQUcsSUFMWjtBQUFBLFVBTUlDLE1BQU0sR0FBR2hGLE9BQU8sQ0FBQ3BCLElBQVIsQ0FBYXFHLEtBQWIsQ0FBbUIsS0FBS2xELGNBQXhCLENBTmI7O0FBUUEsVUFBR3BCLEtBQUssQ0FBQzZCLE1BQU4sSUFBZ0IwQyxNQUFNLENBQUNDLElBQVAsQ0FBWXhFLEtBQUssQ0FBQzZCLE1BQWxCLEVBQTBCbkYsTUFBN0MsRUFBcUQ7QUFDakQsWUFBR3NELEtBQUssQ0FBQzJCLEtBQU4sSUFBZSxJQUFsQixFQUF3QjtBQUNwQjNCLGVBQUssQ0FBQzJCLEtBQU4sR0FBYyxLQUFkO0FBQ0g7QUFDSjs7QUFFRCxVQUFHM0IsS0FBSyxDQUFDMkIsS0FBVCxFQUFnQjtBQUNaLFlBQUczQixLQUFLLENBQUMvQixJQUFOLEtBQWVvQixPQUFPLENBQUNwQixJQUExQixFQUFnQztBQUM1QixpQkFBT29CLE9BQU8sQ0FBQ29GLFFBQVIsR0FBbUJQLFlBQW5CLEVBQWlDRCxPQUF4QztBQUNIOztBQUNELFlBQUdJLE1BQU0sQ0FBQzNILE1BQVAsS0FBa0JxSCxNQUFNLENBQUNySCxNQUE1QixFQUFtQztBQUMvQixpQkFBTyxLQUFQO0FBQ0g7QUFDSjs7QUFFRCxXQUFJLElBQUk0RixDQUFDLEdBQUcsQ0FBUixFQUFXQyxJQUFJLEdBQUc4QixNQUFNLENBQUMzSCxNQUE3QixFQUFxQzRGLENBQUMsR0FBR0MsSUFBekMsRUFBK0NELENBQUMsRUFBaEQsRUFBb0Q7QUFDaEQ4QixhQUFLLEdBQUdDLE1BQU0sQ0FBQy9CLENBQUQsQ0FBZDs7QUFDQSxZQUFHLENBQUM4QixLQUFKLEVBQVc7QUFDUDtBQUNIOztBQUNESixhQUFLLEdBQUdELE1BQU0sQ0FBQ3pCLENBQUQsQ0FBZDtBQUNBNkIsbUJBQVcsR0FBRyxJQUFkOztBQUNBLFlBQUcsQ0FBQ0gsS0FBSixFQUFVO0FBQ05FLHNCQUFZLENBQUN6RCxJQUFiLENBQWtCMkQsS0FBbEI7O0FBQ0E7QUFDSDs7QUFDRCxZQUFHLENBQUNKLEtBQUssQ0FBQ1UsV0FBUCxJQUFzQk4sS0FBSyxLQUFLSixLQUFLLENBQUNXLEdBQXpDLEVBQTZDO0FBQ3pDLGlCQUFPLEtBQVA7QUFDSDs7QUFDRCxZQUFHWCxLQUFLLENBQUNVLFdBQVQsRUFBcUI7QUFDakJULGlCQUFPLENBQUNELEtBQUssQ0FBQ1csR0FBUCxDQUFQLEdBQXFCUCxLQUFyQjtBQUNIO0FBQ0o7O0FBQ0QsVUFBRyxDQUFDRCxXQUFKLEVBQWlCO0FBQ2IsZUFBTyxLQUFQO0FBQ0g7O0FBRUQsYUFBTzlFLE9BQU8sQ0FBQ29GLFFBQVIsR0FBbUJQLFlBQW5CLEVBQWlDRCxPQUF4QztBQUNILEtBM1BJO0FBNFBMdkMscUJBQWlCLEVBQUUsMkJBQVV6RCxJQUFWLEVBQWU7QUFDOUIsVUFBSThGLE1BQU0sR0FBRyxFQUFiO0FBQUEsVUFDSUssS0FBSyxHQUFHLElBRFo7QUFBQSxVQUVJQyxNQUFNLEdBQUdwRyxJQUFJLENBQUNxRyxLQUFMLENBQVcsS0FBS2xELGNBQWhCLENBRmI7O0FBSUEsV0FBSSxJQUFJa0IsQ0FBQyxHQUFHLENBQVIsRUFBV0MsSUFBSSxHQUFHOEIsTUFBTSxDQUFDM0gsTUFBN0IsRUFBcUM0RixDQUFDLEdBQUdDLElBQXpDLEVBQStDRCxDQUFDLEVBQWhELEVBQW9EO0FBQ2hEOEIsYUFBSyxHQUFHQyxNQUFNLENBQUMvQixDQUFELENBQWQ7O0FBQ0EsWUFBRyxDQUFDOEIsS0FBSixFQUFXO0FBQ1A7QUFDSDs7QUFDRCxZQUFJLGVBQWVRLElBQWYsQ0FBb0JSLEtBQXBCLENBQUosRUFBZ0M7QUFDNUJBLGVBQUssR0FBR0EsS0FBSyxDQUFDckcsT0FBTixDQUFjLElBQWQsRUFBb0IsRUFBcEIsQ0FBUjtBQUNBZ0csZ0JBQU0sQ0FBQ3pCLENBQUQsQ0FBTixHQUFZO0FBQ1JxQyxlQUFHLEVBQUVQLEtBREc7QUFFUk0sdUJBQVcsRUFBRTtBQUZMLFdBQVo7QUFJSCxTQU5ELE1BTUs7QUFDRFgsZ0JBQU0sQ0FBQ3pCLENBQUQsQ0FBTixHQUFZO0FBQ1JxQyxlQUFHLEVBQUVQO0FBREcsV0FBWjtBQUdIO0FBQ0o7O0FBRUQsYUFBT0wsTUFBUDtBQUNIO0FBcFJJO0FBTmEsQ0FBVCxDQUFqQixDOzs7Ozs7Ozs7Ozs7O0FDQUEsSUFBSWMsV0FBVyxHQUFHbkosbUJBQU8sQ0FBQyx1Q0FBRCxDQUF6Qjs7QUFDQUMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUN0QkMsUUFBTSxFQUFFLENBQUMsU0FBRCxFQUFZLFVBQVosRUFBd0IsZUFBeEIsRUFBeUMsY0FBekMsQ0FEYztBQUV0QkMsWUFBVSxFQUFFO0FBQ1I4SSxZQUFRLEVBQUUsSUFERjtBQUVSakQsVUFBTSxFQUFFLElBRkE7QUFHUmUsV0FBTyxFQUFFLElBSEQ7QUFJUkksUUFBSSxFQUFFLElBSkU7QUFLUitCLFdBQU8sRUFBRTtBQUxELEdBRlU7QUFTdEI5SSxTQUFPLEVBQUU7QUFDTEMsUUFBSSxFQUFFLGNBQVVDLElBQVYsRUFBZ0JKLE1BQWhCLEVBQXVCO0FBQ3pCLFdBQUtpSixTQUFMLEdBQWlCLEVBQWpCO0FBQ0EsV0FBS2pELE9BQUwsR0FBZSxFQUFmO0FBQ0EsV0FBS2MsUUFBTCxHQUFnQixFQUFoQjtBQUNBLFdBQUtwRyxLQUFMLEdBQWEsRUFBYjtBQUNBLFdBQUt3SSxRQUFMLEdBQWdCLElBQUlKLFdBQUosQ0FBZ0IxSSxJQUFoQixFQUFzQjtBQUNsQytJLG9CQUFZLEVBQUUsVUFBVXRGLE1BQVYsRUFBa0IrRCxNQUFsQixFQUEwQjtBQUNwQyxlQUFLdEcsSUFBTCxDQUFVLGNBQVYsRUFBMEJzRyxNQUExQjtBQUNILFNBRmEsQ0FFWjFHLElBRlksQ0FFUCxJQUZPO0FBRG9CLE9BQXRCLENBQWhCOztBQUtBLFdBQUtiLFlBQUwsQ0FBa0JMLE1BQWxCOztBQUNBLFdBQUtvSixXQUFMLENBQWlCaEosSUFBSSxDQUFDeUcsT0FBdEI7QUFDQSxXQUFLd0MsVUFBTCxDQUFnQmpKLElBQUksQ0FBQzBGLE1BQXJCOztBQUNBLFVBQUcxRixJQUFJLENBQUM2RyxJQUFSLEVBQWM7QUFDVixhQUFLdkcsS0FBTCxDQUFXZ0UsSUFBWCxDQUFnQnRFLElBQUksQ0FBQzZHLElBQXJCO0FBQ0g7QUFDSixLQWpCSTtBQWtCTDVHLGdCQUFZLEVBQUUsc0JBQVVMLE1BQVYsRUFBaUI7QUFDM0IsVUFBR0EsTUFBTSxJQUFJLFFBQU9BLE1BQVAsS0FBaUIsUUFBOUIsRUFBdUM7QUFDbkMsYUFBSSxJQUFJbUIsS0FBUixJQUFpQm5CLE1BQWpCLEVBQXdCO0FBQ3BCLGVBQUtvQixFQUFMLENBQVFELEtBQVIsRUFBZW5CLE1BQU0sQ0FBQ21CLEtBQUQsQ0FBckIsRUFBOEIsSUFBOUI7QUFDSDtBQUNKO0FBQ0osS0F4Qkk7QUF5QkxPLGlCQUFhLEVBQUUsdUJBQVU0QixPQUFWLEVBQW1CbkMsS0FBbkIsRUFBeUI7QUFDcENtQyxhQUFPLENBQUNuQyxLQUFSLEdBQWdCQSxLQUFoQjtBQUNBLGFBQU8sS0FBSzhILFNBQUwsQ0FBZXZFLElBQWYsQ0FBb0JwQixPQUFwQixHQUE4QkEsT0FBckM7QUFDSCxLQTVCSTtBQTZCTDNCLGFBQVMsRUFBRSxtQkFBVTJCLE9BQVYsRUFBa0I7QUFDekIsVUFBSStDLE1BQU0sR0FBRyxLQUFLNkMsUUFBTCxDQUFjOUMsa0JBQWQsQ0FBaUM5QyxPQUFqQyxFQUEwQyxLQUFLMEMsT0FBL0MsQ0FBYjs7QUFDQTFDLGFBQU8sQ0FBQzBGLE9BQVIsR0FBa0IsS0FBS0UsUUFBdkI7O0FBQ0EsVUFBRzdDLE1BQUgsRUFBVztBQUNQLGFBQUsvRSxJQUFMLENBQVUsU0FBVixFQUFxQmdDLE9BQXJCLEVBQThCK0MsTUFBOUI7QUFDSCxPQUZELE1BRU07QUFDRixhQUFLL0UsSUFBTCxDQUFVLFVBQVYsRUFBc0JnQyxPQUF0QjtBQUNIO0FBQ0osS0FyQ0k7QUFzQ0w4RixlQUFXLEVBQUUscUJBQVV2QyxPQUFWLEVBQWtCO0FBQzNCLFVBQUlDLFFBQVEsR0FBR0QsT0FBTyxJQUFJLEVBQTFCOztBQUNBLGNBQU8vRyxFQUFFLENBQUNpRyxJQUFILENBQVFjLE9BQVIsQ0FBUDtBQUNJLGFBQUssUUFBTDtBQUNJQyxrQkFBUSxHQUFHLENBQUNELE9BQUQsQ0FBWDtBQUNBOztBQUNKLGFBQUssVUFBTDtBQUNJQyxrQkFBUSxHQUFHRCxPQUFPLENBQUMsSUFBRCxDQUFsQjtBQUNBO0FBTlI7O0FBUUEsVUFBR0MsUUFBUSxJQUFJQSxRQUFRLENBQUNuRyxNQUF4QixFQUFnQztBQUM1QmtHLGVBQU8sQ0FBQ2MsT0FBUixDQUFnQixVQUFVQyxNQUFWLEVBQWlCO0FBQzdCLGVBQUswQixVQUFMLENBQWdCMUIsTUFBaEI7QUFDSCxTQUZlLENBRWQxRyxJQUZjLENBRVQsSUFGUyxDQUFoQjtBQUdIOztBQUNELGFBQU8sSUFBUDtBQUNILEtBdERJO0FBdURMb0ksY0FBVSxFQUFFLG9CQUFVMUIsTUFBVixFQUFpQjtBQUN6QixVQUFJSCxPQUFPLEdBQUdHLE1BQU0sSUFBSSxFQUF4QjtBQUFBLFVBQ0l2RyxPQUFPLEdBQUcsS0FBS0MsSUFBTCxDQUFVLGVBQVYsRUFBMkJzRyxNQUEzQixDQURkOztBQUVBLFVBQUd2RyxPQUFPLEtBQUssS0FBZixFQUFxQjtBQUNqQjtBQUNIOztBQUNELGNBQU92QixFQUFFLENBQUNpRyxJQUFILENBQVE2QixNQUFSLENBQVA7QUFDSSxhQUFLLFFBQUw7QUFDSUgsaUJBQU8sR0FBR0EsT0FBVjtBQUNBOztBQUNKLGFBQUssVUFBTDtBQUNJQSxpQkFBTyxHQUFHQSxPQUFPLENBQUMsSUFBRCxDQUFqQjtBQUNBO0FBTlI7O0FBU0EsVUFBR0EsT0FBTyxDQUFDUixJQUFYLEVBQWlCO0FBQ2IsYUFBS3ZHLEtBQUwsQ0FBV2dFLElBQVgsQ0FBZ0IrQyxPQUFPLENBQUNSLElBQXhCO0FBQ0g7O0FBQ0QsVUFBR1EsT0FBTyxDQUFDTSxTQUFSLElBQXFCTixPQUFPLENBQUNLLFVBQWhDLEVBQTRDO0FBQ3hDaEksVUFBRSxDQUFDb0MsSUFBSCxDQUFRbEIsTUFBUixFQUFnQnlHLE9BQU8sQ0FBQ00sU0FBeEIsRUFBbUNOLE9BQU8sQ0FBQ0ssVUFBM0M7QUFDSDs7QUFDRCxVQUFJOUIsT0FBTyxHQUFHLEtBQUtrRCxRQUFMLENBQWNyRCxZQUFkLENBQTJCNEIsT0FBTyxDQUFDM0IsTUFBUixJQUFnQixFQUEzQyxDQUFkOztBQUNBMkIsYUFBTyxDQUFDRCxVQUFSLEdBQXFCeEIsT0FBckI7O0FBQ0EsV0FBS2MsUUFBTCxDQUFjcEMsSUFBZCxDQUFtQitDLE9BQW5COztBQUNBLFdBQUtuRyxJQUFMLENBQVUsY0FBVixFQUEwQm1HLE9BQTFCO0FBQ0EsYUFBTyxLQUFLekIsT0FBTCxHQUFlLEtBQUtBLE9BQUwsQ0FBYWdCLE1BQWIsQ0FBb0JoQixPQUFwQixDQUFmLEVBQTZDQSxPQUFwRDtBQUNILEtBakZJO0FBa0ZMcUQsY0FBVSxFQUFFLG9CQUFVdkQsTUFBVixFQUFpQjtBQUN6QixVQUFJRSxPQUFPLEdBQUcsS0FBS2tELFFBQUwsQ0FBY3JELFlBQWQsQ0FBMkJDLE1BQTNCLENBQWQ7O0FBQ0EsYUFBTyxLQUFLRSxPQUFMLEdBQWUsS0FBS0EsT0FBTCxDQUFhZ0IsTUFBYixDQUFvQmhCLE9BQXBCLENBQWYsRUFBNkNBLE9BQXBEO0FBQ0gsS0FyRkk7QUFzRkx1RCxhQUFTLEVBQUUsbUJBQVV0RixLQUFWLEVBQWdCO0FBQ3ZCLFdBQUsrQixPQUFMLENBQWF0QixJQUFiLENBQWtCLEtBQUt3RSxRQUFMLENBQWMzRCxXQUFkLENBQTBCdEIsS0FBMUIsQ0FBbEI7QUFDSDtBQXhGSTtBQVRhLENBQVQsQ0FBakIsQzs7Ozs7Ozs7Ozs7QUNEQSxJQUFJNUIsS0FBSyxHQUFHQyxJQUFJLENBQUNELEtBQUwsSUFBYzFDLG1CQUFPLENBQUMsb0JBQUQsQ0FBakM7O0FBQ0EsSUFBSTZDLEtBQUssR0FBRzdDLG1CQUFPLENBQUMsMENBQUQsQ0FBbkI7O0FBQ0EsSUFBSTZKLE9BQU8sR0FBR25ILEtBQUssQ0FBQ0ksV0FBTixDQUFrQjtBQUMvQkMsYUFBVyxFQUFDLFNBRG1CO0FBRS9CVyxXQUFTLEVBQUUscUJBQVc7QUFDckIsUUFBSTVCLFFBQVEsR0FBRyxLQUFLeUIsS0FBTCxDQUFXSSxPQUExQjtBQUFBLFFBQ0M0RixRQUFRLEdBQUd6SCxRQUFRLENBQUN1SCxPQURyQjtBQUFBLFFBRUNTLFdBQVcsR0FBRztBQUNidkgsVUFBSSxFQUFFVCxRQUFRLENBQUNTLElBQVQsQ0FBY0YsT0FBZCxDQUFzQixLQUFLa0IsS0FBTCxDQUFXZSxLQUFYLENBQWlCL0IsSUFBdkMsRUFBOEMsRUFBOUMsQ0FETztBQUViTCxZQUFNLEVBQUVKLFFBQVEsQ0FBQ0ksTUFGSjtBQUdiVixXQUFLLEVBQUVNLFFBQVEsQ0FBQ04sS0FISDtBQUliNkgsYUFBTyxFQUFFRTtBQUpJLEtBRmY7QUFBQSxRQVFDbEQsT0FBTyxHQUFHLEtBQUs5QyxLQUFMLENBQVdlLEtBQVgsQ0FBaUJ1RCxVQVI1QjtBQUFBLFFBU0NuQixNQUFNLEdBQUcsSUFUVjtBQUFBLFFBVUNPLFVBQVUsR0FBRyxJQVZkOztBQVdNLFFBQUcsQ0FBQ1osT0FBSixFQUFhO0FBQ2xCLFVBQUkwRCxPQUFPLEdBQUdSLFFBQVEsQ0FBQ3ZDLGtCQUFULENBQTRCLEtBQUt6RCxLQUFMLENBQVdlLEtBQXZDLENBQWQ7O0FBQ0ErQixhQUFPLEdBQUcwRCxPQUFPLENBQUM1RCxNQUFsQjtBQUNBYyxnQkFBVSxHQUFHOEMsT0FBTyxDQUFDOUcsU0FBckI7QUFDQTs7QUFDRHlELFVBQU0sR0FBRzZDLFFBQVEsQ0FBQzlDLGtCQUFULENBQTRCcUQsV0FBNUIsRUFBeUN6RCxPQUF6QyxDQUFUOztBQUVBLFFBQUdLLE1BQUgsRUFBVztBQUNWLGFBQU87QUFDTnhELGlCQUFTLEVBQUV3RCxNQUFNLENBQUN6RCxTQUFQLElBQW9CZ0UsVUFEekI7QUFFTjlELHNCQUFjLEVBQUVoRCxFQUFFLENBQUNzRSxNQUFILENBQVUsRUFBVixFQUFjaUMsTUFBTSxDQUFDbkQsS0FBckIsRUFBNEI7QUFDM0NtQixxQkFBVyxFQUFFLEtBQUtuQixLQUFMLENBQVdtQixXQURtQjtBQUUzQ21CLGdCQUFNLEVBQUUsSUFGbUM7QUFHM0NtRSx1QkFBYSxFQUFFbEksUUFINEI7QUFJM0N3QyxlQUFLLEVBQUVvQyxNQUpvQztBQUszQy9CLGdCQUFNLEVBQUUsS0FBS3BCLEtBQUwsQ0FBV29CLE1BTHdCO0FBTTNDaEIsaUJBQU8sRUFBRW1HO0FBTmtDLFNBQTVCO0FBRlYsT0FBUDtBQVdBLEtBWkQsTUFZSztBQUNKLGFBQU87QUFDTjVHLGlCQUFTLEVBQUVMLEtBQUssQ0FBQ29DLFFBRFg7QUFFTjlCLHNCQUFjLEVBQUU7QUFDZnVCLHFCQUFXLEVBQUUsS0FBS25CLEtBQUwsQ0FBV21CLFdBRFQ7QUFFZm1CLGdCQUFNLEVBQUUsSUFGTztBQUdmbUUsdUJBQWEsRUFBRWxJLFFBSEE7QUFJZjZDLGdCQUFNLEVBQUUsS0FBS3BCLEtBQUwsQ0FBV29CLE1BSko7QUFLZmhCLGlCQUFPLEVBQUVtRztBQUxNO0FBRlYsT0FBUDtBQVVBO0FBRUQsR0E5QzhCO0FBK0MvQkcsZ0JBQWMsRUFBRSwwQkFBVztBQUMxQixXQUFPLEtBQUt2RyxTQUFMLEVBQVA7QUFDQSxHQWpEOEI7QUFrRC9Cd0IsUUFBTSxFQUFFLGtCQUFVO0FBQ2pCLFFBQUcsS0FBSzNCLEtBQUwsQ0FBV0ksT0FBWCxJQUFzQixLQUFLSixLQUFMLENBQVdlLEtBQWpDLElBQTBDLEtBQUtmLEtBQUwsQ0FBV2UsS0FBWCxDQUFpQjZCLE1BQTlELEVBQXNFO0FBQ3JFLFVBQUkrRCxVQUFVLEdBQUcsS0FBS0QsY0FBTCxFQUFqQjs7QUFDQSwwQkFDQztBQUFLLGlCQUFTLEVBQUV0SCxJQUFJLENBQUN3QyxLQUFMLENBQVdDLFNBQVgsQ0FBcUIsVUFBckIsRUFBaUMsS0FBSzdCLEtBQUwsQ0FBVzhCLFNBQTVDLENBQWhCO0FBQXdFLGFBQUssRUFBRSxLQUFLOUIsS0FBTCxDQUFXK0I7QUFBMUYsU0FDRTRFLFVBQVUsQ0FBQ2hILFNBQVgsaUJBQXdCLG9CQUFDLFVBQUQsQ0FBWSxTQUFaLEVBQTBCZ0gsVUFBVSxDQUFDL0csY0FBckMsQ0FEMUIsQ0FERDtBQUtBLEtBUEQsTUFPSztBQUNKLGFBQU8sSUFBUDtBQUNBO0FBQ0Q7QUE3RDhCLENBQWxCLENBQWQ7QUFnRUFsRCxNQUFNLENBQUNDLE9BQVAsR0FBaUIySixPQUFqQixDOzs7Ozs7Ozs7OztBQ2xFQTVKLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQkMsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDdEIsWUFBUSxJQURjO0FBRXRCRyxTQUFPLEVBQUU7QUFDTEMsUUFBSSxFQUFFLGdCQUFXO0FBQ2IsV0FBSzJKLG1CQUFMO0FBQ0gsS0FISTtBQUlMQSx1QkFBbUIsRUFBRSwrQkFBVztBQUM1QjtBQUNBLFVBQUksQ0FBQzlJLE1BQU0sQ0FBQytJLGVBQVosRUFBNEI7QUFDdkIscUJBQVU7QUFDUCxjQUFJQyxPQUFPLEdBQUdDLFFBQVEsQ0FBQ0MsR0FBdkI7QUFDQWxKLGdCQUFNLENBQUNDLGdCQUFQLENBQXdCLFlBQXhCLEVBQXNDLFVBQVNFLEtBQVQsRUFBZTtBQUNqRHFILGtCQUFNLENBQUMyQixjQUFQLENBQXNCaEosS0FBdEIsRUFBNkIsUUFBN0IsRUFBdUM7QUFDbkNpSix3QkFBVSxFQUFFLElBRHVCO0FBRW5DQywwQkFBWSxFQUFFLElBRnFCO0FBR25DQyxtQkFBSyxFQUFFTjtBQUg0QixhQUF2QztBQUtBeEIsa0JBQU0sQ0FBQzJCLGNBQVAsQ0FBc0JoSixLQUF0QixFQUE2QixRQUE3QixFQUF1QztBQUNuQ2lKLHdCQUFVLEVBQUUsSUFEdUI7QUFFbkNDLDBCQUFZLEVBQUUsSUFGcUI7QUFHbkNDLG1CQUFLLEVBQUVMLFFBQVEsQ0FBQ0M7QUFIbUIsYUFBdkM7QUFLQUYsbUJBQU8sR0FBR0MsUUFBUSxDQUFDQyxHQUFuQjtBQUNILFdBWkQ7QUFhSCxTQWZBLEdBQUQ7QUFnQkg7QUFDSjtBQXhCSTtBQUZhLENBQVQsQ0FBakIsQzs7Ozs7Ozs7Ozs7QUNBQSxJQUFJN0gsS0FBSyxHQUFHQyxJQUFJLENBQUNELEtBQUwsSUFBYzFDLG1CQUFPLENBQUMsb0JBQUQsQ0FBakM7O0FBQ0FDLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQndDLEtBQUssQ0FBQ0ksV0FBTixDQUFrQjtBQUNsQ0MsYUFBVyxFQUFDLFVBRHNCO0FBRWxDbUMsUUFBTSxFQUFFLGtCQUFVO0FBQ2pCLHdCQUNDO0FBQUssZUFBUyxFQUFFdkMsSUFBSSxDQUFDd0MsS0FBTCxDQUFXQyxTQUFYLENBQXFCLHFCQUFyQixFQUE0QyxLQUFLN0IsS0FBTCxDQUFXOEIsU0FBdkQsQ0FBaEI7QUFBbUYsV0FBSyxFQUFFLEtBQUs5QixLQUFMLENBQVcrQjtBQUFyRyxvQkFDQztBQUFLLGVBQVMsRUFBQztBQUFmLG9CQUNDLDZDQURELENBREQsZUFJQztBQUFLLGVBQVMsRUFBQztBQUFmLGlDQUNVO0FBQU0sZUFBUyxFQUFDO0FBQWhCLE9BQXdCLEtBQUsvQixLQUFMLENBQVdJLE9BQVgsQ0FBbUJwQixJQUEzQyxDQURWLG1CQUpELGVBT0M7QUFBSyxlQUFTLEVBQUM7QUFBZixNQVBELENBREQ7QUFhQTtBQWhCaUMsQ0FBbEIsQ0FBakIsQzs7Ozs7Ozs7Ozs7QUNEQXRDLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjtBQUNiLGNBQVlGLG1CQUFPLENBQUMsMENBQUQ7QUFETixDQUFqQixDOzs7Ozs7Ozs7OztBQ0FBQSxtQkFBTyxDQUFDLDRCQUFELENBQVA7O0FBQ0FDLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjtBQUNiMEssWUFBVSxFQUFFNUssbUJBQU8sQ0FBQyx3Q0FBRCxDQUROO0FBRWI2SyxPQUFLLEVBQUU3SyxtQkFBTyxDQUFDLDJCQUFEO0FBRkQsQ0FBakIsQzs7Ozs7Ozs7Ozs7QUNEQSxhQUFhLGdDQUFnQyxFQUFFLEkiLCJmaWxlIjoiLi9kaXN0L2RldmVsb3BtZW50L2luZGV4LmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vaW5kZXguanNcIik7XG4iLCJ2YXIgUmVxdWVzdEhhbmRsZXIgPSByZXF1aXJlKCcuL1JlcXVlc3RIYW5kbGVyJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHpuLkNsYXNzKFJlcXVlc3RIYW5kbGVyLCB7XG4gICAgZXZlbnRzOiBbJ2hhc2hjaGFuZ2UnLCAnaGFuZGxlciddLFxuICAgIHByb3BlcnRpZXM6IHsgfSxcbiAgICBtZXRob2RzOiB7XG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uIChhcmd2LCBldmVudHMpe1xuICAgICAgICAgICAgdGhpcy5fX2luaXRFdmVudHMoZXZlbnRzKTtcbiAgICAgICAgICAgIGlmKHRoaXMuc3VwZXIuY2FsbGVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdXBlcihhcmd2KTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHRoaXMuY29uc3RydWN0b3IuX3N1cGVyXy5wcm90b3R5cGUuaW5pdChhcmd2LCBldmVudHMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZih0aGlzLl9tYWluLmxlbmd0aCAmJiAhbG9jYXRpb24uaGFzaCl7XG4gICAgICAgICAgICAgICAgbG9jYXRpb24uaGFzaCA9IHRoaXMuX21haW4ucG9wKCk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLl9faGFzaGNoYW5nZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2hhc2hjaGFuZ2UnLCB0aGlzLl9faGFzaGNoYW5nZS5iaW5kKHRoaXMpLCBmYWxzZSk7XG4gICAgICAgIH0sXG4gICAgICAgIF9faW5pdEV2ZW50czogZnVuY3Rpb24gKGV2ZW50cyl7XG4gICAgICAgICAgICBpZihldmVudHMgJiYgdHlwZW9mIGV2ZW50cyA9PSAnb2JqZWN0Jyl7XG4gICAgICAgICAgICAgICAgZm9yKHZhciBldmVudCBpbiBldmVudHMpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uKGV2ZW50LCBldmVudHNbZXZlbnRdLCB0aGlzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIF9faGFzaGNoYW5nZTogZnVuY3Rpb24gKGV2ZW50KXtcbiAgICAgICAgICAgIHZhciBfcmV0dXJuID0gdGhpcy5maXJlKCdoYXNoY2hhbmdlJywgZXZlbnQpO1xuICAgICAgICAgICAgaWYoX3JldHVybiA9PT0gZmFsc2UpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIHZhciBfaGFzaCA9IHRoaXMuX19wYXJzZUhhc2goKSxcbiAgICAgICAgICAgICAgICBfcmVxdWVzdCA9IHRoaXMuY3JlYXRlUmVxdWVzdChfaGFzaCwgZXZlbnQpO1xuXG4gICAgICAgICAgICBfcmV0dXJuID0gdGhpcy5maXJlKCdoYW5kbGVyJywgZXZlbnQsIF9oYXNoKTtcbiAgICAgICAgICAgIGlmKF9yZXR1cm4gPT09IGZhbHNlKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICAgIHRoaXMuZG9SZXF1ZXN0KF9yZXF1ZXN0KTtcbiAgICAgICAgfSxcbiAgICAgICAgX19wYXJzZUhhc2g6IGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgdmFyIF9oYXNoID0gbG9jYXRpb24uaGFzaCxcbiAgICAgICAgICAgICAgICBfc2VhcmNoID0gbG9jYXRpb24uc2VhcmNoLFxuICAgICAgICAgICAgICAgIF9oYXNoU3BsaXRJbmRleCA9IF9oYXNoLmluZGV4T2YoJz8nKTtcbiAgICAgICAgICAgIGlmKF9zZWFyY2ggJiYgX3NlYXJjaC5pbmRleE9mKCc/JykhPT0tMSl7XG4gICAgICAgICAgICAgICAgX3NlYXJjaCA9IF9zZWFyY2gucmVwbGFjZSgnPycsICcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKF9oYXNoU3BsaXRJbmRleCAhPT0gLTEpe1xuICAgICAgICAgICAgICAgIF9zZWFyY2ggPSBfc2VhcmNoICsgJyYnKyBfaGFzaC5zdWJzdHJpbmcoX2hhc2hTcGxpdEluZGV4ICsgMSk7XG4gICAgICAgICAgICAgICAgX2hhc2ggPSBfaGFzaC5zdWJzdHJpbmcoMCwgX2hhc2hTcGxpdEluZGV4KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBwYXRoOiBfaGFzaC5zdWJzdHJpbmcoMSksXG4gICAgICAgICAgICAgICAgc2VhcmNoOiB6bi5xdWVyeXN0cmluZy5wYXJzZShfc2VhcmNoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSk7XG4iLCJ2YXIgUmVhY3QgPSB6bnVpLlJlYWN0IHx8IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgSGFzaEhhbmRsZXIgPSByZXF1aXJlKCcuL0hhc2hIYW5kbGVyJyk7XG52YXIgZXJyb3IgPSByZXF1aXJlKCcuL2Vycm9yL2luZGV4LmpzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0ZGlzcGxheU5hbWU6J1pSSGFzaFJvdXRlcicsXG5cdGdldEluaXRpYWxTdGF0ZTpmdW5jdGlvbigpe1xuXHRcdHJldHVybiB7XG5cdFx0XHRjb21wb25lbnQ6IG51bGwsXG5cdFx0XHRDb21wb25lbnQ6IG51bGwsXG5cdFx0XHRDb21wb25lbnRQcm9wczogbnVsbFxuXHRcdH1cblx0fSxcblx0Y29tcG9uZW50RGlkTW91bnQ6ZnVuY3Rpb24oKXtcblx0XHR0aGlzLl9faW5pdEhhbmRsZXIoKTtcblx0fSxcblx0X19pbml0SGFuZGxlcjogZnVuY3Rpb24gKCl7XG5cdFx0dGhpcy5faGFuZGxlciA9IG5ldyBIYXNoSGFuZGxlcih0aGlzLnByb3BzLCB7XG5cdFx0XHRoYXNoY2hhbmdlOiB0aGlzLl9faGFzaGNoYW5nZSxcblx0XHRcdGhhbmRsZXI6IHRoaXMuX19oYW5kbGVyLFxuXHRcdFx0cmVxdWVzdDogdGhpcy5fX3JlcXVlc3QsXG5cdFx0XHRub3Rmb3VuZDogdGhpcy5fX25vdGZvdW5kLFxuXHRcdFx0cGx1Z2lubG9hZGVkOiB0aGlzLl9fcGx1Z2luTG9hZGVkXG5cdFx0fSk7XG5cdFx0dGhpcy5wcm9wcy5vbkluaXRIYW5kbGVyICYmIHRoaXMucHJvcHMub25Jbml0SGFuZGxlcih0aGlzLl9oYW5kbGVyLCB0aGlzKTtcblx0fSxcblx0X19oYXNoY2hhbmdlOiBmdW5jdGlvbiAoc2VuZGVyLCBldmVudCl7XG5cdFx0dGhpcy5wcm9wcy5vbkhhc2hDaGFuZ2UgJiYgdGhpcy5wcm9wcy5vbkhhc2hDaGFuZ2UoZXZlbnQsIHRoaXMpO1xuXHR9LFxuXHRfX2hhbmRsZXI6IGZ1bmN0aW9uIChzZW5kZXIsIGV2ZW50LCBkYXRhKXtcblx0XHR0aGlzLnByb3BzLm9uSGFuZGxlciAmJiB0aGlzLnByb3BzLm9uSGFuZGxlcihldmVudCwgZGF0YSwgdGhpcyk7XG5cdH0sXG5cdF9fcmVxdWVzdDogZnVuY3Rpb24gKHNlbmRlciwgcmVxdWVzdCwgcm91dGUpe1xuXHRcdGlmKHJvdXRlLmNvbXBvbmVudCAmJiB0eXBlb2Ygcm91dGUuY29tcG9uZW50ID09ICdvYmplY3QnICYmIHJvdXRlLmNvbXBvbmVudC4kJHR5cGVvZikge1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdGNvbXBvbmVudDogcm91dGUuY29tcG9uZW50XG5cdFx0XHR9KTtcblx0XHR9ZWxzZXtcblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRDb21wb25lbnQ6IHJvdXRlLmNvbXBvbmVudCxcblx0XHRcdFx0Q29tcG9uZW50UHJvcHM6IHpuLmV4dGVuZCh7fSwgcm91dGUucHJvcHMsIHtcblx0XHRcdFx0XHRhcHBsaWNhdGlvbjogdGhpcy5wcm9wcy5hcHBsaWNhdGlvbixcblx0XHRcdFx0XHRyZXF1ZXN0OiByZXF1ZXN0LFxuXHRcdFx0XHRcdHJvdXRlcjogdGhpcyxcblx0XHRcdFx0XHRyb3V0ZTogcm91dGVcblx0XHRcdFx0fSlcblx0XHRcdH0pO1xuXHRcdH1cblx0XHR0aGlzLnByb3BzLm9uUmVxdWVzdCAmJiB0aGlzLnByb3BzLm9uUmVxdWVzdChyZXF1ZXN0LCByb3V0ZSwgdGhpcyk7XG5cdH0sXG5cdF9fbm90Zm91bmQ6IGZ1bmN0aW9uIChzZW5kZXIsIHJlcXVlc3Qpe1xuXHRcdHRoaXMubm90Zm91bmQocmVxdWVzdCk7XG5cdFx0dGhpcy5wcm9wcy5vbk5vdEZvdW5kICYmIHRoaXMucHJvcHMub25Ob3RGb3VuZChyZXF1ZXN0LCB0aGlzKTtcblx0fSxcblx0X19wbHVnaW5Mb2FkZWQ6IGZ1bmN0aW9uIChzZW5kZXIsIGRhdGEpe1xuXHRcdHRoaXMucHJvcHMub25QbHVnaW5Mb2FkZWQgJiYgdGhpcy5wcm9wcy5vblBsdWdpbkxvYWRlZChkYXRhLCB0aGlzKTtcblx0fSxcblx0cHVzaDogZnVuY3Rpb24gKCl7XG5cblx0fSxcblx0Zm9yd2FyZDogZnVuY3Rpb24gKCl7XG5cblx0fSxcblx0bm90Zm91bmQ6IGZ1bmN0aW9uIChyZXF1ZXN0KXtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdENvbXBvbmVudDogZXJyb3IuRXJyb3I0MDQsXG5cdFx0XHRDb21wb25lbnRQcm9wczoge1xuXHRcdFx0XHRyZXF1ZXN0OiByZXF1ZXN0XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0sXG5cdHJlbmRlcjogZnVuY3Rpb24oKXtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9e3pudWkucmVhY3QuY2xhc3NuYW1lKFwienItaGFzaC1yb3V0ZXJcIiwgdGhpcy5wcm9wcy5jbGFzc05hbWUpfSBzdHlsZT17dGhpcy5wcm9wcy5zdHlsZX0gPlxuXHRcdFx0XHR7IHRoaXMuc3RhdGUuY29tcG9uZW50IH1cblx0XHRcdFx0eyB0aGlzLnN0YXRlLkNvbXBvbmVudCAmJiA8dGhpcy5zdGF0ZS5Db21wb25lbnQgey4uLnRoaXMuc3RhdGUuQ29tcG9uZW50UHJvcHN9IC8+IH1cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn0pOyIsIm1vZHVsZS5leHBvcnRzID0gem4uQ2xhc3Moe1xuICAgIGV2ZW50czogWydwbHVnaW5Mb2FkaW5nJywgJ3BsdWdpbkxvYWRlZCcsICdyb3V0ZUxvYWRpbmcnLCAncm91dGVMb2FkZWQnXSxcbiAgICBwcm9wZXJ0aWVzOnsgXG4gICAgICAgIHBhdGhTZXBhcmF0b3I6IG51bGwsXG4gICAgICAgIHBhdGhQYXJhbWV0ZXJTeW1ib2w6IG51bGxcbiAgICB9LFxuICAgIG1ldGhvZHM6IHtcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKGFyZ3YsIGV2ZW50cyl7XG4gICAgICAgICAgICB0aGlzLl9faW5pdEV2ZW50cyhldmVudHMpO1xuICAgICAgICAgICAgdGhpcy5fcGF0aFNlcGFyYXRvciA9IGFyZ3YucGF0aFNlcGFyYXRvciB8fCAnLyc7XG4gICAgICAgICAgICB0aGlzLl9wYXRoUGFyYW1ldGVyU3ltYm9sID0gYXJndi5wYXRoUGFyYW1ldGVyU3ltYm9sIHx8ICc6JztcbiAgICAgICAgfSxcbiAgICAgICAgX19pbml0RXZlbnRzOiBmdW5jdGlvbiAoZXZlbnRzKXtcbiAgICAgICAgICAgIGlmKGV2ZW50cyAmJiB0eXBlb2YgZXZlbnRzID09ICdvYmplY3QnKXtcbiAgICAgICAgICAgICAgICBmb3IodmFyIGV2ZW50IGluIGV2ZW50cyl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub24oZXZlbnQsIGV2ZW50c1tldmVudF0sIHRoaXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZm9ybWF0Um91dGU6IGZ1bmN0aW9uIChyb3V0ZSwgcGFyZW50KXtcbiAgICAgICAgICAgIHZhciBfcmV0dXJuID0gdGhpcy5maXJlKCdyb3V0ZUxvYWRpbmcnLCByb3V0ZSwgcGFyZW50KTtcbiAgICAgICAgICAgIGlmKF9yZXR1cm4gPT09IGZhbHNlKXtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHBhcmVudCl7XG4gICAgICAgICAgICAgICAgcm91dGUuX19wYXJlbnRfXyA9IHBhcmVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJvdXRlLnBhdGhzID0gdGhpcy5fX3BhcnNlUm91dGVQYXRocyhyb3V0ZS5wYXRoKTtcbiAgICAgICAgICAgIHJvdXRlLnByb3BzID0gem4uZXh0ZW5kKHt9LCByb3V0ZS5wcm9wcyk7XG4gICAgICAgICAgICBpZihyb3V0ZS5leGFjdCA9PSBudWxsICYmIHJvdXRlLnBhdGguaW5kZXhPZih0aGlzLl9wYXRoUGFyYW1ldGVyU3ltYm9sKSA9PT0gLTEpIHsgcm91dGUuZXhhY3QgPSB0cnVlOyB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZpcmUoJ3JvdXRlTG9hZGVkJywgcm91dGUpLCByb3V0ZTtcbiAgICAgICAgfSxcbiAgICAgICAgZm9ybWF0Um91dGVzOiBmdW5jdGlvbiAocm91dGVzLCBwYXJlbnQpe1xuICAgICAgICAgICAgc3dpdGNoKHpuLnR5cGUocm91dGVzKSl7XG4gICAgICAgICAgICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9yb3V0ZXMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgZm9yKHZhciBwYXRoIGluIHJvdXRlcyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBfcm91dGVzLnB1c2godGhpcy5fX2xvYWRQYXRoQW5kQ29tcG9uZW50KHBhdGgsIHJvdXRlc1twYXRoXSwgcGFyZW50KSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9yb3V0ZXM7XG4gICAgICAgICAgICAgICAgY2FzZSAnYXJyYXknOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcm91dGVzLm1hcCgocm91dGUpPT50aGlzLmZvcm1hdFJvdXRlKHJvdXRlLCBwYXJlbnQpKTtcbiAgICAgICAgICAgICAgICBjYXNlICdmdW5jdGlvbic6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZvcm1hdFJvdXRlcyhyb3V0ZXMuY2FsbChudWxsLCBwYXJlbnQsIHRoaXMpLCBwYXJlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBnZXRSb3V0ZUZvclJlcXVlc3Q6IGZ1bmN0aW9uIChyZXF1ZXN0LCByb3V0ZXMpe1xuICAgICAgICAgICAgdmFyIF9yb3V0ZXMgPSByb3V0ZXMsXG4gICAgICAgICAgICAgICAgX3JvdXRlID0gbnVsbCxcbiAgICAgICAgICAgICAgICBfZGF0YSA9IG51bGw7XG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwLCBfbGVuID0gX3JvdXRlcy5sZW5ndGg7IGkgPCBfbGVuOyBpKyspe1xuICAgICAgICAgICAgICAgIF9yb3V0ZSA9IF9yb3V0ZXNbaV07XG4gICAgICAgICAgICAgICAgX2RhdGEgPSB0aGlzLl9fbWF0Y2hSb3V0ZUFuZFJlcXVlc3QoX3JvdXRlLCByZXF1ZXN0KTtcbiAgICAgICAgICAgICAgICBpZihfZGF0YSl7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYoIV9kYXRhIHx8ICFfcm91dGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiByZXF1ZXN0LnBhcmFtcyA9IF9kYXRhLCBfcm91dGU7XG4gICAgICAgIH0sXG4gICAgICAgIGdldFJvdXRlc0Zyb21Sb3V0ZTogZnVuY3Rpb24gKHJvdXRlKXtcbiAgICAgICAgICAgIHZhciBfcm91dGVzID0gW10sXG4gICAgICAgICAgICAgICAgX2NvbXBvbmVudCA9IHJvdXRlLmNvbXBvbmVudDtcbiAgICAgICAgICAgIGlmKHJvdXRlLnJvdXRlcykge1xuICAgICAgICAgICAgICAgIF9yb3V0ZXMgPSB0aGlzLmZvcm1hdFJvdXRlcyhyb3V0ZS5yb3V0ZXMsIHJvdXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYocm91dGUucGx1Z2lucykge1xuICAgICAgICAgICAgICAgIHZhciBfcGx1Z2lucyA9IHRoaXMuX19sb2FkUGx1Z2lucyhyb3V0ZS5wbHVnaW5zLCByb3V0ZSk7XG4gICAgICAgICAgICAgICAgX3JvdXRlcyA9IF9yb3V0ZXMuY29uY2F0KF9wbHVnaW5zLnJvdXRlcyk7XG4gICAgICAgICAgICAgICAgaWYoIV9jb21wb25lbnQgJiYgX3BsdWdpbnMubWFpbi5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgX2NvbXBvbmVudCA9IF9wbHVnaW5zLm1haW4ucG9wKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJvdXRlczogX3JvdXRlcyxcbiAgICAgICAgICAgICAgICBjb21wb25lbnQ6IF9jb21wb25lbnRcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgIF9faXNSZWFjdENvbXBvbmVudDogZnVuY3Rpb24gKGNvbXBvbmVudCl7XG4gICAgICAgICAgICBpZihjb21wb25lbnQgJiYgem4uaXMoY29tcG9uZW50LCAnZnVuY3Rpb24nKSAmJiAoY29tcG9uZW50LnByb3RvdHlwZS5yZW5kZXIgfHwgY29tcG9uZW50LmRpc3BsYXlOYW1lIHx8IGNvbXBvbmVudC5wcm90b3R5cGUuaXNSZWFjdENvbXBvbmVudCApKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSxcbiAgICAgICAgX19sb2FkUGF0aEFuZENvbXBvbmVudDogZnVuY3Rpb24gKHBhdGgsIGNvbXBvbmVudCwgcGFyZW50KXtcbiAgICAgICAgICAgIHZhciBfcm91dGUgPSB7IHBhdGg6IHBhdGggfTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgc3dpdGNoKHpuLnR5cGUoY29tcG9uZW50KSl7XG4gICAgICAgICAgICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgICAgICAgICAgICAgX3JvdXRlLmNvbXBvbmVudCA9IHpuLnBhdGgod2luZG93LCBjb21wb25lbnQpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdmdW5jdGlvbic6XG4gICAgICAgICAgICAgICAgICAgIGlmKCF0aGlzLl9faXNSZWFjdENvbXBvbmVudChjb21wb25lbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfcm91dGUuY29tcG9uZW50ID0gY29tcG9uZW50LmNhbGwodGhpcywgcGF0aCwgdGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgX3JvdXRlLmNvbXBvbmVudCA9IGNvbXBvbmVudDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICAgICAgICAgICAgICBpZihjb21wb25lbnQuJCR0eXBlb2YpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9yb3V0ZS5jb21wb25lbnQgPSBjb21wb25lbnQ7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKGNvbXBvbmVudC5jb25zdHJ1Y3Rvci50b1N0cmluZygpLmluZGV4T2YoJ2Z1bmN0aW9uIE9iamVjdCcpID09IDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgem4uZXh0ZW5kKF9yb3V0ZSwgY29tcG9uZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKF9yb3V0ZS5leHRlbnNpb24gIT09IGZhbHNlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9faW5pdFJvdXRlKF9yb3V0ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZvcm1hdFJvdXRlKF9yb3V0ZSwgcGFyZW50KTtcbiAgICAgICAgfSxcbiAgICAgICAgX19pbml0Um91dGU6IGZ1bmN0aW9uIChyb3V0ZSl7XG4gICAgICAgICAgICBpZihyb3V0ZS5yb3V0ZXMpIHtcbiAgICAgICAgICAgICAgICByb3V0ZS5fX3JvdXRlc19fID0gdGhpcy5mb3JtYXRSb3V0ZXMocm91dGUucm91dGVzLCByb3V0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKHJvdXRlLnBsdWdpbnMpIHtcbiAgICAgICAgICAgICAgICB2YXIgX3BsdWdpbnMgPSB0aGlzLl9fbG9hZFBsdWdpbnMocm91dGUucGx1Z2lucywgcm91dGUpO1xuICAgICAgICAgICAgICAgIGlmKHJvdXRlLl9fcm91dGVzX18pIHtcbiAgICAgICAgICAgICAgICAgICAgcm91dGUuX19yb3V0ZXNfXyA9IHJvdXRlLl9fcm91dGVzX18uY29uY2F0KF9wbHVnaW5zLnJvdXRlcyk7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHJvdXRlLl9fcm91dGVzX18gPSBfcGx1Z2lucy5yb3V0ZXM7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcm91dGUubWFpbiA9IF9wbHVnaW5zLm1haW47XG4gICAgICAgICAgICAgICAgaWYoIXJvdXRlLmNvbXBvbmVudCAmJiBfcGx1Z2lucy5tYWluLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICByb3V0ZS5jb21wb25lbnQgPSBfcGx1Z2lucy5tYWluLnBvcCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHJvdXRlO1xuICAgICAgICB9LFxuICAgICAgICBfX2xvYWRQbHVnaW5zOiBmdW5jdGlvbiAocGx1Z2lucywgcGFyZW50KXtcbiAgICAgICAgICAgIHZhciBfcGx1Z2lucyA9IHBsdWdpbnMgfHwgW10sXG4gICAgICAgICAgICAgICAgX3BsdWdpbiA9IG51bGwsXG4gICAgICAgICAgICAgICAgX3JvdXRlcyA9IFtdLFxuICAgICAgICAgICAgICAgIF9tYWluID0gW10sXG4gICAgICAgICAgICAgICAgX3BsdWdpbk1haW4gPSBudWxsO1xuICAgICAgICAgICAgc3dpdGNoKHpuLnR5cGUocGx1Z2lucykpe1xuICAgICAgICAgICAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgICAgICAgICAgICAgIF9wbHVnaW5zID0gW3BsdWdpbnNdO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdmdW5jdGlvbic6XG4gICAgICAgICAgICAgICAgICAgIF9wbHVnaW5zID0gcGx1Z2lucyh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihfcGx1Z2lucyAmJiBfcGx1Z2lucy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBwbHVnaW5zLmZvckVhY2goZnVuY3Rpb24gKHBsdWdpbil7XG4gICAgICAgICAgICAgICAgICAgIF9wbHVnaW4gPSB0aGlzLl9fbG9hZFBsdWdpbihwbHVnaW4sIHBhcmVudCk7XG4gICAgICAgICAgICAgICAgICAgIGlmKF9wbHVnaW4pe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoX3BsdWdpbi5fX3JvdXRlc19fKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3JvdXRlcyA9IF9yb3V0ZXMuY29uY2F0KF9wbHVnaW4uX19yb3V0ZXNfXyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihfcGx1Z2luLm1haW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcGx1Z2luTWFpbiA9IF9wbHVnaW4ubWFpbjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2goem4udHlwZShfbWFpbikpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3BsdWdpbk1haW4gPSBfcGx1Z2luLnJvdXRlc1tfcGx1Z2luTWFpbl0gfHwgem4ucGF0aChfcGx1Z2luLmNvbXBvbmVudHMsIF9wbHVnaW5NYWluKSB8fCB6bi5wYXRoKHdpbmRvdywgX3BsdWdpbk1haW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2Z1bmN0aW9uJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKF9wbHVnaW5NYWluLmNvbnN0cnVjdG9yLnRvU3RyaW5nKCkgPT0gXCJmdW5jdGlvbiBGdW5jdGlvbigpIHsgW25hdGl2ZSBjb2RlXSB9XCIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9wbHVnaW5NYWluID0gX3BsdWdpbk1haW4odGhpcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdCA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX21haW4ucHVzaChfcGx1Z2luTWFpbik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByb3V0ZXM6IF9yb3V0ZXMsXG4gICAgICAgICAgICAgICAgbWFpbjogX21haW5cbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgIF9fbG9hZFBsdWdpbjogZnVuY3Rpb24gKHBsdWdpbiwgcGFyZW50KXtcbiAgICAgICAgICAgIHZhciBfcGx1Z2luID0gcGx1Z2luIHx8IHt9LFxuICAgICAgICAgICAgICAgIF9yZXR1cm4gPSB0aGlzLmZpcmUoJ3BsdWdpbkxvYWRpbmcnLCBwbHVnaW4sIHBhcmVudCk7XG4gICAgICAgICAgICBpZihfcmV0dXJuID09PSBmYWxzZSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzd2l0Y2goem4udHlwZShwbHVnaW4pKXtcbiAgICAgICAgICAgICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICAgICAgICAgICAgICBfcGx1Z2luID0gX3BsdWdpbjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZnVuY3Rpb24nOlxuICAgICAgICAgICAgICAgICAgICBfcGx1Z2luID0gX3BsdWdpbih0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihfcGx1Z2luLm5hbWVzcGFjZSAmJiBfcGx1Z2luLmNvbXBvbmVudHMpIHtcbiAgICAgICAgICAgICAgICB6bi5wYXRoKHdpbmRvdywgX3BsdWdpbi5uYW1lc3BhY2UsIF9wbHVnaW4uY29tcG9uZW50cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfcGx1Z2luLl9fcm91dGVzX18gPSB0aGlzLmZvcm1hdFJvdXRlcyhfcGx1Z2luLnJvdXRlc3x8W10sIHBhcmVudCk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZpcmUoJ3BsdWdpbkxvYWRlZCcsIF9wbHVnaW4pLCBfcGx1Z2luO1xuICAgICAgICB9LFxuICAgICAgICBfX21hdGNoUm91dGVBbmRSZXF1ZXN0OiBmdW5jdGlvbiAocm91dGUsIHJlcXVlc3Qpe1xuICAgICAgICAgICAgdmFyIF9wYXRocyA9IHJvdXRlLnBhdGhzLFxuICAgICAgICAgICAgICAgIF9wYXRoID0gbnVsbCxcbiAgICAgICAgICAgICAgICBfcGFyYW1zID0ge30sXG4gICAgICAgICAgICAgICAgX3VybFVubWF0Y2hzID0gW10sXG4gICAgICAgICAgICAgICAgX2hhc0NoZWNrZWQgPSBmYWxzZSxcbiAgICAgICAgICAgICAgICBfdGVtcCA9IG51bGwsXG4gICAgICAgICAgICAgICAgX3RlbXBzID0gcmVxdWVzdC5wYXRoLnNwbGl0KHRoaXMuX3BhdGhTZXBhcmF0b3IpO1xuXG4gICAgICAgICAgICBpZihyb3V0ZS5yb3V0ZXMgJiYgT2JqZWN0LmtleXMocm91dGUucm91dGVzKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBpZihyb3V0ZS5leGFjdCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJvdXRlLmV4YWN0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihyb3V0ZS5leGFjdCkge1xuICAgICAgICAgICAgICAgIGlmKHJvdXRlLnBhdGggPT09IHJlcXVlc3QucGF0aCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVxdWVzdC51bm1hdGNocyA9IF91cmxVbm1hdGNocywgX3BhcmFtczsgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKF90ZW1wcy5sZW5ndGggIT09IF9wYXRocy5sZW5ndGgpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwLCBfbGVuID0gX3RlbXBzLmxlbmd0aDsgaSA8IF9sZW47IGkrKykge1xuICAgICAgICAgICAgICAgIF90ZW1wID0gX3RlbXBzW2ldO1xuICAgICAgICAgICAgICAgIGlmKCFfdGVtcCkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgX3BhdGggPSBfcGF0aHNbaV07XG4gICAgICAgICAgICAgICAgX2hhc0NoZWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGlmKCFfcGF0aCl7XG4gICAgICAgICAgICAgICAgICAgIF91cmxVbm1hdGNocy5wdXNoKF90ZW1wKTtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKCFfcGF0aC5pc1BhcmFtZXRlciAmJiBfdGVtcCAhPT0gX3BhdGgua2V5KXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKF9wYXRoLmlzUGFyYW1ldGVyKXtcbiAgICAgICAgICAgICAgICAgICAgX3BhcmFtc1tfcGF0aC5rZXldID0gX3RlbXA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoIV9oYXNDaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcmVxdWVzdC51bm1hdGNocyA9IF91cmxVbm1hdGNocywgX3BhcmFtcztcbiAgICAgICAgfSxcbiAgICAgICAgX19wYXJzZVJvdXRlUGF0aHM6IGZ1bmN0aW9uIChwYXRoKXtcbiAgICAgICAgICAgIHZhciBfcGF0aHMgPSBbXSxcbiAgICAgICAgICAgICAgICBfdGVtcCA9IG51bGwsXG4gICAgICAgICAgICAgICAgX3RlbXBzID0gcGF0aC5zcGxpdCh0aGlzLl9wYXRoU2VwYXJhdG9yKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZm9yKHZhciBpID0gMCwgX2xlbiA9IF90ZW1wcy5sZW5ndGg7IGkgPCBfbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBfdGVtcCA9IF90ZW1wc1tpXTtcbiAgICAgICAgICAgICAgICBpZighX3RlbXApIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICgvXjpcXHdbXFx3XFxkXSokLy50ZXN0KF90ZW1wKSkge1xuICAgICAgICAgICAgICAgICAgICBfdGVtcCA9IF90ZW1wLnJlcGxhY2UoL146LywgJycpO1xuICAgICAgICAgICAgICAgICAgICBfcGF0aHNbaV0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IF90ZW1wLFxuICAgICAgICAgICAgICAgICAgICAgICAgaXNQYXJhbWV0ZXI6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgX3BhdGhzW2ldID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBfdGVtcFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIF9wYXRocztcbiAgICAgICAgfVxuICAgIH1cbn0pOyIsInZhciBQYXRoTWF0Y2hlciA9IHJlcXVpcmUoJy4vUGF0aE1hdGNoZXInKTtcbm1vZHVsZS5leHBvcnRzID0gem4uQ2xhc3Moe1xuICAgIGV2ZW50czogWydyZXF1ZXN0JywgJ25vdGZvdW5kJywgJ3BsdWdpbkxvYWRpbmcnLCAncGx1Z2luTG9hZGVkJ10sXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICByZXF1ZXN0czogbnVsbCxcbiAgICAgICAgcm91dGVzOiBudWxsLFxuICAgICAgICBwbHVnaW5zOiBudWxsLFxuICAgICAgICBtYWluOiBudWxsLFxuICAgICAgICBtYXRjaGVyOiBudWxsXG4gICAgfSxcbiAgICBtZXRob2RzOiB7XG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uIChhcmd2LCBldmVudHMpe1xuICAgICAgICAgICAgdGhpcy5fcmVxdWVzdHMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX3JvdXRlcyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5fcGx1Z2lucyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5fbWFpbiA9IFtdO1xuICAgICAgICAgICAgdGhpcy5fbWF0Y2hlciA9IG5ldyBQYXRoTWF0Y2hlcihhcmd2LCB7XG4gICAgICAgICAgICAgICAgcGx1Z2luTG9hZGVkOiBmdW5jdGlvbiAoc2VuZGVyLCBwbHVnaW4pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maXJlKCdwbHVnaW5Mb2FkZWQnLCBwbHVnaW4pO1xuICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLl9faW5pdEV2ZW50cyhldmVudHMpO1xuICAgICAgICAgICAgdGhpcy5sb2FkUGx1Z2lucyhhcmd2LnBsdWdpbnMpO1xuICAgICAgICAgICAgdGhpcy5sb2FkUm91dGVzKGFyZ3Yucm91dGVzKTtcbiAgICAgICAgICAgIGlmKGFyZ3YubWFpbikge1xuICAgICAgICAgICAgICAgIHRoaXMuX21haW4ucHVzaChhcmd2Lm1haW4pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBfX2luaXRFdmVudHM6IGZ1bmN0aW9uIChldmVudHMpe1xuICAgICAgICAgICAgaWYoZXZlbnRzICYmIHR5cGVvZiBldmVudHMgPT0gJ29iamVjdCcpe1xuICAgICAgICAgICAgICAgIGZvcih2YXIgZXZlbnQgaW4gZXZlbnRzKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbihldmVudCwgZXZlbnRzW2V2ZW50XSwgdGhpcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBjcmVhdGVSZXF1ZXN0OiBmdW5jdGlvbiAocmVxdWVzdCwgZXZlbnQpe1xuICAgICAgICAgICAgcmVxdWVzdC5ldmVudCA9IGV2ZW50O1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3RzLnB1c2gocmVxdWVzdCksIHJlcXVlc3Q7XG4gICAgICAgIH0sXG4gICAgICAgIGRvUmVxdWVzdDogZnVuY3Rpb24gKHJlcXVlc3Qpe1xuICAgICAgICAgICAgdmFyIF9yb3V0ZSA9IHRoaXMuX21hdGNoZXIuZ2V0Um91dGVGb3JSZXF1ZXN0KHJlcXVlc3QsIHRoaXMuX3JvdXRlcyk7XG4gICAgICAgICAgICByZXF1ZXN0Lm1hdGNoZXIgPSB0aGlzLl9tYXRjaGVyO1xuICAgICAgICAgICAgaWYoX3JvdXRlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maXJlKCdyZXF1ZXN0JywgcmVxdWVzdCwgX3JvdXRlKTtcbiAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpcmUoJ25vdGZvdW5kJywgcmVxdWVzdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGxvYWRQbHVnaW5zOiBmdW5jdGlvbiAocGx1Z2lucyl7XG4gICAgICAgICAgICB2YXIgX3BsdWdpbnMgPSBwbHVnaW5zIHx8IFtdO1xuICAgICAgICAgICAgc3dpdGNoKHpuLnR5cGUocGx1Z2lucykpe1xuICAgICAgICAgICAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgICAgICAgICAgICAgIF9wbHVnaW5zID0gW3BsdWdpbnNdO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdmdW5jdGlvbic6XG4gICAgICAgICAgICAgICAgICAgIF9wbHVnaW5zID0gcGx1Z2lucyh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihfcGx1Z2lucyAmJiBfcGx1Z2lucy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBwbHVnaW5zLmZvckVhY2goZnVuY3Rpb24gKHBsdWdpbil7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZFBsdWdpbihwbHVnaW4pO1xuICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcbiAgICAgICAgbG9hZFBsdWdpbjogZnVuY3Rpb24gKHBsdWdpbil7XG4gICAgICAgICAgICB2YXIgX3BsdWdpbiA9IHBsdWdpbiB8fCB7fSxcbiAgICAgICAgICAgICAgICBfcmV0dXJuID0gdGhpcy5maXJlKCdwbHVnaW5Mb2FkaW5nJywgcGx1Z2luKTtcbiAgICAgICAgICAgIGlmKF9yZXR1cm4gPT09IGZhbHNlKXtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzd2l0Y2goem4udHlwZShwbHVnaW4pKXtcbiAgICAgICAgICAgICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICAgICAgICAgICAgICBfcGx1Z2luID0gX3BsdWdpbjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZnVuY3Rpb24nOlxuICAgICAgICAgICAgICAgICAgICBfcGx1Z2luID0gX3BsdWdpbih0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKF9wbHVnaW4ubWFpbikge1xuICAgICAgICAgICAgICAgIHRoaXMuX21haW4ucHVzaChfcGx1Z2luLm1haW4pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoX3BsdWdpbi5uYW1lc3BhY2UgJiYgX3BsdWdpbi5jb21wb25lbnRzKSB7XG4gICAgICAgICAgICAgICAgem4ucGF0aCh3aW5kb3csIF9wbHVnaW4ubmFtZXNwYWNlLCBfcGx1Z2luLmNvbXBvbmVudHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIF9yb3V0ZXMgPSB0aGlzLl9tYXRjaGVyLmZvcm1hdFJvdXRlcyhfcGx1Z2luLnJvdXRlc3x8W10pO1xuICAgICAgICAgICAgX3BsdWdpbi5fX3JvdXRlc19fID0gX3JvdXRlcztcbiAgICAgICAgICAgIHRoaXMuX3BsdWdpbnMucHVzaChfcGx1Z2luKTtcbiAgICAgICAgICAgIHRoaXMuZmlyZSgncGx1Z2luTG9hZGVkJywgX3BsdWdpbik7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcm91dGVzID0gdGhpcy5fcm91dGVzLmNvbmNhdChfcm91dGVzKSwgX3JvdXRlcztcbiAgICAgICAgfSxcbiAgICAgICAgbG9hZFJvdXRlczogZnVuY3Rpb24gKHJvdXRlcyl7XG4gICAgICAgICAgICB2YXIgX3JvdXRlcyA9IHRoaXMuX21hdGNoZXIuZm9ybWF0Um91dGVzKHJvdXRlcyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcm91dGVzID0gdGhpcy5fcm91dGVzLmNvbmNhdChfcm91dGVzKSwgX3JvdXRlcztcbiAgICAgICAgfSxcbiAgICAgICAgbG9hZFJvdXRlOiBmdW5jdGlvbiAocm91dGUpe1xuICAgICAgICAgICAgdGhpcy5fcm91dGVzLnB1c2godGhpcy5fbWF0Y2hlci5mb3JtYXRSb3V0ZShyb3V0ZSkpO1xuICAgICAgICB9XG4gICAgfVxufSk7XG4iLCJ2YXIgUmVhY3QgPSB6bnVpLlJlYWN0IHx8IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgZXJyb3IgPSByZXF1aXJlKCcuL2Vycm9yL2luZGV4LmpzJyk7XG52YXIgWlJSb3V0ZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0ZGlzcGxheU5hbWU6J1pSUm91dGUnLFxuXHRfX2hhbmRsZXI6IGZ1bmN0aW9uICgpe1xuXHRcdHZhciBfcmVxdWVzdCA9IHRoaXMucHJvcHMucmVxdWVzdCxcblx0XHRcdF9tYXRjaGVyID0gX3JlcXVlc3QubWF0Y2hlcixcblx0XHRcdF9uZXdSZXF1ZXN0ID0ge1xuXHRcdFx0XHRwYXRoOiBfcmVxdWVzdC5wYXRoLnJlcGxhY2UodGhpcy5wcm9wcy5yb3V0ZS5wYXRoLCAgJycpLFxuXHRcdFx0XHRzZWFyY2g6IF9yZXF1ZXN0LnNlYXJjaCxcblx0XHRcdFx0ZXZlbnQ6IF9yZXF1ZXN0LmV2ZW50LFxuXHRcdFx0XHRtYXRjaGVyOiBfbWF0Y2hlclxuXHRcdFx0fSxcblx0XHRcdF9yb3V0ZXMgPSB0aGlzLnByb3BzLnJvdXRlLl9fcm91dGVzX18sXG5cdFx0XHRfcm91dGUgPSBudWxsLFxuXHRcdFx0X2NvbXBvbmVudCA9IG51bGw7XG4gICAgICAgIGlmKCFfcm91dGVzKSB7XG5cdFx0XHR2YXIgX2ZSb3V0ZSA9IF9tYXRjaGVyLmdldFJvdXRlc0Zyb21Sb3V0ZSh0aGlzLnByb3BzLnJvdXRlKTtcblx0XHRcdF9yb3V0ZXMgPSBfZlJvdXRlLnJvdXRlcztcblx0XHRcdF9jb21wb25lbnQgPSBfZlJvdXRlLmNvbXBvbmVudDtcblx0XHR9XG5cdFx0X3JvdXRlID0gX21hdGNoZXIuZ2V0Um91dGVGb3JSZXF1ZXN0KF9uZXdSZXF1ZXN0LCBfcm91dGVzKTtcblxuXHRcdGlmKF9yb3V0ZSkge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0Q29tcG9uZW50OiBfcm91dGUuY29tcG9uZW50IHx8IF9jb21wb25lbnQsXG5cdFx0XHRcdENvbXBvbmVudFByb3BzOiB6bi5leHRlbmQoe30sIF9yb3V0ZS5wcm9wcywge1xuXHRcdFx0XHRcdGFwcGxpY2F0aW9uOiB0aGlzLnByb3BzLmFwcGxpY2F0aW9uLFxuXHRcdFx0XHRcdHBhcmVudDogdGhpcyxcblx0XHRcdFx0XHRwYXJlbnRSZXF1ZXN0OiBfcmVxdWVzdCxcblx0XHRcdFx0XHRyb3V0ZTogX3JvdXRlLFxuXHRcdFx0XHRcdHJvdXRlcjogdGhpcy5wcm9wcy5yb3V0ZXIsXG5cdFx0XHRcdFx0cmVxdWVzdDogX25ld1JlcXVlc3Rcblx0XHRcdFx0fSlcblx0XHRcdH1cblx0XHR9ZWxzZXtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdENvbXBvbmVudDogZXJyb3IuRXJyb3I0MDQsXG5cdFx0XHRcdENvbXBvbmVudFByb3BzOiB7XG5cdFx0XHRcdFx0YXBwbGljYXRpb246IHRoaXMucHJvcHMuYXBwbGljYXRpb24sXG5cdFx0XHRcdFx0cGFyZW50OiB0aGlzLFxuXHRcdFx0XHRcdHBhcmVudFJlcXVlc3Q6IF9yZXF1ZXN0LFxuXHRcdFx0XHRcdHJvdXRlcjogdGhpcy5wcm9wcy5yb3V0ZXIsXG5cdFx0XHRcdFx0cmVxdWVzdDogX25ld1JlcXVlc3Rcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRcblx0fSxcblx0X19nZXRDb21wb25lbnQ6IGZ1bmN0aW9uICgpe1xuXHRcdHJldHVybiB0aGlzLl9faGFuZGxlcigpO1xuXHR9LFxuXHRyZW5kZXI6IGZ1bmN0aW9uKCl7XG5cdFx0aWYodGhpcy5wcm9wcy5yZXF1ZXN0ICYmIHRoaXMucHJvcHMucm91dGUgJiYgdGhpcy5wcm9wcy5yb3V0ZS5yb3V0ZXMpIHtcblx0XHRcdHZhciBfQ29tcG9uZW50ID0gdGhpcy5fX2dldENvbXBvbmVudCgpO1xuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9e3pudWkucmVhY3QuY2xhc3NuYW1lKFwienItcm91dGVcIiwgdGhpcy5wcm9wcy5jbGFzc05hbWUpfSBzdHlsZT17dGhpcy5wcm9wcy5zdHlsZX0gPlxuXHRcdFx0XHRcdHtfQ29tcG9uZW50LkNvbXBvbmVudCAmJiA8X0NvbXBvbmVudC5Db21wb25lbnQgey4uLl9Db21wb25lbnQuQ29tcG9uZW50UHJvcHN9IC8+fVxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdCk7XG5cdFx0fWVsc2V7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFpSUm91dGU7IiwibW9kdWxlLmV4cG9ydHMgPSB6bi5DbGFzcyh7XG4gICAgc3RhdGljOiB0cnVlLFxuICAgIG1ldGhvZHM6IHtcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICB0aGlzLmZpeFdpbmRvd0hhc2hDaGFuZ2UoKTtcbiAgICAgICAgfSxcbiAgICAgICAgZml4V2luZG93SGFzaENoYW5nZTogZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICAvLyBMZXQgdGhpcyBzbmlwcGV0IHJ1biBiZWZvcmUgeW91ciBoYXNoY2hhbmdlIGV2ZW50IGJpbmRpbmcgY29kZVxuICAgICAgICAgICAgaWYgKCF3aW5kb3cuSGFzaENoYW5nZUV2ZW50KXtcbiAgICAgICAgICAgICAgICAoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxhc3RVUkwgPSBkb2N1bWVudC5VUkw7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiaGFzaGNoYW5nZVwiLCBmdW5jdGlvbihldmVudCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXZlbnQsIFwib2xkVVJMXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogbGFzdFVSTFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXZlbnQsIFwibmV3VVJMXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZG9jdW1lbnQuVVJMXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RVUkwgPSBkb2N1bWVudC5VUkw7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0oKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59KTsiLCJ2YXIgUmVhY3QgPSB6bnVpLlJlYWN0IHx8IHJlcXVpcmUoJ3JlYWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0ZGlzcGxheU5hbWU6J0Vycm9yNDA0Jyxcblx0cmVuZGVyOiBmdW5jdGlvbigpe1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT17em51aS5yZWFjdC5jbGFzc25hbWUoJ3pyLXJvdXRlci1lcnJvci00MDQnLCB0aGlzLnByb3BzLmNsYXNzTmFtZSl9IHN0eWxlPXt0aGlzLnByb3BzLnN0eWxlfSA+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZXJyb3ItaGVhZGVyXCI+XG5cdFx0XHRcdFx0PGgzPkVSUk9SOiA0MDQ8L2gzPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJlcnJvci1ib2R5XCI+XG5cdFx0XHRcdFx0VGhlIHBhdGggPHNwYW4gY2xhc3NOYW1lPVwicGF0aFwiPnt0aGlzLnByb3BzLnJlcXVlc3QucGF0aH08L3NwYW4+IGlzIG5vdCBmb3VuZC5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZXJyb3ItZm9vdGVyXCI+XG5cdFx0XHRcdFx0XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufSk7IiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgJ0Vycm9yNDA0JzogcmVxdWlyZSgnLi9FcnJvcjQwNC5qcycpXG59OyIsInJlcXVpcmUoJy4vVXRpbC5qcycpO1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgSGFzaFJvdXRlcjogcmVxdWlyZSgnLi9IYXNoUm91dGVyLmpzJyksXG4gICAgUm91dGU6IHJlcXVpcmUoJy4vUm91dGUnKVxufTsiLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcIlJlYWN0XCJdOyB9KCkpOyJdLCJzb3VyY2VSb290IjoiIn0=
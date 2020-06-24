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
          } else if (component.constructor.toString() == 'function Object() { [native code] }') {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vSGFzaEhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vSGFzaFJvdXRlci5qcyIsIndlYnBhY2s6Ly8vLi9QYXRoTWF0Y2hlci5qcyIsIndlYnBhY2s6Ly8vLi9SZXF1ZXN0SGFuZGxlci5qcyIsIndlYnBhY2s6Ly8vLi9Sb3V0ZS5qcyIsIndlYnBhY2s6Ly8vLi9VdGlsLmpzIiwid2VicGFjazovLy8uL2Vycm9yL0Vycm9yNDA0LmpzIiwid2VicGFjazovLy8uL2Vycm9yL2luZGV4LmpzIiwid2VicGFjazovLy8uL2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcIlJlYWN0XCIiXSwibmFtZXMiOlsiUmVxdWVzdEhhbmRsZXIiLCJyZXF1aXJlIiwibW9kdWxlIiwiZXhwb3J0cyIsInpuIiwiQ2xhc3MiLCJldmVudHMiLCJwcm9wZXJ0aWVzIiwibWV0aG9kcyIsImluaXQiLCJhcmd2IiwiX19pbml0RXZlbnRzIiwiY2FsbGVyIiwiY29uc3RydWN0b3IiLCJfc3VwZXJfIiwicHJvdG90eXBlIiwiX21haW4iLCJsZW5ndGgiLCJsb2NhdGlvbiIsImhhc2giLCJwb3AiLCJfX2hhc2hjaGFuZ2UiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiYmluZCIsImV2ZW50Iiwib24iLCJfcmV0dXJuIiwiZmlyZSIsIl9oYXNoIiwiX19wYXJzZUhhc2giLCJfcmVxdWVzdCIsImNyZWF0ZVJlcXVlc3QiLCJkb1JlcXVlc3QiLCJfc2VhcmNoIiwic2VhcmNoIiwiX2hhc2hTcGxpdEluZGV4IiwiaW5kZXhPZiIsInJlcGxhY2UiLCJzdWJzdHJpbmciLCJwYXRoIiwicXVlcnlzdHJpbmciLCJwYXJzZSIsIlJlYWN0Iiwiem51aSIsIkhhc2hIYW5kbGVyIiwiZXJyb3IiLCJjcmVhdGVDbGFzcyIsImRpc3BsYXlOYW1lIiwiZ2V0SW5pdGlhbFN0YXRlIiwiY29tcG9uZW50IiwiQ29tcG9uZW50IiwiQ29tcG9uZW50UHJvcHMiLCJjb21wb25lbnREaWRNb3VudCIsIl9faW5pdEhhbmRsZXIiLCJfaGFuZGxlciIsInByb3BzIiwiaGFzaGNoYW5nZSIsImhhbmRsZXIiLCJfX2hhbmRsZXIiLCJyZXF1ZXN0IiwiX19yZXF1ZXN0Iiwibm90Zm91bmQiLCJfX25vdGZvdW5kIiwicGx1Z2lubG9hZGVkIiwiX19wbHVnaW5Mb2FkZWQiLCJvbkluaXRIYW5kbGVyIiwic2VuZGVyIiwib25IYXNoQ2hhbmdlIiwiZGF0YSIsIm9uSGFuZGxlciIsInJvdXRlIiwiJCR0eXBlb2YiLCJzZXRTdGF0ZSIsImV4dGVuZCIsImFwcGxpY2F0aW9uIiwicm91dGVyIiwib25SZXF1ZXN0Iiwib25Ob3RGb3VuZCIsIm9uUGx1Z2luTG9hZGVkIiwicHVzaCIsImZvcndhcmQiLCJFcnJvcjQwNCIsInJlbmRlciIsInJlYWN0IiwiY2xhc3NuYW1lIiwiY2xhc3NOYW1lIiwic3R5bGUiLCJzdGF0ZSIsInBhdGhTZXBhcmF0b3IiLCJwYXRoUGFyYW1ldGVyU3ltYm9sIiwiX3BhdGhTZXBhcmF0b3IiLCJfcGF0aFBhcmFtZXRlclN5bWJvbCIsImZvcm1hdFJvdXRlIiwicGFyZW50IiwiX19wYXJlbnRfXyIsInBhdGhzIiwiX19wYXJzZVJvdXRlUGF0aHMiLCJleGFjdCIsImZvcm1hdFJvdXRlcyIsInJvdXRlcyIsInR5cGUiLCJfcm91dGVzIiwiX19sb2FkUGF0aEFuZENvbXBvbmVudCIsIm1hcCIsImNhbGwiLCJnZXRSb3V0ZUZvclJlcXVlc3QiLCJfcm91dGUiLCJfZGF0YSIsImkiLCJfbGVuIiwiX19tYXRjaFJvdXRlQW5kUmVxdWVzdCIsInBhcmFtcyIsImdldFJvdXRlc0Zyb21Sb3V0ZSIsIl9jb21wb25lbnQiLCJwbHVnaW5zIiwiX3BsdWdpbnMiLCJfX2xvYWRQbHVnaW5zIiwiY29uY2F0IiwibWFpbiIsIl9faXNSZWFjdENvbXBvbmVudCIsImlzIiwiaXNSZWFjdENvbXBvbmVudCIsInRvU3RyaW5nIiwiZXh0ZW5zaW9uIiwiX19pbml0Um91dGUiLCJfX3JvdXRlc19fIiwiX3BsdWdpbiIsIl9wbHVnaW5NYWluIiwiZm9yRWFjaCIsInBsdWdpbiIsIl9fbG9hZFBsdWdpbiIsImNvbXBvbmVudHMiLCJuYW1lc3BhY2UiLCJfcGF0aHMiLCJfcGF0aCIsIl9wYXJhbXMiLCJfdXJsVW5tYXRjaHMiLCJfaGFzQ2hlY2tlZCIsIl90ZW1wIiwiX3RlbXBzIiwic3BsaXQiLCJPYmplY3QiLCJrZXlzIiwidW5tYXRjaHMiLCJpc1BhcmFtZXRlciIsImtleSIsInRlc3QiLCJQYXRoTWF0Y2hlciIsInJlcXVlc3RzIiwibWF0Y2hlciIsIl9yZXF1ZXN0cyIsIl9tYXRjaGVyIiwicGx1Z2luTG9hZGVkIiwibG9hZFBsdWdpbnMiLCJsb2FkUm91dGVzIiwibG9hZFBsdWdpbiIsImxvYWRSb3V0ZSIsIlpSUm91dGUiLCJfbmV3UmVxdWVzdCIsIl9mUm91dGUiLCJwYXJlbnRSZXF1ZXN0IiwiX19nZXRDb21wb25lbnQiLCJfQ29tcG9uZW50IiwiZml4V2luZG93SGFzaENoYW5nZSIsIkhhc2hDaGFuZ2VFdmVudCIsImxhc3RVUkwiLCJkb2N1bWVudCIsIlVSTCIsImRlZmluZVByb3BlcnR5IiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsInZhbHVlIiwiSGFzaFJvdXRlciIsIlJvdXRlIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtR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a0I7QUFDbENDLGFBQVcsRUFBQyxVQURzQjtBQUVsQ21DLFFBQU0sRUFBRSxrQkFBVTtBQUNqQix3QkFDQztBQUFLLGVBQVMsRUFBRXZDLElBQUksQ0FBQ3dDLEtBQUwsQ0FBV0MsU0FBWCxDQUFxQixxQkFBckIsRUFBNEMsS0FBSzdCLEtBQUwsQ0FBVzhCLFNBQXZELENBQWhCO0FBQW1GLFdBQUssRUFBRSxLQUFLOUIsS0FBTCxDQUFXK0I7QUFBckcsb0JBQ0M7QUFBSyxlQUFTLEVBQUM7QUFBZixvQkFDQyw2Q0FERCxDQURELGVBSUM7QUFBSyxlQUFTLEVBQUM7QUFBZixpQ0FDVTtBQUFNLGVBQVMsRUFBQztBQUFoQixPQUF3QixLQUFLL0IsS0FBTCxDQUFXSSxPQUFYLENBQW1CcEIsSUFBM0MsQ0FEVixtQkFKRCxlQU9DO0FBQUssZUFBUyxFQUFDO0FBQWYsTUFQRCxDQUREO0FBYUE7QUFoQmlDLENBQWxCLENBQWpCLEM7Ozs7Ozs7Ozs7O0FDREF0QyxNQUFNLENBQUNDLE9BQVAsR0FBaUI7QUFDYixjQUFZRixtQkFBTyxDQUFDLDBDQUFEO0FBRE4sQ0FBakIsQzs7Ozs7Ozs7Ozs7QUNBQUEsbUJBQU8sQ0FBQyw0QkFBRCxDQUFQOztBQUNBQyxNQUFNLENBQUNDLE9BQVAsR0FBaUI7QUFDYjBLLFlBQVUsRUFBRTVLLG1CQUFPLENBQUMsd0NBQUQsQ0FETjtBQUViNkssT0FBSyxFQUFFN0ssbUJBQU8sQ0FBQywyQkFBRDtBQUZELENBQWpCLEM7Ozs7Ozs7Ozs7O0FDREEsYUFBYSxnQ0FBZ0MsRUFBRSxJIiwiZmlsZSI6Ii4vZGlzdC9kZXZlbG9wbWVudC9pbmRleC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2luZGV4LmpzXCIpO1xuIiwidmFyIFJlcXVlc3RIYW5kbGVyID0gcmVxdWlyZSgnLi9SZXF1ZXN0SGFuZGxlcicpO1xubW9kdWxlLmV4cG9ydHMgPSB6bi5DbGFzcyhSZXF1ZXN0SGFuZGxlciwge1xuICAgIGV2ZW50czogWydoYXNoY2hhbmdlJywgJ2hhbmRsZXInXSxcbiAgICBwcm9wZXJ0aWVzOiB7IH0sXG4gICAgbWV0aG9kczoge1xuICAgICAgICBpbml0OiBmdW5jdGlvbiAoYXJndiwgZXZlbnRzKXtcbiAgICAgICAgICAgIHRoaXMuX19pbml0RXZlbnRzKGV2ZW50cyk7XG4gICAgICAgICAgICBpZih0aGlzLnN1cGVyLmNhbGxlcikge1xuICAgICAgICAgICAgICAgIHRoaXMuc3VwZXIoYXJndik7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnN0cnVjdG9yLl9zdXBlcl8ucHJvdG90eXBlLmluaXQoYXJndiwgZXZlbnRzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYodGhpcy5fbWFpbi5sZW5ndGggJiYgIWxvY2F0aW9uLmhhc2gpe1xuICAgICAgICAgICAgICAgIGxvY2F0aW9uLmhhc2ggPSB0aGlzLl9tYWluLnBvcCgpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdGhpcy5fX2hhc2hjaGFuZ2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgdGhpcy5fX2hhc2hjaGFuZ2UuYmluZCh0aGlzKSwgZmFsc2UpO1xuICAgICAgICB9LFxuICAgICAgICBfX2luaXRFdmVudHM6IGZ1bmN0aW9uIChldmVudHMpe1xuICAgICAgICAgICAgaWYoZXZlbnRzICYmIHR5cGVvZiBldmVudHMgPT0gJ29iamVjdCcpe1xuICAgICAgICAgICAgICAgIGZvcih2YXIgZXZlbnQgaW4gZXZlbnRzKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbihldmVudCwgZXZlbnRzW2V2ZW50XSwgdGhpcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBfX2hhc2hjaGFuZ2U6IGZ1bmN0aW9uIChldmVudCl7XG4gICAgICAgICAgICB2YXIgX3JldHVybiA9IHRoaXMuZmlyZSgnaGFzaGNoYW5nZScsIGV2ZW50KTtcbiAgICAgICAgICAgIGlmKF9yZXR1cm4gPT09IGZhbHNlKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB2YXIgX2hhc2ggPSB0aGlzLl9fcGFyc2VIYXNoKCksXG4gICAgICAgICAgICAgICAgX3JlcXVlc3QgPSB0aGlzLmNyZWF0ZVJlcXVlc3QoX2hhc2gsIGV2ZW50KTtcblxuICAgICAgICAgICAgX3JldHVybiA9IHRoaXMuZmlyZSgnaGFuZGxlcicsIGV2ZW50LCBfaGFzaCk7XG4gICAgICAgICAgICBpZihfcmV0dXJuID09PSBmYWxzZSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgICB0aGlzLmRvUmVxdWVzdChfcmVxdWVzdCk7XG4gICAgICAgIH0sXG4gICAgICAgIF9fcGFyc2VIYXNoOiBmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgIHZhciBfaGFzaCA9IGxvY2F0aW9uLmhhc2gsXG4gICAgICAgICAgICAgICAgX3NlYXJjaCA9IGxvY2F0aW9uLnNlYXJjaCxcbiAgICAgICAgICAgICAgICBfaGFzaFNwbGl0SW5kZXggPSBfaGFzaC5pbmRleE9mKCc/Jyk7XG4gICAgICAgICAgICBpZihfc2VhcmNoICYmIF9zZWFyY2guaW5kZXhPZignPycpIT09LTEpe1xuICAgICAgICAgICAgICAgIF9zZWFyY2ggPSBfc2VhcmNoLnJlcGxhY2UoJz8nLCAnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihfaGFzaFNwbGl0SW5kZXggIT09IC0xKXtcbiAgICAgICAgICAgICAgICBfc2VhcmNoID0gX3NlYXJjaCArICcmJysgX2hhc2guc3Vic3RyaW5nKF9oYXNoU3BsaXRJbmRleCArIDEpO1xuICAgICAgICAgICAgICAgIF9oYXNoID0gX2hhc2guc3Vic3RyaW5nKDAsIF9oYXNoU3BsaXRJbmRleCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcGF0aDogX2hhc2guc3Vic3RyaW5nKDEpLFxuICAgICAgICAgICAgICAgIHNlYXJjaDogem4ucXVlcnlzdHJpbmcucGFyc2UoX3NlYXJjaClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn0pO1xuIiwidmFyIFJlYWN0ID0gem51aS5SZWFjdCB8fCByZXF1aXJlKCdyZWFjdCcpO1xudmFyIEhhc2hIYW5kbGVyID0gcmVxdWlyZSgnLi9IYXNoSGFuZGxlcicpO1xudmFyIGVycm9yID0gcmVxdWlyZSgnLi9lcnJvci9pbmRleC5qcycpO1xubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdGRpc3BsYXlOYW1lOidaUkhhc2hSb3V0ZXInLFxuXHRnZXRJbml0aWFsU3RhdGU6ZnVuY3Rpb24oKXtcblx0XHRyZXR1cm4ge1xuXHRcdFx0Y29tcG9uZW50OiBudWxsLFxuXHRcdFx0Q29tcG9uZW50OiBudWxsLFxuXHRcdFx0Q29tcG9uZW50UHJvcHM6IG51bGxcblx0XHR9XG5cdH0sXG5cdGNvbXBvbmVudERpZE1vdW50OmZ1bmN0aW9uKCl7XG5cdFx0dGhpcy5fX2luaXRIYW5kbGVyKCk7XG5cdH0sXG5cdF9faW5pdEhhbmRsZXI6IGZ1bmN0aW9uICgpe1xuXHRcdHRoaXMuX2hhbmRsZXIgPSBuZXcgSGFzaEhhbmRsZXIodGhpcy5wcm9wcywge1xuXHRcdFx0aGFzaGNoYW5nZTogdGhpcy5fX2hhc2hjaGFuZ2UsXG5cdFx0XHRoYW5kbGVyOiB0aGlzLl9faGFuZGxlcixcblx0XHRcdHJlcXVlc3Q6IHRoaXMuX19yZXF1ZXN0LFxuXHRcdFx0bm90Zm91bmQ6IHRoaXMuX19ub3Rmb3VuZCxcblx0XHRcdHBsdWdpbmxvYWRlZDogdGhpcy5fX3BsdWdpbkxvYWRlZFxuXHRcdH0pO1xuXHRcdHRoaXMucHJvcHMub25Jbml0SGFuZGxlciAmJiB0aGlzLnByb3BzLm9uSW5pdEhhbmRsZXIodGhpcy5faGFuZGxlciwgdGhpcyk7XG5cdH0sXG5cdF9faGFzaGNoYW5nZTogZnVuY3Rpb24gKHNlbmRlciwgZXZlbnQpe1xuXHRcdHRoaXMucHJvcHMub25IYXNoQ2hhbmdlICYmIHRoaXMucHJvcHMub25IYXNoQ2hhbmdlKGV2ZW50LCB0aGlzKTtcblx0fSxcblx0X19oYW5kbGVyOiBmdW5jdGlvbiAoc2VuZGVyLCBldmVudCwgZGF0YSl7XG5cdFx0dGhpcy5wcm9wcy5vbkhhbmRsZXIgJiYgdGhpcy5wcm9wcy5vbkhhbmRsZXIoZXZlbnQsIGRhdGEsIHRoaXMpO1xuXHR9LFxuXHRfX3JlcXVlc3Q6IGZ1bmN0aW9uIChzZW5kZXIsIHJlcXVlc3QsIHJvdXRlKXtcblx0XHRpZihyb3V0ZS5jb21wb25lbnQgJiYgdHlwZW9mIHJvdXRlLmNvbXBvbmVudCA9PSAnb2JqZWN0JyAmJiByb3V0ZS5jb21wb25lbnQuJCR0eXBlb2YpIHtcblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRjb21wb25lbnQ6IHJvdXRlLmNvbXBvbmVudFxuXHRcdFx0fSk7XG5cdFx0fWVsc2V7XG5cdFx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0Q29tcG9uZW50OiByb3V0ZS5jb21wb25lbnQsXG5cdFx0XHRcdENvbXBvbmVudFByb3BzOiB6bi5leHRlbmQoe30sIHJvdXRlLnByb3BzLCB7XG5cdFx0XHRcdFx0YXBwbGljYXRpb246IHRoaXMucHJvcHMuYXBwbGljYXRpb24sXG5cdFx0XHRcdFx0cmVxdWVzdDogcmVxdWVzdCxcblx0XHRcdFx0XHRyb3V0ZXI6IHRoaXMsXG5cdFx0XHRcdFx0cm91dGU6IHJvdXRlXG5cdFx0XHRcdH0pXG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0dGhpcy5wcm9wcy5vblJlcXVlc3QgJiYgdGhpcy5wcm9wcy5vblJlcXVlc3QocmVxdWVzdCwgcm91dGUsIHRoaXMpO1xuXHR9LFxuXHRfX25vdGZvdW5kOiBmdW5jdGlvbiAoc2VuZGVyLCByZXF1ZXN0KXtcblx0XHR0aGlzLm5vdGZvdW5kKHJlcXVlc3QpO1xuXHRcdHRoaXMucHJvcHMub25Ob3RGb3VuZCAmJiB0aGlzLnByb3BzLm9uTm90Rm91bmQocmVxdWVzdCwgdGhpcyk7XG5cdH0sXG5cdF9fcGx1Z2luTG9hZGVkOiBmdW5jdGlvbiAoc2VuZGVyLCBkYXRhKXtcblx0XHR0aGlzLnByb3BzLm9uUGx1Z2luTG9hZGVkICYmIHRoaXMucHJvcHMub25QbHVnaW5Mb2FkZWQoZGF0YSwgdGhpcyk7XG5cdH0sXG5cdHB1c2g6IGZ1bmN0aW9uICgpe1xuXG5cdH0sXG5cdGZvcndhcmQ6IGZ1bmN0aW9uICgpe1xuXG5cdH0sXG5cdG5vdGZvdW5kOiBmdW5jdGlvbiAocmVxdWVzdCl7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRDb21wb25lbnQ6IGVycm9yLkVycm9yNDA0LFxuXHRcdFx0Q29tcG9uZW50UHJvcHM6IHtcblx0XHRcdFx0cmVxdWVzdDogcmVxdWVzdFxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9LFxuXHRyZW5kZXI6IGZ1bmN0aW9uKCl7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPXt6bnVpLnJlYWN0LmNsYXNzbmFtZShcInpyLWhhc2gtcm91dGVyXCIsIHRoaXMucHJvcHMuY2xhc3NOYW1lKX0gc3R5bGU9e3RoaXMucHJvcHMuc3R5bGV9ID5cblx0XHRcdFx0eyB0aGlzLnN0YXRlLmNvbXBvbmVudCB9XG5cdFx0XHRcdHsgdGhpcy5zdGF0ZS5Db21wb25lbnQgJiYgPHRoaXMuc3RhdGUuQ29tcG9uZW50IHsuLi50aGlzLnN0YXRlLkNvbXBvbmVudFByb3BzfSAvPiB9XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59KTsiLCJtb2R1bGUuZXhwb3J0cyA9IHpuLkNsYXNzKHtcbiAgICBldmVudHM6IFsncGx1Z2luTG9hZGluZycsICdwbHVnaW5Mb2FkZWQnLCAncm91dGVMb2FkaW5nJywgJ3JvdXRlTG9hZGVkJ10sXG4gICAgcHJvcGVydGllczp7IFxuICAgICAgICBwYXRoU2VwYXJhdG9yOiBudWxsLFxuICAgICAgICBwYXRoUGFyYW1ldGVyU3ltYm9sOiBudWxsXG4gICAgfSxcbiAgICBtZXRob2RzOiB7XG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uIChhcmd2LCBldmVudHMpe1xuICAgICAgICAgICAgdGhpcy5fX2luaXRFdmVudHMoZXZlbnRzKTtcbiAgICAgICAgICAgIHRoaXMuX3BhdGhTZXBhcmF0b3IgPSBhcmd2LnBhdGhTZXBhcmF0b3IgfHwgJy8nO1xuICAgICAgICAgICAgdGhpcy5fcGF0aFBhcmFtZXRlclN5bWJvbCA9IGFyZ3YucGF0aFBhcmFtZXRlclN5bWJvbCB8fCAnOic7XG4gICAgICAgIH0sXG4gICAgICAgIF9faW5pdEV2ZW50czogZnVuY3Rpb24gKGV2ZW50cyl7XG4gICAgICAgICAgICBpZihldmVudHMgJiYgdHlwZW9mIGV2ZW50cyA9PSAnb2JqZWN0Jyl7XG4gICAgICAgICAgICAgICAgZm9yKHZhciBldmVudCBpbiBldmVudHMpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uKGV2ZW50LCBldmVudHNbZXZlbnRdLCB0aGlzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGZvcm1hdFJvdXRlOiBmdW5jdGlvbiAocm91dGUsIHBhcmVudCl7XG4gICAgICAgICAgICB2YXIgX3JldHVybiA9IHRoaXMuZmlyZSgncm91dGVMb2FkaW5nJywgcm91dGUsIHBhcmVudCk7XG4gICAgICAgICAgICBpZihfcmV0dXJuID09PSBmYWxzZSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihwYXJlbnQpe1xuICAgICAgICAgICAgICAgIHJvdXRlLl9fcGFyZW50X18gPSBwYXJlbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByb3V0ZS5wYXRocyA9IHRoaXMuX19wYXJzZVJvdXRlUGF0aHMocm91dGUucGF0aCk7XG4gICAgICAgICAgICByb3V0ZS5wcm9wcyA9IHpuLmV4dGVuZCh7fSwgcm91dGUucHJvcHMpO1xuICAgICAgICAgICAgaWYocm91dGUuZXhhY3QgPT0gbnVsbCAmJiByb3V0ZS5wYXRoLmluZGV4T2YodGhpcy5fcGF0aFBhcmFtZXRlclN5bWJvbCkgPT09IC0xKSB7IHJvdXRlLmV4YWN0ID0gdHJ1ZTsgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5maXJlKCdyb3V0ZUxvYWRlZCcsIHJvdXRlKSwgcm91dGU7XG4gICAgICAgIH0sXG4gICAgICAgIGZvcm1hdFJvdXRlczogZnVuY3Rpb24gKHJvdXRlcywgcGFyZW50KXtcbiAgICAgICAgICAgIHN3aXRjaCh6bi50eXBlKHJvdXRlcykpe1xuICAgICAgICAgICAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgICAgICAgICAgICAgIHZhciBfcm91dGVzID0gW107XG4gICAgICAgICAgICAgICAgICAgIGZvcih2YXIgcGF0aCBpbiByb3V0ZXMpe1xuICAgICAgICAgICAgICAgICAgICAgICAgX3JvdXRlcy5wdXNoKHRoaXMuX19sb2FkUGF0aEFuZENvbXBvbmVudChwYXRoLCByb3V0ZXNbcGF0aF0sIHBhcmVudCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfcm91dGVzO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2FycmF5JzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJvdXRlcy5tYXAoKHJvdXRlKT0+dGhpcy5mb3JtYXRSb3V0ZShyb3V0ZSwgcGFyZW50KSk7XG4gICAgICAgICAgICAgICAgY2FzZSAnZnVuY3Rpb24nOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5mb3JtYXRSb3V0ZXMocm91dGVzLmNhbGwobnVsbCwgcGFyZW50LCB0aGlzKSwgcGFyZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZ2V0Um91dGVGb3JSZXF1ZXN0OiBmdW5jdGlvbiAocmVxdWVzdCwgcm91dGVzKXtcbiAgICAgICAgICAgIHZhciBfcm91dGVzID0gcm91dGVzLFxuICAgICAgICAgICAgICAgIF9yb3V0ZSA9IG51bGwsXG4gICAgICAgICAgICAgICAgX2RhdGEgPSBudWxsO1xuICAgICAgICAgICAgZm9yKHZhciBpID0gMCwgX2xlbiA9IF9yb3V0ZXMubGVuZ3RoOyBpIDwgX2xlbjsgaSsrKXtcbiAgICAgICAgICAgICAgICBfcm91dGUgPSBfcm91dGVzW2ldO1xuICAgICAgICAgICAgICAgIF9kYXRhID0gdGhpcy5fX21hdGNoUm91dGVBbmRSZXF1ZXN0KF9yb3V0ZSwgcmVxdWVzdCk7XG4gICAgICAgICAgICAgICAgaWYoX2RhdGEpe1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKCFfZGF0YSB8fCAhX3JvdXRlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcmVxdWVzdC5wYXJhbXMgPSBfZGF0YSwgX3JvdXRlO1xuICAgICAgICB9LFxuICAgICAgICBnZXRSb3V0ZXNGcm9tUm91dGU6IGZ1bmN0aW9uIChyb3V0ZSl7XG4gICAgICAgICAgICB2YXIgX3JvdXRlcyA9IFtdLFxuICAgICAgICAgICAgICAgIF9jb21wb25lbnQgPSByb3V0ZS5jb21wb25lbnQ7XG4gICAgICAgICAgICBpZihyb3V0ZS5yb3V0ZXMpIHtcbiAgICAgICAgICAgICAgICBfcm91dGVzID0gdGhpcy5mb3JtYXRSb3V0ZXMocm91dGUucm91dGVzLCByb3V0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKHJvdXRlLnBsdWdpbnMpIHtcbiAgICAgICAgICAgICAgICB2YXIgX3BsdWdpbnMgPSB0aGlzLl9fbG9hZFBsdWdpbnMocm91dGUucGx1Z2lucywgcm91dGUpO1xuICAgICAgICAgICAgICAgIF9yb3V0ZXMgPSBfcm91dGVzLmNvbmNhdChfcGx1Z2lucy5yb3V0ZXMpO1xuICAgICAgICAgICAgICAgIGlmKCFfY29tcG9uZW50ICYmIF9wbHVnaW5zLm1haW4ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIF9jb21wb25lbnQgPSBfcGx1Z2lucy5tYWluLnBvcCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByb3V0ZXM6IF9yb3V0ZXMsXG4gICAgICAgICAgICAgICAgY29tcG9uZW50OiBfY29tcG9uZW50XG4gICAgICAgICAgICB9O1xuICAgICAgICB9LFxuICAgICAgICBfX2lzUmVhY3RDb21wb25lbnQ6IGZ1bmN0aW9uIChjb21wb25lbnQpe1xuICAgICAgICAgICAgaWYoY29tcG9uZW50ICYmIHpuLmlzKGNvbXBvbmVudCwgJ2Z1bmN0aW9uJykgJiYgKGNvbXBvbmVudC5wcm90b3R5cGUucmVuZGVyIHx8IGNvbXBvbmVudC5kaXNwbGF5TmFtZSB8fCBjb21wb25lbnQucHJvdG90eXBlLmlzUmVhY3RDb21wb25lbnQgKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0sXG4gICAgICAgIF9fbG9hZFBhdGhBbmRDb21wb25lbnQ6IGZ1bmN0aW9uIChwYXRoLCBjb21wb25lbnQsIHBhcmVudCl7XG4gICAgICAgICAgICB2YXIgX3JvdXRlID0geyBwYXRoOiBwYXRoIH07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHN3aXRjaCh6bi50eXBlKGNvbXBvbmVudCkpe1xuICAgICAgICAgICAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgICAgICAgICAgICAgIF9yb3V0ZS5jb21wb25lbnQgPSB6bi5wYXRoKHdpbmRvdywgY29tcG9uZW50KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZnVuY3Rpb24nOlxuICAgICAgICAgICAgICAgICAgICBpZighdGhpcy5fX2lzUmVhY3RDb21wb25lbnQoY29tcG9uZW50KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3JvdXRlLmNvbXBvbmVudCA9IGNvbXBvbmVudC5jYWxsKHRoaXMsIHBhdGgsIHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9yb3V0ZS5jb21wb25lbnQgPSBjb21wb25lbnQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgICAgICAgICAgICAgaWYoY29tcG9uZW50LiQkdHlwZW9mKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfcm91dGUuY29tcG9uZW50ID0gY29tcG9uZW50O1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihjb21wb25lbnQuY29uc3RydWN0b3IudG9TdHJpbmcoKSA9PSAnZnVuY3Rpb24gT2JqZWN0KCkgeyBbbmF0aXZlIGNvZGVdIH0nKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHpuLmV4dGVuZChfcm91dGUsIGNvbXBvbmVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihfcm91dGUuZXh0ZW5zaW9uICE9PSBmYWxzZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fX2luaXRSb3V0ZShfcm91dGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mb3JtYXRSb3V0ZShfcm91dGUsIHBhcmVudCk7XG4gICAgICAgIH0sXG4gICAgICAgIF9faW5pdFJvdXRlOiBmdW5jdGlvbiAocm91dGUpe1xuICAgICAgICAgICAgaWYocm91dGUucm91dGVzKSB7XG4gICAgICAgICAgICAgICAgcm91dGUuX19yb3V0ZXNfXyA9IHRoaXMuZm9ybWF0Um91dGVzKHJvdXRlLnJvdXRlcywgcm91dGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZihyb3V0ZS5wbHVnaW5zKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9wbHVnaW5zID0gdGhpcy5fX2xvYWRQbHVnaW5zKHJvdXRlLnBsdWdpbnMsIHJvdXRlKTtcbiAgICAgICAgICAgICAgICBpZihyb3V0ZS5fX3JvdXRlc19fKSB7XG4gICAgICAgICAgICAgICAgICAgIHJvdXRlLl9fcm91dGVzX18gPSByb3V0ZS5fX3JvdXRlc19fLmNvbmNhdChfcGx1Z2lucy5yb3V0ZXMpO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICByb3V0ZS5fX3JvdXRlc19fID0gX3BsdWdpbnMucm91dGVzO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJvdXRlLm1haW4gPSBfcGx1Z2lucy5tYWluO1xuICAgICAgICAgICAgICAgIGlmKCFyb3V0ZS5jb21wb25lbnQgJiYgX3BsdWdpbnMubWFpbi5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgcm91dGUuY29tcG9uZW50ID0gX3BsdWdpbnMubWFpbi5wb3AoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiByb3V0ZTtcbiAgICAgICAgfSxcbiAgICAgICAgX19sb2FkUGx1Z2luczogZnVuY3Rpb24gKHBsdWdpbnMsIHBhcmVudCl7XG4gICAgICAgICAgICB2YXIgX3BsdWdpbnMgPSBwbHVnaW5zIHx8IFtdLFxuICAgICAgICAgICAgICAgIF9wbHVnaW4gPSBudWxsLFxuICAgICAgICAgICAgICAgIF9yb3V0ZXMgPSBbXSxcbiAgICAgICAgICAgICAgICBfbWFpbiA9IFtdLFxuICAgICAgICAgICAgICAgIF9wbHVnaW5NYWluID0gbnVsbDtcbiAgICAgICAgICAgIHN3aXRjaCh6bi50eXBlKHBsdWdpbnMpKXtcbiAgICAgICAgICAgICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICAgICAgICAgICAgICBfcGx1Z2lucyA9IFtwbHVnaW5zXTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZnVuY3Rpb24nOlxuICAgICAgICAgICAgICAgICAgICBfcGx1Z2lucyA9IHBsdWdpbnModGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoX3BsdWdpbnMgJiYgX3BsdWdpbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcGx1Z2lucy5mb3JFYWNoKGZ1bmN0aW9uIChwbHVnaW4pe1xuICAgICAgICAgICAgICAgICAgICBfcGx1Z2luID0gdGhpcy5fX2xvYWRQbHVnaW4ocGx1Z2luLCBwYXJlbnQpO1xuICAgICAgICAgICAgICAgICAgICBpZihfcGx1Z2luKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKF9wbHVnaW4uX19yb3V0ZXNfXykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9yb3V0ZXMgPSBfcm91dGVzLmNvbmNhdChfcGx1Z2luLl9fcm91dGVzX18pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoX3BsdWdpbi5tYWluKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3BsdWdpbk1haW4gPSBfcGx1Z2luLm1haW47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoKHpuLnR5cGUoX21haW4pKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9wbHVnaW5NYWluID0gX3BsdWdpbi5yb3V0ZXNbX3BsdWdpbk1haW5dIHx8IHpuLnBhdGgoX3BsdWdpbi5jb21wb25lbnRzLCBfcGx1Z2luTWFpbikgfHwgem4ucGF0aCh3aW5kb3csIF9wbHVnaW5NYWluKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdmdW5jdGlvbic6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihfcGx1Z2luTWFpbi5jb25zdHJ1Y3Rvci50b1N0cmluZygpID09IFwiZnVuY3Rpb24gRnVuY3Rpb24oKSB7IFtuYXRpdmUgY29kZV0gfVwiKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcGx1Z2luTWFpbiA9IF9wbHVnaW5NYWluKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9tYWluLnB1c2goX3BsdWdpbk1haW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcm91dGVzOiBfcm91dGVzLFxuICAgICAgICAgICAgICAgIG1haW46IF9tYWluXG4gICAgICAgICAgICB9O1xuICAgICAgICB9LFxuICAgICAgICBfX2xvYWRQbHVnaW46IGZ1bmN0aW9uIChwbHVnaW4sIHBhcmVudCl7XG4gICAgICAgICAgICB2YXIgX3BsdWdpbiA9IHBsdWdpbiB8fCB7fSxcbiAgICAgICAgICAgICAgICBfcmV0dXJuID0gdGhpcy5maXJlKCdwbHVnaW5Mb2FkaW5nJywgcGx1Z2luLCBwYXJlbnQpO1xuICAgICAgICAgICAgaWYoX3JldHVybiA9PT0gZmFsc2Upe1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc3dpdGNoKHpuLnR5cGUocGx1Z2luKSl7XG4gICAgICAgICAgICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgICAgICAgICAgICAgX3BsdWdpbiA9IF9wbHVnaW47XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2Z1bmN0aW9uJzpcbiAgICAgICAgICAgICAgICAgICAgX3BsdWdpbiA9IF9wbHVnaW4odGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoX3BsdWdpbi5uYW1lc3BhY2UgJiYgX3BsdWdpbi5jb21wb25lbnRzKSB7XG4gICAgICAgICAgICAgICAgem4ucGF0aCh3aW5kb3csIF9wbHVnaW4ubmFtZXNwYWNlLCBfcGx1Z2luLmNvbXBvbmVudHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX3BsdWdpbi5fX3JvdXRlc19fID0gdGhpcy5mb3JtYXRSb3V0ZXMoX3BsdWdpbi5yb3V0ZXN8fFtdLCBwYXJlbnQpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5maXJlKCdwbHVnaW5Mb2FkZWQnLCBfcGx1Z2luKSwgX3BsdWdpbjtcbiAgICAgICAgfSxcbiAgICAgICAgX19tYXRjaFJvdXRlQW5kUmVxdWVzdDogZnVuY3Rpb24gKHJvdXRlLCByZXF1ZXN0KXtcbiAgICAgICAgICAgIHZhciBfcGF0aHMgPSByb3V0ZS5wYXRocyxcbiAgICAgICAgICAgICAgICBfcGF0aCA9IG51bGwsXG4gICAgICAgICAgICAgICAgX3BhcmFtcyA9IHt9LFxuICAgICAgICAgICAgICAgIF91cmxVbm1hdGNocyA9IFtdLFxuICAgICAgICAgICAgICAgIF9oYXNDaGVja2VkID0gZmFsc2UsXG4gICAgICAgICAgICAgICAgX3RlbXAgPSBudWxsLFxuICAgICAgICAgICAgICAgIF90ZW1wcyA9IHJlcXVlc3QucGF0aC5zcGxpdCh0aGlzLl9wYXRoU2VwYXJhdG9yKTtcblxuICAgICAgICAgICAgaWYocm91dGUucm91dGVzICYmIE9iamVjdC5rZXlzKHJvdXRlLnJvdXRlcykubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgaWYocm91dGUuZXhhY3QgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICByb3V0ZS5leGFjdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYocm91dGUuZXhhY3QpIHtcbiAgICAgICAgICAgICAgICBpZihyb3V0ZS5wYXRoID09PSByZXF1ZXN0LnBhdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3QudW5tYXRjaHMgPSBfdXJsVW5tYXRjaHMsIF9wYXJhbXM7IFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihfdGVtcHMubGVuZ3RoICE9PSBfcGF0aHMubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yKHZhciBpID0gMCwgX2xlbiA9IF90ZW1wcy5sZW5ndGg7IGkgPCBfbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBfdGVtcCA9IF90ZW1wc1tpXTtcbiAgICAgICAgICAgICAgICBpZighX3RlbXApIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF9wYXRoID0gX3BhdGhzW2ldO1xuICAgICAgICAgICAgICAgIF9oYXNDaGVja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpZighX3BhdGgpe1xuICAgICAgICAgICAgICAgICAgICBfdXJsVW5tYXRjaHMucHVzaChfdGVtcCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZighX3BhdGguaXNQYXJhbWV0ZXIgJiYgX3RlbXAgIT09IF9wYXRoLmtleSl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihfcGF0aC5pc1BhcmFtZXRlcil7XG4gICAgICAgICAgICAgICAgICAgIF9wYXJhbXNbX3BhdGgua2V5XSA9IF90ZW1wO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKCFfaGFzQ2hlY2tlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3QudW5tYXRjaHMgPSBfdXJsVW5tYXRjaHMsIF9wYXJhbXM7XG4gICAgICAgIH0sXG4gICAgICAgIF9fcGFyc2VSb3V0ZVBhdGhzOiBmdW5jdGlvbiAocGF0aCl7XG4gICAgICAgICAgICB2YXIgX3BhdGhzID0gW10sXG4gICAgICAgICAgICAgICAgX3RlbXAgPSBudWxsLFxuICAgICAgICAgICAgICAgIF90ZW1wcyA9IHBhdGguc3BsaXQodGhpcy5fcGF0aFNlcGFyYXRvcik7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDAsIF9sZW4gPSBfdGVtcHMubGVuZ3RoOyBpIDwgX2xlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgX3RlbXAgPSBfdGVtcHNbaV07XG4gICAgICAgICAgICAgICAgaWYoIV90ZW1wKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoL146XFx3W1xcd1xcZF0qJC8udGVzdChfdGVtcCkpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RlbXAgPSBfdGVtcC5yZXBsYWNlKC9eOi8sICcnKTtcbiAgICAgICAgICAgICAgICAgICAgX3BhdGhzW2ldID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBfdGVtcCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzUGFyYW1ldGVyOiB0cnVlXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIF9wYXRoc1tpXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleTogX3RlbXBcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBfcGF0aHM7XG4gICAgICAgIH1cbiAgICB9XG59KTsiLCJ2YXIgUGF0aE1hdGNoZXIgPSByZXF1aXJlKCcuL1BhdGhNYXRjaGVyJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHpuLkNsYXNzKHtcbiAgICBldmVudHM6IFsncmVxdWVzdCcsICdub3Rmb3VuZCcsICdwbHVnaW5Mb2FkaW5nJywgJ3BsdWdpbkxvYWRlZCddLFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgcmVxdWVzdHM6IG51bGwsXG4gICAgICAgIHJvdXRlczogbnVsbCxcbiAgICAgICAgcGx1Z2luczogbnVsbCxcbiAgICAgICAgbWFpbjogbnVsbCxcbiAgICAgICAgbWF0Y2hlcjogbnVsbFxuICAgIH0sXG4gICAgbWV0aG9kczoge1xuICAgICAgICBpbml0OiBmdW5jdGlvbiAoYXJndiwgZXZlbnRzKXtcbiAgICAgICAgICAgIHRoaXMuX3JlcXVlc3RzID0gW107XG4gICAgICAgICAgICB0aGlzLl9yb3V0ZXMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX3BsdWdpbnMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX21haW4gPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX21hdGNoZXIgPSBuZXcgUGF0aE1hdGNoZXIoYXJndiwge1xuICAgICAgICAgICAgICAgIHBsdWdpbkxvYWRlZDogZnVuY3Rpb24gKHNlbmRlciwgcGx1Z2luKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlyZSgncGx1Z2luTG9hZGVkJywgcGx1Z2luKTtcbiAgICAgICAgICAgICAgICB9LmJpbmQodGhpcylcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5fX2luaXRFdmVudHMoZXZlbnRzKTtcbiAgICAgICAgICAgIHRoaXMubG9hZFBsdWdpbnMoYXJndi5wbHVnaW5zKTtcbiAgICAgICAgICAgIHRoaXMubG9hZFJvdXRlcyhhcmd2LnJvdXRlcyk7XG4gICAgICAgICAgICBpZihhcmd2Lm1haW4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9tYWluLnB1c2goYXJndi5tYWluKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgX19pbml0RXZlbnRzOiBmdW5jdGlvbiAoZXZlbnRzKXtcbiAgICAgICAgICAgIGlmKGV2ZW50cyAmJiB0eXBlb2YgZXZlbnRzID09ICdvYmplY3QnKXtcbiAgICAgICAgICAgICAgICBmb3IodmFyIGV2ZW50IGluIGV2ZW50cyl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub24oZXZlbnQsIGV2ZW50c1tldmVudF0sIHRoaXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY3JlYXRlUmVxdWVzdDogZnVuY3Rpb24gKHJlcXVlc3QsIGV2ZW50KXtcbiAgICAgICAgICAgIHJlcXVlc3QuZXZlbnQgPSBldmVudDtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0cy5wdXNoKHJlcXVlc3QpLCByZXF1ZXN0O1xuICAgICAgICB9LFxuICAgICAgICBkb1JlcXVlc3Q6IGZ1bmN0aW9uIChyZXF1ZXN0KXtcbiAgICAgICAgICAgIHZhciBfcm91dGUgPSB0aGlzLl9tYXRjaGVyLmdldFJvdXRlRm9yUmVxdWVzdChyZXF1ZXN0LCB0aGlzLl9yb3V0ZXMpO1xuICAgICAgICAgICAgcmVxdWVzdC5tYXRjaGVyID0gdGhpcy5fbWF0Y2hlcjtcbiAgICAgICAgICAgIGlmKF9yb3V0ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZmlyZSgncmVxdWVzdCcsIHJlcXVlc3QsIF9yb3V0ZSk7XG4gICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maXJlKCdub3Rmb3VuZCcsIHJlcXVlc3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBsb2FkUGx1Z2luczogZnVuY3Rpb24gKHBsdWdpbnMpe1xuICAgICAgICAgICAgdmFyIF9wbHVnaW5zID0gcGx1Z2lucyB8fCBbXTtcbiAgICAgICAgICAgIHN3aXRjaCh6bi50eXBlKHBsdWdpbnMpKXtcbiAgICAgICAgICAgICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICAgICAgICAgICAgICBfcGx1Z2lucyA9IFtwbHVnaW5zXTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZnVuY3Rpb24nOlxuICAgICAgICAgICAgICAgICAgICBfcGx1Z2lucyA9IHBsdWdpbnModGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoX3BsdWdpbnMgJiYgX3BsdWdpbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcGx1Z2lucy5mb3JFYWNoKGZ1bmN0aW9uIChwbHVnaW4pe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRQbHVnaW4ocGx1Z2luKTtcbiAgICAgICAgICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG4gICAgICAgIGxvYWRQbHVnaW46IGZ1bmN0aW9uIChwbHVnaW4pe1xuICAgICAgICAgICAgdmFyIF9wbHVnaW4gPSBwbHVnaW4gfHwge30sXG4gICAgICAgICAgICAgICAgX3JldHVybiA9IHRoaXMuZmlyZSgncGx1Z2luTG9hZGluZycsIHBsdWdpbik7XG4gICAgICAgICAgICBpZihfcmV0dXJuID09PSBmYWxzZSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3dpdGNoKHpuLnR5cGUocGx1Z2luKSl7XG4gICAgICAgICAgICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgICAgICAgICAgICAgX3BsdWdpbiA9IF9wbHVnaW47XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2Z1bmN0aW9uJzpcbiAgICAgICAgICAgICAgICAgICAgX3BsdWdpbiA9IF9wbHVnaW4odGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihfcGx1Z2luLm1haW4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9tYWluLnB1c2goX3BsdWdpbi5tYWluKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKF9wbHVnaW4ubmFtZXNwYWNlICYmIF9wbHVnaW4uY29tcG9uZW50cykge1xuICAgICAgICAgICAgICAgIHpuLnBhdGgod2luZG93LCBfcGx1Z2luLm5hbWVzcGFjZSwgX3BsdWdpbi5jb21wb25lbnRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBfcm91dGVzID0gdGhpcy5fbWF0Y2hlci5mb3JtYXRSb3V0ZXMoX3BsdWdpbi5yb3V0ZXN8fFtdKTtcbiAgICAgICAgICAgIF9wbHVnaW4uX19yb3V0ZXNfXyA9IF9yb3V0ZXM7XG4gICAgICAgICAgICB0aGlzLl9wbHVnaW5zLnB1c2goX3BsdWdpbik7XG4gICAgICAgICAgICB0aGlzLmZpcmUoJ3BsdWdpbkxvYWRlZCcsIF9wbHVnaW4pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JvdXRlcyA9IHRoaXMuX3JvdXRlcy5jb25jYXQoX3JvdXRlcyksIF9yb3V0ZXM7XG4gICAgICAgIH0sXG4gICAgICAgIGxvYWRSb3V0ZXM6IGZ1bmN0aW9uIChyb3V0ZXMpe1xuICAgICAgICAgICAgdmFyIF9yb3V0ZXMgPSB0aGlzLl9tYXRjaGVyLmZvcm1hdFJvdXRlcyhyb3V0ZXMpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JvdXRlcyA9IHRoaXMuX3JvdXRlcy5jb25jYXQoX3JvdXRlcyksIF9yb3V0ZXM7XG4gICAgICAgIH0sXG4gICAgICAgIGxvYWRSb3V0ZTogZnVuY3Rpb24gKHJvdXRlKXtcbiAgICAgICAgICAgIHRoaXMuX3JvdXRlcy5wdXNoKHRoaXMuX21hdGNoZXIuZm9ybWF0Um91dGUocm91dGUpKTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuIiwidmFyIFJlYWN0ID0gem51aS5SZWFjdCB8fCByZXF1aXJlKCdyZWFjdCcpO1xudmFyIGVycm9yID0gcmVxdWlyZSgnLi9lcnJvci9pbmRleC5qcycpO1xudmFyIFpSUm91dGUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdGRpc3BsYXlOYW1lOidaUlJvdXRlJyxcblx0X19oYW5kbGVyOiBmdW5jdGlvbiAoKXtcblx0XHR2YXIgX3JlcXVlc3QgPSB0aGlzLnByb3BzLnJlcXVlc3QsXG5cdFx0XHRfbWF0Y2hlciA9IF9yZXF1ZXN0Lm1hdGNoZXIsXG5cdFx0XHRfbmV3UmVxdWVzdCA9IHtcblx0XHRcdFx0cGF0aDogX3JlcXVlc3QucGF0aC5yZXBsYWNlKHRoaXMucHJvcHMucm91dGUucGF0aCwgICcnKSxcblx0XHRcdFx0c2VhcmNoOiBfcmVxdWVzdC5zZWFyY2gsXG5cdFx0XHRcdGV2ZW50OiBfcmVxdWVzdC5ldmVudCxcblx0XHRcdFx0bWF0Y2hlcjogX21hdGNoZXJcblx0XHRcdH0sXG5cdFx0XHRfcm91dGVzID0gdGhpcy5wcm9wcy5yb3V0ZS5fX3JvdXRlc19fLFxuXHRcdFx0X3JvdXRlID0gbnVsbCxcblx0XHRcdF9jb21wb25lbnQgPSBudWxsO1xuICAgICAgICBpZighX3JvdXRlcykge1xuXHRcdFx0dmFyIF9mUm91dGUgPSBfbWF0Y2hlci5nZXRSb3V0ZXNGcm9tUm91dGUodGhpcy5wcm9wcy5yb3V0ZSk7XG5cdFx0XHRfcm91dGVzID0gX2ZSb3V0ZS5yb3V0ZXM7XG5cdFx0XHRfY29tcG9uZW50ID0gX2ZSb3V0ZS5jb21wb25lbnQ7XG5cdFx0fVxuXHRcdF9yb3V0ZSA9IF9tYXRjaGVyLmdldFJvdXRlRm9yUmVxdWVzdChfbmV3UmVxdWVzdCwgX3JvdXRlcyk7XG5cblx0XHRpZihfcm91dGUpIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdENvbXBvbmVudDogX3JvdXRlLmNvbXBvbmVudCB8fCBfY29tcG9uZW50LFxuXHRcdFx0XHRDb21wb25lbnRQcm9wczogem4uZXh0ZW5kKHt9LCBfcm91dGUucHJvcHMsIHtcblx0XHRcdFx0XHRhcHBsaWNhdGlvbjogdGhpcy5wcm9wcy5hcHBsaWNhdGlvbixcblx0XHRcdFx0XHRwYXJlbnQ6IHRoaXMsXG5cdFx0XHRcdFx0cGFyZW50UmVxdWVzdDogX3JlcXVlc3QsXG5cdFx0XHRcdFx0cm91dGU6IF9yb3V0ZSxcblx0XHRcdFx0XHRyb3V0ZXI6IHRoaXMucHJvcHMucm91dGVyLFxuXHRcdFx0XHRcdHJlcXVlc3Q6IF9uZXdSZXF1ZXN0XG5cdFx0XHRcdH0pXG5cdFx0XHR9XG5cdFx0fWVsc2V7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRDb21wb25lbnQ6IGVycm9yLkVycm9yNDA0LFxuXHRcdFx0XHRDb21wb25lbnRQcm9wczoge1xuXHRcdFx0XHRcdGFwcGxpY2F0aW9uOiB0aGlzLnByb3BzLmFwcGxpY2F0aW9uLFxuXHRcdFx0XHRcdHBhcmVudDogdGhpcyxcblx0XHRcdFx0XHRwYXJlbnRSZXF1ZXN0OiBfcmVxdWVzdCxcblx0XHRcdFx0XHRyb3V0ZXI6IHRoaXMucHJvcHMucm91dGVyLFxuXHRcdFx0XHRcdHJlcXVlc3Q6IF9uZXdSZXF1ZXN0XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0XG5cdH0sXG5cdF9fZ2V0Q29tcG9uZW50OiBmdW5jdGlvbiAoKXtcblx0XHRyZXR1cm4gdGhpcy5fX2hhbmRsZXIoKTtcblx0fSxcblx0cmVuZGVyOiBmdW5jdGlvbigpe1xuXHRcdGlmKHRoaXMucHJvcHMucmVxdWVzdCAmJiB0aGlzLnByb3BzLnJvdXRlICYmIHRoaXMucHJvcHMucm91dGUucm91dGVzKSB7XG5cdFx0XHR2YXIgX0NvbXBvbmVudCA9IHRoaXMuX19nZXRDb21wb25lbnQoKTtcblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPXt6bnVpLnJlYWN0LmNsYXNzbmFtZShcInpyLXJvdXRlXCIsIHRoaXMucHJvcHMuY2xhc3NOYW1lKX0gc3R5bGU9e3RoaXMucHJvcHMuc3R5bGV9ID5cblx0XHRcdFx0XHR7X0NvbXBvbmVudC5Db21wb25lbnQgJiYgPF9Db21wb25lbnQuQ29tcG9uZW50IHsuLi5fQ29tcG9uZW50LkNvbXBvbmVudFByb3BzfSAvPn1cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQpO1xuXHRcdH1lbHNle1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXHR9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBaUlJvdXRlOyIsIm1vZHVsZS5leHBvcnRzID0gem4uQ2xhc3Moe1xuICAgIHN0YXRpYzogdHJ1ZSxcbiAgICBtZXRob2RzOiB7XG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgdGhpcy5maXhXaW5kb3dIYXNoQ2hhbmdlKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGZpeFdpbmRvd0hhc2hDaGFuZ2U6IGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgLy8gTGV0IHRoaXMgc25pcHBldCBydW4gYmVmb3JlIHlvdXIgaGFzaGNoYW5nZSBldmVudCBiaW5kaW5nIGNvZGVcbiAgICAgICAgICAgIGlmICghd2luZG93Lkhhc2hDaGFuZ2VFdmVudCl7XG4gICAgICAgICAgICAgICAgKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBsYXN0VVJMID0gZG9jdW1lbnQuVVJMO1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImhhc2hjaGFuZ2VcIiwgZnVuY3Rpb24oZXZlbnQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV2ZW50LCBcIm9sZFVSTFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGxhc3RVUkxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV2ZW50LCBcIm5ld1VSTFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGRvY3VtZW50LlVSTFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0VVJMID0gZG9jdW1lbnQuVVJMO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSk7IiwidmFyIFJlYWN0ID0gem51aS5SZWFjdCB8fCByZXF1aXJlKCdyZWFjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdGRpc3BsYXlOYW1lOidFcnJvcjQwNCcsXG5cdHJlbmRlcjogZnVuY3Rpb24oKXtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9e3pudWkucmVhY3QuY2xhc3NuYW1lKCd6ci1yb3V0ZXItZXJyb3ItNDA0JywgdGhpcy5wcm9wcy5jbGFzc05hbWUpfSBzdHlsZT17dGhpcy5wcm9wcy5zdHlsZX0gPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImVycm9yLWhlYWRlclwiPlxuXHRcdFx0XHRcdDxoMz5FUlJPUjogNDA0PC9oMz5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZXJyb3ItYm9keVwiPlxuXHRcdFx0XHRcdFRoZSBwYXRoIDxzcGFuIGNsYXNzTmFtZT1cInBhdGhcIj57dGhpcy5wcm9wcy5yZXF1ZXN0LnBhdGh9PC9zcGFuPiBpcyBub3QgZm91bmQuXG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImVycm9yLWZvb3RlclwiPlxuXHRcdFx0XHRcdFxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn0pOyIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgICdFcnJvcjQwNCc6IHJlcXVpcmUoJy4vRXJyb3I0MDQuanMnKVxufTsiLCJyZXF1aXJlKCcuL1V0aWwuanMnKTtcbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIEhhc2hSb3V0ZXI6IHJlcXVpcmUoJy4vSGFzaFJvdXRlci5qcycpLFxuICAgIFJvdXRlOiByZXF1aXJlKCcuL1JvdXRlJylcbn07IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJSZWFjdFwiXTsgfSgpKTsiXSwic291cmNlUm9vdCI6IiJ9
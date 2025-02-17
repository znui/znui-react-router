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

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
          var _routes = [];
          routes.forEach(function (route) {
            switch (zn.type(route)) {
              case 'object':
                _routes = _routes.concat(_this.formatRoutes(route, parent));
                break;
              case 'string':
                _routes.push(_this.__loadPathAndComponent(route, null, parent));
                break;
              case 'array':
                _routes = _routes.concat(_this.formatRoutes(route, parent));
              default:
                break;
            }
          });
          return _routes;
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

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vSGFzaEhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vSGFzaFJvdXRlci5qcyIsIndlYnBhY2s6Ly8vLi9QYXRoTWF0Y2hlci5qcyIsIndlYnBhY2s6Ly8vLi9SZXF1ZXN0SGFuZGxlci5qcyIsIndlYnBhY2s6Ly8vLi9Sb3V0ZS5qcyIsIndlYnBhY2s6Ly8vLi9VdGlsLmpzIiwid2VicGFjazovLy8uL2Vycm9yL0Vycm9yNDA0LmpzIiwid2VicGFjazovLy8uL2Vycm9yL2luZGV4LmpzIiwid2VicGFjazovLy8uL2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcIlJlYWN0XCIiXSwibmFtZXMiOlsiUmVxdWVzdEhhbmRsZXIiLCJyZXF1aXJlIiwibW9kdWxlIiwiZXhwb3J0cyIsInpuIiwiQ2xhc3MiLCJldmVudHMiLCJwcm9wZXJ0aWVzIiwibWV0aG9kcyIsImluaXQiLCJhcmd2IiwiX19pbml0RXZlbnRzIiwiY2FsbGVyIiwiY29uc3RydWN0b3IiLCJfc3VwZXJfIiwicHJvdG90eXBlIiwiX21haW4iLCJsZW5ndGgiLCJsb2NhdGlvbiIsImhhc2giLCJwb3AiLCJfX2hhc2hjaGFuZ2UiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiYmluZCIsIl90eXBlb2YiLCJldmVudCIsIm9uIiwiX3JldHVybiIsImZpcmUiLCJfaGFzaCIsIl9fcGFyc2VIYXNoIiwiX3JlcXVlc3QiLCJjcmVhdGVSZXF1ZXN0IiwiZG9SZXF1ZXN0IiwiX3NlYXJjaCIsInNlYXJjaCIsIl9oYXNoU3BsaXRJbmRleCIsImluZGV4T2YiLCJyZXBsYWNlIiwic3Vic3RyaW5nIiwicGF0aCIsInF1ZXJ5c3RyaW5nIiwicGFyc2UiLCJSZWFjdCIsInpudWkiLCJIYXNoSGFuZGxlciIsImVycm9yIiwiY3JlYXRlQ2xhc3MiLCJkaXNwbGF5TmFtZSIsImdldEluaXRpYWxTdGF0ZSIsImNvbXBvbmVudCIsIkNvbXBvbmVudCIsIkNvbXBvbmVudFByb3BzIiwiY29tcG9uZW50RGlkTW91bnQiLCJfX2luaXRIYW5kbGVyIiwiX2hhbmRsZXIiLCJwcm9wcyIsImhhc2hjaGFuZ2UiLCJoYW5kbGVyIiwiX19oYW5kbGVyIiwicmVxdWVzdCIsIl9fcmVxdWVzdCIsIm5vdGZvdW5kIiwiX19ub3Rmb3VuZCIsInBsdWdpbmxvYWRlZCIsIl9fcGx1Z2luTG9hZGVkIiwib25Jbml0SGFuZGxlciIsInNlbmRlciIsIm9uSGFzaENoYW5nZSIsImRhdGEiLCJvbkhhbmRsZXIiLCJyb3V0ZSIsIiQkdHlwZW9mIiwic2V0U3RhdGUiLCJleHRlbmQiLCJhcHBsaWNhdGlvbiIsInJvdXRlciIsIm9uUmVxdWVzdCIsIm9uTm90Rm91bmQiLCJvblBsdWdpbkxvYWRlZCIsInB1c2giLCJmb3J3YXJkIiwiRXJyb3I0MDQiLCJyZW5kZXIiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwicmVhY3QiLCJjbGFzc25hbWUiLCJzdHlsZSIsInN0YXRlIiwicGF0aFNlcGFyYXRvciIsInBhdGhQYXJhbWV0ZXJTeW1ib2wiLCJfcGF0aFNlcGFyYXRvciIsIl9wYXRoUGFyYW1ldGVyU3ltYm9sIiwiZm9ybWF0Um91dGUiLCJwYXJlbnQiLCJfX3BhcmVudF9fIiwicGF0aHMiLCJfX3BhcnNlUm91dGVQYXRocyIsImV4YWN0IiwiZm9ybWF0Um91dGVzIiwicm91dGVzIiwiX3RoaXMiLCJ0eXBlIiwiX3JvdXRlcyIsIl9fbG9hZFBhdGhBbmRDb21wb25lbnQiLCJmb3JFYWNoIiwiY29uY2F0IiwiY2FsbCIsImdldFJvdXRlRm9yUmVxdWVzdCIsIl9yb3V0ZSIsIl9kYXRhIiwiaSIsIl9sZW4iLCJfX21hdGNoUm91dGVBbmRSZXF1ZXN0IiwicGFyYW1zIiwiZ2V0Um91dGVzRnJvbVJvdXRlIiwiX2NvbXBvbmVudCIsInBsdWdpbnMiLCJfcGx1Z2lucyIsIl9fbG9hZFBsdWdpbnMiLCJtYWluIiwiX19pc1JlYWN0Q29tcG9uZW50IiwiaXMiLCJpc1JlYWN0Q29tcG9uZW50IiwidG9TdHJpbmciLCJleHRlbnNpb24iLCJfX2luaXRSb3V0ZSIsIl9fcm91dGVzX18iLCJfcGx1Z2luIiwiX3BsdWdpbk1haW4iLCJwbHVnaW4iLCJfX2xvYWRQbHVnaW4iLCJjb21wb25lbnRzIiwibmFtZXNwYWNlIiwiX3BhdGhzIiwiX3BhdGgiLCJfcGFyYW1zIiwiX3VybFVubWF0Y2hzIiwiX2hhc0NoZWNrZWQiLCJfdGVtcCIsIl90ZW1wcyIsInNwbGl0IiwiT2JqZWN0Iiwia2V5cyIsInVubWF0Y2hzIiwiaXNQYXJhbWV0ZXIiLCJrZXkiLCJ0ZXN0IiwiUGF0aE1hdGNoZXIiLCJyZXF1ZXN0cyIsIm1hdGNoZXIiLCJfcmVxdWVzdHMiLCJfbWF0Y2hlciIsInBsdWdpbkxvYWRlZCIsImxvYWRQbHVnaW5zIiwibG9hZFJvdXRlcyIsImxvYWRQbHVnaW4iLCJsb2FkUm91dGUiLCJaUlJvdXRlIiwiX25ld1JlcXVlc3QiLCJfZlJvdXRlIiwicGFyZW50UmVxdWVzdCIsIl9fZ2V0Q29tcG9uZW50IiwiX0NvbXBvbmVudCIsImZpeFdpbmRvd0hhc2hDaGFuZ2UiLCJIYXNoQ2hhbmdlRXZlbnQiLCJsYXN0VVJMIiwiZG9jdW1lbnQiLCJVUkwiLCJkZWZpbmVQcm9wZXJ0eSIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJ2YWx1ZSIsIkhhc2hSb3V0ZXIiLCJSb3V0ZSJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFD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Ozs7Ozs7O0FDRkRBLG1CQUFPLENBQUMsNEJBQVcsQ0FBQztBQUNwQkMsTUFBTSxDQUFDQyxPQUFPLEdBQUc7RUFDYjRLLFVBQVUsRUFBRTlLLG1CQUFPLENBQUMsd0NBQWlCLENBQUM7RUFDdEMrSyxLQUFLLEVBQUUvSyxtQkFBTyxDQUFDLDJCQUFTO0FBQzVCLENBQUMsQzs7Ozs7Ozs7Ozs7QUNKRCxhQUFhLGdDQUFnQyxFQUFFLEkiLCJmaWxlIjoiLi9kaXN0L2RldmVsb3BtZW50L2luZGV4LmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vaW5kZXguanNcIik7XG4iLCJ2YXIgUmVxdWVzdEhhbmRsZXIgPSByZXF1aXJlKCcuL1JlcXVlc3RIYW5kbGVyJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHpuLkNsYXNzKFJlcXVlc3RIYW5kbGVyLCB7XG4gICAgZXZlbnRzOiBbJ2hhc2hjaGFuZ2UnLCAnaGFuZGxlciddLFxuICAgIHByb3BlcnRpZXM6IHsgfSxcbiAgICBtZXRob2RzOiB7XG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uIChhcmd2LCBldmVudHMpe1xuICAgICAgICAgICAgdGhpcy5fX2luaXRFdmVudHMoZXZlbnRzKTtcbiAgICAgICAgICAgIGlmKHRoaXMuc3VwZXIuY2FsbGVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdXBlcihhcmd2KTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHRoaXMuY29uc3RydWN0b3IuX3N1cGVyXy5wcm90b3R5cGUuaW5pdChhcmd2LCBldmVudHMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZih0aGlzLl9tYWluLmxlbmd0aCAmJiAhbG9jYXRpb24uaGFzaCl7XG4gICAgICAgICAgICAgICAgbG9jYXRpb24uaGFzaCA9IHRoaXMuX21haW4ucG9wKCk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLl9faGFzaGNoYW5nZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2hhc2hjaGFuZ2UnLCB0aGlzLl9faGFzaGNoYW5nZS5iaW5kKHRoaXMpLCBmYWxzZSk7XG4gICAgICAgIH0sXG4gICAgICAgIF9faW5pdEV2ZW50czogZnVuY3Rpb24gKGV2ZW50cyl7XG4gICAgICAgICAgICBpZihldmVudHMgJiYgdHlwZW9mIGV2ZW50cyA9PSAnb2JqZWN0Jyl7XG4gICAgICAgICAgICAgICAgZm9yKHZhciBldmVudCBpbiBldmVudHMpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uKGV2ZW50LCBldmVudHNbZXZlbnRdLCB0aGlzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIF9faGFzaGNoYW5nZTogZnVuY3Rpb24gKGV2ZW50KXtcbiAgICAgICAgICAgIHZhciBfcmV0dXJuID0gdGhpcy5maXJlKCdoYXNoY2hhbmdlJywgZXZlbnQpO1xuICAgICAgICAgICAgaWYoX3JldHVybiA9PT0gZmFsc2UpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIHZhciBfaGFzaCA9IHRoaXMuX19wYXJzZUhhc2goKSxcbiAgICAgICAgICAgICAgICBfcmVxdWVzdCA9IHRoaXMuY3JlYXRlUmVxdWVzdChfaGFzaCwgZXZlbnQpO1xuXG4gICAgICAgICAgICBfcmV0dXJuID0gdGhpcy5maXJlKCdoYW5kbGVyJywgZXZlbnQsIF9oYXNoKTtcbiAgICAgICAgICAgIGlmKF9yZXR1cm4gPT09IGZhbHNlKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICAgIHRoaXMuZG9SZXF1ZXN0KF9yZXF1ZXN0KTtcbiAgICAgICAgfSxcbiAgICAgICAgX19wYXJzZUhhc2g6IGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgdmFyIF9oYXNoID0gbG9jYXRpb24uaGFzaCxcbiAgICAgICAgICAgICAgICBfc2VhcmNoID0gbG9jYXRpb24uc2VhcmNoLFxuICAgICAgICAgICAgICAgIF9oYXNoU3BsaXRJbmRleCA9IF9oYXNoLmluZGV4T2YoJz8nKTtcbiAgICAgICAgICAgIGlmKF9zZWFyY2ggJiYgX3NlYXJjaC5pbmRleE9mKCc/JykhPT0tMSl7XG4gICAgICAgICAgICAgICAgX3NlYXJjaCA9IF9zZWFyY2gucmVwbGFjZSgnPycsICcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKF9oYXNoU3BsaXRJbmRleCAhPT0gLTEpe1xuICAgICAgICAgICAgICAgIF9zZWFyY2ggPSBfc2VhcmNoICsgJyYnKyBfaGFzaC5zdWJzdHJpbmcoX2hhc2hTcGxpdEluZGV4ICsgMSk7XG4gICAgICAgICAgICAgICAgX2hhc2ggPSBfaGFzaC5zdWJzdHJpbmcoMCwgX2hhc2hTcGxpdEluZGV4KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBwYXRoOiBfaGFzaC5zdWJzdHJpbmcoMSksXG4gICAgICAgICAgICAgICAgc2VhcmNoOiB6bi5xdWVyeXN0cmluZy5wYXJzZShfc2VhcmNoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSk7XG4iLCJ2YXIgUmVhY3QgPSB6bnVpLlJlYWN0IHx8IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgSGFzaEhhbmRsZXIgPSByZXF1aXJlKCcuL0hhc2hIYW5kbGVyJyk7XG52YXIgZXJyb3IgPSByZXF1aXJlKCcuL2Vycm9yL2luZGV4LmpzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0ZGlzcGxheU5hbWU6J1pSSGFzaFJvdXRlcicsXG5cdGdldEluaXRpYWxTdGF0ZTpmdW5jdGlvbigpe1xuXHRcdHJldHVybiB7XG5cdFx0XHRjb21wb25lbnQ6IG51bGwsXG5cdFx0XHRDb21wb25lbnQ6IG51bGwsXG5cdFx0XHRDb21wb25lbnRQcm9wczogbnVsbFxuXHRcdH1cblx0fSxcblx0Y29tcG9uZW50RGlkTW91bnQ6ZnVuY3Rpb24oKXtcblx0XHR0aGlzLl9faW5pdEhhbmRsZXIoKTtcblx0fSxcblx0X19pbml0SGFuZGxlcjogZnVuY3Rpb24gKCl7XG5cdFx0dGhpcy5faGFuZGxlciA9IG5ldyBIYXNoSGFuZGxlcih0aGlzLnByb3BzLCB7XG5cdFx0XHRoYXNoY2hhbmdlOiB0aGlzLl9faGFzaGNoYW5nZSxcblx0XHRcdGhhbmRsZXI6IHRoaXMuX19oYW5kbGVyLFxuXHRcdFx0cmVxdWVzdDogdGhpcy5fX3JlcXVlc3QsXG5cdFx0XHRub3Rmb3VuZDogdGhpcy5fX25vdGZvdW5kLFxuXHRcdFx0cGx1Z2lubG9hZGVkOiB0aGlzLl9fcGx1Z2luTG9hZGVkXG5cdFx0fSk7XG5cdFx0dGhpcy5wcm9wcy5vbkluaXRIYW5kbGVyICYmIHRoaXMucHJvcHMub25Jbml0SGFuZGxlcih0aGlzLl9oYW5kbGVyLCB0aGlzKTtcblx0fSxcblx0X19oYXNoY2hhbmdlOiBmdW5jdGlvbiAoc2VuZGVyLCBldmVudCl7XG5cdFx0dGhpcy5wcm9wcy5vbkhhc2hDaGFuZ2UgJiYgdGhpcy5wcm9wcy5vbkhhc2hDaGFuZ2UoZXZlbnQsIHRoaXMpO1xuXHR9LFxuXHRfX2hhbmRsZXI6IGZ1bmN0aW9uIChzZW5kZXIsIGV2ZW50LCBkYXRhKXtcblx0XHR0aGlzLnByb3BzLm9uSGFuZGxlciAmJiB0aGlzLnByb3BzLm9uSGFuZGxlcihldmVudCwgZGF0YSwgdGhpcyk7XG5cdH0sXG5cdF9fcmVxdWVzdDogZnVuY3Rpb24gKHNlbmRlciwgcmVxdWVzdCwgcm91dGUpe1xuXHRcdGlmKHJvdXRlLmNvbXBvbmVudCAmJiB0eXBlb2Ygcm91dGUuY29tcG9uZW50ID09ICdvYmplY3QnICYmIHJvdXRlLmNvbXBvbmVudC4kJHR5cGVvZikge1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdGNvbXBvbmVudDogcm91dGUuY29tcG9uZW50XG5cdFx0XHR9KTtcblx0XHR9ZWxzZXtcblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRDb21wb25lbnQ6IHJvdXRlLmNvbXBvbmVudCxcblx0XHRcdFx0Q29tcG9uZW50UHJvcHM6IHpuLmV4dGVuZCh7fSwgcm91dGUucHJvcHMsIHtcblx0XHRcdFx0XHRhcHBsaWNhdGlvbjogdGhpcy5wcm9wcy5hcHBsaWNhdGlvbixcblx0XHRcdFx0XHRyZXF1ZXN0OiByZXF1ZXN0LFxuXHRcdFx0XHRcdHJvdXRlcjogdGhpcyxcblx0XHRcdFx0XHRyb3V0ZTogcm91dGVcblx0XHRcdFx0fSlcblx0XHRcdH0pO1xuXHRcdH1cblx0XHR0aGlzLnByb3BzLm9uUmVxdWVzdCAmJiB0aGlzLnByb3BzLm9uUmVxdWVzdChyZXF1ZXN0LCByb3V0ZSwgdGhpcyk7XG5cdH0sXG5cdF9fbm90Zm91bmQ6IGZ1bmN0aW9uIChzZW5kZXIsIHJlcXVlc3Qpe1xuXHRcdHRoaXMubm90Zm91bmQocmVxdWVzdCk7XG5cdFx0dGhpcy5wcm9wcy5vbk5vdEZvdW5kICYmIHRoaXMucHJvcHMub25Ob3RGb3VuZChyZXF1ZXN0LCB0aGlzKTtcblx0fSxcblx0X19wbHVnaW5Mb2FkZWQ6IGZ1bmN0aW9uIChzZW5kZXIsIGRhdGEpe1xuXHRcdHRoaXMucHJvcHMub25QbHVnaW5Mb2FkZWQgJiYgdGhpcy5wcm9wcy5vblBsdWdpbkxvYWRlZChkYXRhLCB0aGlzKTtcblx0fSxcblx0cHVzaDogZnVuY3Rpb24gKCl7XG5cblx0fSxcblx0Zm9yd2FyZDogZnVuY3Rpb24gKCl7XG5cblx0fSxcblx0bm90Zm91bmQ6IGZ1bmN0aW9uIChyZXF1ZXN0KXtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdENvbXBvbmVudDogZXJyb3IuRXJyb3I0MDQsXG5cdFx0XHRDb21wb25lbnRQcm9wczoge1xuXHRcdFx0XHRyZXF1ZXN0OiByZXF1ZXN0XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0sXG5cdHJlbmRlcjogZnVuY3Rpb24oKXtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9e3pudWkucmVhY3QuY2xhc3NuYW1lKFwienItaGFzaC1yb3V0ZXJcIiwgdGhpcy5wcm9wcy5jbGFzc05hbWUpfSBzdHlsZT17dGhpcy5wcm9wcy5zdHlsZX0gPlxuXHRcdFx0XHR7IHRoaXMuc3RhdGUuY29tcG9uZW50IH1cblx0XHRcdFx0eyB0aGlzLnN0YXRlLkNvbXBvbmVudCAmJiA8dGhpcy5zdGF0ZS5Db21wb25lbnQgey4uLnRoaXMuc3RhdGUuQ29tcG9uZW50UHJvcHN9IC8+IH1cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn0pOyIsIm1vZHVsZS5leHBvcnRzID0gem4uQ2xhc3Moe1xuICAgIGV2ZW50czogWydwbHVnaW5Mb2FkaW5nJywgJ3BsdWdpbkxvYWRlZCcsICdyb3V0ZUxvYWRpbmcnLCAncm91dGVMb2FkZWQnXSxcbiAgICBwcm9wZXJ0aWVzOnsgXG4gICAgICAgIHBhdGhTZXBhcmF0b3I6IG51bGwsXG4gICAgICAgIHBhdGhQYXJhbWV0ZXJTeW1ib2w6IG51bGxcbiAgICB9LFxuICAgIG1ldGhvZHM6IHtcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKGFyZ3YsIGV2ZW50cyl7XG4gICAgICAgICAgICB0aGlzLl9faW5pdEV2ZW50cyhldmVudHMpO1xuICAgICAgICAgICAgdGhpcy5fcGF0aFNlcGFyYXRvciA9IGFyZ3YucGF0aFNlcGFyYXRvciB8fCAnLyc7XG4gICAgICAgICAgICB0aGlzLl9wYXRoUGFyYW1ldGVyU3ltYm9sID0gYXJndi5wYXRoUGFyYW1ldGVyU3ltYm9sIHx8ICc6JztcbiAgICAgICAgfSxcbiAgICAgICAgX19pbml0RXZlbnRzOiBmdW5jdGlvbiAoZXZlbnRzKXtcbiAgICAgICAgICAgIGlmKGV2ZW50cyAmJiB0eXBlb2YgZXZlbnRzID09ICdvYmplY3QnKXtcbiAgICAgICAgICAgICAgICBmb3IodmFyIGV2ZW50IGluIGV2ZW50cyl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub24oZXZlbnQsIGV2ZW50c1tldmVudF0sIHRoaXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZm9ybWF0Um91dGU6IGZ1bmN0aW9uIChyb3V0ZSwgcGFyZW50KXtcbiAgICAgICAgICAgIHZhciBfcmV0dXJuID0gdGhpcy5maXJlKCdyb3V0ZUxvYWRpbmcnLCByb3V0ZSwgcGFyZW50KTtcbiAgICAgICAgICAgIGlmKF9yZXR1cm4gPT09IGZhbHNlKXtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHBhcmVudCl7XG4gICAgICAgICAgICAgICAgcm91dGUuX19wYXJlbnRfXyA9IHBhcmVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJvdXRlLnBhdGhzID0gdGhpcy5fX3BhcnNlUm91dGVQYXRocyhyb3V0ZS5wYXRoKTtcbiAgICAgICAgICAgIHJvdXRlLnByb3BzID0gem4uZXh0ZW5kKHt9LCByb3V0ZS5wcm9wcyk7XG4gICAgICAgICAgICBpZihyb3V0ZS5leGFjdCA9PSBudWxsICYmIHJvdXRlLnBhdGguaW5kZXhPZih0aGlzLl9wYXRoUGFyYW1ldGVyU3ltYm9sKSA9PT0gLTEpIHsgcm91dGUuZXhhY3QgPSB0cnVlOyB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZpcmUoJ3JvdXRlTG9hZGVkJywgcm91dGUpLCByb3V0ZTtcbiAgICAgICAgfSxcbiAgICAgICAgZm9ybWF0Um91dGVzOiBmdW5jdGlvbiAocm91dGVzLCBwYXJlbnQpe1xuICAgICAgICAgICAgc3dpdGNoKHpuLnR5cGUocm91dGVzKSl7XG4gICAgICAgICAgICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9yb3V0ZXMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgZm9yKHZhciBwYXRoIGluIHJvdXRlcyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBfcm91dGVzLnB1c2godGhpcy5fX2xvYWRQYXRoQW5kQ29tcG9uZW50KHBhdGgsIHJvdXRlc1twYXRoXSwgcGFyZW50KSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9yb3V0ZXM7XG4gICAgICAgICAgICAgICAgY2FzZSAnYXJyYXknOlxuICAgICAgICAgICAgICAgICAgICB2YXIgX3JvdXRlcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICByb3V0ZXMuZm9yRWFjaCgocm91dGUpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2goem4udHlwZShyb3V0ZSkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9yb3V0ZXMgPSBfcm91dGVzLmNvbmNhdCh0aGlzLmZvcm1hdFJvdXRlcyhyb3V0ZSwgcGFyZW50KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9yb3V0ZXMucHVzaCh0aGlzLl9fbG9hZFBhdGhBbmRDb21wb25lbnQocm91dGUsIG51bGwsIHBhcmVudCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdhcnJheSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9yb3V0ZXMgPSBfcm91dGVzLmNvbmNhdCh0aGlzLmZvcm1hdFJvdXRlcyhyb3V0ZSwgcGFyZW50KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gICAgXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfcm91dGVzO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2Z1bmN0aW9uJzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZm9ybWF0Um91dGVzKHJvdXRlcy5jYWxsKG51bGwsIHBhcmVudCwgdGhpcyksIHBhcmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGdldFJvdXRlRm9yUmVxdWVzdDogZnVuY3Rpb24gKHJlcXVlc3QsIHJvdXRlcyl7XG4gICAgICAgICAgICB2YXIgX3JvdXRlcyA9IHJvdXRlcyxcbiAgICAgICAgICAgICAgICBfcm91dGUgPSBudWxsLFxuICAgICAgICAgICAgICAgIF9kYXRhID0gbnVsbDtcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDAsIF9sZW4gPSBfcm91dGVzLmxlbmd0aDsgaSA8IF9sZW47IGkrKyl7XG4gICAgICAgICAgICAgICAgX3JvdXRlID0gX3JvdXRlc1tpXTtcbiAgICAgICAgICAgICAgICBfZGF0YSA9IHRoaXMuX19tYXRjaFJvdXRlQW5kUmVxdWVzdChfcm91dGUsIHJlcXVlc3QpO1xuICAgICAgICAgICAgICAgIGlmKF9kYXRhKXtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZighX2RhdGEgfHwgIV9yb3V0ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3QucGFyYW1zID0gX2RhdGEsIF9yb3V0ZTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0Um91dGVzRnJvbVJvdXRlOiBmdW5jdGlvbiAocm91dGUpe1xuICAgICAgICAgICAgdmFyIF9yb3V0ZXMgPSBbXSxcbiAgICAgICAgICAgICAgICBfY29tcG9uZW50ID0gcm91dGUuY29tcG9uZW50O1xuICAgICAgICAgICAgaWYocm91dGUucm91dGVzKSB7XG4gICAgICAgICAgICAgICAgX3JvdXRlcyA9IHRoaXMuZm9ybWF0Um91dGVzKHJvdXRlLnJvdXRlcywgcm91dGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZihyb3V0ZS5wbHVnaW5zKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9wbHVnaW5zID0gdGhpcy5fX2xvYWRQbHVnaW5zKHJvdXRlLnBsdWdpbnMsIHJvdXRlKTtcbiAgICAgICAgICAgICAgICBfcm91dGVzID0gX3JvdXRlcy5jb25jYXQoX3BsdWdpbnMucm91dGVzKTtcbiAgICAgICAgICAgICAgICBpZighX2NvbXBvbmVudCAmJiBfcGx1Z2lucy5tYWluLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBfY29tcG9uZW50ID0gX3BsdWdpbnMubWFpbi5wb3AoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcm91dGVzOiBfcm91dGVzLFxuICAgICAgICAgICAgICAgIGNvbXBvbmVudDogX2NvbXBvbmVudFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgICAgX19pc1JlYWN0Q29tcG9uZW50OiBmdW5jdGlvbiAoY29tcG9uZW50KXtcbiAgICAgICAgICAgIGlmKGNvbXBvbmVudCAmJiB6bi5pcyhjb21wb25lbnQsICdmdW5jdGlvbicpICYmIChjb21wb25lbnQucHJvdG90eXBlLnJlbmRlciB8fCBjb21wb25lbnQuZGlzcGxheU5hbWUgfHwgY29tcG9uZW50LnByb3RvdHlwZS5pc1JlYWN0Q29tcG9uZW50ICkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9LFxuICAgICAgICBfX2xvYWRQYXRoQW5kQ29tcG9uZW50OiBmdW5jdGlvbiAocGF0aCwgY29tcG9uZW50LCBwYXJlbnQpe1xuICAgICAgICAgICAgdmFyIF9yb3V0ZSA9IHsgcGF0aDogcGF0aCB9O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBzd2l0Y2goem4udHlwZShjb21wb25lbnQpKXtcbiAgICAgICAgICAgICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICAgICAgICAgICAgICBfcm91dGUuY29tcG9uZW50ID0gem4ucGF0aCh3aW5kb3csIGNvbXBvbmVudCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2Z1bmN0aW9uJzpcbiAgICAgICAgICAgICAgICAgICAgaWYoIXRoaXMuX19pc1JlYWN0Q29tcG9uZW50KGNvbXBvbmVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9yb3V0ZS5jb21wb25lbnQgPSBjb21wb25lbnQuY2FsbCh0aGlzLCBwYXRoLCB0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICBfcm91dGUuY29tcG9uZW50ID0gY29tcG9uZW50O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgICAgICAgICAgICAgIGlmKGNvbXBvbmVudC4kJHR5cGVvZikge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3JvdXRlLmNvbXBvbmVudCA9IGNvbXBvbmVudDtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYoY29tcG9uZW50LmNvbnN0cnVjdG9yLnRvU3RyaW5nKCkuaW5kZXhPZignZnVuY3Rpb24gT2JqZWN0JykgPT0gMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICB6bi5leHRlbmQoX3JvdXRlLCBjb21wb25lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoX3JvdXRlLmV4dGVuc2lvbiAhPT0gZmFsc2Upe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX19pbml0Um91dGUoX3JvdXRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZm9ybWF0Um91dGUoX3JvdXRlLCBwYXJlbnQpO1xuICAgICAgICB9LFxuICAgICAgICBfX2luaXRSb3V0ZTogZnVuY3Rpb24gKHJvdXRlKXtcbiAgICAgICAgICAgIGlmKHJvdXRlLnJvdXRlcykge1xuICAgICAgICAgICAgICAgIHJvdXRlLl9fcm91dGVzX18gPSB0aGlzLmZvcm1hdFJvdXRlcyhyb3V0ZS5yb3V0ZXMsIHJvdXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYocm91dGUucGx1Z2lucykge1xuICAgICAgICAgICAgICAgIHZhciBfcGx1Z2lucyA9IHRoaXMuX19sb2FkUGx1Z2lucyhyb3V0ZS5wbHVnaW5zLCByb3V0ZSk7XG4gICAgICAgICAgICAgICAgaWYocm91dGUuX19yb3V0ZXNfXykge1xuICAgICAgICAgICAgICAgICAgICByb3V0ZS5fX3JvdXRlc19fID0gcm91dGUuX19yb3V0ZXNfXy5jb25jYXQoX3BsdWdpbnMucm91dGVzKTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgcm91dGUuX19yb3V0ZXNfXyA9IF9wbHVnaW5zLnJvdXRlcztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByb3V0ZS5tYWluID0gX3BsdWdpbnMubWFpbjtcbiAgICAgICAgICAgICAgICBpZighcm91dGUuY29tcG9uZW50ICYmIF9wbHVnaW5zLm1haW4ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJvdXRlLmNvbXBvbmVudCA9IF9wbHVnaW5zLm1haW4ucG9wKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcm91dGU7XG4gICAgICAgIH0sXG4gICAgICAgIF9fbG9hZFBsdWdpbnM6IGZ1bmN0aW9uIChwbHVnaW5zLCBwYXJlbnQpe1xuICAgICAgICAgICAgdmFyIF9wbHVnaW5zID0gcGx1Z2lucyB8fCBbXSxcbiAgICAgICAgICAgICAgICBfcGx1Z2luID0gbnVsbCxcbiAgICAgICAgICAgICAgICBfcm91dGVzID0gW10sXG4gICAgICAgICAgICAgICAgX21haW4gPSBbXSxcbiAgICAgICAgICAgICAgICBfcGx1Z2luTWFpbiA9IG51bGw7XG4gICAgICAgICAgICBzd2l0Y2goem4udHlwZShwbHVnaW5zKSl7XG4gICAgICAgICAgICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgICAgICAgICAgICAgX3BsdWdpbnMgPSBbcGx1Z2luc107XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2Z1bmN0aW9uJzpcbiAgICAgICAgICAgICAgICAgICAgX3BsdWdpbnMgPSBwbHVnaW5zKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKF9wbHVnaW5zICYmIF9wbHVnaW5zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHBsdWdpbnMuZm9yRWFjaChmdW5jdGlvbiAocGx1Z2luKXtcbiAgICAgICAgICAgICAgICAgICAgX3BsdWdpbiA9IHRoaXMuX19sb2FkUGx1Z2luKHBsdWdpbiwgcGFyZW50KTtcbiAgICAgICAgICAgICAgICAgICAgaWYoX3BsdWdpbil7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihfcGx1Z2luLl9fcm91dGVzX18pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcm91dGVzID0gX3JvdXRlcy5jb25jYXQoX3BsdWdpbi5fX3JvdXRlc19fKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKF9wbHVnaW4ubWFpbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9wbHVnaW5NYWluID0gX3BsdWdpbi5tYWluO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCh6bi50eXBlKF9tYWluKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcGx1Z2luTWFpbiA9IF9wbHVnaW4ucm91dGVzW19wbHVnaW5NYWluXSB8fCB6bi5wYXRoKF9wbHVnaW4uY29tcG9uZW50cywgX3BsdWdpbk1haW4pIHx8IHpuLnBhdGgod2luZG93LCBfcGx1Z2luTWFpbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZnVuY3Rpb24nOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoX3BsdWdpbk1haW4uY29uc3RydWN0b3IudG9TdHJpbmcoKSA9PSBcImZ1bmN0aW9uIEZ1bmN0aW9uKCkgeyBbbmF0aXZlIGNvZGVdIH1cIil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3BsdWdpbk1haW4gPSBfcGx1Z2luTWFpbih0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0IDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfbWFpbi5wdXNoKF9wbHVnaW5NYWluKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJvdXRlczogX3JvdXRlcyxcbiAgICAgICAgICAgICAgICBtYWluOiBfbWFpblxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgICAgX19sb2FkUGx1Z2luOiBmdW5jdGlvbiAocGx1Z2luLCBwYXJlbnQpe1xuICAgICAgICAgICAgdmFyIF9wbHVnaW4gPSBwbHVnaW4gfHwge30sXG4gICAgICAgICAgICAgICAgX3JldHVybiA9IHRoaXMuZmlyZSgncGx1Z2luTG9hZGluZycsIHBsdWdpbiwgcGFyZW50KTtcbiAgICAgICAgICAgIGlmKF9yZXR1cm4gPT09IGZhbHNlKXtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHN3aXRjaCh6bi50eXBlKHBsdWdpbikpe1xuICAgICAgICAgICAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgICAgICAgICAgICAgIF9wbHVnaW4gPSBfcGx1Z2luO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdmdW5jdGlvbic6XG4gICAgICAgICAgICAgICAgICAgIF9wbHVnaW4gPSBfcGx1Z2luKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKF9wbHVnaW4ubmFtZXNwYWNlICYmIF9wbHVnaW4uY29tcG9uZW50cykge1xuICAgICAgICAgICAgICAgIHpuLnBhdGgod2luZG93LCBfcGx1Z2luLm5hbWVzcGFjZSwgX3BsdWdpbi5jb21wb25lbnRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF9wbHVnaW4uX19yb3V0ZXNfXyA9IHRoaXMuZm9ybWF0Um91dGVzKF9wbHVnaW4ucm91dGVzfHxbXSwgcGFyZW50KTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlyZSgncGx1Z2luTG9hZGVkJywgX3BsdWdpbiksIF9wbHVnaW47XG4gICAgICAgIH0sXG4gICAgICAgIF9fbWF0Y2hSb3V0ZUFuZFJlcXVlc3Q6IGZ1bmN0aW9uIChyb3V0ZSwgcmVxdWVzdCl7XG4gICAgICAgICAgICB2YXIgX3BhdGhzID0gcm91dGUucGF0aHMsXG4gICAgICAgICAgICAgICAgX3BhdGggPSBudWxsLFxuICAgICAgICAgICAgICAgIF9wYXJhbXMgPSB7fSxcbiAgICAgICAgICAgICAgICBfdXJsVW5tYXRjaHMgPSBbXSxcbiAgICAgICAgICAgICAgICBfaGFzQ2hlY2tlZCA9IGZhbHNlLFxuICAgICAgICAgICAgICAgIF90ZW1wID0gbnVsbCxcbiAgICAgICAgICAgICAgICBfdGVtcHMgPSByZXF1ZXN0LnBhdGguc3BsaXQodGhpcy5fcGF0aFNlcGFyYXRvcik7XG5cbiAgICAgICAgICAgIGlmKHJvdXRlLnJvdXRlcyAmJiBPYmplY3Qua2V5cyhyb3V0ZS5yb3V0ZXMpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGlmKHJvdXRlLmV4YWN0ID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgcm91dGUuZXhhY3QgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHJvdXRlLmV4YWN0KSB7XG4gICAgICAgICAgICAgICAgaWYocm91dGUucGF0aCA9PT0gcmVxdWVzdC5wYXRoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXF1ZXN0LnVubWF0Y2hzID0gX3VybFVubWF0Y2hzLCBfcGFyYW1zOyBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYoX3RlbXBzLmxlbmd0aCAhPT0gX3BhdGhzLmxlbmd0aCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDAsIF9sZW4gPSBfdGVtcHMubGVuZ3RoOyBpIDwgX2xlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgX3RlbXAgPSBfdGVtcHNbaV07XG4gICAgICAgICAgICAgICAgaWYoIV90ZW1wKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBfcGF0aCA9IF9wYXRoc1tpXTtcbiAgICAgICAgICAgICAgICBfaGFzQ2hlY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgaWYoIV9wYXRoKXtcbiAgICAgICAgICAgICAgICAgICAgX3VybFVubWF0Y2hzLnB1c2goX3RlbXApO1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYoIV9wYXRoLmlzUGFyYW1ldGVyICYmIF90ZW1wICE9PSBfcGF0aC5rZXkpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYoX3BhdGguaXNQYXJhbWV0ZXIpe1xuICAgICAgICAgICAgICAgICAgICBfcGFyYW1zW19wYXRoLmtleV0gPSBfdGVtcDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZighX2hhc0NoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiByZXF1ZXN0LnVubWF0Y2hzID0gX3VybFVubWF0Y2hzLCBfcGFyYW1zO1xuICAgICAgICB9LFxuICAgICAgICBfX3BhcnNlUm91dGVQYXRoczogZnVuY3Rpb24gKHBhdGgpe1xuICAgICAgICAgICAgdmFyIF9wYXRocyA9IFtdLFxuICAgICAgICAgICAgICAgIF90ZW1wID0gbnVsbCxcbiAgICAgICAgICAgICAgICBfdGVtcHMgPSBwYXRoLnNwbGl0KHRoaXMuX3BhdGhTZXBhcmF0b3IpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwLCBfbGVuID0gX3RlbXBzLmxlbmd0aDsgaSA8IF9sZW47IGkrKykge1xuICAgICAgICAgICAgICAgIF90ZW1wID0gX3RlbXBzW2ldO1xuICAgICAgICAgICAgICAgIGlmKCFfdGVtcCkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKC9eOlxcd1tcXHdcXGRdKiQvLnRlc3QoX3RlbXApKSB7XG4gICAgICAgICAgICAgICAgICAgIF90ZW1wID0gX3RlbXAucmVwbGFjZSgvXjovLCAnJyk7XG4gICAgICAgICAgICAgICAgICAgIF9wYXRoc1tpXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleTogX3RlbXAsXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1BhcmFtZXRlcjogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBfcGF0aHNbaV0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IF90ZW1wXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gX3BhdGhzO1xuICAgICAgICB9XG4gICAgfVxufSk7IiwidmFyIFBhdGhNYXRjaGVyID0gcmVxdWlyZSgnLi9QYXRoTWF0Y2hlcicpO1xubW9kdWxlLmV4cG9ydHMgPSB6bi5DbGFzcyh7XG4gICAgZXZlbnRzOiBbJ3JlcXVlc3QnLCAnbm90Zm91bmQnLCAncGx1Z2luTG9hZGluZycsICdwbHVnaW5Mb2FkZWQnXSxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHJlcXVlc3RzOiBudWxsLFxuICAgICAgICByb3V0ZXM6IG51bGwsXG4gICAgICAgIHBsdWdpbnM6IG51bGwsXG4gICAgICAgIG1haW46IG51bGwsXG4gICAgICAgIG1hdGNoZXI6IG51bGxcbiAgICB9LFxuICAgIG1ldGhvZHM6IHtcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKGFyZ3YsIGV2ZW50cyl7XG4gICAgICAgICAgICB0aGlzLl9yZXF1ZXN0cyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5fcm91dGVzID0gW107XG4gICAgICAgICAgICB0aGlzLl9wbHVnaW5zID0gW107XG4gICAgICAgICAgICB0aGlzLl9tYWluID0gW107XG4gICAgICAgICAgICB0aGlzLl9tYXRjaGVyID0gbmV3IFBhdGhNYXRjaGVyKGFyZ3YsIHtcbiAgICAgICAgICAgICAgICBwbHVnaW5Mb2FkZWQ6IGZ1bmN0aW9uIChzZW5kZXIsIHBsdWdpbikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpcmUoJ3BsdWdpbkxvYWRlZCcsIHBsdWdpbik7XG4gICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuX19pbml0RXZlbnRzKGV2ZW50cyk7XG4gICAgICAgICAgICB0aGlzLmxvYWRQbHVnaW5zKGFyZ3YucGx1Z2lucyk7XG4gICAgICAgICAgICB0aGlzLmxvYWRSb3V0ZXMoYXJndi5yb3V0ZXMpO1xuICAgICAgICAgICAgaWYoYXJndi5tYWluKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWFpbi5wdXNoKGFyZ3YubWFpbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIF9faW5pdEV2ZW50czogZnVuY3Rpb24gKGV2ZW50cyl7XG4gICAgICAgICAgICBpZihldmVudHMgJiYgdHlwZW9mIGV2ZW50cyA9PSAnb2JqZWN0Jyl7XG4gICAgICAgICAgICAgICAgZm9yKHZhciBldmVudCBpbiBldmVudHMpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uKGV2ZW50LCBldmVudHNbZXZlbnRdLCB0aGlzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGNyZWF0ZVJlcXVlc3Q6IGZ1bmN0aW9uIChyZXF1ZXN0LCBldmVudCl7XG4gICAgICAgICAgICByZXF1ZXN0LmV2ZW50ID0gZXZlbnQ7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdHMucHVzaChyZXF1ZXN0KSwgcmVxdWVzdDtcbiAgICAgICAgfSxcbiAgICAgICAgZG9SZXF1ZXN0OiBmdW5jdGlvbiAocmVxdWVzdCl7XG4gICAgICAgICAgICB2YXIgX3JvdXRlID0gdGhpcy5fbWF0Y2hlci5nZXRSb3V0ZUZvclJlcXVlc3QocmVxdWVzdCwgdGhpcy5fcm91dGVzKTtcbiAgICAgICAgICAgIHJlcXVlc3QubWF0Y2hlciA9IHRoaXMuX21hdGNoZXI7XG4gICAgICAgICAgICBpZihfcm91dGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpcmUoJ3JlcXVlc3QnLCByZXF1ZXN0LCBfcm91dGUpO1xuICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZmlyZSgnbm90Zm91bmQnLCByZXF1ZXN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbG9hZFBsdWdpbnM6IGZ1bmN0aW9uIChwbHVnaW5zKXtcbiAgICAgICAgICAgIHZhciBfcGx1Z2lucyA9IHBsdWdpbnMgfHwgW107XG4gICAgICAgICAgICBzd2l0Y2goem4udHlwZShwbHVnaW5zKSl7XG4gICAgICAgICAgICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgICAgICAgICAgICAgX3BsdWdpbnMgPSBbcGx1Z2luc107XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2Z1bmN0aW9uJzpcbiAgICAgICAgICAgICAgICAgICAgX3BsdWdpbnMgPSBwbHVnaW5zKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKF9wbHVnaW5zICYmIF9wbHVnaW5zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHBsdWdpbnMuZm9yRWFjaChmdW5jdGlvbiAocGx1Z2luKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkUGx1Z2luKHBsdWdpbik7XG4gICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuICAgICAgICBsb2FkUGx1Z2luOiBmdW5jdGlvbiAocGx1Z2luKXtcbiAgICAgICAgICAgIHZhciBfcGx1Z2luID0gcGx1Z2luIHx8IHt9LFxuICAgICAgICAgICAgICAgIF9yZXR1cm4gPSB0aGlzLmZpcmUoJ3BsdWdpbkxvYWRpbmcnLCBwbHVnaW4pO1xuICAgICAgICAgICAgaWYoX3JldHVybiA9PT0gZmFsc2Upe1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN3aXRjaCh6bi50eXBlKHBsdWdpbikpe1xuICAgICAgICAgICAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgICAgICAgICAgICAgIF9wbHVnaW4gPSBfcGx1Z2luO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdmdW5jdGlvbic6XG4gICAgICAgICAgICAgICAgICAgIF9wbHVnaW4gPSBfcGx1Z2luKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoX3BsdWdpbi5tYWluKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWFpbi5wdXNoKF9wbHVnaW4ubWFpbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihfcGx1Z2luLm5hbWVzcGFjZSAmJiBfcGx1Z2luLmNvbXBvbmVudHMpIHtcbiAgICAgICAgICAgICAgICB6bi5wYXRoKHdpbmRvdywgX3BsdWdpbi5uYW1lc3BhY2UsIF9wbHVnaW4uY29tcG9uZW50cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgX3JvdXRlcyA9IHRoaXMuX21hdGNoZXIuZm9ybWF0Um91dGVzKF9wbHVnaW4ucm91dGVzfHxbXSk7XG4gICAgICAgICAgICBfcGx1Z2luLl9fcm91dGVzX18gPSBfcm91dGVzO1xuICAgICAgICAgICAgdGhpcy5fcGx1Z2lucy5wdXNoKF9wbHVnaW4pO1xuICAgICAgICAgICAgdGhpcy5maXJlKCdwbHVnaW5Mb2FkZWQnLCBfcGx1Z2luKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yb3V0ZXMgPSB0aGlzLl9yb3V0ZXMuY29uY2F0KF9yb3V0ZXMpLCBfcm91dGVzO1xuICAgICAgICB9LFxuICAgICAgICBsb2FkUm91dGVzOiBmdW5jdGlvbiAocm91dGVzKXtcbiAgICAgICAgICAgIHZhciBfcm91dGVzID0gdGhpcy5fbWF0Y2hlci5mb3JtYXRSb3V0ZXMocm91dGVzKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yb3V0ZXMgPSB0aGlzLl9yb3V0ZXMuY29uY2F0KF9yb3V0ZXMpLCBfcm91dGVzO1xuICAgICAgICB9LFxuICAgICAgICBsb2FkUm91dGU6IGZ1bmN0aW9uIChyb3V0ZSl7XG4gICAgICAgICAgICB0aGlzLl9yb3V0ZXMucHVzaCh0aGlzLl9tYXRjaGVyLmZvcm1hdFJvdXRlKHJvdXRlKSk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcbiIsInZhciBSZWFjdCA9IHpudWkuUmVhY3QgfHwgcmVxdWlyZSgncmVhY3QnKTtcbnZhciBlcnJvciA9IHJlcXVpcmUoJy4vZXJyb3IvaW5kZXguanMnKTtcbnZhciBaUlJvdXRlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRkaXNwbGF5TmFtZTonWlJSb3V0ZScsXG5cdF9faGFuZGxlcjogZnVuY3Rpb24gKCl7XG5cdFx0dmFyIF9yZXF1ZXN0ID0gdGhpcy5wcm9wcy5yZXF1ZXN0LFxuXHRcdFx0X21hdGNoZXIgPSBfcmVxdWVzdC5tYXRjaGVyLFxuXHRcdFx0X25ld1JlcXVlc3QgPSB7XG5cdFx0XHRcdHBhdGg6IF9yZXF1ZXN0LnBhdGgucmVwbGFjZSh0aGlzLnByb3BzLnJvdXRlLnBhdGgsICAnJyksXG5cdFx0XHRcdHNlYXJjaDogX3JlcXVlc3Quc2VhcmNoLFxuXHRcdFx0XHRldmVudDogX3JlcXVlc3QuZXZlbnQsXG5cdFx0XHRcdG1hdGNoZXI6IF9tYXRjaGVyXG5cdFx0XHR9LFxuXHRcdFx0X3JvdXRlcyA9IHRoaXMucHJvcHMucm91dGUuX19yb3V0ZXNfXyxcblx0XHRcdF9yb3V0ZSA9IG51bGwsXG5cdFx0XHRfY29tcG9uZW50ID0gbnVsbDtcbiAgICAgICAgaWYoIV9yb3V0ZXMpIHtcblx0XHRcdHZhciBfZlJvdXRlID0gX21hdGNoZXIuZ2V0Um91dGVzRnJvbVJvdXRlKHRoaXMucHJvcHMucm91dGUpO1xuXHRcdFx0X3JvdXRlcyA9IF9mUm91dGUucm91dGVzO1xuXHRcdFx0X2NvbXBvbmVudCA9IF9mUm91dGUuY29tcG9uZW50O1xuXHRcdH1cblx0XHRfcm91dGUgPSBfbWF0Y2hlci5nZXRSb3V0ZUZvclJlcXVlc3QoX25ld1JlcXVlc3QsIF9yb3V0ZXMpO1xuXG5cdFx0aWYoX3JvdXRlKSB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRDb21wb25lbnQ6IF9yb3V0ZS5jb21wb25lbnQgfHwgX2NvbXBvbmVudCxcblx0XHRcdFx0Q29tcG9uZW50UHJvcHM6IHpuLmV4dGVuZCh7fSwgX3JvdXRlLnByb3BzLCB7XG5cdFx0XHRcdFx0YXBwbGljYXRpb246IHRoaXMucHJvcHMuYXBwbGljYXRpb24sXG5cdFx0XHRcdFx0cGFyZW50OiB0aGlzLFxuXHRcdFx0XHRcdHBhcmVudFJlcXVlc3Q6IF9yZXF1ZXN0LFxuXHRcdFx0XHRcdHJvdXRlOiBfcm91dGUsXG5cdFx0XHRcdFx0cm91dGVyOiB0aGlzLnByb3BzLnJvdXRlcixcblx0XHRcdFx0XHRyZXF1ZXN0OiBfbmV3UmVxdWVzdFxuXHRcdFx0XHR9KVxuXHRcdFx0fVxuXHRcdH1lbHNle1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0Q29tcG9uZW50OiBlcnJvci5FcnJvcjQwNCxcblx0XHRcdFx0Q29tcG9uZW50UHJvcHM6IHtcblx0XHRcdFx0XHRhcHBsaWNhdGlvbjogdGhpcy5wcm9wcy5hcHBsaWNhdGlvbixcblx0XHRcdFx0XHRwYXJlbnQ6IHRoaXMsXG5cdFx0XHRcdFx0cGFyZW50UmVxdWVzdDogX3JlcXVlc3QsXG5cdFx0XHRcdFx0cm91dGVyOiB0aGlzLnByb3BzLnJvdXRlcixcblx0XHRcdFx0XHRyZXF1ZXN0OiBfbmV3UmVxdWVzdFxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdFxuXHR9LFxuXHRfX2dldENvbXBvbmVudDogZnVuY3Rpb24gKCl7XG5cdFx0cmV0dXJuIHRoaXMuX19oYW5kbGVyKCk7XG5cdH0sXG5cdHJlbmRlcjogZnVuY3Rpb24oKXtcblx0XHRpZih0aGlzLnByb3BzLnJlcXVlc3QgJiYgdGhpcy5wcm9wcy5yb3V0ZSAmJiB0aGlzLnByb3BzLnJvdXRlLnJvdXRlcykge1xuXHRcdFx0dmFyIF9Db21wb25lbnQgPSB0aGlzLl9fZ2V0Q29tcG9uZW50KCk7XG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT17em51aS5yZWFjdC5jbGFzc25hbWUoXCJ6ci1yb3V0ZVwiLCB0aGlzLnByb3BzLmNsYXNzTmFtZSl9IHN0eWxlPXt0aGlzLnByb3BzLnN0eWxlfSA+XG5cdFx0XHRcdFx0e19Db21wb25lbnQuQ29tcG9uZW50ICYmIDxfQ29tcG9uZW50LkNvbXBvbmVudCB7Li4uX0NvbXBvbmVudC5Db21wb25lbnRQcm9wc30gLz59XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0KTtcblx0XHR9ZWxzZXtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0fVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gWlJSb3V0ZTsiLCJtb2R1bGUuZXhwb3J0cyA9IHpuLkNsYXNzKHtcbiAgICBzdGF0aWM6IHRydWUsXG4gICAgbWV0aG9kczoge1xuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgIHRoaXMuZml4V2luZG93SGFzaENoYW5nZSgpO1xuICAgICAgICB9LFxuICAgICAgICBmaXhXaW5kb3dIYXNoQ2hhbmdlOiBmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgIC8vIExldCB0aGlzIHNuaXBwZXQgcnVuIGJlZm9yZSB5b3VyIGhhc2hjaGFuZ2UgZXZlbnQgYmluZGluZyBjb2RlXG4gICAgICAgICAgICBpZiAoIXdpbmRvdy5IYXNoQ2hhbmdlRXZlbnQpe1xuICAgICAgICAgICAgICAgIChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICB2YXIgbGFzdFVSTCA9IGRvY3VtZW50LlVSTDtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJoYXNoY2hhbmdlXCIsIGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShldmVudCwgXCJvbGRVUkxcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBsYXN0VVJMXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShldmVudCwgXCJuZXdVUkxcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkb2N1bWVudC5VUkxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFVSTCA9IGRvY3VtZW50LlVSTDtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn0pOyIsInZhciBSZWFjdCA9IHpudWkuUmVhY3QgfHwgcmVxdWlyZSgncmVhY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRkaXNwbGF5TmFtZTonRXJyb3I0MDQnLFxuXHRyZW5kZXI6IGZ1bmN0aW9uKCl7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPXt6bnVpLnJlYWN0LmNsYXNzbmFtZSgnenItcm91dGVyLWVycm9yLTQwNCcsIHRoaXMucHJvcHMuY2xhc3NOYW1lKX0gc3R5bGU9e3RoaXMucHJvcHMuc3R5bGV9ID5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJlcnJvci1oZWFkZXJcIj5cblx0XHRcdFx0XHQ8aDM+RVJST1I6IDQwNDwvaDM+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImVycm9yLWJvZHlcIj5cblx0XHRcdFx0XHRUaGUgcGF0aCA8c3BhbiBjbGFzc05hbWU9XCJwYXRoXCI+e3RoaXMucHJvcHMucmVxdWVzdC5wYXRofTwvc3Bhbj4gaXMgbm90IGZvdW5kLlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJlcnJvci1mb290ZXJcIj5cblx0XHRcdFx0XHRcblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59KTsiLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICAnRXJyb3I0MDQnOiByZXF1aXJlKCcuL0Vycm9yNDA0LmpzJylcbn07IiwicmVxdWlyZSgnLi9VdGlsLmpzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBIYXNoUm91dGVyOiByZXF1aXJlKCcuL0hhc2hSb3V0ZXIuanMnKSxcbiAgICBSb3V0ZTogcmVxdWlyZSgnLi9Sb3V0ZScpXG59OyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wiUmVhY3RcIl07IH0oKSk7Il0sInNvdXJjZVJvb3QiOiIifQ==
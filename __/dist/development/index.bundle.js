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

var React = znui.React || __webpack_require__(/*! react */ "react");

var HashHandler = __webpack_require__(/*! ./HashHandler */ "./HashHandler.js");

var error = __webpack_require__(/*! ./error/index.js */ "./error/index.js");

module.exports = React.createClass({
  displayName: 'ZRHashRouter',
  getInitialState: function getInitialState() {
    return {
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
    this.setState({
      Component: route.component,
      ComponentProps: zn.extend({}, route.props, {
        application: this.props.application,
        request: request,
        router: this,
        route: route
      })
    });
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
    return React.createElement("div", {
      className: znui.react.classname("zr-hash-router", this.props.className),
      style: this.props.style
    }, this.state.Component && React.createElement(this.state.Component, this.state.ComponentProps));
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
          zn.extend(_route, component);

          if (_route.extension !== false) {
            this.__initRoute(_route);
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
  events: ['request', 'notfound', 'pluginLoaded'],
  properties: {
    requests: null,
    routes: null,
    main: null
  },
  methods: {
    init: function init(argv, events) {
      this._requests = [];
      this._routes = [];
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
      var _plugin = plugin || {};

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

      var _routes = this._matcher.formatRoutes(_plugin.routes || []);

      _plugin.__routes__ = _routes;
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

      return React.createElement("div", {
        className: znui.react.classname("zr-route", this.props.className),
        style: this.props.style
      }, _Component.Component && React.createElement(_Component.Component, _Component.ComponentProps));
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
    return React.createElement("div", {
      className: znui.react.classname('zr-router-error-404', this.props.className),
      style: this.props.style
    }, React.createElement("div", {
      className: "error-header"
    }, React.createElement("h3", null, "ERROR: 404")), React.createElement("div", {
      className: "error-body"
    }, "The path ", React.createElement("span", {
      className: "path"
    }, this.props.request.path), " is not found."), React.createElement("div", {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vSGFzaEhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vSGFzaFJvdXRlci5qcyIsIndlYnBhY2s6Ly8vLi9QYXRoTWF0Y2hlci5qcyIsIndlYnBhY2s6Ly8vLi9SZXF1ZXN0SGFuZGxlci5qcyIsIndlYnBhY2s6Ly8vLi9Sb3V0ZS5qcyIsIndlYnBhY2s6Ly8vLi9VdGlsLmpzIiwid2VicGFjazovLy8uL2Vycm9yL0Vycm9yNDA0LmpzIiwid2VicGFjazovLy8uL2Vycm9yL2luZGV4LmpzIiwid2VicGFjazovLy8uL2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcIlJlYWN0XCIiXSwibmFtZXMiOlsiUmVxdWVzdEhhbmRsZXIiLCJyZXF1aXJlIiwibW9kdWxlIiwiZXhwb3J0cyIsInpuIiwiQ2xhc3MiLCJldmVudHMiLCJwcm9wZXJ0aWVzIiwibWV0aG9kcyIsImluaXQiLCJhcmd2IiwiX19pbml0RXZlbnRzIiwiY2FsbGVyIiwiY29uc3RydWN0b3IiLCJfc3VwZXJfIiwicHJvdG90eXBlIiwiX21haW4iLCJsZW5ndGgiLCJsb2NhdGlvbiIsImhhc2giLCJwb3AiLCJfX2hhc2hjaGFuZ2UiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiYmluZCIsImV2ZW50Iiwib24iLCJfcmV0dXJuIiwiZmlyZSIsIl9oYXNoIiwiX19wYXJzZUhhc2giLCJfcmVxdWVzdCIsImNyZWF0ZVJlcXVlc3QiLCJkb1JlcXVlc3QiLCJfc2VhcmNoIiwic2VhcmNoIiwiX2hhc2hTcGxpdEluZGV4IiwiaW5kZXhPZiIsInJlcGxhY2UiLCJzdWJzdHJpbmciLCJwYXRoIiwicXVlcnlzdHJpbmciLCJwYXJzZSIsIlJlYWN0Iiwiem51aSIsIkhhc2hIYW5kbGVyIiwiZXJyb3IiLCJjcmVhdGVDbGFzcyIsImRpc3BsYXlOYW1lIiwiZ2V0SW5pdGlhbFN0YXRlIiwiQ29tcG9uZW50IiwiQ29tcG9uZW50UHJvcHMiLCJjb21wb25lbnREaWRNb3VudCIsIl9faW5pdEhhbmRsZXIiLCJfaGFuZGxlciIsInByb3BzIiwiaGFzaGNoYW5nZSIsImhhbmRsZXIiLCJfX2hhbmRsZXIiLCJyZXF1ZXN0IiwiX19yZXF1ZXN0Iiwibm90Zm91bmQiLCJfX25vdGZvdW5kIiwicGx1Z2lubG9hZGVkIiwiX19wbHVnaW5Mb2FkZWQiLCJvbkluaXRIYW5kbGVyIiwic2VuZGVyIiwib25IYXNoQ2hhbmdlIiwiZGF0YSIsIm9uSGFuZGxlciIsInJvdXRlIiwic2V0U3RhdGUiLCJjb21wb25lbnQiLCJleHRlbmQiLCJhcHBsaWNhdGlvbiIsInJvdXRlciIsIm9uUmVxdWVzdCIsIm9uTm90Rm91bmQiLCJvblBsdWdpbkxvYWRlZCIsInB1c2giLCJmb3J3YXJkIiwiRXJyb3I0MDQiLCJyZW5kZXIiLCJyZWFjdCIsImNsYXNzbmFtZSIsImNsYXNzTmFtZSIsInN0eWxlIiwic3RhdGUiLCJwYXRoU2VwYXJhdG9yIiwicGF0aFBhcmFtZXRlclN5bWJvbCIsIl9wYXRoU2VwYXJhdG9yIiwiX3BhdGhQYXJhbWV0ZXJTeW1ib2wiLCJmb3JtYXRSb3V0ZSIsInBhcmVudCIsIl9fcGFyZW50X18iLCJwYXRocyIsIl9fcGFyc2VSb3V0ZVBhdGhzIiwiZXhhY3QiLCJmb3JtYXRSb3V0ZXMiLCJyb3V0ZXMiLCJ0eXBlIiwiX3JvdXRlcyIsIl9fbG9hZFBhdGhBbmRDb21wb25lbnQiLCJtYXAiLCJjYWxsIiwiZ2V0Um91dGVGb3JSZXF1ZXN0IiwiX3JvdXRlIiwiX2RhdGEiLCJpIiwiX2xlbiIsIl9fbWF0Y2hSb3V0ZUFuZFJlcXVlc3QiLCJwYXJhbXMiLCJnZXRSb3V0ZXNGcm9tUm91dGUiLCJfY29tcG9uZW50IiwicGx1Z2lucyIsIl9wbHVnaW5zIiwiX19sb2FkUGx1Z2lucyIsImNvbmNhdCIsIm1haW4iLCJfX2lzUmVhY3RDb21wb25lbnQiLCJpcyIsImlzUmVhY3RDb21wb25lbnQiLCJleHRlbnNpb24iLCJfX2luaXRSb3V0ZSIsIl9fcm91dGVzX18iLCJfcGx1Z2luIiwiX3BsdWdpbk1haW4iLCJmb3JFYWNoIiwicGx1Z2luIiwiX19sb2FkUGx1Z2luIiwiY29tcG9uZW50cyIsInRvU3RyaW5nIiwibmFtZXNwYWNlIiwiX3BhdGhzIiwiX3BhdGgiLCJfcGFyYW1zIiwiX3VybFVubWF0Y2hzIiwiX2hhc0NoZWNrZWQiLCJfdGVtcCIsIl90ZW1wcyIsInNwbGl0IiwiT2JqZWN0Iiwia2V5cyIsInVubWF0Y2hzIiwiaXNQYXJhbWV0ZXIiLCJrZXkiLCJ0ZXN0IiwiUGF0aE1hdGNoZXIiLCJyZXF1ZXN0cyIsIl9yZXF1ZXN0cyIsIl9tYXRjaGVyIiwicGx1Z2luTG9hZGVkIiwibG9hZFBsdWdpbnMiLCJsb2FkUm91dGVzIiwibWF0Y2hlciIsImxvYWRQbHVnaW4iLCJsb2FkUm91dGUiLCJaUlJvdXRlIiwiX25ld1JlcXVlc3QiLCJfZlJvdXRlIiwicGFyZW50UmVxdWVzdCIsIl9fZ2V0Q29tcG9uZW50IiwiX0NvbXBvbmVudCIsImZpeFdpbmRvd0hhc2hDaGFuZ2UiLCJIYXNoQ2hhbmdlRXZlbnQiLCJsYXN0VVJMIiwiZG9jdW1lbnQiLCJVUkwiLCJkZWZpbmVQcm9wZXJ0eSIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJ2YWx1ZSIsIkhhc2hSb3V0ZXIiLCJSb3V0ZSJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FB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SSxDQUFDRCxLQUFMLElBQWMxQyxtQkFBTyxDQUFDLG9CQUFELENBQWpDOztBQUNBQyxNQUFNLENBQUNDLE9BQVAsR0FBaUJ3QyxLQUFLLENBQUNJLFdBQU4sQ0FBa0I7QUFDbENDLGFBQVcsRUFBQyxVQURzQjtBQUVsQ2tDLFFBQU0sRUFBRSxrQkFBVTtBQUNqQixXQUNDO0FBQUssZUFBUyxFQUFFdEMsSUFBSSxDQUFDdUMsS0FBTCxDQUFXQyxTQUFYLENBQXFCLHFCQUFyQixFQUE0QyxLQUFLN0IsS0FBTCxDQUFXOEIsU0FBdkQsQ0FBaEI7QUFBbUYsV0FBSyxFQUFFLEtBQUs5QixLQUFMLENBQVcrQjtBQUFyRyxPQUNDO0FBQUssZUFBUyxFQUFDO0FBQWYsT0FDQyw2Q0FERCxDQURELEVBSUM7QUFBSyxlQUFTLEVBQUM7QUFBZixvQkFDVTtBQUFNLGVBQVMsRUFBQztBQUFoQixPQUF3QixLQUFLL0IsS0FBTCxDQUFXSSxPQUFYLENBQW1CbkIsSUFBM0MsQ0FEVixtQkFKRCxFQU9DO0FBQUssZUFBUyxFQUFDO0FBQWYsTUFQRCxDQUREO0FBYUE7QUFoQmlDLENBQWxCLENBQWpCLEM7Ozs7Ozs7Ozs7O0FDREF0QyxNQUFNLENBQUNDLE9BQVAsR0FBaUI7QUFDYixjQUFZRixtQkFBTyxDQUFDLDBDQUFEO0FBRE4sQ0FBakIsQzs7Ozs7Ozs7Ozs7QUNBQUEsbUJBQU8sQ0FBQyw0QkFBRCxDQUFQOztBQUNBQyxNQUFNLENBQUNDLE9BQVAsR0FBaUI7QUFDYnlLLFlBQVUsRUFBRTNLLG1CQUFPLENBQUMsd0NBQUQsQ0FETjtBQUViNEssT0FBSyxFQUFFNUssbUJBQU8sQ0FBQywyQkFBRDtBQUZELENBQWpCLEM7Ozs7Ozs7Ozs7O0FDREEsYUFBYSxnQ0FBZ0MsRUFBRSxJIiwiZmlsZSI6Ii4vZGlzdC9kZXZlbG9wbWVudC9pbmRleC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2luZGV4LmpzXCIpO1xuIiwidmFyIFJlcXVlc3RIYW5kbGVyID0gcmVxdWlyZSgnLi9SZXF1ZXN0SGFuZGxlcicpO1xubW9kdWxlLmV4cG9ydHMgPSB6bi5DbGFzcyhSZXF1ZXN0SGFuZGxlciwge1xuICAgIGV2ZW50czogWydoYXNoY2hhbmdlJywgJ2hhbmRsZXInXSxcbiAgICBwcm9wZXJ0aWVzOiB7IH0sXG4gICAgbWV0aG9kczoge1xuICAgICAgICBpbml0OiBmdW5jdGlvbiAoYXJndiwgZXZlbnRzKXtcbiAgICAgICAgICAgIHRoaXMuX19pbml0RXZlbnRzKGV2ZW50cyk7XG4gICAgICAgICAgICBpZih0aGlzLnN1cGVyLmNhbGxlcikge1xuICAgICAgICAgICAgICAgIHRoaXMuc3VwZXIoYXJndik7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnN0cnVjdG9yLl9zdXBlcl8ucHJvdG90eXBlLmluaXQoYXJndiwgZXZlbnRzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYodGhpcy5fbWFpbi5sZW5ndGggJiYgIWxvY2F0aW9uLmhhc2gpe1xuICAgICAgICAgICAgICAgIGxvY2F0aW9uLmhhc2ggPSB0aGlzLl9tYWluLnBvcCgpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdGhpcy5fX2hhc2hjaGFuZ2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgdGhpcy5fX2hhc2hjaGFuZ2UuYmluZCh0aGlzKSwgZmFsc2UpO1xuICAgICAgICB9LFxuICAgICAgICBfX2luaXRFdmVudHM6IGZ1bmN0aW9uIChldmVudHMpe1xuICAgICAgICAgICAgaWYoZXZlbnRzICYmIHR5cGVvZiBldmVudHMgPT0gJ29iamVjdCcpe1xuICAgICAgICAgICAgICAgIGZvcih2YXIgZXZlbnQgaW4gZXZlbnRzKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbihldmVudCwgZXZlbnRzW2V2ZW50XSwgdGhpcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBfX2hhc2hjaGFuZ2U6IGZ1bmN0aW9uIChldmVudCl7XG4gICAgICAgICAgICB2YXIgX3JldHVybiA9IHRoaXMuZmlyZSgnaGFzaGNoYW5nZScsIGV2ZW50KTtcbiAgICAgICAgICAgIGlmKF9yZXR1cm4gPT09IGZhbHNlKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB2YXIgX2hhc2ggPSB0aGlzLl9fcGFyc2VIYXNoKCksXG4gICAgICAgICAgICAgICAgX3JlcXVlc3QgPSB0aGlzLmNyZWF0ZVJlcXVlc3QoX2hhc2gsIGV2ZW50KTtcblxuICAgICAgICAgICAgX3JldHVybiA9IHRoaXMuZmlyZSgnaGFuZGxlcicsIGV2ZW50LCBfaGFzaCk7XG4gICAgICAgICAgICBpZihfcmV0dXJuID09PSBmYWxzZSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgICB0aGlzLmRvUmVxdWVzdChfcmVxdWVzdCk7XG4gICAgICAgIH0sXG4gICAgICAgIF9fcGFyc2VIYXNoOiBmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgIHZhciBfaGFzaCA9IGxvY2F0aW9uLmhhc2gsXG4gICAgICAgICAgICAgICAgX3NlYXJjaCA9IGxvY2F0aW9uLnNlYXJjaCxcbiAgICAgICAgICAgICAgICBfaGFzaFNwbGl0SW5kZXggPSBfaGFzaC5pbmRleE9mKCc/Jyk7XG4gICAgICAgICAgICBpZihfc2VhcmNoICYmIF9zZWFyY2guaW5kZXhPZignPycpIT09LTEpe1xuICAgICAgICAgICAgICAgIF9zZWFyY2ggPSBfc2VhcmNoLnJlcGxhY2UoJz8nLCAnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihfaGFzaFNwbGl0SW5kZXggIT09IC0xKXtcbiAgICAgICAgICAgICAgICBfc2VhcmNoID0gX3NlYXJjaCArICcmJysgX2hhc2guc3Vic3RyaW5nKF9oYXNoU3BsaXRJbmRleCArIDEpO1xuICAgICAgICAgICAgICAgIF9oYXNoID0gX2hhc2guc3Vic3RyaW5nKDAsIF9oYXNoU3BsaXRJbmRleCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcGF0aDogX2hhc2guc3Vic3RyaW5nKDEpLFxuICAgICAgICAgICAgICAgIHNlYXJjaDogem4ucXVlcnlzdHJpbmcucGFyc2UoX3NlYXJjaClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn0pO1xuIiwidmFyIFJlYWN0ID0gem51aS5SZWFjdCB8fCByZXF1aXJlKCdyZWFjdCcpO1xudmFyIEhhc2hIYW5kbGVyID0gcmVxdWlyZSgnLi9IYXNoSGFuZGxlcicpO1xudmFyIGVycm9yID0gcmVxdWlyZSgnLi9lcnJvci9pbmRleC5qcycpO1xubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdGRpc3BsYXlOYW1lOidaUkhhc2hSb3V0ZXInLFxuXHRnZXRJbml0aWFsU3RhdGU6ZnVuY3Rpb24oKXtcblx0XHRyZXR1cm4ge1xuXHRcdFx0Q29tcG9uZW50OiBudWxsLFxuXHRcdFx0Q29tcG9uZW50UHJvcHM6IG51bGxcblx0XHR9XG5cdH0sXG5cdGNvbXBvbmVudERpZE1vdW50OmZ1bmN0aW9uKCl7XG5cdFx0dGhpcy5fX2luaXRIYW5kbGVyKCk7XG5cdH0sXG5cdF9faW5pdEhhbmRsZXI6IGZ1bmN0aW9uICgpe1xuXHRcdHRoaXMuX2hhbmRsZXIgPSBuZXcgSGFzaEhhbmRsZXIodGhpcy5wcm9wcywge1xuXHRcdFx0aGFzaGNoYW5nZTogdGhpcy5fX2hhc2hjaGFuZ2UsXG5cdFx0XHRoYW5kbGVyOiB0aGlzLl9faGFuZGxlcixcblx0XHRcdHJlcXVlc3Q6IHRoaXMuX19yZXF1ZXN0LFxuXHRcdFx0bm90Zm91bmQ6IHRoaXMuX19ub3Rmb3VuZCxcblx0XHRcdHBsdWdpbmxvYWRlZDogdGhpcy5fX3BsdWdpbkxvYWRlZFxuXHRcdH0pO1xuXHRcdHRoaXMucHJvcHMub25Jbml0SGFuZGxlciAmJiB0aGlzLnByb3BzLm9uSW5pdEhhbmRsZXIodGhpcy5faGFuZGxlciwgdGhpcyk7XG5cdH0sXG5cdF9faGFzaGNoYW5nZTogZnVuY3Rpb24gKHNlbmRlciwgZXZlbnQpe1xuXHRcdHRoaXMucHJvcHMub25IYXNoQ2hhbmdlICYmIHRoaXMucHJvcHMub25IYXNoQ2hhbmdlKGV2ZW50LCB0aGlzKTtcblx0fSxcblx0X19oYW5kbGVyOiBmdW5jdGlvbiAoc2VuZGVyLCBldmVudCwgZGF0YSl7XG5cdFx0dGhpcy5wcm9wcy5vbkhhbmRsZXIgJiYgdGhpcy5wcm9wcy5vbkhhbmRsZXIoZXZlbnQsIGRhdGEsIHRoaXMpO1xuXHR9LFxuXHRfX3JlcXVlc3Q6IGZ1bmN0aW9uIChzZW5kZXIsIHJlcXVlc3QsIHJvdXRlKXtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdENvbXBvbmVudDogcm91dGUuY29tcG9uZW50LFxuXHRcdFx0Q29tcG9uZW50UHJvcHM6IHpuLmV4dGVuZCh7fSwgcm91dGUucHJvcHMsIHtcblx0XHRcdFx0YXBwbGljYXRpb246IHRoaXMucHJvcHMuYXBwbGljYXRpb24sXG5cdFx0XHRcdHJlcXVlc3Q6IHJlcXVlc3QsXG5cdFx0XHRcdHJvdXRlcjogdGhpcyxcblx0XHRcdFx0cm91dGU6IHJvdXRlXG5cdFx0XHR9KVxuXHRcdH0pO1xuXHRcdHRoaXMucHJvcHMub25SZXF1ZXN0ICYmIHRoaXMucHJvcHMub25SZXF1ZXN0KHJlcXVlc3QsIHJvdXRlLCB0aGlzKTtcblx0fSxcblx0X19ub3Rmb3VuZDogZnVuY3Rpb24gKHNlbmRlciwgcmVxdWVzdCl7XG5cdFx0dGhpcy5ub3Rmb3VuZChyZXF1ZXN0KTtcblx0XHR0aGlzLnByb3BzLm9uTm90Rm91bmQgJiYgdGhpcy5wcm9wcy5vbk5vdEZvdW5kKHJlcXVlc3QsIHRoaXMpO1xuXHR9LFxuXHRfX3BsdWdpbkxvYWRlZDogZnVuY3Rpb24gKHNlbmRlciwgZGF0YSl7XG5cdFx0dGhpcy5wcm9wcy5vblBsdWdpbkxvYWRlZCAmJiB0aGlzLnByb3BzLm9uUGx1Z2luTG9hZGVkKGRhdGEsIHRoaXMpO1xuXHR9LFxuXHRwdXNoOiBmdW5jdGlvbiAoKXtcblxuXHR9LFxuXHRmb3J3YXJkOiBmdW5jdGlvbiAoKXtcblxuXHR9LFxuXHRub3Rmb3VuZDogZnVuY3Rpb24gKHJlcXVlc3Qpe1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0Q29tcG9uZW50OiBlcnJvci5FcnJvcjQwNCxcblx0XHRcdENvbXBvbmVudFByb3BzOiB7XG5cdFx0XHRcdHJlcXVlc3Q6IHJlcXVlc3Rcblx0XHRcdH1cblx0XHR9KTtcblx0fSxcblx0cmVuZGVyOiBmdW5jdGlvbigpe1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT17em51aS5yZWFjdC5jbGFzc25hbWUoXCJ6ci1oYXNoLXJvdXRlclwiLCB0aGlzLnByb3BzLmNsYXNzTmFtZSl9IHN0eWxlPXt0aGlzLnByb3BzLnN0eWxlfSA+XG5cdFx0XHRcdHt0aGlzLnN0YXRlLkNvbXBvbmVudCAmJiA8dGhpcy5zdGF0ZS5Db21wb25lbnQgey4uLnRoaXMuc3RhdGUuQ29tcG9uZW50UHJvcHN9IC8+fVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufSk7IiwibW9kdWxlLmV4cG9ydHMgPSB6bi5DbGFzcyh7XG4gICAgZXZlbnRzOiBbJ3BsdWdpbkxvYWRpbmcnLCAncGx1Z2luTG9hZGVkJywgJ3JvdXRlTG9hZGluZycsICdyb3V0ZUxvYWRlZCddLFxuICAgIHByb3BlcnRpZXM6eyBcbiAgICAgICAgcGF0aFNlcGFyYXRvcjogbnVsbCxcbiAgICAgICAgcGF0aFBhcmFtZXRlclN5bWJvbDogbnVsbFxuICAgIH0sXG4gICAgbWV0aG9kczoge1xuICAgICAgICBpbml0OiBmdW5jdGlvbiAoYXJndiwgZXZlbnRzKXtcbiAgICAgICAgICAgIHRoaXMuX19pbml0RXZlbnRzKGV2ZW50cyk7XG4gICAgICAgICAgICB0aGlzLl9wYXRoU2VwYXJhdG9yID0gYXJndi5wYXRoU2VwYXJhdG9yIHx8ICcvJztcbiAgICAgICAgICAgIHRoaXMuX3BhdGhQYXJhbWV0ZXJTeW1ib2wgPSBhcmd2LnBhdGhQYXJhbWV0ZXJTeW1ib2wgfHwgJzonO1xuICAgICAgICB9LFxuICAgICAgICBfX2luaXRFdmVudHM6IGZ1bmN0aW9uIChldmVudHMpe1xuICAgICAgICAgICAgaWYoZXZlbnRzICYmIHR5cGVvZiBldmVudHMgPT0gJ29iamVjdCcpe1xuICAgICAgICAgICAgICAgIGZvcih2YXIgZXZlbnQgaW4gZXZlbnRzKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbihldmVudCwgZXZlbnRzW2V2ZW50XSwgdGhpcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBmb3JtYXRSb3V0ZTogZnVuY3Rpb24gKHJvdXRlLCBwYXJlbnQpe1xuICAgICAgICAgICAgdmFyIF9yZXR1cm4gPSB0aGlzLmZpcmUoJ3JvdXRlTG9hZGluZycsIHJvdXRlLCBwYXJlbnQpO1xuICAgICAgICAgICAgaWYoX3JldHVybiA9PT0gZmFsc2Upe1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYocGFyZW50KXtcbiAgICAgICAgICAgICAgICByb3V0ZS5fX3BhcmVudF9fID0gcGFyZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcm91dGUucGF0aHMgPSB0aGlzLl9fcGFyc2VSb3V0ZVBhdGhzKHJvdXRlLnBhdGgpO1xuICAgICAgICAgICAgcm91dGUucHJvcHMgPSB6bi5leHRlbmQoe30sIHJvdXRlLnByb3BzKTtcbiAgICAgICAgICAgIGlmKHJvdXRlLmV4YWN0ID09IG51bGwgJiYgcm91dGUucGF0aC5pbmRleE9mKHRoaXMuX3BhdGhQYXJhbWV0ZXJTeW1ib2wpID09PSAtMSkgeyByb3V0ZS5leGFjdCA9IHRydWU7IH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlyZSgncm91dGVMb2FkZWQnLCByb3V0ZSksIHJvdXRlO1xuICAgICAgICB9LFxuICAgICAgICBmb3JtYXRSb3V0ZXM6IGZ1bmN0aW9uIChyb3V0ZXMsIHBhcmVudCl7XG4gICAgICAgICAgICBzd2l0Y2goem4udHlwZShyb3V0ZXMpKXtcbiAgICAgICAgICAgICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICAgICAgICAgICAgICB2YXIgX3JvdXRlcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBmb3IodmFyIHBhdGggaW4gcm91dGVzKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9yb3V0ZXMucHVzaCh0aGlzLl9fbG9hZFBhdGhBbmRDb21wb25lbnQocGF0aCwgcm91dGVzW3BhdGhdLCBwYXJlbnQpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3JvdXRlcztcbiAgICAgICAgICAgICAgICBjYXNlICdhcnJheSc6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByb3V0ZXMubWFwKChyb3V0ZSk9PnRoaXMuZm9ybWF0Um91dGUocm91dGUsIHBhcmVudCkpO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2Z1bmN0aW9uJzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZm9ybWF0Um91dGVzKHJvdXRlcy5jYWxsKG51bGwsIHBhcmVudCwgdGhpcyksIHBhcmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGdldFJvdXRlRm9yUmVxdWVzdDogZnVuY3Rpb24gKHJlcXVlc3QsIHJvdXRlcyl7XG4gICAgICAgICAgICB2YXIgX3JvdXRlcyA9IHJvdXRlcyxcbiAgICAgICAgICAgICAgICBfcm91dGUgPSBudWxsLFxuICAgICAgICAgICAgICAgIF9kYXRhID0gbnVsbDtcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDAsIF9sZW4gPSBfcm91dGVzLmxlbmd0aDsgaSA8IF9sZW47IGkrKyl7XG4gICAgICAgICAgICAgICAgX3JvdXRlID0gX3JvdXRlc1tpXTtcbiAgICAgICAgICAgICAgICBfZGF0YSA9IHRoaXMuX19tYXRjaFJvdXRlQW5kUmVxdWVzdChfcm91dGUsIHJlcXVlc3QpO1xuICAgICAgICAgICAgICAgIGlmKF9kYXRhKXtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZighX2RhdGEgfHwgIV9yb3V0ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3QucGFyYW1zID0gX2RhdGEsIF9yb3V0ZTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0Um91dGVzRnJvbVJvdXRlOiBmdW5jdGlvbiAocm91dGUpe1xuICAgICAgICAgICAgdmFyIF9yb3V0ZXMgPSBbXSxcbiAgICAgICAgICAgICAgICBfY29tcG9uZW50ID0gcm91dGUuY29tcG9uZW50O1xuICAgICAgICAgICAgaWYocm91dGUucm91dGVzKSB7XG4gICAgICAgICAgICAgICAgX3JvdXRlcyA9IHRoaXMuZm9ybWF0Um91dGVzKHJvdXRlLnJvdXRlcywgcm91dGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZihyb3V0ZS5wbHVnaW5zKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9wbHVnaW5zID0gdGhpcy5fX2xvYWRQbHVnaW5zKHJvdXRlLnBsdWdpbnMsIHJvdXRlKTtcbiAgICAgICAgICAgICAgICBfcm91dGVzID0gX3JvdXRlcy5jb25jYXQoX3BsdWdpbnMucm91dGVzKTtcbiAgICAgICAgICAgICAgICBpZighX2NvbXBvbmVudCAmJiBfcGx1Z2lucy5tYWluLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBfY29tcG9uZW50ID0gX3BsdWdpbnMubWFpbi5wb3AoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcm91dGVzOiBfcm91dGVzLFxuICAgICAgICAgICAgICAgIGNvbXBvbmVudDogX2NvbXBvbmVudFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgICAgX19pc1JlYWN0Q29tcG9uZW50OiBmdW5jdGlvbiAoY29tcG9uZW50KXtcbiAgICAgICAgICAgIGlmKGNvbXBvbmVudCAmJiB6bi5pcyhjb21wb25lbnQsICdmdW5jdGlvbicpICYmIChjb21wb25lbnQucHJvdG90eXBlLnJlbmRlciB8fCBjb21wb25lbnQuZGlzcGxheU5hbWUgfHwgY29tcG9uZW50LnByb3RvdHlwZS5pc1JlYWN0Q29tcG9uZW50ICkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9LFxuICAgICAgICBfX2xvYWRQYXRoQW5kQ29tcG9uZW50OiBmdW5jdGlvbiAocGF0aCwgY29tcG9uZW50LCBwYXJlbnQpe1xuICAgICAgICAgICAgdmFyIF9yb3V0ZSA9IHsgcGF0aDogcGF0aCB9O1xuICAgICAgICAgICAgc3dpdGNoKHpuLnR5cGUoY29tcG9uZW50KSl7XG4gICAgICAgICAgICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgICAgICAgICAgICAgX3JvdXRlLmNvbXBvbmVudCA9IHpuLnBhdGgod2luZG93LCBjb21wb25lbnQpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdmdW5jdGlvbic6XG4gICAgICAgICAgICAgICAgICAgIGlmKCF0aGlzLl9faXNSZWFjdENvbXBvbmVudChjb21wb25lbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfcm91dGUuY29tcG9uZW50ID0gY29tcG9uZW50LmNhbGwodGhpcywgcGF0aCwgdGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgX3JvdXRlLmNvbXBvbmVudCA9IGNvbXBvbmVudDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICAgICAgICAgICAgICB6bi5leHRlbmQoX3JvdXRlLCBjb21wb25lbnQpO1xuICAgICAgICAgICAgICAgICAgICBpZihfcm91dGUuZXh0ZW5zaW9uICE9PSBmYWxzZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9faW5pdFJvdXRlKF9yb3V0ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZvcm1hdFJvdXRlKF9yb3V0ZSwgcGFyZW50KTtcbiAgICAgICAgfSxcbiAgICAgICAgX19pbml0Um91dGU6IGZ1bmN0aW9uIChyb3V0ZSl7XG4gICAgICAgICAgICBpZihyb3V0ZS5yb3V0ZXMpIHtcbiAgICAgICAgICAgICAgICByb3V0ZS5fX3JvdXRlc19fID0gdGhpcy5mb3JtYXRSb3V0ZXMocm91dGUucm91dGVzLCByb3V0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKHJvdXRlLnBsdWdpbnMpIHtcbiAgICAgICAgICAgICAgICB2YXIgX3BsdWdpbnMgPSB0aGlzLl9fbG9hZFBsdWdpbnMocm91dGUucGx1Z2lucywgcm91dGUpO1xuICAgICAgICAgICAgICAgIGlmKHJvdXRlLl9fcm91dGVzX18pIHtcbiAgICAgICAgICAgICAgICAgICAgcm91dGUuX19yb3V0ZXNfXyA9IHJvdXRlLl9fcm91dGVzX18uY29uY2F0KF9wbHVnaW5zLnJvdXRlcyk7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHJvdXRlLl9fcm91dGVzX18gPSBfcGx1Z2lucy5yb3V0ZXM7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcm91dGUubWFpbiA9IF9wbHVnaW5zLm1haW47XG4gICAgICAgICAgICAgICAgaWYoIXJvdXRlLmNvbXBvbmVudCAmJiBfcGx1Z2lucy5tYWluLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICByb3V0ZS5jb21wb25lbnQgPSBfcGx1Z2lucy5tYWluLnBvcCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHJvdXRlO1xuICAgICAgICB9LFxuICAgICAgICBfX2xvYWRQbHVnaW5zOiBmdW5jdGlvbiAocGx1Z2lucywgcGFyZW50KXtcbiAgICAgICAgICAgIHZhciBfcGx1Z2lucyA9IHBsdWdpbnMgfHwgW10sXG4gICAgICAgICAgICAgICAgX3BsdWdpbiA9IG51bGwsXG4gICAgICAgICAgICAgICAgX3JvdXRlcyA9IFtdLFxuICAgICAgICAgICAgICAgIF9tYWluID0gW10sXG4gICAgICAgICAgICAgICAgX3BsdWdpbk1haW4gPSBudWxsO1xuICAgICAgICAgICAgc3dpdGNoKHpuLnR5cGUocGx1Z2lucykpe1xuICAgICAgICAgICAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgICAgICAgICAgICAgIF9wbHVnaW5zID0gW3BsdWdpbnNdO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdmdW5jdGlvbic6XG4gICAgICAgICAgICAgICAgICAgIF9wbHVnaW5zID0gcGx1Z2lucyh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihfcGx1Z2lucyAmJiBfcGx1Z2lucy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBwbHVnaW5zLmZvckVhY2goZnVuY3Rpb24gKHBsdWdpbil7XG4gICAgICAgICAgICAgICAgICAgIF9wbHVnaW4gPSB0aGlzLl9fbG9hZFBsdWdpbihwbHVnaW4sIHBhcmVudCk7XG4gICAgICAgICAgICAgICAgICAgIGlmKF9wbHVnaW4pe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoX3BsdWdpbi5fX3JvdXRlc19fKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3JvdXRlcyA9IF9yb3V0ZXMuY29uY2F0KF9wbHVnaW4uX19yb3V0ZXNfXyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihfcGx1Z2luLm1haW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcGx1Z2luTWFpbiA9IF9wbHVnaW4ubWFpbjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2goem4udHlwZShfbWFpbikpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3BsdWdpbk1haW4gPSBfcGx1Z2luLnJvdXRlc1tfcGx1Z2luTWFpbl0gfHwgem4ucGF0aChfcGx1Z2luLmNvbXBvbmVudHMsIF9wbHVnaW5NYWluKSB8fCB6bi5wYXRoKHdpbmRvdywgX3BsdWdpbk1haW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2Z1bmN0aW9uJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKF9wbHVnaW5NYWluLmNvbnN0cnVjdG9yLnRvU3RyaW5nKCkgPT0gXCJmdW5jdGlvbiBGdW5jdGlvbigpIHsgW25hdGl2ZSBjb2RlXSB9XCIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9wbHVnaW5NYWluID0gX3BsdWdpbk1haW4odGhpcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdCA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX21haW4ucHVzaChfcGx1Z2luTWFpbik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByb3V0ZXM6IF9yb3V0ZXMsXG4gICAgICAgICAgICAgICAgbWFpbjogX21haW5cbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgIF9fbG9hZFBsdWdpbjogZnVuY3Rpb24gKHBsdWdpbiwgcGFyZW50KXtcbiAgICAgICAgICAgIHZhciBfcGx1Z2luID0gcGx1Z2luIHx8IHt9LFxuICAgICAgICAgICAgICAgIF9yZXR1cm4gPSB0aGlzLmZpcmUoJ3BsdWdpbkxvYWRpbmcnLCBwbHVnaW4sIHBhcmVudCk7XG4gICAgICAgICAgICBpZihfcmV0dXJuID09PSBmYWxzZSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzd2l0Y2goem4udHlwZShwbHVnaW4pKXtcbiAgICAgICAgICAgICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICAgICAgICAgICAgICBfcGx1Z2luID0gX3BsdWdpbjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZnVuY3Rpb24nOlxuICAgICAgICAgICAgICAgICAgICBfcGx1Z2luID0gX3BsdWdpbih0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihfcGx1Z2luLm5hbWVzcGFjZSAmJiBfcGx1Z2luLmNvbXBvbmVudHMpIHtcbiAgICAgICAgICAgICAgICB6bi5wYXRoKHdpbmRvdywgX3BsdWdpbi5uYW1lc3BhY2UsIF9wbHVnaW4uY29tcG9uZW50cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfcGx1Z2luLl9fcm91dGVzX18gPSB0aGlzLmZvcm1hdFJvdXRlcyhfcGx1Z2luLnJvdXRlc3x8W10sIHBhcmVudCk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZpcmUoJ3BsdWdpbkxvYWRlZCcsIF9wbHVnaW4pLCBfcGx1Z2luO1xuICAgICAgICB9LFxuICAgICAgICBfX21hdGNoUm91dGVBbmRSZXF1ZXN0OiBmdW5jdGlvbiAocm91dGUsIHJlcXVlc3Qpe1xuICAgICAgICAgICAgdmFyIF9wYXRocyA9IHJvdXRlLnBhdGhzLFxuICAgICAgICAgICAgICAgIF9wYXRoID0gbnVsbCxcbiAgICAgICAgICAgICAgICBfcGFyYW1zID0ge30sXG4gICAgICAgICAgICAgICAgX3VybFVubWF0Y2hzID0gW10sXG4gICAgICAgICAgICAgICAgX2hhc0NoZWNrZWQgPSBmYWxzZSxcbiAgICAgICAgICAgICAgICBfdGVtcCA9IG51bGwsXG4gICAgICAgICAgICAgICAgX3RlbXBzID0gcmVxdWVzdC5wYXRoLnNwbGl0KHRoaXMuX3BhdGhTZXBhcmF0b3IpO1xuXG4gICAgICAgICAgICBpZihyb3V0ZS5yb3V0ZXMgJiYgT2JqZWN0LmtleXMocm91dGUucm91dGVzKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBpZihyb3V0ZS5leGFjdCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJvdXRlLmV4YWN0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihyb3V0ZS5leGFjdCkge1xuICAgICAgICAgICAgICAgIGlmKHJvdXRlLnBhdGggPT09IHJlcXVlc3QucGF0aCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVxdWVzdC51bm1hdGNocyA9IF91cmxVbm1hdGNocywgX3BhcmFtczsgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKF90ZW1wcy5sZW5ndGggIT09IF9wYXRocy5sZW5ndGgpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwLCBfbGVuID0gX3RlbXBzLmxlbmd0aDsgaSA8IF9sZW47IGkrKykge1xuICAgICAgICAgICAgICAgIF90ZW1wID0gX3RlbXBzW2ldO1xuICAgICAgICAgICAgICAgIGlmKCFfdGVtcCkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgX3BhdGggPSBfcGF0aHNbaV07XG4gICAgICAgICAgICAgICAgX2hhc0NoZWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGlmKCFfcGF0aCl7XG4gICAgICAgICAgICAgICAgICAgIF91cmxVbm1hdGNocy5wdXNoKF90ZW1wKTtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKCFfcGF0aC5pc1BhcmFtZXRlciAmJiBfdGVtcCAhPT0gX3BhdGgua2V5KXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKF9wYXRoLmlzUGFyYW1ldGVyKXtcbiAgICAgICAgICAgICAgICAgICAgX3BhcmFtc1tfcGF0aC5rZXldID0gX3RlbXA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoIV9oYXNDaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcmVxdWVzdC51bm1hdGNocyA9IF91cmxVbm1hdGNocywgX3BhcmFtcztcbiAgICAgICAgfSxcbiAgICAgICAgX19wYXJzZVJvdXRlUGF0aHM6IGZ1bmN0aW9uIChwYXRoKXtcbiAgICAgICAgICAgIHZhciBfcGF0aHMgPSBbXSxcbiAgICAgICAgICAgICAgICBfdGVtcCA9IG51bGwsXG4gICAgICAgICAgICAgICAgX3RlbXBzID0gcGF0aC5zcGxpdCh0aGlzLl9wYXRoU2VwYXJhdG9yKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZm9yKHZhciBpID0gMCwgX2xlbiA9IF90ZW1wcy5sZW5ndGg7IGkgPCBfbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBfdGVtcCA9IF90ZW1wc1tpXTtcbiAgICAgICAgICAgICAgICBpZighX3RlbXApIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICgvXjpcXHdbXFx3XFxkXSokLy50ZXN0KF90ZW1wKSkge1xuICAgICAgICAgICAgICAgICAgICBfdGVtcCA9IF90ZW1wLnJlcGxhY2UoL146LywgJycpO1xuICAgICAgICAgICAgICAgICAgICBfcGF0aHNbaV0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IF90ZW1wLFxuICAgICAgICAgICAgICAgICAgICAgICAgaXNQYXJhbWV0ZXI6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgX3BhdGhzW2ldID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBfdGVtcFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIF9wYXRocztcbiAgICAgICAgfVxuICAgIH1cbn0pOyIsInZhciBQYXRoTWF0Y2hlciA9IHJlcXVpcmUoJy4vUGF0aE1hdGNoZXInKTtcbm1vZHVsZS5leHBvcnRzID0gem4uQ2xhc3Moe1xuICAgIGV2ZW50czogWydyZXF1ZXN0JywgJ25vdGZvdW5kJywgJ3BsdWdpbkxvYWRlZCddLFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgcmVxdWVzdHM6IG51bGwsXG4gICAgICAgIHJvdXRlczogbnVsbCxcbiAgICAgICAgbWFpbjogbnVsbFxuICAgIH0sXG4gICAgbWV0aG9kczoge1xuICAgICAgICBpbml0OiBmdW5jdGlvbiAoYXJndiwgZXZlbnRzKXtcbiAgICAgICAgICAgIHRoaXMuX3JlcXVlc3RzID0gW107XG4gICAgICAgICAgICB0aGlzLl9yb3V0ZXMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX21haW4gPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX21hdGNoZXIgPSBuZXcgUGF0aE1hdGNoZXIoYXJndiwge1xuICAgICAgICAgICAgICAgIHBsdWdpbkxvYWRlZDogZnVuY3Rpb24gKHNlbmRlciwgcGx1Z2luKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlyZSgncGx1Z2luTG9hZGVkJywgcGx1Z2luKTtcbiAgICAgICAgICAgICAgICB9LmJpbmQodGhpcylcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5fX2luaXRFdmVudHMoZXZlbnRzKTtcbiAgICAgICAgICAgIHRoaXMubG9hZFBsdWdpbnMoYXJndi5wbHVnaW5zKTtcbiAgICAgICAgICAgIHRoaXMubG9hZFJvdXRlcyhhcmd2LnJvdXRlcyk7XG4gICAgICAgICAgICBpZihhcmd2Lm1haW4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9tYWluLnB1c2goYXJndi5tYWluKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgX19pbml0RXZlbnRzOiBmdW5jdGlvbiAoZXZlbnRzKXtcbiAgICAgICAgICAgIGlmKGV2ZW50cyAmJiB0eXBlb2YgZXZlbnRzID09ICdvYmplY3QnKXtcbiAgICAgICAgICAgICAgICBmb3IodmFyIGV2ZW50IGluIGV2ZW50cyl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub24oZXZlbnQsIGV2ZW50c1tldmVudF0sIHRoaXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY3JlYXRlUmVxdWVzdDogZnVuY3Rpb24gKHJlcXVlc3QsIGV2ZW50KXtcbiAgICAgICAgICAgIHJlcXVlc3QuZXZlbnQgPSBldmVudDtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0cy5wdXNoKHJlcXVlc3QpLCByZXF1ZXN0O1xuICAgICAgICB9LFxuICAgICAgICBkb1JlcXVlc3Q6IGZ1bmN0aW9uIChyZXF1ZXN0KXtcbiAgICAgICAgICAgIHZhciBfcm91dGUgPSB0aGlzLl9tYXRjaGVyLmdldFJvdXRlRm9yUmVxdWVzdChyZXF1ZXN0LCB0aGlzLl9yb3V0ZXMpO1xuICAgICAgICAgICAgcmVxdWVzdC5tYXRjaGVyID0gdGhpcy5fbWF0Y2hlcjtcbiAgICAgICAgICAgIGlmKF9yb3V0ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZmlyZSgncmVxdWVzdCcsIHJlcXVlc3QsIF9yb3V0ZSk7XG4gICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maXJlKCdub3Rmb3VuZCcsIHJlcXVlc3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBsb2FkUGx1Z2luczogZnVuY3Rpb24gKHBsdWdpbnMpe1xuICAgICAgICAgICAgdmFyIF9wbHVnaW5zID0gcGx1Z2lucyB8fCBbXTtcbiAgICAgICAgICAgIHN3aXRjaCh6bi50eXBlKHBsdWdpbnMpKXtcbiAgICAgICAgICAgICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICAgICAgICAgICAgICBfcGx1Z2lucyA9IFtwbHVnaW5zXTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZnVuY3Rpb24nOlxuICAgICAgICAgICAgICAgICAgICBfcGx1Z2lucyA9IHBsdWdpbnModGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoX3BsdWdpbnMgJiYgX3BsdWdpbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcGx1Z2lucy5mb3JFYWNoKGZ1bmN0aW9uIChwbHVnaW4pe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRQbHVnaW4ocGx1Z2luKTtcbiAgICAgICAgICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG4gICAgICAgIGxvYWRQbHVnaW46IGZ1bmN0aW9uIChwbHVnaW4pe1xuICAgICAgICAgICAgdmFyIF9wbHVnaW4gPSBwbHVnaW4gfHwge307XG4gICAgICAgICAgICBzd2l0Y2goem4udHlwZShwbHVnaW4pKXtcbiAgICAgICAgICAgICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICAgICAgICAgICAgICBfcGx1Z2luID0gX3BsdWdpbjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZnVuY3Rpb24nOlxuICAgICAgICAgICAgICAgICAgICBfcGx1Z2luID0gX3BsdWdpbih0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKF9wbHVnaW4ubWFpbikge1xuICAgICAgICAgICAgICAgIHRoaXMuX21haW4ucHVzaChfcGx1Z2luLm1haW4pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIF9yb3V0ZXMgPSB0aGlzLl9tYXRjaGVyLmZvcm1hdFJvdXRlcyhfcGx1Z2luLnJvdXRlc3x8W10pO1xuICAgICAgICAgICAgX3BsdWdpbi5fX3JvdXRlc19fID0gX3JvdXRlcztcbiAgICAgICAgICAgIHRoaXMuZmlyZSgncGx1Z2luTG9hZGVkJywgX3BsdWdpbik7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcm91dGVzID0gdGhpcy5fcm91dGVzLmNvbmNhdChfcm91dGVzKSwgX3JvdXRlcztcbiAgICAgICAgfSxcbiAgICAgICAgbG9hZFJvdXRlczogZnVuY3Rpb24gKHJvdXRlcyl7XG4gICAgICAgICAgICB2YXIgX3JvdXRlcyA9IHRoaXMuX21hdGNoZXIuZm9ybWF0Um91dGVzKHJvdXRlcyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcm91dGVzID0gdGhpcy5fcm91dGVzLmNvbmNhdChfcm91dGVzKSwgX3JvdXRlcztcbiAgICAgICAgfSxcbiAgICAgICAgbG9hZFJvdXRlOiBmdW5jdGlvbiAocm91dGUpe1xuICAgICAgICAgICAgdGhpcy5fcm91dGVzLnB1c2godGhpcy5fbWF0Y2hlci5mb3JtYXRSb3V0ZShyb3V0ZSkpO1xuICAgICAgICB9XG4gICAgfVxufSk7XG4iLCJ2YXIgUmVhY3QgPSB6bnVpLlJlYWN0IHx8IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgZXJyb3IgPSByZXF1aXJlKCcuL2Vycm9yL2luZGV4LmpzJyk7XG52YXIgWlJSb3V0ZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0ZGlzcGxheU5hbWU6J1pSUm91dGUnLFxuXHRfX2hhbmRsZXI6IGZ1bmN0aW9uICgpe1xuXHRcdHZhciBfcmVxdWVzdCA9IHRoaXMucHJvcHMucmVxdWVzdCxcblx0XHRcdF9tYXRjaGVyID0gX3JlcXVlc3QubWF0Y2hlcixcblx0XHRcdF9uZXdSZXF1ZXN0ID0ge1xuXHRcdFx0XHRwYXRoOiBfcmVxdWVzdC5wYXRoLnJlcGxhY2UodGhpcy5wcm9wcy5yb3V0ZS5wYXRoLCAgJycpLFxuXHRcdFx0XHRzZWFyY2g6IF9yZXF1ZXN0LnNlYXJjaCxcblx0XHRcdFx0ZXZlbnQ6IF9yZXF1ZXN0LmV2ZW50LFxuXHRcdFx0XHRtYXRjaGVyOiBfbWF0Y2hlclxuXHRcdFx0fSxcblx0XHRcdF9yb3V0ZXMgPSB0aGlzLnByb3BzLnJvdXRlLl9fcm91dGVzX18sXG5cdFx0XHRfcm91dGUgPSBudWxsLFxuXHRcdFx0X2NvbXBvbmVudCA9IG51bGw7XG4gICAgICAgIGlmKCFfcm91dGVzKSB7XG5cdFx0XHR2YXIgX2ZSb3V0ZSA9IF9tYXRjaGVyLmdldFJvdXRlc0Zyb21Sb3V0ZSh0aGlzLnByb3BzLnJvdXRlKTtcblx0XHRcdF9yb3V0ZXMgPSBfZlJvdXRlLnJvdXRlcztcblx0XHRcdF9jb21wb25lbnQgPSBfZlJvdXRlLmNvbXBvbmVudDtcblx0XHR9XG5cdFx0X3JvdXRlID0gX21hdGNoZXIuZ2V0Um91dGVGb3JSZXF1ZXN0KF9uZXdSZXF1ZXN0LCBfcm91dGVzKTtcblxuXHRcdGlmKF9yb3V0ZSkge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0Q29tcG9uZW50OiBfcm91dGUuY29tcG9uZW50IHx8IF9jb21wb25lbnQsXG5cdFx0XHRcdENvbXBvbmVudFByb3BzOiB6bi5leHRlbmQoe30sIF9yb3V0ZS5wcm9wcywge1xuXHRcdFx0XHRcdGFwcGxpY2F0aW9uOiB0aGlzLnByb3BzLmFwcGxpY2F0aW9uLFxuXHRcdFx0XHRcdHBhcmVudDogdGhpcyxcblx0XHRcdFx0XHRwYXJlbnRSZXF1ZXN0OiBfcmVxdWVzdCxcblx0XHRcdFx0XHRyb3V0ZTogX3JvdXRlLFxuXHRcdFx0XHRcdHJvdXRlcjogdGhpcy5wcm9wcy5yb3V0ZXIsXG5cdFx0XHRcdFx0cmVxdWVzdDogX25ld1JlcXVlc3Rcblx0XHRcdFx0fSlcblx0XHRcdH1cblx0XHR9ZWxzZXtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdENvbXBvbmVudDogZXJyb3IuRXJyb3I0MDQsXG5cdFx0XHRcdENvbXBvbmVudFByb3BzOiB7XG5cdFx0XHRcdFx0YXBwbGljYXRpb246IHRoaXMucHJvcHMuYXBwbGljYXRpb24sXG5cdFx0XHRcdFx0cGFyZW50OiB0aGlzLFxuXHRcdFx0XHRcdHBhcmVudFJlcXVlc3Q6IF9yZXF1ZXN0LFxuXHRcdFx0XHRcdHJvdXRlcjogdGhpcy5wcm9wcy5yb3V0ZXIsXG5cdFx0XHRcdFx0cmVxdWVzdDogX25ld1JlcXVlc3Rcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRcblx0fSxcblx0X19nZXRDb21wb25lbnQ6IGZ1bmN0aW9uICgpe1xuXHRcdHJldHVybiB0aGlzLl9faGFuZGxlcigpO1xuXHR9LFxuXHRyZW5kZXI6IGZ1bmN0aW9uKCl7XG5cdFx0aWYodGhpcy5wcm9wcy5yZXF1ZXN0ICYmIHRoaXMucHJvcHMucm91dGUgJiYgdGhpcy5wcm9wcy5yb3V0ZS5yb3V0ZXMpIHtcblx0XHRcdHZhciBfQ29tcG9uZW50ID0gdGhpcy5fX2dldENvbXBvbmVudCgpO1xuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9e3pudWkucmVhY3QuY2xhc3NuYW1lKFwienItcm91dGVcIiwgdGhpcy5wcm9wcy5jbGFzc05hbWUpfSBzdHlsZT17dGhpcy5wcm9wcy5zdHlsZX0gPlxuXHRcdFx0XHRcdHtfQ29tcG9uZW50LkNvbXBvbmVudCAmJiA8X0NvbXBvbmVudC5Db21wb25lbnQgey4uLl9Db21wb25lbnQuQ29tcG9uZW50UHJvcHN9IC8+fVxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdCk7XG5cdFx0fWVsc2V7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFpSUm91dGU7IiwibW9kdWxlLmV4cG9ydHMgPSB6bi5DbGFzcyh7XG4gICAgc3RhdGljOiB0cnVlLFxuICAgIG1ldGhvZHM6IHtcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICB0aGlzLmZpeFdpbmRvd0hhc2hDaGFuZ2UoKTtcbiAgICAgICAgfSxcbiAgICAgICAgZml4V2luZG93SGFzaENoYW5nZTogZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICAvLyBMZXQgdGhpcyBzbmlwcGV0IHJ1biBiZWZvcmUgeW91ciBoYXNoY2hhbmdlIGV2ZW50IGJpbmRpbmcgY29kZVxuICAgICAgICAgICAgaWYgKCF3aW5kb3cuSGFzaENoYW5nZUV2ZW50KXtcbiAgICAgICAgICAgICAgICAoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxhc3RVUkwgPSBkb2N1bWVudC5VUkw7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiaGFzaGNoYW5nZVwiLCBmdW5jdGlvbihldmVudCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXZlbnQsIFwib2xkVVJMXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogbGFzdFVSTFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXZlbnQsIFwibmV3VVJMXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZG9jdW1lbnQuVVJMXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RVUkwgPSBkb2N1bWVudC5VUkw7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0oKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59KTsiLCJ2YXIgUmVhY3QgPSB6bnVpLlJlYWN0IHx8IHJlcXVpcmUoJ3JlYWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0ZGlzcGxheU5hbWU6J0Vycm9yNDA0Jyxcblx0cmVuZGVyOiBmdW5jdGlvbigpe1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT17em51aS5yZWFjdC5jbGFzc25hbWUoJ3pyLXJvdXRlci1lcnJvci00MDQnLCB0aGlzLnByb3BzLmNsYXNzTmFtZSl9IHN0eWxlPXt0aGlzLnByb3BzLnN0eWxlfSA+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZXJyb3ItaGVhZGVyXCI+XG5cdFx0XHRcdFx0PGgzPkVSUk9SOiA0MDQ8L2gzPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJlcnJvci1ib2R5XCI+XG5cdFx0XHRcdFx0VGhlIHBhdGggPHNwYW4gY2xhc3NOYW1lPVwicGF0aFwiPnt0aGlzLnByb3BzLnJlcXVlc3QucGF0aH08L3NwYW4+IGlzIG5vdCBmb3VuZC5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZXJyb3ItZm9vdGVyXCI+XG5cdFx0XHRcdFx0XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufSk7IiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgJ0Vycm9yNDA0JzogcmVxdWlyZSgnLi9FcnJvcjQwNC5qcycpXG59OyIsInJlcXVpcmUoJy4vVXRpbC5qcycpO1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgSGFzaFJvdXRlcjogcmVxdWlyZSgnLi9IYXNoUm91dGVyLmpzJyksXG4gICAgUm91dGU6IHJlcXVpcmUoJy4vUm91dGUnKVxufTsiLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcIlJlYWN0XCJdOyB9KCkpOyJdLCJzb3VyY2VSb290IjoiIn0=
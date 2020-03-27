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

          if (_route.extension) {
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
          _main = [];

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
              _main.push(_plugin.routes[_plugin.main]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vSGFzaEhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vSGFzaFJvdXRlci5qcyIsIndlYnBhY2s6Ly8vLi9QYXRoTWF0Y2hlci5qcyIsIndlYnBhY2s6Ly8vLi9SZXF1ZXN0SGFuZGxlci5qcyIsIndlYnBhY2s6Ly8vLi9Sb3V0ZS5qcyIsIndlYnBhY2s6Ly8vLi9VdGlsLmpzIiwid2VicGFjazovLy8uL2Vycm9yL0Vycm9yNDA0LmpzIiwid2VicGFjazovLy8uL2Vycm9yL2luZGV4LmpzIiwid2VicGFjazovLy8uL2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcIlJlYWN0XCIiXSwibmFtZXMiOlsiUmVxdWVzdEhhbmRsZXIiLCJyZXF1aXJlIiwibW9kdWxlIiwiZXhwb3J0cyIsInpuIiwiQ2xhc3MiLCJldmVudHMiLCJwcm9wZXJ0aWVzIiwibWV0aG9kcyIsImluaXQiLCJhcmd2IiwiX19pbml0RXZlbnRzIiwiY2FsbGVyIiwiY29uc3RydWN0b3IiLCJfc3VwZXJfIiwicHJvdG90eXBlIiwiX21haW4iLCJsZW5ndGgiLCJsb2NhdGlvbiIsImhhc2giLCJwb3AiLCJfX2hhc2hjaGFuZ2UiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiYmluZCIsImV2ZW50Iiwib24iLCJfcmV0dXJuIiwiZmlyZSIsIl9oYXNoIiwiX19wYXJzZUhhc2giLCJfcmVxdWVzdCIsImNyZWF0ZVJlcXVlc3QiLCJkb1JlcXVlc3QiLCJfc2VhcmNoIiwic2VhcmNoIiwiX2hhc2hTcGxpdEluZGV4IiwiaW5kZXhPZiIsInJlcGxhY2UiLCJzdWJzdHJpbmciLCJwYXRoIiwicXVlcnlzdHJpbmciLCJwYXJzZSIsIlJlYWN0Iiwiem51aSIsIkhhc2hIYW5kbGVyIiwiZXJyb3IiLCJjcmVhdGVDbGFzcyIsImRpc3BsYXlOYW1lIiwiZ2V0SW5pdGlhbFN0YXRlIiwiQ29tcG9uZW50IiwiQ29tcG9uZW50UHJvcHMiLCJjb21wb25lbnREaWRNb3VudCIsIl9faW5pdEhhbmRsZXIiLCJfaGFuZGxlciIsInByb3BzIiwiaGFzaGNoYW5nZSIsImhhbmRsZXIiLCJfX2hhbmRsZXIiLCJyZXF1ZXN0IiwiX19yZXF1ZXN0Iiwibm90Zm91bmQiLCJfX25vdGZvdW5kIiwicGx1Z2lubG9hZGVkIiwiX19wbHVnaW5Mb2FkZWQiLCJvbkluaXRIYW5kbGVyIiwic2VuZGVyIiwib25IYXNoQ2hhbmdlIiwiZGF0YSIsIm9uSGFuZGxlciIsInJvdXRlIiwic2V0U3RhdGUiLCJjb21wb25lbnQiLCJleHRlbmQiLCJhcHBsaWNhdGlvbiIsInJvdXRlciIsIm9uUmVxdWVzdCIsIm9uTm90Rm91bmQiLCJvblBsdWdpbkxvYWRlZCIsInB1c2giLCJmb3J3YXJkIiwiRXJyb3I0MDQiLCJyZW5kZXIiLCJyZWFjdCIsImNsYXNzbmFtZSIsImNsYXNzTmFtZSIsInN0eWxlIiwic3RhdGUiLCJwYXRoU2VwYXJhdG9yIiwicGF0aFBhcmFtZXRlclN5bWJvbCIsIl9wYXRoU2VwYXJhdG9yIiwiX3BhdGhQYXJhbWV0ZXJTeW1ib2wiLCJmb3JtYXRSb3V0ZSIsInBhcmVudCIsIl9fcGFyZW50X18iLCJwYXRocyIsIl9fcGFyc2VSb3V0ZVBhdGhzIiwiZXhhY3QiLCJmb3JtYXRSb3V0ZXMiLCJyb3V0ZXMiLCJ0eXBlIiwiX3JvdXRlcyIsIl9fbG9hZFBhdGhBbmRDb21wb25lbnQiLCJtYXAiLCJjYWxsIiwiZ2V0Um91dGVGb3JSZXF1ZXN0IiwiX3JvdXRlIiwiX2RhdGEiLCJpIiwiX2xlbiIsIl9fbWF0Y2hSb3V0ZUFuZFJlcXVlc3QiLCJwYXJhbXMiLCJnZXRSb3V0ZXNGcm9tUm91dGUiLCJfY29tcG9uZW50IiwicGx1Z2lucyIsIl9wbHVnaW5zIiwiX19sb2FkUGx1Z2lucyIsImNvbmNhdCIsIm1haW4iLCJfX2lzUmVhY3RDb21wb25lbnQiLCJpcyIsImlzUmVhY3RDb21wb25lbnQiLCJleHRlbnNpb24iLCJfX2luaXRSb3V0ZSIsIl9fcm91dGVzX18iLCJfcGx1Z2luIiwiZm9yRWFjaCIsInBsdWdpbiIsIl9fbG9hZFBsdWdpbiIsIm5hbWVzcGFjZSIsImNvbXBvbmVudHMiLCJfcGF0aHMiLCJfcGF0aCIsIl9wYXJhbXMiLCJfdXJsVW5tYXRjaHMiLCJfaGFzQ2hlY2tlZCIsIl90ZW1wIiwiX3RlbXBzIiwic3BsaXQiLCJPYmplY3QiLCJrZXlzIiwidW5tYXRjaHMiLCJpc1BhcmFtZXRlciIsImtleSIsInRlc3QiLCJQYXRoTWF0Y2hlciIsInJlcXVlc3RzIiwiX3JlcXVlc3RzIiwiX21hdGNoZXIiLCJwbHVnaW5Mb2FkZWQiLCJsb2FkUGx1Z2lucyIsImxvYWRSb3V0ZXMiLCJtYXRjaGVyIiwibG9hZFBsdWdpbiIsImxvYWRSb3V0ZSIsIlpSUm91dGUiLCJfbmV3UmVxdWVzdCIsIl9mUm91dGUiLCJwYXJlbnRSZXF1ZXN0IiwiX19nZXRDb21wb25lbnQiLCJfQ29tcG9uZW50IiwiZml4V2luZG93SGFzaENoYW5nZSIsIkhhc2hDaGFuZ2VFdmVudCIsImxhc3RVUkwiLCJkb2N1bWVudCIsIlVSTCIsImRlZmluZVByb3BlcnR5IiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsInZhbHVlIiwiSGFzaFJvdXRlciIsIlJvdXRlIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdI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QztBQUFmLE1BUEQsQ0FERDtBQWFBO0FBaEJpQyxDQUFsQixDQUFqQixDOzs7Ozs7Ozs7OztBQ0RBdEMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCO0FBQ2IsY0FBWUYsbUJBQU8sQ0FBQywwQ0FBRDtBQUROLENBQWpCLEM7Ozs7Ozs7Ozs7O0FDQUFBLG1CQUFPLENBQUMsNEJBQUQsQ0FBUDs7QUFDQUMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCO0FBQ2J1SyxZQUFVLEVBQUV6SyxtQkFBTyxDQUFDLHdDQUFELENBRE47QUFFYjBLLE9BQUssRUFBRTFLLG1CQUFPLENBQUMsMkJBQUQ7QUFGRCxDQUFqQixDOzs7Ozs7Ozs7OztBQ0RBLGFBQWEsZ0NBQWdDLEVBQUUsSSIsImZpbGUiOiIuL2Rpc3QvZGV2ZWxvcG1lbnQvaW5kZXguYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9pbmRleC5qc1wiKTtcbiIsInZhciBSZXF1ZXN0SGFuZGxlciA9IHJlcXVpcmUoJy4vUmVxdWVzdEhhbmRsZXInKTtcbm1vZHVsZS5leHBvcnRzID0gem4uQ2xhc3MoUmVxdWVzdEhhbmRsZXIsIHtcbiAgICBldmVudHM6IFsnaGFzaGNoYW5nZScsICdoYW5kbGVyJ10sXG4gICAgcHJvcGVydGllczogeyB9LFxuICAgIG1ldGhvZHM6IHtcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKGFyZ3YsIGV2ZW50cyl7XG4gICAgICAgICAgICB0aGlzLl9faW5pdEV2ZW50cyhldmVudHMpO1xuICAgICAgICAgICAgaWYodGhpcy5zdXBlci5jYWxsZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN1cGVyKGFyZ3YpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdGhpcy5jb25zdHJ1Y3Rvci5fc3VwZXJfLnByb3RvdHlwZS5pbml0KGFyZ3YsIGV2ZW50cyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHRoaXMuX21haW4ubGVuZ3RoICYmICFsb2NhdGlvbi5oYXNoKXtcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5oYXNoID0gdGhpcy5fbWFpbi5wb3AoKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHRoaXMuX19oYXNoY2hhbmdlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsIHRoaXMuX19oYXNoY2hhbmdlLmJpbmQodGhpcyksIGZhbHNlKTtcbiAgICAgICAgfSxcbiAgICAgICAgX19pbml0RXZlbnRzOiBmdW5jdGlvbiAoZXZlbnRzKXtcbiAgICAgICAgICAgIGlmKGV2ZW50cyAmJiB0eXBlb2YgZXZlbnRzID09ICdvYmplY3QnKXtcbiAgICAgICAgICAgICAgICBmb3IodmFyIGV2ZW50IGluIGV2ZW50cyl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub24oZXZlbnQsIGV2ZW50c1tldmVudF0sIHRoaXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgX19oYXNoY2hhbmdlOiBmdW5jdGlvbiAoZXZlbnQpe1xuICAgICAgICAgICAgdmFyIF9yZXR1cm4gPSB0aGlzLmZpcmUoJ2hhc2hjaGFuZ2UnLCBldmVudCk7XG4gICAgICAgICAgICBpZihfcmV0dXJuID09PSBmYWxzZSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgdmFyIF9oYXNoID0gdGhpcy5fX3BhcnNlSGFzaCgpLFxuICAgICAgICAgICAgICAgIF9yZXF1ZXN0ID0gdGhpcy5jcmVhdGVSZXF1ZXN0KF9oYXNoLCBldmVudCk7XG5cbiAgICAgICAgICAgIF9yZXR1cm4gPSB0aGlzLmZpcmUoJ2hhbmRsZXInLCBldmVudCwgX2hhc2gpO1xuICAgICAgICAgICAgaWYoX3JldHVybiA9PT0gZmFsc2UpIHJldHVybiBmYWxzZTtcblxuICAgICAgICAgICAgdGhpcy5kb1JlcXVlc3QoX3JlcXVlc3QpO1xuICAgICAgICB9LFxuICAgICAgICBfX3BhcnNlSGFzaDogZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICB2YXIgX2hhc2ggPSBsb2NhdGlvbi5oYXNoLFxuICAgICAgICAgICAgICAgIF9zZWFyY2ggPSBsb2NhdGlvbi5zZWFyY2gsXG4gICAgICAgICAgICAgICAgX2hhc2hTcGxpdEluZGV4ID0gX2hhc2guaW5kZXhPZignPycpO1xuICAgICAgICAgICAgaWYoX3NlYXJjaCAmJiBfc2VhcmNoLmluZGV4T2YoJz8nKSE9PS0xKXtcbiAgICAgICAgICAgICAgICBfc2VhcmNoID0gX3NlYXJjaC5yZXBsYWNlKCc/JywgJycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoX2hhc2hTcGxpdEluZGV4ICE9PSAtMSl7XG4gICAgICAgICAgICAgICAgX3NlYXJjaCA9IF9zZWFyY2ggKyAnJicrIF9oYXNoLnN1YnN0cmluZyhfaGFzaFNwbGl0SW5kZXggKyAxKTtcbiAgICAgICAgICAgICAgICBfaGFzaCA9IF9oYXNoLnN1YnN0cmluZygwLCBfaGFzaFNwbGl0SW5kZXgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHBhdGg6IF9oYXNoLnN1YnN0cmluZygxKSxcbiAgICAgICAgICAgICAgICBzZWFyY2g6IHpuLnF1ZXJ5c3RyaW5nLnBhcnNlKF9zZWFyY2gpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59KTtcbiIsInZhciBSZWFjdCA9IHpudWkuUmVhY3QgfHwgcmVxdWlyZSgncmVhY3QnKTtcbnZhciBIYXNoSGFuZGxlciA9IHJlcXVpcmUoJy4vSGFzaEhhbmRsZXInKTtcbnZhciBlcnJvciA9IHJlcXVpcmUoJy4vZXJyb3IvaW5kZXguanMnKTtcbm1vZHVsZS5leHBvcnRzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRkaXNwbGF5TmFtZTonWlJIYXNoUm91dGVyJyxcblx0Z2V0SW5pdGlhbFN0YXRlOmZ1bmN0aW9uKCl7XG5cdFx0cmV0dXJuIHtcblx0XHRcdENvbXBvbmVudDogbnVsbCxcblx0XHRcdENvbXBvbmVudFByb3BzOiBudWxsXG5cdFx0fVxuXHR9LFxuXHRjb21wb25lbnREaWRNb3VudDpmdW5jdGlvbigpe1xuXHRcdHRoaXMuX19pbml0SGFuZGxlcigpO1xuXHR9LFxuXHRfX2luaXRIYW5kbGVyOiBmdW5jdGlvbiAoKXtcblx0XHR0aGlzLl9oYW5kbGVyID0gbmV3IEhhc2hIYW5kbGVyKHRoaXMucHJvcHMsIHtcblx0XHRcdGhhc2hjaGFuZ2U6IHRoaXMuX19oYXNoY2hhbmdlLFxuXHRcdFx0aGFuZGxlcjogdGhpcy5fX2hhbmRsZXIsXG5cdFx0XHRyZXF1ZXN0OiB0aGlzLl9fcmVxdWVzdCxcblx0XHRcdG5vdGZvdW5kOiB0aGlzLl9fbm90Zm91bmQsXG5cdFx0XHRwbHVnaW5sb2FkZWQ6IHRoaXMuX19wbHVnaW5Mb2FkZWRcblx0XHR9KTtcblx0XHR0aGlzLnByb3BzLm9uSW5pdEhhbmRsZXIgJiYgdGhpcy5wcm9wcy5vbkluaXRIYW5kbGVyKHRoaXMuX2hhbmRsZXIsIHRoaXMpO1xuXHR9LFxuXHRfX2hhc2hjaGFuZ2U6IGZ1bmN0aW9uIChzZW5kZXIsIGV2ZW50KXtcblx0XHR0aGlzLnByb3BzLm9uSGFzaENoYW5nZSAmJiB0aGlzLnByb3BzLm9uSGFzaENoYW5nZShldmVudCwgdGhpcyk7XG5cdH0sXG5cdF9faGFuZGxlcjogZnVuY3Rpb24gKHNlbmRlciwgZXZlbnQsIGRhdGEpe1xuXHRcdHRoaXMucHJvcHMub25IYW5kbGVyICYmIHRoaXMucHJvcHMub25IYW5kbGVyKGV2ZW50LCBkYXRhLCB0aGlzKTtcblx0fSxcblx0X19yZXF1ZXN0OiBmdW5jdGlvbiAoc2VuZGVyLCByZXF1ZXN0LCByb3V0ZSl7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRDb21wb25lbnQ6IHJvdXRlLmNvbXBvbmVudCxcblx0XHRcdENvbXBvbmVudFByb3BzOiB6bi5leHRlbmQoe30sIHJvdXRlLnByb3BzLCB7XG5cdFx0XHRcdGFwcGxpY2F0aW9uOiB0aGlzLnByb3BzLmFwcGxpY2F0aW9uLFxuXHRcdFx0XHRyZXF1ZXN0OiByZXF1ZXN0LFxuXHRcdFx0XHRyb3V0ZXI6IHRoaXMsXG5cdFx0XHRcdHJvdXRlOiByb3V0ZVxuXHRcdFx0fSlcblx0XHR9KTtcblx0XHR0aGlzLnByb3BzLm9uUmVxdWVzdCAmJiB0aGlzLnByb3BzLm9uUmVxdWVzdChyZXF1ZXN0LCByb3V0ZSwgdGhpcyk7XG5cdH0sXG5cdF9fbm90Zm91bmQ6IGZ1bmN0aW9uIChzZW5kZXIsIHJlcXVlc3Qpe1xuXHRcdHRoaXMubm90Zm91bmQocmVxdWVzdCk7XG5cdFx0dGhpcy5wcm9wcy5vbk5vdEZvdW5kICYmIHRoaXMucHJvcHMub25Ob3RGb3VuZChyZXF1ZXN0LCB0aGlzKTtcblx0fSxcblx0X19wbHVnaW5Mb2FkZWQ6IGZ1bmN0aW9uIChzZW5kZXIsIGRhdGEpe1xuXHRcdHRoaXMucHJvcHMub25QbHVnaW5Mb2FkZWQgJiYgdGhpcy5wcm9wcy5vblBsdWdpbkxvYWRlZChkYXRhLCB0aGlzKTtcblx0fSxcblx0cHVzaDogZnVuY3Rpb24gKCl7XG5cblx0fSxcblx0Zm9yd2FyZDogZnVuY3Rpb24gKCl7XG5cblx0fSxcblx0bm90Zm91bmQ6IGZ1bmN0aW9uIChyZXF1ZXN0KXtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdENvbXBvbmVudDogZXJyb3IuRXJyb3I0MDQsXG5cdFx0XHRDb21wb25lbnRQcm9wczoge1xuXHRcdFx0XHRyZXF1ZXN0OiByZXF1ZXN0XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0sXG5cdHJlbmRlcjogZnVuY3Rpb24oKXtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9e3pudWkucmVhY3QuY2xhc3NuYW1lKFwienItaGFzaC1yb3V0ZXJcIiwgdGhpcy5wcm9wcy5jbGFzc05hbWUpfSBzdHlsZT17dGhpcy5wcm9wcy5zdHlsZX0gPlxuXHRcdFx0XHR7dGhpcy5zdGF0ZS5Db21wb25lbnQgJiYgPHRoaXMuc3RhdGUuQ29tcG9uZW50IHsuLi50aGlzLnN0YXRlLkNvbXBvbmVudFByb3BzfSAvPn1cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn0pOyIsIm1vZHVsZS5leHBvcnRzID0gem4uQ2xhc3Moe1xuICAgIGV2ZW50czogWydwbHVnaW5Mb2FkaW5nJywgJ3BsdWdpbkxvYWRlZCcsICdyb3V0ZUxvYWRpbmcnLCAncm91dGVMb2FkZWQnXSxcbiAgICBwcm9wZXJ0aWVzOnsgXG4gICAgICAgIHBhdGhTZXBhcmF0b3I6IG51bGwsXG4gICAgICAgIHBhdGhQYXJhbWV0ZXJTeW1ib2w6IG51bGxcbiAgICB9LFxuICAgIG1ldGhvZHM6IHtcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKGFyZ3YsIGV2ZW50cyl7XG4gICAgICAgICAgICB0aGlzLl9faW5pdEV2ZW50cyhldmVudHMpO1xuICAgICAgICAgICAgdGhpcy5fcGF0aFNlcGFyYXRvciA9IGFyZ3YucGF0aFNlcGFyYXRvciB8fCAnLyc7XG4gICAgICAgICAgICB0aGlzLl9wYXRoUGFyYW1ldGVyU3ltYm9sID0gYXJndi5wYXRoUGFyYW1ldGVyU3ltYm9sIHx8ICc6JztcbiAgICAgICAgfSxcbiAgICAgICAgX19pbml0RXZlbnRzOiBmdW5jdGlvbiAoZXZlbnRzKXtcbiAgICAgICAgICAgIGlmKGV2ZW50cyAmJiB0eXBlb2YgZXZlbnRzID09ICdvYmplY3QnKXtcbiAgICAgICAgICAgICAgICBmb3IodmFyIGV2ZW50IGluIGV2ZW50cyl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub24oZXZlbnQsIGV2ZW50c1tldmVudF0sIHRoaXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZm9ybWF0Um91dGU6IGZ1bmN0aW9uIChyb3V0ZSwgcGFyZW50KXtcbiAgICAgICAgICAgIHZhciBfcmV0dXJuID0gdGhpcy5maXJlKCdyb3V0ZUxvYWRpbmcnLCByb3V0ZSwgcGFyZW50KTtcbiAgICAgICAgICAgIGlmKF9yZXR1cm4gPT09IGZhbHNlKXtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHBhcmVudCl7XG4gICAgICAgICAgICAgICAgcm91dGUuX19wYXJlbnRfXyA9IHBhcmVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJvdXRlLnBhdGhzID0gdGhpcy5fX3BhcnNlUm91dGVQYXRocyhyb3V0ZS5wYXRoKTtcbiAgICAgICAgICAgIHJvdXRlLnByb3BzID0gem4uZXh0ZW5kKHt9LCByb3V0ZS5wcm9wcyk7XG4gICAgICAgICAgICBpZihyb3V0ZS5leGFjdCA9PSBudWxsICYmIHJvdXRlLnBhdGguaW5kZXhPZih0aGlzLl9wYXRoUGFyYW1ldGVyU3ltYm9sKSA9PT0gLTEpIHsgcm91dGUuZXhhY3QgPSB0cnVlOyB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZpcmUoJ3JvdXRlTG9hZGVkJywgcm91dGUpLCByb3V0ZTtcbiAgICAgICAgfSxcbiAgICAgICAgZm9ybWF0Um91dGVzOiBmdW5jdGlvbiAocm91dGVzLCBwYXJlbnQpe1xuICAgICAgICAgICAgc3dpdGNoKHpuLnR5cGUocm91dGVzKSl7XG4gICAgICAgICAgICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9yb3V0ZXMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgZm9yKHZhciBwYXRoIGluIHJvdXRlcyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBfcm91dGVzLnB1c2godGhpcy5fX2xvYWRQYXRoQW5kQ29tcG9uZW50KHBhdGgsIHJvdXRlc1twYXRoXSwgcGFyZW50KSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9yb3V0ZXM7XG4gICAgICAgICAgICAgICAgY2FzZSAnYXJyYXknOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcm91dGVzLm1hcCgocm91dGUpPT50aGlzLmZvcm1hdFJvdXRlKHJvdXRlLCBwYXJlbnQpKTtcbiAgICAgICAgICAgICAgICBjYXNlICdmdW5jdGlvbic6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZvcm1hdFJvdXRlcyhyb3V0ZXMuY2FsbChudWxsLCBwYXJlbnQsIHRoaXMpLCBwYXJlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBnZXRSb3V0ZUZvclJlcXVlc3Q6IGZ1bmN0aW9uIChyZXF1ZXN0LCByb3V0ZXMpe1xuICAgICAgICAgICAgdmFyIF9yb3V0ZXMgPSByb3V0ZXMsXG4gICAgICAgICAgICAgICAgX3JvdXRlID0gbnVsbCxcbiAgICAgICAgICAgICAgICBfZGF0YSA9IG51bGw7XG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwLCBfbGVuID0gX3JvdXRlcy5sZW5ndGg7IGkgPCBfbGVuOyBpKyspe1xuICAgICAgICAgICAgICAgIF9yb3V0ZSA9IF9yb3V0ZXNbaV07XG4gICAgICAgICAgICAgICAgX2RhdGEgPSB0aGlzLl9fbWF0Y2hSb3V0ZUFuZFJlcXVlc3QoX3JvdXRlLCByZXF1ZXN0KTtcbiAgICAgICAgICAgICAgICBpZihfZGF0YSl7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYoIV9kYXRhIHx8ICFfcm91dGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiByZXF1ZXN0LnBhcmFtcyA9IF9kYXRhLCBfcm91dGU7XG4gICAgICAgIH0sXG4gICAgICAgIGdldFJvdXRlc0Zyb21Sb3V0ZTogZnVuY3Rpb24gKHJvdXRlKXtcbiAgICAgICAgICAgIHZhciBfcm91dGVzID0gW10sXG4gICAgICAgICAgICAgICAgX2NvbXBvbmVudCA9IHJvdXRlLmNvbXBvbmVudDtcbiAgICAgICAgICAgIGlmKHJvdXRlLnJvdXRlcykge1xuICAgICAgICAgICAgICAgIF9yb3V0ZXMgPSB0aGlzLmZvcm1hdFJvdXRlcyhyb3V0ZS5yb3V0ZXMsIHJvdXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYocm91dGUucGx1Z2lucykge1xuICAgICAgICAgICAgICAgIHZhciBfcGx1Z2lucyA9IHRoaXMuX19sb2FkUGx1Z2lucyhyb3V0ZS5wbHVnaW5zLCByb3V0ZSk7XG4gICAgICAgICAgICAgICAgX3JvdXRlcyA9IF9yb3V0ZXMuY29uY2F0KF9wbHVnaW5zLnJvdXRlcyk7XG4gICAgICAgICAgICAgICAgaWYoIV9jb21wb25lbnQgJiYgX3BsdWdpbnMubWFpbi5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgX2NvbXBvbmVudCA9IF9wbHVnaW5zLm1haW4ucG9wKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJvdXRlczogX3JvdXRlcyxcbiAgICAgICAgICAgICAgICBjb21wb25lbnQ6IF9jb21wb25lbnRcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgIF9faXNSZWFjdENvbXBvbmVudDogZnVuY3Rpb24gKGNvbXBvbmVudCl7XG4gICAgICAgICAgICBpZihjb21wb25lbnQgJiYgem4uaXMoY29tcG9uZW50LCAnZnVuY3Rpb24nKSAmJiAoY29tcG9uZW50LnByb3RvdHlwZS5yZW5kZXIgfHwgY29tcG9uZW50LmRpc3BsYXlOYW1lIHx8IGNvbXBvbmVudC5wcm90b3R5cGUuaXNSZWFjdENvbXBvbmVudCApKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSxcbiAgICAgICAgX19sb2FkUGF0aEFuZENvbXBvbmVudDogZnVuY3Rpb24gKHBhdGgsIGNvbXBvbmVudCwgcGFyZW50KXtcbiAgICAgICAgICAgIHZhciBfcm91dGUgPSB7IHBhdGg6IHBhdGggfTtcbiAgICAgICAgICAgIHN3aXRjaCh6bi50eXBlKGNvbXBvbmVudCkpe1xuICAgICAgICAgICAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgICAgICAgICAgICAgIF9yb3V0ZS5jb21wb25lbnQgPSB6bi5wYXRoKHdpbmRvdywgY29tcG9uZW50KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZnVuY3Rpb24nOlxuICAgICAgICAgICAgICAgICAgICBpZighdGhpcy5fX2lzUmVhY3RDb21wb25lbnQoY29tcG9uZW50KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3JvdXRlLmNvbXBvbmVudCA9IGNvbXBvbmVudC5jYWxsKHRoaXMsIHBhdGgsIHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9yb3V0ZS5jb21wb25lbnQgPSBjb21wb25lbnQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgICAgICAgICAgICAgem4uZXh0ZW5kKF9yb3V0ZSwgY29tcG9uZW50KTtcbiAgICAgICAgICAgICAgICAgICAgaWYoX3JvdXRlLmV4dGVuc2lvbil7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9faW5pdFJvdXRlKF9yb3V0ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZvcm1hdFJvdXRlKF9yb3V0ZSwgcGFyZW50KTtcbiAgICAgICAgfSxcbiAgICAgICAgX19pbml0Um91dGU6IGZ1bmN0aW9uIChyb3V0ZSl7XG4gICAgICAgICAgICBpZihyb3V0ZS5yb3V0ZXMpIHtcbiAgICAgICAgICAgICAgICByb3V0ZS5fX3JvdXRlc19fID0gdGhpcy5mb3JtYXRSb3V0ZXMocm91dGUucm91dGVzLCByb3V0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKHJvdXRlLnBsdWdpbnMpIHtcbiAgICAgICAgICAgICAgICB2YXIgX3BsdWdpbnMgPSB0aGlzLl9fbG9hZFBsdWdpbnMocm91dGUucGx1Z2lucywgcm91dGUpO1xuICAgICAgICAgICAgICAgIGlmKHJvdXRlLl9fcm91dGVzX18pIHtcbiAgICAgICAgICAgICAgICAgICAgcm91dGUuX19yb3V0ZXNfXyA9IHJvdXRlLl9fcm91dGVzX18uY29uY2F0KF9wbHVnaW5zLnJvdXRlcyk7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHJvdXRlLl9fcm91dGVzX18gPSBfcGx1Z2lucy5yb3V0ZXM7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcm91dGUubWFpbiA9IF9wbHVnaW5zLm1haW47XG4gICAgICAgICAgICAgICAgaWYoIXJvdXRlLmNvbXBvbmVudCAmJiBfcGx1Z2lucy5tYWluLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICByb3V0ZS5jb21wb25lbnQgPSBfcGx1Z2lucy5tYWluLnBvcCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHJvdXRlO1xuICAgICAgICB9LFxuICAgICAgICBfX2xvYWRQbHVnaW5zOiBmdW5jdGlvbiAocGx1Z2lucywgcGFyZW50KXtcbiAgICAgICAgICAgIHZhciBfcGx1Z2lucyA9IHBsdWdpbnMgfHwgW10sXG4gICAgICAgICAgICAgICAgX3BsdWdpbiA9IG51bGwsXG4gICAgICAgICAgICAgICAgX3JvdXRlcyA9IFtdLFxuICAgICAgICAgICAgICAgIF9tYWluID0gW107XG4gICAgICAgICAgICBzd2l0Y2goem4udHlwZShwbHVnaW5zKSl7XG4gICAgICAgICAgICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgICAgICAgICAgICAgX3BsdWdpbnMgPSBbcGx1Z2luc107XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2Z1bmN0aW9uJzpcbiAgICAgICAgICAgICAgICAgICAgX3BsdWdpbnMgPSBwbHVnaW5zKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKF9wbHVnaW5zICYmIF9wbHVnaW5zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHBsdWdpbnMuZm9yRWFjaChmdW5jdGlvbiAocGx1Z2luKXtcbiAgICAgICAgICAgICAgICAgICAgX3BsdWdpbiA9IHRoaXMuX19sb2FkUGx1Z2luKHBsdWdpbiwgcGFyZW50KTtcbiAgICAgICAgICAgICAgICAgICAgaWYoX3BsdWdpbil7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihfcGx1Z2luLl9fcm91dGVzX18pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcm91dGVzID0gX3JvdXRlcy5jb25jYXQoX3BsdWdpbi5fX3JvdXRlc19fKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKF9wbHVnaW4ubWFpbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9tYWluLnB1c2goX3BsdWdpbi5yb3V0ZXNbX3BsdWdpbi5tYWluXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByb3V0ZXM6IF9yb3V0ZXMsXG4gICAgICAgICAgICAgICAgbWFpbjogX21haW5cbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgIF9fbG9hZFBsdWdpbjogZnVuY3Rpb24gKHBsdWdpbiwgcGFyZW50KXtcbiAgICAgICAgICAgIHZhciBfcGx1Z2luID0gcGx1Z2luIHx8IHt9LFxuICAgICAgICAgICAgICAgIF9yZXR1cm4gPSB0aGlzLmZpcmUoJ3BsdWdpbkxvYWRpbmcnLCBwbHVnaW4sIHBhcmVudCk7XG4gICAgICAgICAgICBpZihfcmV0dXJuID09PSBmYWxzZSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzd2l0Y2goem4udHlwZShwbHVnaW4pKXtcbiAgICAgICAgICAgICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICAgICAgICAgICAgICBfcGx1Z2luID0gX3BsdWdpbjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZnVuY3Rpb24nOlxuICAgICAgICAgICAgICAgICAgICBfcGx1Z2luID0gX3BsdWdpbih0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihfcGx1Z2luLm5hbWVzcGFjZSAmJiBfcGx1Z2luLmNvbXBvbmVudHMpIHtcbiAgICAgICAgICAgICAgICB6bi5wYXRoKHdpbmRvdywgX3BsdWdpbi5uYW1lc3BhY2UsIF9wbHVnaW4uY29tcG9uZW50cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfcGx1Z2luLl9fcm91dGVzX18gPSB0aGlzLmZvcm1hdFJvdXRlcyhfcGx1Z2luLnJvdXRlc3x8W10sIHBhcmVudCk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZpcmUoJ3BsdWdpbkxvYWRlZCcsIF9wbHVnaW4pLCBfcGx1Z2luO1xuICAgICAgICB9LFxuICAgICAgICBfX21hdGNoUm91dGVBbmRSZXF1ZXN0OiBmdW5jdGlvbiAocm91dGUsIHJlcXVlc3Qpe1xuICAgICAgICAgICAgdmFyIF9wYXRocyA9IHJvdXRlLnBhdGhzLFxuICAgICAgICAgICAgICAgIF9wYXRoID0gbnVsbCxcbiAgICAgICAgICAgICAgICBfcGFyYW1zID0ge30sXG4gICAgICAgICAgICAgICAgX3VybFVubWF0Y2hzID0gW10sXG4gICAgICAgICAgICAgICAgX2hhc0NoZWNrZWQgPSBmYWxzZSxcbiAgICAgICAgICAgICAgICBfdGVtcCA9IG51bGwsXG4gICAgICAgICAgICAgICAgX3RlbXBzID0gcmVxdWVzdC5wYXRoLnNwbGl0KHRoaXMuX3BhdGhTZXBhcmF0b3IpO1xuXG4gICAgICAgICAgICBpZihyb3V0ZS5yb3V0ZXMgJiYgT2JqZWN0LmtleXMocm91dGUucm91dGVzKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBpZihyb3V0ZS5leGFjdCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJvdXRlLmV4YWN0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihyb3V0ZS5leGFjdCkge1xuICAgICAgICAgICAgICAgIGlmKHJvdXRlLnBhdGggPT09IHJlcXVlc3QucGF0aCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVxdWVzdC51bm1hdGNocyA9IF91cmxVbm1hdGNocywgX3BhcmFtczsgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKF90ZW1wcy5sZW5ndGggIT09IF9wYXRocy5sZW5ndGgpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwLCBfbGVuID0gX3RlbXBzLmxlbmd0aDsgaSA8IF9sZW47IGkrKykge1xuICAgICAgICAgICAgICAgIF90ZW1wID0gX3RlbXBzW2ldO1xuICAgICAgICAgICAgICAgIGlmKCFfdGVtcCkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgX3BhdGggPSBfcGF0aHNbaV07XG4gICAgICAgICAgICAgICAgX2hhc0NoZWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGlmKCFfcGF0aCl7XG4gICAgICAgICAgICAgICAgICAgIF91cmxVbm1hdGNocy5wdXNoKF90ZW1wKTtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKCFfcGF0aC5pc1BhcmFtZXRlciAmJiBfdGVtcCAhPT0gX3BhdGgua2V5KXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKF9wYXRoLmlzUGFyYW1ldGVyKXtcbiAgICAgICAgICAgICAgICAgICAgX3BhcmFtc1tfcGF0aC5rZXldID0gX3RlbXA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoIV9oYXNDaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcmVxdWVzdC51bm1hdGNocyA9IF91cmxVbm1hdGNocywgX3BhcmFtcztcbiAgICAgICAgfSxcbiAgICAgICAgX19wYXJzZVJvdXRlUGF0aHM6IGZ1bmN0aW9uIChwYXRoKXtcbiAgICAgICAgICAgIHZhciBfcGF0aHMgPSBbXSxcbiAgICAgICAgICAgICAgICBfdGVtcCA9IG51bGwsXG4gICAgICAgICAgICAgICAgX3RlbXBzID0gcGF0aC5zcGxpdCh0aGlzLl9wYXRoU2VwYXJhdG9yKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZm9yKHZhciBpID0gMCwgX2xlbiA9IF90ZW1wcy5sZW5ndGg7IGkgPCBfbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBfdGVtcCA9IF90ZW1wc1tpXTtcbiAgICAgICAgICAgICAgICBpZighX3RlbXApIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICgvXjpcXHdbXFx3XFxkXSokLy50ZXN0KF90ZW1wKSkge1xuICAgICAgICAgICAgICAgICAgICBfdGVtcCA9IF90ZW1wLnJlcGxhY2UoL146LywgJycpO1xuICAgICAgICAgICAgICAgICAgICBfcGF0aHNbaV0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IF90ZW1wLFxuICAgICAgICAgICAgICAgICAgICAgICAgaXNQYXJhbWV0ZXI6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgX3BhdGhzW2ldID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBfdGVtcFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIF9wYXRocztcbiAgICAgICAgfVxuICAgIH1cbn0pOyIsInZhciBQYXRoTWF0Y2hlciA9IHJlcXVpcmUoJy4vUGF0aE1hdGNoZXInKTtcbm1vZHVsZS5leHBvcnRzID0gem4uQ2xhc3Moe1xuICAgIGV2ZW50czogWydyZXF1ZXN0JywgJ25vdGZvdW5kJywgJ3BsdWdpbkxvYWRlZCddLFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgcmVxdWVzdHM6IG51bGwsXG4gICAgICAgIHJvdXRlczogbnVsbCxcbiAgICAgICAgbWFpbjogbnVsbFxuICAgIH0sXG4gICAgbWV0aG9kczoge1xuICAgICAgICBpbml0OiBmdW5jdGlvbiAoYXJndiwgZXZlbnRzKXtcbiAgICAgICAgICAgIHRoaXMuX3JlcXVlc3RzID0gW107XG4gICAgICAgICAgICB0aGlzLl9yb3V0ZXMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX21haW4gPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX21hdGNoZXIgPSBuZXcgUGF0aE1hdGNoZXIoYXJndiwge1xuICAgICAgICAgICAgICAgIHBsdWdpbkxvYWRlZDogZnVuY3Rpb24gKHNlbmRlciwgcGx1Z2luKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlyZSgncGx1Z2luTG9hZGVkJywgcGx1Z2luKTtcbiAgICAgICAgICAgICAgICB9LmJpbmQodGhpcylcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5fX2luaXRFdmVudHMoZXZlbnRzKTtcbiAgICAgICAgICAgIHRoaXMubG9hZFBsdWdpbnMoYXJndi5wbHVnaW5zKTtcbiAgICAgICAgICAgIHRoaXMubG9hZFJvdXRlcyhhcmd2LnJvdXRlcyk7XG4gICAgICAgICAgICBpZihhcmd2Lm1haW4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9tYWluLnB1c2goYXJndi5tYWluKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgX19pbml0RXZlbnRzOiBmdW5jdGlvbiAoZXZlbnRzKXtcbiAgICAgICAgICAgIGlmKGV2ZW50cyAmJiB0eXBlb2YgZXZlbnRzID09ICdvYmplY3QnKXtcbiAgICAgICAgICAgICAgICBmb3IodmFyIGV2ZW50IGluIGV2ZW50cyl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub24oZXZlbnQsIGV2ZW50c1tldmVudF0sIHRoaXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY3JlYXRlUmVxdWVzdDogZnVuY3Rpb24gKHJlcXVlc3QsIGV2ZW50KXtcbiAgICAgICAgICAgIHJlcXVlc3QuZXZlbnQgPSBldmVudDtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0cy5wdXNoKHJlcXVlc3QpLCByZXF1ZXN0O1xuICAgICAgICB9LFxuICAgICAgICBkb1JlcXVlc3Q6IGZ1bmN0aW9uIChyZXF1ZXN0KXtcbiAgICAgICAgICAgIHZhciBfcm91dGUgPSB0aGlzLl9tYXRjaGVyLmdldFJvdXRlRm9yUmVxdWVzdChyZXF1ZXN0LCB0aGlzLl9yb3V0ZXMpO1xuICAgICAgICAgICAgcmVxdWVzdC5tYXRjaGVyID0gdGhpcy5fbWF0Y2hlcjtcbiAgICAgICAgICAgIGlmKF9yb3V0ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZmlyZSgncmVxdWVzdCcsIHJlcXVlc3QsIF9yb3V0ZSk7XG4gICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maXJlKCdub3Rmb3VuZCcsIHJlcXVlc3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBsb2FkUGx1Z2luczogZnVuY3Rpb24gKHBsdWdpbnMpe1xuICAgICAgICAgICAgdmFyIF9wbHVnaW5zID0gcGx1Z2lucyB8fCBbXTtcbiAgICAgICAgICAgIHN3aXRjaCh6bi50eXBlKHBsdWdpbnMpKXtcbiAgICAgICAgICAgICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICAgICAgICAgICAgICBfcGx1Z2lucyA9IFtwbHVnaW5zXTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZnVuY3Rpb24nOlxuICAgICAgICAgICAgICAgICAgICBfcGx1Z2lucyA9IHBsdWdpbnModGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoX3BsdWdpbnMgJiYgX3BsdWdpbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcGx1Z2lucy5mb3JFYWNoKGZ1bmN0aW9uIChwbHVnaW4pe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRQbHVnaW4ocGx1Z2luKTtcbiAgICAgICAgICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG4gICAgICAgIGxvYWRQbHVnaW46IGZ1bmN0aW9uIChwbHVnaW4pe1xuICAgICAgICAgICAgdmFyIF9wbHVnaW4gPSBwbHVnaW4gfHwge307XG4gICAgICAgICAgICBzd2l0Y2goem4udHlwZShwbHVnaW4pKXtcbiAgICAgICAgICAgICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICAgICAgICAgICAgICBfcGx1Z2luID0gX3BsdWdpbjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZnVuY3Rpb24nOlxuICAgICAgICAgICAgICAgICAgICBfcGx1Z2luID0gX3BsdWdpbih0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKF9wbHVnaW4ubWFpbikge1xuICAgICAgICAgICAgICAgIHRoaXMuX21haW4ucHVzaChfcGx1Z2luLm1haW4pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIF9yb3V0ZXMgPSB0aGlzLl9tYXRjaGVyLmZvcm1hdFJvdXRlcyhfcGx1Z2luLnJvdXRlc3x8W10pO1xuICAgICAgICAgICAgX3BsdWdpbi5fX3JvdXRlc19fID0gX3JvdXRlcztcbiAgICAgICAgICAgIHRoaXMuZmlyZSgncGx1Z2luTG9hZGVkJywgX3BsdWdpbik7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcm91dGVzID0gdGhpcy5fcm91dGVzLmNvbmNhdChfcm91dGVzKSwgX3JvdXRlcztcbiAgICAgICAgfSxcbiAgICAgICAgbG9hZFJvdXRlczogZnVuY3Rpb24gKHJvdXRlcyl7XG4gICAgICAgICAgICB2YXIgX3JvdXRlcyA9IHRoaXMuX21hdGNoZXIuZm9ybWF0Um91dGVzKHJvdXRlcyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcm91dGVzID0gdGhpcy5fcm91dGVzLmNvbmNhdChfcm91dGVzKSwgX3JvdXRlcztcbiAgICAgICAgfSxcbiAgICAgICAgbG9hZFJvdXRlOiBmdW5jdGlvbiAocm91dGUpe1xuICAgICAgICAgICAgdGhpcy5fcm91dGVzLnB1c2godGhpcy5fbWF0Y2hlci5mb3JtYXRSb3V0ZShyb3V0ZSkpO1xuICAgICAgICB9XG4gICAgfVxufSk7XG4iLCJ2YXIgUmVhY3QgPSB6bnVpLlJlYWN0IHx8IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgZXJyb3IgPSByZXF1aXJlKCcuL2Vycm9yL2luZGV4LmpzJyk7XG52YXIgWlJSb3V0ZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0ZGlzcGxheU5hbWU6J1pSUm91dGUnLFxuXHRfX2hhbmRsZXI6IGZ1bmN0aW9uICgpe1xuXHRcdHZhciBfcmVxdWVzdCA9IHRoaXMucHJvcHMucmVxdWVzdCxcblx0XHRcdF9tYXRjaGVyID0gX3JlcXVlc3QubWF0Y2hlcixcblx0XHRcdF9uZXdSZXF1ZXN0ID0ge1xuXHRcdFx0XHRwYXRoOiBfcmVxdWVzdC5wYXRoLnJlcGxhY2UodGhpcy5wcm9wcy5yb3V0ZS5wYXRoLCAgJycpLFxuXHRcdFx0XHRzZWFyY2g6IF9yZXF1ZXN0LnNlYXJjaCxcblx0XHRcdFx0ZXZlbnQ6IF9yZXF1ZXN0LmV2ZW50LFxuXHRcdFx0XHRtYXRjaGVyOiBfbWF0Y2hlclxuXHRcdFx0fSxcblx0XHRcdF9yb3V0ZXMgPSB0aGlzLnByb3BzLnJvdXRlLl9fcm91dGVzX18sXG5cdFx0XHRfcm91dGUgPSBudWxsLFxuXHRcdFx0X2NvbXBvbmVudCA9IG51bGw7XG4gICAgICAgIGlmKCFfcm91dGVzKSB7XG5cdFx0XHR2YXIgX2ZSb3V0ZSA9IF9tYXRjaGVyLmdldFJvdXRlc0Zyb21Sb3V0ZSh0aGlzLnByb3BzLnJvdXRlKTtcblx0XHRcdF9yb3V0ZXMgPSBfZlJvdXRlLnJvdXRlcztcblx0XHRcdF9jb21wb25lbnQgPSBfZlJvdXRlLmNvbXBvbmVudDtcblx0XHR9XG5cdFx0X3JvdXRlID0gX21hdGNoZXIuZ2V0Um91dGVGb3JSZXF1ZXN0KF9uZXdSZXF1ZXN0LCBfcm91dGVzKTtcblxuXHRcdGlmKF9yb3V0ZSkge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0Q29tcG9uZW50OiBfcm91dGUuY29tcG9uZW50IHx8IF9jb21wb25lbnQsXG5cdFx0XHRcdENvbXBvbmVudFByb3BzOiB6bi5leHRlbmQoe30sIF9yb3V0ZS5wcm9wcywge1xuXHRcdFx0XHRcdGFwcGxpY2F0aW9uOiB0aGlzLnByb3BzLmFwcGxpY2F0aW9uLFxuXHRcdFx0XHRcdHBhcmVudDogdGhpcyxcblx0XHRcdFx0XHRwYXJlbnRSZXF1ZXN0OiBfcmVxdWVzdCxcblx0XHRcdFx0XHRyb3V0ZTogX3JvdXRlLFxuXHRcdFx0XHRcdHJvdXRlcjogdGhpcy5wcm9wcy5yb3V0ZXIsXG5cdFx0XHRcdFx0cmVxdWVzdDogX25ld1JlcXVlc3Rcblx0XHRcdFx0fSlcblx0XHRcdH1cblx0XHR9ZWxzZXtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdENvbXBvbmVudDogZXJyb3IuRXJyb3I0MDQsXG5cdFx0XHRcdENvbXBvbmVudFByb3BzOiB7XG5cdFx0XHRcdFx0YXBwbGljYXRpb246IHRoaXMucHJvcHMuYXBwbGljYXRpb24sXG5cdFx0XHRcdFx0cGFyZW50OiB0aGlzLFxuXHRcdFx0XHRcdHBhcmVudFJlcXVlc3Q6IF9yZXF1ZXN0LFxuXHRcdFx0XHRcdHJvdXRlcjogdGhpcy5wcm9wcy5yb3V0ZXIsXG5cdFx0XHRcdFx0cmVxdWVzdDogX25ld1JlcXVlc3Rcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRcblx0fSxcblx0X19nZXRDb21wb25lbnQ6IGZ1bmN0aW9uICgpe1xuXHRcdHJldHVybiB0aGlzLl9faGFuZGxlcigpO1xuXHR9LFxuXHRyZW5kZXI6IGZ1bmN0aW9uKCl7XG5cdFx0aWYodGhpcy5wcm9wcy5yZXF1ZXN0ICYmIHRoaXMucHJvcHMucm91dGUgJiYgdGhpcy5wcm9wcy5yb3V0ZS5yb3V0ZXMpIHtcblx0XHRcdHZhciBfQ29tcG9uZW50ID0gdGhpcy5fX2dldENvbXBvbmVudCgpO1xuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9e3pudWkucmVhY3QuY2xhc3NuYW1lKFwienItcm91dGVcIiwgdGhpcy5wcm9wcy5jbGFzc05hbWUpfSBzdHlsZT17dGhpcy5wcm9wcy5zdHlsZX0gPlxuXHRcdFx0XHRcdHtfQ29tcG9uZW50LkNvbXBvbmVudCAmJiA8X0NvbXBvbmVudC5Db21wb25lbnQgey4uLl9Db21wb25lbnQuQ29tcG9uZW50UHJvcHN9IC8+fVxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdCk7XG5cdFx0fWVsc2V7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFpSUm91dGU7IiwibW9kdWxlLmV4cG9ydHMgPSB6bi5DbGFzcyh7XG4gICAgc3RhdGljOiB0cnVlLFxuICAgIG1ldGhvZHM6IHtcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICB0aGlzLmZpeFdpbmRvd0hhc2hDaGFuZ2UoKTtcbiAgICAgICAgfSxcbiAgICAgICAgZml4V2luZG93SGFzaENoYW5nZTogZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICAvLyBMZXQgdGhpcyBzbmlwcGV0IHJ1biBiZWZvcmUgeW91ciBoYXNoY2hhbmdlIGV2ZW50IGJpbmRpbmcgY29kZVxuICAgICAgICAgICAgaWYgKCF3aW5kb3cuSGFzaENoYW5nZUV2ZW50KXtcbiAgICAgICAgICAgICAgICAoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxhc3RVUkwgPSBkb2N1bWVudC5VUkw7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiaGFzaGNoYW5nZVwiLCBmdW5jdGlvbihldmVudCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXZlbnQsIFwib2xkVVJMXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogbGFzdFVSTFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXZlbnQsIFwibmV3VVJMXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZG9jdW1lbnQuVVJMXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RVUkwgPSBkb2N1bWVudC5VUkw7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0oKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59KTsiLCJ2YXIgUmVhY3QgPSB6bnVpLlJlYWN0IHx8IHJlcXVpcmUoJ3JlYWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0ZGlzcGxheU5hbWU6J0Vycm9yNDA0Jyxcblx0cmVuZGVyOiBmdW5jdGlvbigpe1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT17em51aS5yZWFjdC5jbGFzc25hbWUoJ3pyLXJvdXRlci1lcnJvci00MDQnLCB0aGlzLnByb3BzLmNsYXNzTmFtZSl9IHN0eWxlPXt0aGlzLnByb3BzLnN0eWxlfSA+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZXJyb3ItaGVhZGVyXCI+XG5cdFx0XHRcdFx0PGgzPkVSUk9SOiA0MDQ8L2gzPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJlcnJvci1ib2R5XCI+XG5cdFx0XHRcdFx0VGhlIHBhdGggPHNwYW4gY2xhc3NOYW1lPVwicGF0aFwiPnt0aGlzLnByb3BzLnJlcXVlc3QucGF0aH08L3NwYW4+IGlzIG5vdCBmb3VuZC5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZXJyb3ItZm9vdGVyXCI+XG5cdFx0XHRcdFx0XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufSk7IiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgJ0Vycm9yNDA0JzogcmVxdWlyZSgnLi9FcnJvcjQwNC5qcycpXG59OyIsInJlcXVpcmUoJy4vVXRpbC5qcycpO1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgSGFzaFJvdXRlcjogcmVxdWlyZSgnLi9IYXNoUm91dGVyLmpzJyksXG4gICAgUm91dGU6IHJlcXVpcmUoJy4vUm91dGUnKVxufTsiLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gdGhpc1tcIlJlYWN0XCJdOyB9KCkpOyJdLCJzb3VyY2VSb290IjoiIn0=
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

var RequestHandler = __webpack_require__(/*! ./RequestHandler */ "./RequestHandler.js");

module.exports = zn.Class(RequestHandler, {
  events: ['hashchange', 'handler'],
  methods: {
    init: function init(argv, events) {
      if (this["super"].caller) {
        this["super"](argv);
      } else {
        this.constructor._super_.prototype.init(argv);
      }

      this.__initEvents(events || {});

      if (argv.main && !location.hash) {
        location.hash = argv.main;
      } else {
        this.__hashchange();
      }

      window.addEventListener('hashchange', this.__hashchange.bind(this), false);
    },
    __initEvents: function __initEvents(events) {
      for (var event in events) {
        this.on(event, events[event], this);
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
    new HashHandler(this.props, {
      hashchange: this.__hashchange,
      handler: this.__handler,
      request: this.__request,
      notfound: this.__notfound
    });
  },
  __hashchange: function __hashchange(sender, event) {},
  __handler: function __handler(sender, event, data) {},
  __request: function __request(sender, request, route) {
    this.setState({
      Component: route.component,
      ComponentProps: zn.extend({}, route.props, {
        application: this.props.application,
        config: this.props.application._config,
        request: request,
        router: this,
        route: route
      })
    });
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
  __notfound: function __notfound(sender, request) {
    this.notfound(request);
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

module.exports = zn.Class({
  properties: {
    pathSeparator: null,
    pathParameterSymbol: null
  },
  methods: {
    init: function init(argv, events) {
      this._pathSeparator = argv.pathSeparator || '/';
      this._pathParameterSymbol = argv.pathParameterSymbol || ':';
    },
    formatRoute: function formatRoute(route) {
      route.paths = this.__parseRoutePaths(route.path);
      route.props = zn.extend({}, route.props);

      if (route.exact == null) {
        route.exact = true;
      }

      return route;
    },
    formatRoutes: function formatRoutes(routes) {
      var _this = this;

      var _routes = [];

      if (zn.is(routes, 'object')) {
        for (var path in routes) {
          _routes.push(this.__loadPathAndComponent(path, routes[path]));
        }
      } else if (zn.is(routes, 'array')) {
        return routes.map(function (route) {
          return _this.formatRoute(route);
        });
      } else if (zn.is(routes, 'function')) {
        return this.formatRoutes(routes.call(this));
      }

      return _routes;
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
    __isReactComponent: function __isReactComponent(component) {
      if (component && zn.is(component, 'function') && (component.prototype.render || component.displayName)) {
        return true;
      }

      return false;
    },
    __loadPathAndComponent: function __loadPathAndComponent(path, component) {
      var _route = {
        path: path
      };

      if (zn.is(component, 'string')) {
        _route.component = zn.path(window, component);
      } else if (zn.is(component, 'function')) {
        if (!this.__isReactComponent(component)) {
          _route.component = component.call(this, path, this);
        } else {
          _route.component = component;
        }
      } else if (zn.is(component, 'object')) {
        zn.extend(_route, component);
      }

      return this.formatRoute(_route);
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

var PathMatcher = __webpack_require__(/*! ./PathMatcher */ "./PathMatcher.js");

module.exports = zn.Class({
  events: ['request', 'notfound'],
  properties: {
    requests: null,
    routes: null
  },
  methods: {
    init: function init(argv) {
      this._requests = [];
      this._routes = [];
      this._matcher = new PathMatcher(argv);
      this.loadPlugins(argv.plugins);
      this.loadRoutes(argv.routes);
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
        plugins.forEach(function (plugin) {});
      }
    },
    loadPlugin: function loadPlugin() {},
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
        _routes = _matcher.formatRoutes(this.__mergeRoutesAndPlugins(this.props.route.routes, this.props.route.plugins)),
        _route = _matcher.getRouteForRequest(_newRequest, _routes);

    if (_route) {
      return {
        Component: _route.component,
        ComponentProps: zn.extend({}, _route.props, {
          application: this.props.application,
          config: this.props.config,
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
          config: this.props.config,
          parent: this,
          parentRequest: _request,
          router: this.props.router,
          request: _newRequest
        }
      };
    }
  },
  __mergeRoutesAndPlugins: function __mergeRoutesAndPlugins(routes, plugins) {
    return routes;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vSGFzaEhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vSGFzaFJvdXRlci5qcyIsIndlYnBhY2s6Ly8vLi9QYXRoTWF0Y2hlci5qcyIsIndlYnBhY2s6Ly8vLi9SZXF1ZXN0SGFuZGxlci5qcyIsIndlYnBhY2s6Ly8vLi9Sb3V0ZS5qcyIsIndlYnBhY2s6Ly8vLi9VdGlsLmpzIiwid2VicGFjazovLy8uL2Vycm9yL0Vycm9yNDA0LmpzIiwid2VicGFjazovLy8uL2Vycm9yL2luZGV4LmpzIiwid2VicGFjazovLy8uL2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcIlJlYWN0XCIiXSwibmFtZXMiOlsiUmVxdWVzdEhhbmRsZXIiLCJyZXF1aXJlIiwibW9kdWxlIiwiZXhwb3J0cyIsInpuIiwiQ2xhc3MiLCJldmVudHMiLCJtZXRob2RzIiwiaW5pdCIsImFyZ3YiLCJjYWxsZXIiLCJjb25zdHJ1Y3RvciIsIl9zdXBlcl8iLCJwcm90b3R5cGUiLCJfX2luaXRFdmVudHMiLCJtYWluIiwibG9jYXRpb24iLCJoYXNoIiwiX19oYXNoY2hhbmdlIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImJpbmQiLCJldmVudCIsIm9uIiwiX3JldHVybiIsImZpcmUiLCJfaGFzaCIsIl9fcGFyc2VIYXNoIiwiX3JlcXVlc3QiLCJjcmVhdGVSZXF1ZXN0IiwiZG9SZXF1ZXN0IiwiX3NlYXJjaCIsInNlYXJjaCIsIl9oYXNoU3BsaXRJbmRleCIsImluZGV4T2YiLCJyZXBsYWNlIiwic3Vic3RyaW5nIiwicGF0aCIsInF1ZXJ5c3RyaW5nIiwicGFyc2UiLCJSZWFjdCIsInpudWkiLCJIYXNoSGFuZGxlciIsImVycm9yIiwiY3JlYXRlQ2xhc3MiLCJkaXNwbGF5TmFtZSIsImdldEluaXRpYWxTdGF0ZSIsIkNvbXBvbmVudCIsIkNvbXBvbmVudFByb3BzIiwiY29tcG9uZW50RGlkTW91bnQiLCJfX2luaXRIYW5kbGVyIiwicHJvcHMiLCJoYXNoY2hhbmdlIiwiaGFuZGxlciIsIl9faGFuZGxlciIsInJlcXVlc3QiLCJfX3JlcXVlc3QiLCJub3Rmb3VuZCIsIl9fbm90Zm91bmQiLCJzZW5kZXIiLCJkYXRhIiwicm91dGUiLCJzZXRTdGF0ZSIsImNvbXBvbmVudCIsImV4dGVuZCIsImFwcGxpY2F0aW9uIiwiY29uZmlnIiwiX2NvbmZpZyIsInJvdXRlciIsInB1c2giLCJmb3J3YXJkIiwiRXJyb3I0MDQiLCJyZW5kZXIiLCJyZWFjdCIsImNsYXNzbmFtZSIsImNsYXNzTmFtZSIsInN0eWxlIiwic3RhdGUiLCJwcm9wZXJ0aWVzIiwicGF0aFNlcGFyYXRvciIsInBhdGhQYXJhbWV0ZXJTeW1ib2wiLCJfcGF0aFNlcGFyYXRvciIsIl9wYXRoUGFyYW1ldGVyU3ltYm9sIiwiZm9ybWF0Um91dGUiLCJwYXRocyIsIl9fcGFyc2VSb3V0ZVBhdGhzIiwiZXhhY3QiLCJmb3JtYXRSb3V0ZXMiLCJyb3V0ZXMiLCJfcm91dGVzIiwiaXMiLCJfX2xvYWRQYXRoQW5kQ29tcG9uZW50IiwibWFwIiwiY2FsbCIsImdldFJvdXRlRm9yUmVxdWVzdCIsIl9yb3V0ZSIsIl9kYXRhIiwiaSIsIl9sZW4iLCJsZW5ndGgiLCJfX21hdGNoUm91dGVBbmRSZXF1ZXN0IiwicGFyYW1zIiwiX19pc1JlYWN0Q29tcG9uZW50IiwiX3BhdGhzIiwiX3BhdGgiLCJfcGFyYW1zIiwiX3VybFVubWF0Y2hzIiwiX2hhc0NoZWNrZWQiLCJfdGVtcCIsIl90ZW1wcyIsInNwbGl0IiwiT2JqZWN0Iiwia2V5cyIsInVubWF0Y2hzIiwiaXNQYXJhbWV0ZXIiLCJrZXkiLCJ0ZXN0IiwiUGF0aE1hdGNoZXIiLCJyZXF1ZXN0cyIsIl9yZXF1ZXN0cyIsIl9tYXRjaGVyIiwibG9hZFBsdWdpbnMiLCJwbHVnaW5zIiwibG9hZFJvdXRlcyIsIm1hdGNoZXIiLCJfcGx1Z2lucyIsInR5cGUiLCJmb3JFYWNoIiwicGx1Z2luIiwibG9hZFBsdWdpbiIsImNvbmNhdCIsImxvYWRSb3V0ZSIsIlpSUm91dGUiLCJfbmV3UmVxdWVzdCIsIl9fbWVyZ2VSb3V0ZXNBbmRQbHVnaW5zIiwicGFyZW50IiwicGFyZW50UmVxdWVzdCIsIl9fZ2V0Q29tcG9uZW50IiwiX0NvbXBvbmVudCIsImZpeFdpbmRvd0hhc2hDaGFuZ2UiLCJIYXNoQ2hhbmdlRXZlbnQiLCJsYXN0VVJMIiwiZG9jdW1lbnQiLCJVUkwiLCJkZWZpbmVQcm9wZXJ0eSIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJ2YWx1ZSIsIkhhc2hSb3V0ZXIiLCJSb3V0ZSJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBLElBQUlBLGNBQWMsR0FBR0MsbUJBQU8sQ0FBQyw2Q0FBRCxDQUE1Qjs7QUFDQUMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCQyxFQUFFLENBQUNDLEtBQUgsQ0FBU0wsY0FBVCxFQUF5QjtBQUN0Q00sUUFBTSxFQUFFLENBQUMs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bWVudC9pbmRleC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2luZGV4LmpzXCIpO1xuIiwidmFyIFJlcXVlc3RIYW5kbGVyID0gcmVxdWlyZSgnLi9SZXF1ZXN0SGFuZGxlcicpO1xubW9kdWxlLmV4cG9ydHMgPSB6bi5DbGFzcyhSZXF1ZXN0SGFuZGxlciwge1xuICAgIGV2ZW50czogWydoYXNoY2hhbmdlJywgJ2hhbmRsZXInXSxcbiAgICBtZXRob2RzOiB7XG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uIChhcmd2LCBldmVudHMpe1xuICAgICAgICAgICAgaWYodGhpcy5zdXBlci5jYWxsZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN1cGVyKGFyZ3YpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdGhpcy5jb25zdHJ1Y3Rvci5fc3VwZXJfLnByb3RvdHlwZS5pbml0KGFyZ3YpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fX2luaXRFdmVudHMoZXZlbnRzIHx8IHt9KTtcbiAgICAgICAgICAgIGlmKGFyZ3YubWFpbiAmJiAhbG9jYXRpb24uaGFzaCl7XG4gICAgICAgICAgICAgICAgbG9jYXRpb24uaGFzaCA9IGFyZ3YubWFpbjtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHRoaXMuX19oYXNoY2hhbmdlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsIHRoaXMuX19oYXNoY2hhbmdlLmJpbmQodGhpcyksIGZhbHNlKTtcbiAgICAgICAgfSxcbiAgICAgICAgX19pbml0RXZlbnRzOiBmdW5jdGlvbiAoZXZlbnRzKXtcbiAgICAgICAgICAgIGZvcih2YXIgZXZlbnQgaW4gZXZlbnRzKXtcbiAgICAgICAgICAgICAgICB0aGlzLm9uKGV2ZW50LCBldmVudHNbZXZlbnRdLCB0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgX19oYXNoY2hhbmdlOiBmdW5jdGlvbiAoZXZlbnQpe1xuICAgICAgICAgICAgdmFyIF9yZXR1cm4gPSB0aGlzLmZpcmUoJ2hhc2hjaGFuZ2UnLCBldmVudCk7XG4gICAgICAgICAgICBpZihfcmV0dXJuID09PSBmYWxzZSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgdmFyIF9oYXNoID0gdGhpcy5fX3BhcnNlSGFzaCgpLFxuICAgICAgICAgICAgICAgIF9yZXF1ZXN0ID0gdGhpcy5jcmVhdGVSZXF1ZXN0KF9oYXNoLCBldmVudCk7XG5cbiAgICAgICAgICAgIF9yZXR1cm4gPSB0aGlzLmZpcmUoJ2hhbmRsZXInLCBldmVudCwgX2hhc2gpO1xuICAgICAgICAgICAgaWYoX3JldHVybiA9PT0gZmFsc2UpIHJldHVybiBmYWxzZTtcblxuICAgICAgICAgICAgdGhpcy5kb1JlcXVlc3QoX3JlcXVlc3QpO1xuICAgICAgICB9LFxuICAgICAgICBfX3BhcnNlSGFzaDogZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICB2YXIgX2hhc2ggPSBsb2NhdGlvbi5oYXNoLFxuICAgICAgICAgICAgICAgIF9zZWFyY2ggPSBsb2NhdGlvbi5zZWFyY2gsXG4gICAgICAgICAgICAgICAgX2hhc2hTcGxpdEluZGV4ID0gX2hhc2guaW5kZXhPZignPycpO1xuICAgICAgICAgICAgaWYoX3NlYXJjaCAmJiBfc2VhcmNoLmluZGV4T2YoJz8nKSE9PS0xKXtcbiAgICAgICAgICAgICAgICBfc2VhcmNoID0gX3NlYXJjaC5yZXBsYWNlKCc/JywgJycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoX2hhc2hTcGxpdEluZGV4ICE9PSAtMSl7XG4gICAgICAgICAgICAgICAgX3NlYXJjaCA9IF9zZWFyY2ggKyAnJicrIF9oYXNoLnN1YnN0cmluZyhfaGFzaFNwbGl0SW5kZXggKyAxKTtcbiAgICAgICAgICAgICAgICBfaGFzaCA9IF9oYXNoLnN1YnN0cmluZygwLCBfaGFzaFNwbGl0SW5kZXgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHBhdGg6IF9oYXNoLnN1YnN0cmluZygxKSxcbiAgICAgICAgICAgICAgICBzZWFyY2g6IHpuLnF1ZXJ5c3RyaW5nLnBhcnNlKF9zZWFyY2gpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59KTtcbiIsInZhciBSZWFjdCA9IHpudWkuUmVhY3QgfHwgcmVxdWlyZSgncmVhY3QnKTtcbnZhciBIYXNoSGFuZGxlciA9IHJlcXVpcmUoJy4vSGFzaEhhbmRsZXInKTtcbnZhciBlcnJvciA9IHJlcXVpcmUoJy4vZXJyb3IvaW5kZXguanMnKTtcbm1vZHVsZS5leHBvcnRzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRkaXNwbGF5TmFtZTonWlJIYXNoUm91dGVyJyxcblx0Z2V0SW5pdGlhbFN0YXRlOmZ1bmN0aW9uKCl7XG5cdFx0cmV0dXJuIHtcblx0XHRcdENvbXBvbmVudDogbnVsbCxcblx0XHRcdENvbXBvbmVudFByb3BzOiBudWxsXG5cdFx0fVxuXHR9LFxuXHRjb21wb25lbnREaWRNb3VudDpmdW5jdGlvbigpe1xuXHRcdHRoaXMuX19pbml0SGFuZGxlcigpO1xuXHR9LFxuXHRfX2luaXRIYW5kbGVyOiBmdW5jdGlvbiAoKXtcblx0XHRuZXcgSGFzaEhhbmRsZXIodGhpcy5wcm9wcywge1xuXHRcdFx0aGFzaGNoYW5nZTogdGhpcy5fX2hhc2hjaGFuZ2UsXG5cdFx0XHRoYW5kbGVyOiB0aGlzLl9faGFuZGxlcixcblx0XHRcdHJlcXVlc3Q6IHRoaXMuX19yZXF1ZXN0LFxuXHRcdFx0bm90Zm91bmQ6IHRoaXMuX19ub3Rmb3VuZFxuXHRcdH0pO1xuXHR9LFxuXHRfX2hhc2hjaGFuZ2U6IGZ1bmN0aW9uIChzZW5kZXIsIGV2ZW50KXtcblx0XHRcblx0fSxcblx0X19oYW5kbGVyOiBmdW5jdGlvbiAoc2VuZGVyLCBldmVudCwgZGF0YSl7XG5cdFx0XG5cdH0sXG5cdF9fcmVxdWVzdDogZnVuY3Rpb24gKHNlbmRlciwgcmVxdWVzdCwgcm91dGUpe1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0Q29tcG9uZW50OiByb3V0ZS5jb21wb25lbnQsXG5cdFx0XHRDb21wb25lbnRQcm9wczogem4uZXh0ZW5kKHt9LCByb3V0ZS5wcm9wcywge1xuXHRcdFx0XHRhcHBsaWNhdGlvbjogdGhpcy5wcm9wcy5hcHBsaWNhdGlvbixcblx0XHRcdFx0Y29uZmlnOiB0aGlzLnByb3BzLmFwcGxpY2F0aW9uLl9jb25maWcsXG5cdFx0XHRcdHJlcXVlc3Q6IHJlcXVlc3QsXG5cdFx0XHRcdHJvdXRlcjogdGhpcyxcblx0XHRcdFx0cm91dGU6IHJvdXRlXG5cdFx0XHR9KVxuXHRcdH0pO1xuXHR9LFxuXHRwdXNoOiBmdW5jdGlvbiAoKXtcblxuXHR9LFxuXHRmb3J3YXJkOiBmdW5jdGlvbiAoKXtcblxuXHR9LFxuXHRub3Rmb3VuZDogZnVuY3Rpb24gKHJlcXVlc3Qpe1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0Q29tcG9uZW50OiBlcnJvci5FcnJvcjQwNCxcblx0XHRcdENvbXBvbmVudFByb3BzOiB7XG5cdFx0XHRcdHJlcXVlc3Q6IHJlcXVlc3Rcblx0XHRcdH1cblx0XHR9KTtcblx0fSxcblx0X19ub3Rmb3VuZDogZnVuY3Rpb24gKHNlbmRlciwgcmVxdWVzdCl7XG5cdFx0dGhpcy5ub3Rmb3VuZChyZXF1ZXN0KTtcblx0fSxcblx0cmVuZGVyOiBmdW5jdGlvbigpe1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT17em51aS5yZWFjdC5jbGFzc25hbWUoXCJ6ci1oYXNoLXJvdXRlclwiLCB0aGlzLnByb3BzLmNsYXNzTmFtZSl9IHN0eWxlPXt0aGlzLnByb3BzLnN0eWxlfSA+XG5cdFx0XHRcdHt0aGlzLnN0YXRlLkNvbXBvbmVudCAmJiA8dGhpcy5zdGF0ZS5Db21wb25lbnQgey4uLnRoaXMuc3RhdGUuQ29tcG9uZW50UHJvcHN9IC8+fVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufSk7IiwibW9kdWxlLmV4cG9ydHMgPSB6bi5DbGFzcyh7XG4gICAgcHJvcGVydGllczp7IFxuICAgICAgICBwYXRoU2VwYXJhdG9yOiBudWxsLFxuICAgICAgICBwYXRoUGFyYW1ldGVyU3ltYm9sOiBudWxsXG4gICAgfSxcbiAgICBtZXRob2RzOiB7XG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uIChhcmd2LCBldmVudHMpe1xuICAgICAgICAgICAgdGhpcy5fcGF0aFNlcGFyYXRvciA9IGFyZ3YucGF0aFNlcGFyYXRvciB8fCAnLyc7XG4gICAgICAgICAgICB0aGlzLl9wYXRoUGFyYW1ldGVyU3ltYm9sID0gYXJndi5wYXRoUGFyYW1ldGVyU3ltYm9sIHx8ICc6JztcbiAgICAgICAgfSxcbiAgICAgICAgZm9ybWF0Um91dGU6IGZ1bmN0aW9uIChyb3V0ZSl7XG4gICAgICAgICAgICByb3V0ZS5wYXRocyA9IHRoaXMuX19wYXJzZVJvdXRlUGF0aHMocm91dGUucGF0aCk7XG4gICAgICAgICAgICByb3V0ZS5wcm9wcyA9IHpuLmV4dGVuZCh7fSwgcm91dGUucHJvcHMpO1xuICAgICAgICAgICAgaWYocm91dGUuZXhhY3QgPT0gbnVsbCkgeyByb3V0ZS5leGFjdCA9IHRydWU7IH1cblxuICAgICAgICAgICAgcmV0dXJuIHJvdXRlO1xuICAgICAgICB9LFxuICAgICAgICBmb3JtYXRSb3V0ZXM6IGZ1bmN0aW9uIChyb3V0ZXMpe1xuICAgICAgICAgICAgdmFyIF9yb3V0ZXMgPSBbXTtcbiAgICAgICAgICAgIGlmKHpuLmlzKHJvdXRlcywgJ29iamVjdCcpKXtcbiAgICAgICAgICAgICAgICBmb3IodmFyIHBhdGggaW4gcm91dGVzKXtcbiAgICAgICAgICAgICAgICAgICAgX3JvdXRlcy5wdXNoKHRoaXMuX19sb2FkUGF0aEFuZENvbXBvbmVudChwYXRoLCByb3V0ZXNbcGF0aF0pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZSBpZih6bi5pcyhyb3V0ZXMsICdhcnJheScpKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gcm91dGVzLm1hcCgocm91dGUpPT50aGlzLmZvcm1hdFJvdXRlKHJvdXRlKSk7XG4gICAgICAgICAgICB9ZWxzZSBpZih6bi5pcyhyb3V0ZXMsICdmdW5jdGlvbicpKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5mb3JtYXRSb3V0ZXMocm91dGVzLmNhbGwodGhpcykpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gX3JvdXRlcztcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0Um91dGVGb3JSZXF1ZXN0OiBmdW5jdGlvbiAocmVxdWVzdCwgcm91dGVzKXtcbiAgICAgICAgICAgIHZhciBfcm91dGVzID0gcm91dGVzLFxuICAgICAgICAgICAgICAgIF9yb3V0ZSA9IG51bGwsXG4gICAgICAgICAgICAgICAgX2RhdGEgPSBudWxsO1xuICAgICAgICAgICAgZm9yKHZhciBpID0gMCwgX2xlbiA9IF9yb3V0ZXMubGVuZ3RoOyBpIDwgX2xlbjsgaSsrKXtcbiAgICAgICAgICAgICAgICBfcm91dGUgPSBfcm91dGVzW2ldO1xuICAgICAgICAgICAgICAgIF9kYXRhID0gdGhpcy5fX21hdGNoUm91dGVBbmRSZXF1ZXN0KF9yb3V0ZSwgcmVxdWVzdCk7XG4gICAgICAgICAgICAgICAgaWYoX2RhdGEpe1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKCFfZGF0YSB8fCAhX3JvdXRlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcmVxdWVzdC5wYXJhbXMgPSBfZGF0YSwgX3JvdXRlO1xuICAgICAgICB9LFxuICAgICAgICBfX2lzUmVhY3RDb21wb25lbnQ6IGZ1bmN0aW9uIChjb21wb25lbnQpe1xuICAgICAgICAgICAgaWYoY29tcG9uZW50ICYmIHpuLmlzKGNvbXBvbmVudCwgJ2Z1bmN0aW9uJykgJiYgKGNvbXBvbmVudC5wcm90b3R5cGUucmVuZGVyIHx8IGNvbXBvbmVudC5kaXNwbGF5TmFtZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9LFxuICAgICAgICBfX2xvYWRQYXRoQW5kQ29tcG9uZW50OiBmdW5jdGlvbiAocGF0aCwgY29tcG9uZW50KXtcbiAgICAgICAgICAgIHZhciBfcm91dGUgPSB7IHBhdGg6IHBhdGggfTtcbiAgICAgICAgICAgIGlmKHpuLmlzKGNvbXBvbmVudCwgJ3N0cmluZycpKXtcbiAgICAgICAgICAgICAgICBfcm91dGUuY29tcG9uZW50ID0gem4ucGF0aCh3aW5kb3csIGNvbXBvbmVudCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYoem4uaXMoY29tcG9uZW50LCAnZnVuY3Rpb24nKSl7XG4gICAgICAgICAgICAgICAgaWYoIXRoaXMuX19pc1JlYWN0Q29tcG9uZW50KGNvbXBvbmVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgX3JvdXRlLmNvbXBvbmVudCA9IGNvbXBvbmVudC5jYWxsKHRoaXMsIHBhdGgsIHRoaXMpO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBfcm91dGUuY29tcG9uZW50ID0gY29tcG9uZW50O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZih6bi5pcyhjb21wb25lbnQsICdvYmplY3QnKSl7XG4gICAgICAgICAgICAgICAgem4uZXh0ZW5kKF9yb3V0ZSwgY29tcG9uZW50KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZm9ybWF0Um91dGUoX3JvdXRlKTtcbiAgICAgICAgfSxcbiAgICAgICAgXG4gICAgICAgIF9fbWF0Y2hSb3V0ZUFuZFJlcXVlc3Q6IGZ1bmN0aW9uIChyb3V0ZSwgcmVxdWVzdCl7XG4gICAgICAgICAgICB2YXIgX3BhdGhzID0gcm91dGUucGF0aHMsXG4gICAgICAgICAgICAgICAgX3BhdGggPSBudWxsLFxuICAgICAgICAgICAgICAgIF9wYXJhbXMgPSB7fSxcbiAgICAgICAgICAgICAgICBfdXJsVW5tYXRjaHMgPSBbXSxcbiAgICAgICAgICAgICAgICBfaGFzQ2hlY2tlZCA9IGZhbHNlLFxuICAgICAgICAgICAgICAgIF90ZW1wID0gbnVsbCxcbiAgICAgICAgICAgICAgICBfdGVtcHMgPSByZXF1ZXN0LnBhdGguc3BsaXQodGhpcy5fcGF0aFNlcGFyYXRvcik7XG5cbiAgICAgICAgICAgIGlmKHJvdXRlLnJvdXRlcyAmJiBPYmplY3Qua2V5cyhyb3V0ZS5yb3V0ZXMpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGlmKHJvdXRlLmV4YWN0ID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgcm91dGUuZXhhY3QgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHJvdXRlLmV4YWN0KSB7XG4gICAgICAgICAgICAgICAgaWYocm91dGUucGF0aCA9PT0gcmVxdWVzdC5wYXRoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXF1ZXN0LnVubWF0Y2hzID0gX3VybFVubWF0Y2hzLCBfcGFyYW1zOyBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYoX3RlbXBzLmxlbmd0aCAhPT0gX3BhdGhzLmxlbmd0aCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDAsIF9sZW4gPSBfdGVtcHMubGVuZ3RoOyBpIDwgX2xlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgX3RlbXAgPSBfdGVtcHNbaV07XG4gICAgICAgICAgICAgICAgaWYoIV90ZW1wKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBfcGF0aCA9IF9wYXRoc1tpXTtcbiAgICAgICAgICAgICAgICBfaGFzQ2hlY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgaWYoIV9wYXRoKXtcbiAgICAgICAgICAgICAgICAgICAgX3VybFVubWF0Y2hzLnB1c2goX3RlbXApO1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYoIV9wYXRoLmlzUGFyYW1ldGVyICYmIF90ZW1wICE9PSBfcGF0aC5rZXkpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYoX3BhdGguaXNQYXJhbWV0ZXIpe1xuICAgICAgICAgICAgICAgICAgICBfcGFyYW1zW19wYXRoLmtleV0gPSBfdGVtcDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZighX2hhc0NoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiByZXF1ZXN0LnVubWF0Y2hzID0gX3VybFVubWF0Y2hzLCBfcGFyYW1zO1xuICAgICAgICB9LFxuICAgICAgICBfX3BhcnNlUm91dGVQYXRoczogZnVuY3Rpb24gKHBhdGgpe1xuICAgICAgICAgICAgdmFyIF9wYXRocyA9IFtdLFxuICAgICAgICAgICAgICAgIF90ZW1wID0gbnVsbCxcbiAgICAgICAgICAgICAgICBfdGVtcHMgPSBwYXRoLnNwbGl0KHRoaXMuX3BhdGhTZXBhcmF0b3IpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwLCBfbGVuID0gX3RlbXBzLmxlbmd0aDsgaSA8IF9sZW47IGkrKykge1xuICAgICAgICAgICAgICAgIF90ZW1wID0gX3RlbXBzW2ldO1xuICAgICAgICAgICAgICAgIGlmKCFfdGVtcCkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKC9eOlxcd1tcXHdcXGRdKiQvLnRlc3QoX3RlbXApKSB7XG4gICAgICAgICAgICAgICAgICAgIF90ZW1wID0gX3RlbXAucmVwbGFjZSgvXjovLCAnJyk7XG4gICAgICAgICAgICAgICAgICAgIF9wYXRoc1tpXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleTogX3RlbXAsXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1BhcmFtZXRlcjogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBfcGF0aHNbaV0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IF90ZW1wXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gX3BhdGhzO1xuICAgICAgICB9XG4gICAgfVxufSk7IiwidmFyIFBhdGhNYXRjaGVyID0gcmVxdWlyZSgnLi9QYXRoTWF0Y2hlcicpO1xubW9kdWxlLmV4cG9ydHMgPSB6bi5DbGFzcyh7XG4gICAgZXZlbnRzOiBbJ3JlcXVlc3QnLCAnbm90Zm91bmQnXSxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHJlcXVlc3RzOiBudWxsLFxuICAgICAgICByb3V0ZXM6IG51bGxcbiAgICB9LFxuICAgIG1ldGhvZHM6IHtcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKGFyZ3Ype1xuICAgICAgICAgICAgdGhpcy5fcmVxdWVzdHMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX3JvdXRlcyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5fbWF0Y2hlciA9IG5ldyBQYXRoTWF0Y2hlcihhcmd2KTtcbiAgICAgICAgICAgIHRoaXMubG9hZFBsdWdpbnMoYXJndi5wbHVnaW5zKTtcbiAgICAgICAgICAgIHRoaXMubG9hZFJvdXRlcyhhcmd2LnJvdXRlcyk7XG4gICAgICAgIH0sXG4gICAgICAgIGNyZWF0ZVJlcXVlc3Q6IGZ1bmN0aW9uIChyZXF1ZXN0LCBldmVudCl7XG4gICAgICAgICAgICByZXF1ZXN0LmV2ZW50ID0gZXZlbnQ7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdHMucHVzaChyZXF1ZXN0KSwgcmVxdWVzdDtcbiAgICAgICAgfSxcbiAgICAgICAgZG9SZXF1ZXN0OiBmdW5jdGlvbiAocmVxdWVzdCl7XG4gICAgICAgICAgICB2YXIgX3JvdXRlID0gdGhpcy5fbWF0Y2hlci5nZXRSb3V0ZUZvclJlcXVlc3QocmVxdWVzdCwgdGhpcy5fcm91dGVzKTtcbiAgICAgICAgICAgIHJlcXVlc3QubWF0Y2hlciA9IHRoaXMuX21hdGNoZXI7XG4gICAgICAgICAgICBpZihfcm91dGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpcmUoJ3JlcXVlc3QnLCByZXF1ZXN0LCBfcm91dGUpO1xuICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZmlyZSgnbm90Zm91bmQnLCByZXF1ZXN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbG9hZFBsdWdpbnM6IGZ1bmN0aW9uIChwbHVnaW5zKXtcbiAgICAgICAgICAgIHZhciBfcGx1Z2lucyA9IHBsdWdpbnMgfHwgW107XG4gICAgICAgICAgICBzd2l0Y2goem4udHlwZShwbHVnaW5zKSl7XG4gICAgICAgICAgICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgICAgICAgICAgICAgX3BsdWdpbnMgPSBbcGx1Z2luc107XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2Z1bmN0aW9uJzpcbiAgICAgICAgICAgICAgICAgICAgX3BsdWdpbnMgPSBwbHVnaW5zKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKF9wbHVnaW5zICYmIF9wbHVnaW5zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHBsdWdpbnMuZm9yRWFjaChmdW5jdGlvbiAocGx1Z2luKXtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICB9LFxuICAgICAgICBsb2FkUGx1Z2luOiBmdW5jdGlvbiAoKXtcblxuICAgICAgICB9LFxuICAgICAgICBsb2FkUm91dGVzOiBmdW5jdGlvbiAocm91dGVzKXtcbiAgICAgICAgICAgIHZhciBfcm91dGVzID0gdGhpcy5fbWF0Y2hlci5mb3JtYXRSb3V0ZXMocm91dGVzKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yb3V0ZXMgPSB0aGlzLl9yb3V0ZXMuY29uY2F0KF9yb3V0ZXMpLCBfcm91dGVzO1xuICAgICAgICB9LFxuICAgICAgICBsb2FkUm91dGU6IGZ1bmN0aW9uIChyb3V0ZSl7XG4gICAgICAgICAgICB0aGlzLl9yb3V0ZXMucHVzaCh0aGlzLl9tYXRjaGVyLmZvcm1hdFJvdXRlKHJvdXRlKSk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcbiIsInZhciBSZWFjdCA9IHpudWkuUmVhY3QgfHwgcmVxdWlyZSgncmVhY3QnKTtcbnZhciBlcnJvciA9IHJlcXVpcmUoJy4vZXJyb3IvaW5kZXguanMnKTtcbnZhciBaUlJvdXRlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRkaXNwbGF5TmFtZTonWlJSb3V0ZScsXG5cdF9faGFuZGxlcjogZnVuY3Rpb24gKCl7XG5cdFx0dmFyIF9yZXF1ZXN0ID0gdGhpcy5wcm9wcy5yZXF1ZXN0LFxuXHRcdFx0X21hdGNoZXIgPSBfcmVxdWVzdC5tYXRjaGVyLFxuXHRcdFx0X25ld1JlcXVlc3QgPSB7XG5cdFx0XHRcdHBhdGg6IF9yZXF1ZXN0LnBhdGgucmVwbGFjZSh0aGlzLnByb3BzLnJvdXRlLnBhdGgsICAnJyksXG5cdFx0XHRcdHNlYXJjaDogX3JlcXVlc3Quc2VhcmNoLFxuXHRcdFx0XHRldmVudDogX3JlcXVlc3QuZXZlbnQsXG5cdFx0XHRcdG1hdGNoZXI6IF9tYXRjaGVyXG5cdFx0XHR9LFxuXHRcdFx0X3JvdXRlcyA9IF9tYXRjaGVyLmZvcm1hdFJvdXRlcyh0aGlzLl9fbWVyZ2VSb3V0ZXNBbmRQbHVnaW5zKHRoaXMucHJvcHMucm91dGUucm91dGVzLCB0aGlzLnByb3BzLnJvdXRlLnBsdWdpbnMpKSxcblx0XHRcdF9yb3V0ZSA9IF9tYXRjaGVyLmdldFJvdXRlRm9yUmVxdWVzdChfbmV3UmVxdWVzdCwgX3JvdXRlcyk7XG5cblx0XHRcblx0XHRpZihfcm91dGUpIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdENvbXBvbmVudDogX3JvdXRlLmNvbXBvbmVudCxcblx0XHRcdFx0Q29tcG9uZW50UHJvcHM6IHpuLmV4dGVuZCh7fSwgX3JvdXRlLnByb3BzLCB7XG5cdFx0XHRcdFx0YXBwbGljYXRpb246IHRoaXMucHJvcHMuYXBwbGljYXRpb24sXG5cdFx0XHRcdFx0Y29uZmlnOiB0aGlzLnByb3BzLmNvbmZpZyxcblx0XHRcdFx0XHRwYXJlbnQ6IHRoaXMsXG5cdFx0XHRcdFx0cGFyZW50UmVxdWVzdDogX3JlcXVlc3QsXG5cdFx0XHRcdFx0cm91dGU6IF9yb3V0ZSxcblx0XHRcdFx0XHRyb3V0ZXI6IHRoaXMucHJvcHMucm91dGVyLFxuXHRcdFx0XHRcdHJlcXVlc3Q6IF9uZXdSZXF1ZXN0XG5cdFx0XHRcdH0pXG5cdFx0XHR9XG5cdFx0fWVsc2V7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRDb21wb25lbnQ6IGVycm9yLkVycm9yNDA0LFxuXHRcdFx0XHRDb21wb25lbnRQcm9wczoge1xuXHRcdFx0XHRcdGFwcGxpY2F0aW9uOiB0aGlzLnByb3BzLmFwcGxpY2F0aW9uLFxuXHRcdFx0XHRcdGNvbmZpZzogdGhpcy5wcm9wcy5jb25maWcsXG5cdFx0XHRcdFx0cGFyZW50OiB0aGlzLFxuXHRcdFx0XHRcdHBhcmVudFJlcXVlc3Q6IF9yZXF1ZXN0LFxuXHRcdFx0XHRcdHJvdXRlcjogdGhpcy5wcm9wcy5yb3V0ZXIsXG5cdFx0XHRcdFx0cmVxdWVzdDogX25ld1JlcXVlc3Rcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRcblx0fSxcblx0X19tZXJnZVJvdXRlc0FuZFBsdWdpbnM6IGZ1bmN0aW9uIChyb3V0ZXMsIHBsdWdpbnMpIHtcblx0XHRyZXR1cm4gcm91dGVzO1xuXHR9LFxuXHRfX2dldENvbXBvbmVudDogZnVuY3Rpb24gKCl7XG5cdFx0cmV0dXJuIHRoaXMuX19oYW5kbGVyKCk7XG5cdH0sXG5cdHJlbmRlcjogZnVuY3Rpb24oKXtcblx0XHRpZih0aGlzLnByb3BzLnJlcXVlc3QgJiYgdGhpcy5wcm9wcy5yb3V0ZSAmJiB0aGlzLnByb3BzLnJvdXRlLnJvdXRlcykge1xuXHRcdFx0dmFyIF9Db21wb25lbnQgPSB0aGlzLl9fZ2V0Q29tcG9uZW50KCk7XG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT17em51aS5yZWFjdC5jbGFzc25hbWUoXCJ6ci1yb3V0ZVwiLCB0aGlzLnByb3BzLmNsYXNzTmFtZSl9IHN0eWxlPXt0aGlzLnByb3BzLnN0eWxlfSA+XG5cdFx0XHRcdFx0e19Db21wb25lbnQuQ29tcG9uZW50ICYmIDxfQ29tcG9uZW50LkNvbXBvbmVudCB7Li4uX0NvbXBvbmVudC5Db21wb25lbnRQcm9wc30gLz59XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0KTtcblx0XHR9ZWxzZXtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0fVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gWlJSb3V0ZTsiLCJtb2R1bGUuZXhwb3J0cyA9IHpuLkNsYXNzKHtcbiAgICBzdGF0aWM6IHRydWUsXG4gICAgbWV0aG9kczoge1xuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgIHRoaXMuZml4V2luZG93SGFzaENoYW5nZSgpO1xuICAgICAgICB9LFxuICAgICAgICBmaXhXaW5kb3dIYXNoQ2hhbmdlOiBmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgIC8vIExldCB0aGlzIHNuaXBwZXQgcnVuIGJlZm9yZSB5b3VyIGhhc2hjaGFuZ2UgZXZlbnQgYmluZGluZyBjb2RlXG4gICAgICAgICAgICBpZiAoIXdpbmRvdy5IYXNoQ2hhbmdlRXZlbnQpe1xuICAgICAgICAgICAgICAgIChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICB2YXIgbGFzdFVSTCA9IGRvY3VtZW50LlVSTDtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJoYXNoY2hhbmdlXCIsIGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShldmVudCwgXCJvbGRVUkxcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBsYXN0VVJMXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShldmVudCwgXCJuZXdVUkxcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkb2N1bWVudC5VUkxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFVSTCA9IGRvY3VtZW50LlVSTDtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn0pOyIsInZhciBSZWFjdCA9IHpudWkuUmVhY3QgfHwgcmVxdWlyZSgncmVhY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRkaXNwbGF5TmFtZTonRXJyb3I0MDQnLFxuXHRyZW5kZXI6IGZ1bmN0aW9uKCl7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPXt6bnVpLnJlYWN0LmNsYXNzbmFtZSgnenItcm91dGVyLWVycm9yLTQwNCcsIHRoaXMucHJvcHMuY2xhc3NOYW1lKX0gc3R5bGU9e3RoaXMucHJvcHMuc3R5bGV9ID5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJlcnJvci1oZWFkZXJcIj5cblx0XHRcdFx0XHQ8aDM+RVJST1I6IDQwNDwvaDM+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImVycm9yLWJvZHlcIj5cblx0XHRcdFx0XHRUaGUgcGF0aCA8c3BhbiBjbGFzc05hbWU9XCJwYXRoXCI+e3RoaXMucHJvcHMucmVxdWVzdC5wYXRofTwvc3Bhbj4gaXMgbm90IGZvdW5kLlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJlcnJvci1mb290ZXJcIj5cblx0XHRcdFx0XHRcblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59KTsiLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICAnRXJyb3I0MDQnOiByZXF1aXJlKCcuL0Vycm9yNDA0LmpzJylcbn07IiwicmVxdWlyZSgnLi9VdGlsLmpzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBIYXNoUm91dGVyOiByZXF1aXJlKCcuL0hhc2hSb3V0ZXIuanMnKSxcbiAgICBSb3V0ZTogcmVxdWlyZSgnLi9Sb3V0ZScpXG59OyIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB0aGlzW1wiUmVhY3RcIl07IH0oKSk7Il0sInNvdXJjZVJvb3QiOiIifQ==
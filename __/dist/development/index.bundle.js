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
        request: request,
        route: route
      })
    });
  },
  __notfound: function __notfound(sender, request) {
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
      if (component && zn.is(component, 'function') && component.prototype.render && component.displayName) {
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
          _route.component = component.call(this, key);
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
  'HashRouter': __webpack_require__(/*! ./HashRouter.js */ "./HashRouter.js")
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vSGFzaEhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vSGFzaFJvdXRlci5qcyIsIndlYnBhY2s6Ly8vLi9QYXRoTWF0Y2hlci5qcyIsIndlYnBhY2s6Ly8vLi9SZXF1ZXN0SGFuZGxlci5qcyIsIndlYnBhY2s6Ly8vLi9VdGlsLmpzIiwid2VicGFjazovLy8uL2Vycm9yL0Vycm9yNDA0LmpzIiwid2VicGFjazovLy8uL2Vycm9yL2luZGV4LmpzIiwid2VicGFjazovLy8uL2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcIlJlYWN0XCIiXSwibmFtZXMiOlsiUmVxdWVzdEhhbmRsZXIiLCJyZXF1aXJlIiwibW9kdWxlIiwiZXhwb3J0cyIsInpuIiwiQ2xhc3MiLCJldmVudHMiLCJtZXRob2RzIiwiaW5pdCIsImFyZ3YiLCJjYWxsZXIiLCJjb25zdHJ1Y3RvciIsIl9zdXBlcl8iLCJwcm90b3R5cGUiLCJfX2luaXRFdmVudHMiLCJtYWluIiwibG9jYXRpb24iLCJoYXNoIiwiX19oYXNoY2hhbmdlIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImJpbmQiLCJldmVudCIsIm9uIiwiX3JldHVybiIsImZpcmUiLCJfaGFzaCIsIl9fcGFyc2VIYXNoIiwiX3JlcXVlc3QiLCJjcmVhdGVSZXF1ZXN0IiwiZG9SZXF1ZXN0IiwiX3NlYXJjaCIsInNlYXJjaCIsIl9oYXNoU3BsaXRJbmRleCIsImluZGV4T2YiLCJyZXBsYWNlIiwic3Vic3RyaW5nIiwicGF0aCIsInF1ZXJ5c3RyaW5nIiwicGFyc2UiLCJSZWFjdCIsInpudWkiLCJIYXNoSGFuZGxlciIsImVycm9yIiwiY3JlYXRlQ2xhc3MiLCJkaXNwbGF5TmFtZSIsImdldEluaXRpYWxTdGF0ZSIsIkNvbXBvbmVudCIsIkNvbXBvbmVudFByb3BzIiwiY29tcG9uZW50RGlkTW91bnQiLCJfX2luaXRIYW5kbGVyIiwicHJvcHMiLCJoYXNoY2hhbmdlIiwiaGFuZGxlciIsIl9faGFuZGxlciIsInJlcXVlc3QiLCJfX3JlcXVlc3QiLCJub3Rmb3VuZCIsIl9fbm90Zm91bmQiLCJzZW5kZXIiLCJkYXRhIiwicm91dGUiLCJzZXRTdGF0ZSIsImNvbXBvbmVudCIsImV4dGVuZCIsIkVycm9yNDA0IiwicmVuZGVyIiwicmVhY3QiLCJjbGFzc25hbWUiLCJjbGFzc05hbWUiLCJzdHlsZSIsInN0YXRlIiwicHJvcGVydGllcyIsInBhdGhTZXBhcmF0b3IiLCJwYXRoUGFyYW1ldGVyU3ltYm9sIiwiX3BhdGhTZXBhcmF0b3IiLCJfcGF0aFBhcmFtZXRlclN5bWJvbCIsImZvcm1hdFJvdXRlIiwicGF0aHMiLCJfX3BhcnNlUm91dGVQYXRocyIsImV4YWN0IiwiZm9ybWF0Um91dGVzIiwicm91dGVzIiwiX3JvdXRlcyIsImlzIiwicHVzaCIsIl9fbG9hZFBhdGhBbmRDb21wb25lbnQiLCJtYXAiLCJjYWxsIiwiZ2V0Um91dGVGb3JSZXF1ZXN0IiwiX3JvdXRlIiwiX2RhdGEiLCJpIiwiX2xlbiIsImxlbmd0aCIsIl9fbWF0Y2hSb3V0ZUFuZFJlcXVlc3QiLCJwYXJhbXMiLCJfX2lzUmVhY3RDb21wb25lbnQiLCJrZXkiLCJfcGF0aHMiLCJfcGF0aCIsIl9wYXJhbXMiLCJfdXJsVW5tYXRjaHMiLCJfaGFzQ2hlY2tlZCIsIl90ZW1wIiwiX3RlbXBzIiwic3BsaXQiLCJ1bm1hdGNocyIsImlzUGFyYW1ldGVyIiwidGVzdCIsIlBhdGhNYXRjaGVyIiwicmVxdWVzdHMiLCJfcmVxdWVzdHMiLCJfbWF0Y2hlciIsImxvYWRQbHVnaW5zIiwicGx1Z2lucyIsImxvYWRSb3V0ZXMiLCJtYXRjaGVyIiwiX3BsdWdpbnMiLCJ0eXBlIiwiZm9yRWFjaCIsInBsdWdpbiIsImxvYWRQbHVnaW4iLCJjb25jYXQiLCJsb2FkUm91dGUiLCJmaXhXaW5kb3dIYXNoQ2hhbmdlIiwiSGFzaENoYW5nZUV2ZW50IiwibGFzdFVSTCIsImRvY3VtZW50IiwiVVJMIiwiT2Jq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R0MsSUFBSSxDQUFDRCxLQUFMLElBQWN2QyxtQkFBTyxDQUFDLG9CQUFELENBQWpDOztBQUNBQyxNQUFNLENBQUNDLE9BQVAsR0FBaUJxQyxLQUFLLENBQUNJLFdBQU4sQ0FBa0I7QUFDbENDLGFBQVcsRUFBQyxVQURzQjtBQUVsQ3FCLFFBQU0sRUFBRSxrQkFBVTtBQUNqQixXQUNDO0FBQUssZUFBUyxFQUFFekIsSUFBSSxDQUFDMEIsS0FBTCxDQUFXQyxTQUFYLENBQXFCLHFCQUFyQixFQUE0QyxLQUFLakIsS0FBTCxDQUFXa0IsU0FBdkQsQ0FBaEI7QUFBbUYsV0FBSyxFQUFFLEtBQUtsQixLQUFMLENBQVdtQjtBQUFyRyxPQUNDO0FBQUssZUFBUyxFQUFDO0FBQWYsT0FDQyw2Q0FERCxDQURELEVBSUM7QUFBSyxlQUFTLEVBQUM7QUFBZixvQkFDVTtBQUFNLGVBQVMsRUFBQztBQUFoQixPQUF3QixLQUFLbkIsS0FBTCxDQUFXSSxPQUFYLENBQW1CbEIsSUFBM0MsQ0FEVixtQkFKRCxFQU9DO0FBQUssZUFBUyxFQUFDO0FBQWYsTUFQRCxDQUREO0FBYUE7QUFoQmlDLENBQWxCLENBQWpCLEM7Ozs7Ozs7Ozs7O0FDREFuQyxNQUFNLENBQUNDLE9BQVAsR0FBaUI7QUFDYixjQUFZRixtQkFBTyxDQUFDLDBDQUFEO0FBRE4sQ0FBakIsQzs7Ozs7Ozs7Ozs7QUNBQUEsbUJBQU8sQ0FBQyw0QkFBRCxDQUFQOztBQUNBQyxNQUFNLENBQUNDLE9BQVAsR0FBaUI7QUFDYixnQkFBY0YsbUJBQU8sQ0FBQyx3Q0FBRDtBQURSLENBQWpCLEM7Ozs7Ozs7Ozs7O0FDREEsYUFBYSxnQ0FBZ0MsRUFBRSxJIiwiZmlsZSI6Ii4vZGlzdC9kZXZlbG9wbWVudC9pbmRleC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2luZGV4LmpzXCIpO1xuIiwidmFyIFJlcXVlc3RIYW5kbGVyID0gcmVxdWlyZSgnLi9SZXF1ZXN0SGFuZGxlcicpO1xubW9kdWxlLmV4cG9ydHMgPSB6bi5DbGFzcyhSZXF1ZXN0SGFuZGxlciwge1xuICAgIGV2ZW50czogWydoYXNoY2hhbmdlJywgJ2hhbmRsZXInXSxcbiAgICBtZXRob2RzOiB7XG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uIChhcmd2LCBldmVudHMpe1xuICAgICAgICAgICAgaWYodGhpcy5zdXBlci5jYWxsZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN1cGVyKGFyZ3YpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdGhpcy5jb25zdHJ1Y3Rvci5fc3VwZXJfLnByb3RvdHlwZS5pbml0KGFyZ3YpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fX2luaXRFdmVudHMoZXZlbnRzIHx8IHt9KTtcbiAgICAgICAgICAgIGlmKGFyZ3YubWFpbiAmJiAhbG9jYXRpb24uaGFzaCl7XG4gICAgICAgICAgICAgICAgbG9jYXRpb24uaGFzaCA9IGFyZ3YubWFpbjtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHRoaXMuX19oYXNoY2hhbmdlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsIHRoaXMuX19oYXNoY2hhbmdlLmJpbmQodGhpcyksIGZhbHNlKTtcbiAgICAgICAgfSxcbiAgICAgICAgX19pbml0RXZlbnRzOiBmdW5jdGlvbiAoZXZlbnRzKXtcbiAgICAgICAgICAgIGZvcih2YXIgZXZlbnQgaW4gZXZlbnRzKXtcbiAgICAgICAgICAgICAgICB0aGlzLm9uKGV2ZW50LCBldmVudHNbZXZlbnRdLCB0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgX19oYXNoY2hhbmdlOiBmdW5jdGlvbiAoZXZlbnQpe1xuICAgICAgICAgICAgdmFyIF9yZXR1cm4gPSB0aGlzLmZpcmUoJ2hhc2hjaGFuZ2UnLCBldmVudCk7XG4gICAgICAgICAgICBpZihfcmV0dXJuID09PSBmYWxzZSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgdmFyIF9oYXNoID0gdGhpcy5fX3BhcnNlSGFzaCgpLFxuICAgICAgICAgICAgICAgIF9yZXF1ZXN0ID0gdGhpcy5jcmVhdGVSZXF1ZXN0KF9oYXNoLCBldmVudCk7XG5cbiAgICAgICAgICAgIF9yZXR1cm4gPSB0aGlzLmZpcmUoJ2hhbmRsZXInLCBldmVudCwgX2hhc2gpO1xuICAgICAgICAgICAgaWYoX3JldHVybiA9PT0gZmFsc2UpIHJldHVybiBmYWxzZTtcblxuICAgICAgICAgICAgdGhpcy5kb1JlcXVlc3QoX3JlcXVlc3QpO1xuICAgICAgICB9LFxuICAgICAgICBfX3BhcnNlSGFzaDogZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICB2YXIgX2hhc2ggPSBsb2NhdGlvbi5oYXNoLFxuICAgICAgICAgICAgICAgIF9zZWFyY2ggPSBsb2NhdGlvbi5zZWFyY2gsXG4gICAgICAgICAgICAgICAgX2hhc2hTcGxpdEluZGV4ID0gX2hhc2guaW5kZXhPZignPycpO1xuICAgICAgICAgICAgaWYoX3NlYXJjaCAmJiBfc2VhcmNoLmluZGV4T2YoJz8nKSE9PS0xKXtcbiAgICAgICAgICAgICAgICBfc2VhcmNoID0gX3NlYXJjaC5yZXBsYWNlKCc/JywgJycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoX2hhc2hTcGxpdEluZGV4ICE9PSAtMSl7XG4gICAgICAgICAgICAgICAgX3NlYXJjaCA9IF9zZWFyY2ggKyAnJicrIF9oYXNoLnN1YnN0cmluZyhfaGFzaFNwbGl0SW5kZXggKyAxKTtcbiAgICAgICAgICAgICAgICBfaGFzaCA9IF9oYXNoLnN1YnN0cmluZygwLCBfaGFzaFNwbGl0SW5kZXgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHBhdGg6IF9oYXNoLnN1YnN0cmluZygxKSxcbiAgICAgICAgICAgICAgICBzZWFyY2g6IHpuLnF1ZXJ5c3RyaW5nLnBhcnNlKF9zZWFyY2gpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59KTtcbiIsInZhciBSZWFjdCA9IHpudWkuUmVhY3QgfHwgcmVxdWlyZSgncmVhY3QnKTtcbnZhciBIYXNoSGFuZGxlciA9IHJlcXVpcmUoJy4vSGFzaEhhbmRsZXInKTtcbnZhciBlcnJvciA9IHJlcXVpcmUoJy4vZXJyb3IvaW5kZXguanMnKTtcbm1vZHVsZS5leHBvcnRzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRkaXNwbGF5TmFtZTonWlJIYXNoUm91dGVyJyxcblx0Z2V0SW5pdGlhbFN0YXRlOmZ1bmN0aW9uKCl7XG5cdFx0cmV0dXJuIHtcblx0XHRcdENvbXBvbmVudDogbnVsbCxcblx0XHRcdENvbXBvbmVudFByb3BzOiBudWxsXG5cdFx0fVxuXHR9LFxuXHRjb21wb25lbnREaWRNb3VudDpmdW5jdGlvbigpe1xuXHRcdHRoaXMuX19pbml0SGFuZGxlcigpO1xuXHR9LFxuXHRfX2luaXRIYW5kbGVyOiBmdW5jdGlvbiAoKXtcblx0XHRuZXcgSGFzaEhhbmRsZXIodGhpcy5wcm9wcywge1xuXHRcdFx0aGFzaGNoYW5nZTogdGhpcy5fX2hhc2hjaGFuZ2UsXG5cdFx0XHRoYW5kbGVyOiB0aGlzLl9faGFuZGxlcixcblx0XHRcdHJlcXVlc3Q6IHRoaXMuX19yZXF1ZXN0LFxuXHRcdFx0bm90Zm91bmQ6IHRoaXMuX19ub3Rmb3VuZFxuXHRcdH0pO1xuXHR9LFxuXHRfX2hhc2hjaGFuZ2U6IGZ1bmN0aW9uIChzZW5kZXIsIGV2ZW50KXtcblx0XHRcblx0fSxcblx0X19oYW5kbGVyOiBmdW5jdGlvbiAoc2VuZGVyLCBldmVudCwgZGF0YSl7XG5cdFx0XG5cdH0sXG5cdF9fcmVxdWVzdDogZnVuY3Rpb24gKHNlbmRlciwgcmVxdWVzdCwgcm91dGUpe1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0Q29tcG9uZW50OiByb3V0ZS5jb21wb25lbnQsXG5cdFx0XHRDb21wb25lbnRQcm9wczogem4uZXh0ZW5kKHt9LCByb3V0ZS5wcm9wcywge1xuXHRcdFx0XHRyZXF1ZXN0OiByZXF1ZXN0LFxuXHRcdFx0XHRyb3V0ZTogcm91dGVcblx0XHRcdH0pXG5cdFx0fSk7XG5cdH0sXG5cdF9fbm90Zm91bmQ6IGZ1bmN0aW9uIChzZW5kZXIsIHJlcXVlc3Qpe1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0Q29tcG9uZW50OiBlcnJvci5FcnJvcjQwNCxcblx0XHRcdENvbXBvbmVudFByb3BzOiB7XG5cdFx0XHRcdHJlcXVlc3Q6IHJlcXVlc3Rcblx0XHRcdH1cblx0XHR9KTtcblx0fSxcblx0cmVuZGVyOiBmdW5jdGlvbigpe1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT17em51aS5yZWFjdC5jbGFzc25hbWUoXCJ6ci1oYXNoLXJvdXRlclwiLCB0aGlzLnByb3BzLmNsYXNzTmFtZSl9IHN0eWxlPXt0aGlzLnByb3BzLnN0eWxlfSA+XG5cdFx0XHRcdHt0aGlzLnN0YXRlLkNvbXBvbmVudCAmJiA8dGhpcy5zdGF0ZS5Db21wb25lbnQgey4uLnRoaXMuc3RhdGUuQ29tcG9uZW50UHJvcHN9IC8+fVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufSk7IiwibW9kdWxlLmV4cG9ydHMgPSB6bi5DbGFzcyh7XG4gICAgcHJvcGVydGllczp7IFxuICAgICAgICBwYXRoU2VwYXJhdG9yOiBudWxsLFxuICAgICAgICBwYXRoUGFyYW1ldGVyU3ltYm9sOiBudWxsXG4gICAgfSxcbiAgICBtZXRob2RzOiB7XG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uIChhcmd2LCBldmVudHMpe1xuICAgICAgICAgICAgdGhpcy5fcGF0aFNlcGFyYXRvciA9IGFyZ3YucGF0aFNlcGFyYXRvciB8fCAnLyc7XG4gICAgICAgICAgICB0aGlzLl9wYXRoUGFyYW1ldGVyU3ltYm9sID0gYXJndi5wYXRoUGFyYW1ldGVyU3ltYm9sIHx8ICc6JztcbiAgICAgICAgfSxcbiAgICAgICAgZm9ybWF0Um91dGU6IGZ1bmN0aW9uIChyb3V0ZSl7XG4gICAgICAgICAgICByb3V0ZS5wYXRocyA9IHRoaXMuX19wYXJzZVJvdXRlUGF0aHMocm91dGUucGF0aCk7XG4gICAgICAgICAgICByb3V0ZS5wcm9wcyA9IHpuLmV4dGVuZCh7fSwgcm91dGUucHJvcHMpO1xuICAgICAgICAgICAgaWYocm91dGUuZXhhY3QgPT0gbnVsbCkgeyByb3V0ZS5leGFjdCA9IHRydWU7IH1cblxuICAgICAgICAgICAgcmV0dXJuIHJvdXRlO1xuICAgICAgICB9LFxuICAgICAgICBmb3JtYXRSb3V0ZXM6IGZ1bmN0aW9uIChyb3V0ZXMpe1xuICAgICAgICAgICAgdmFyIF9yb3V0ZXMgPSBbXTtcbiAgICAgICAgICAgIGlmKHpuLmlzKHJvdXRlcywgJ29iamVjdCcpKXtcbiAgICAgICAgICAgICAgICBmb3IodmFyIHBhdGggaW4gcm91dGVzKXtcbiAgICAgICAgICAgICAgICAgICAgX3JvdXRlcy5wdXNoKHRoaXMuX19sb2FkUGF0aEFuZENvbXBvbmVudChwYXRoLCByb3V0ZXNbcGF0aF0pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZSBpZih6bi5pcyhyb3V0ZXMsICdhcnJheScpKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gcm91dGVzLm1hcCgocm91dGUpPT50aGlzLmZvcm1hdFJvdXRlKHJvdXRlKSk7XG4gICAgICAgICAgICB9ZWxzZSBpZih6bi5pcyhyb3V0ZXMsICdmdW5jdGlvbicpKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5mb3JtYXRSb3V0ZXMocm91dGVzLmNhbGwodGhpcykpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gX3JvdXRlcztcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0Um91dGVGb3JSZXF1ZXN0OiBmdW5jdGlvbiAocmVxdWVzdCwgcm91dGVzKXtcbiAgICAgICAgICAgIHZhciBfcm91dGVzID0gcm91dGVzLFxuICAgICAgICAgICAgICAgIF9yb3V0ZSA9IG51bGwsXG4gICAgICAgICAgICAgICAgX2RhdGEgPSBudWxsO1xuICAgICAgICAgICAgZm9yKHZhciBpID0gMCwgX2xlbiA9IF9yb3V0ZXMubGVuZ3RoOyBpIDwgX2xlbjsgaSsrKXtcbiAgICAgICAgICAgICAgICBfcm91dGUgPSBfcm91dGVzW2ldO1xuICAgICAgICAgICAgICAgIF9kYXRhID0gdGhpcy5fX21hdGNoUm91dGVBbmRSZXF1ZXN0KF9yb3V0ZSwgcmVxdWVzdCk7XG4gICAgICAgICAgICAgICAgaWYoX2RhdGEpe1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKCFfZGF0YSB8fCAhX3JvdXRlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcmVxdWVzdC5wYXJhbXMgPSBfZGF0YSwgX3JvdXRlO1xuICAgICAgICB9LFxuICAgICAgICBfX2lzUmVhY3RDb21wb25lbnQ6IGZ1bmN0aW9uIChjb21wb25lbnQpe1xuICAgICAgICAgICAgaWYoY29tcG9uZW50ICYmIHpuLmlzKGNvbXBvbmVudCwgJ2Z1bmN0aW9uJykgJiYgY29tcG9uZW50LnByb3RvdHlwZS5yZW5kZXIgJiYgY29tcG9uZW50LmRpc3BsYXlOYW1lKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSxcbiAgICAgICAgX19sb2FkUGF0aEFuZENvbXBvbmVudDogZnVuY3Rpb24gKHBhdGgsIGNvbXBvbmVudCl7XG4gICAgICAgICAgICB2YXIgX3JvdXRlID0geyBwYXRoOiBwYXRoIH07XG4gICAgICAgICAgICBpZih6bi5pcyhjb21wb25lbnQsICdzdHJpbmcnKSl7XG4gICAgICAgICAgICAgICAgX3JvdXRlLmNvbXBvbmVudCA9IHpuLnBhdGgod2luZG93LCBjb21wb25lbnQpO1xuICAgICAgICAgICAgfSBlbHNlIGlmKHpuLmlzKGNvbXBvbmVudCwgJ2Z1bmN0aW9uJykpe1xuICAgICAgICAgICAgICAgIGlmKCF0aGlzLl9faXNSZWFjdENvbXBvbmVudChjb21wb25lbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgIF9yb3V0ZS5jb21wb25lbnQgPSBjb21wb25lbnQuY2FsbCh0aGlzLCBrZXkpO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBfcm91dGUuY29tcG9uZW50ID0gY29tcG9uZW50O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZih6bi5pcyhjb21wb25lbnQsICdvYmplY3QnKSl7XG4gICAgICAgICAgICAgICAgem4uZXh0ZW5kKF9yb3V0ZSwgY29tcG9uZW50KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZm9ybWF0Um91dGUoX3JvdXRlKTtcbiAgICAgICAgfSxcbiAgICAgICAgXG4gICAgICAgIF9fbWF0Y2hSb3V0ZUFuZFJlcXVlc3Q6IGZ1bmN0aW9uIChyb3V0ZSwgcmVxdWVzdCl7XG4gICAgICAgICAgICB2YXIgX3BhdGhzID0gcm91dGUucGF0aHMsXG4gICAgICAgICAgICAgICAgX3BhdGggPSBudWxsLFxuICAgICAgICAgICAgICAgIF9wYXJhbXMgPSB7fSxcbiAgICAgICAgICAgICAgICBfdXJsVW5tYXRjaHMgPSBbXSxcbiAgICAgICAgICAgICAgICBfaGFzQ2hlY2tlZCA9IGZhbHNlLFxuICAgICAgICAgICAgICAgIF90ZW1wID0gbnVsbCxcbiAgICAgICAgICAgICAgICBfdGVtcHMgPSByZXF1ZXN0LnBhdGguc3BsaXQodGhpcy5fcGF0aFNlcGFyYXRvcik7XG5cbiAgICAgICAgICAgIGlmKHJvdXRlLmV4YWN0KSB7XG4gICAgICAgICAgICAgICAgaWYocm91dGUucGF0aCA9PT0gcmVxdWVzdC5wYXRoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXF1ZXN0LnVubWF0Y2hzID0gX3VybFVubWF0Y2hzLCBfcGFyYW1zOyBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYoX3RlbXBzLmxlbmd0aCAhPT0gX3BhdGhzLmxlbmd0aCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDAsIF9sZW4gPSBfdGVtcHMubGVuZ3RoOyBpIDwgX2xlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgX3RlbXAgPSBfdGVtcHNbaV07XG4gICAgICAgICAgICAgICAgaWYoIV90ZW1wKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBfcGF0aCA9IF9wYXRoc1tpXTtcbiAgICAgICAgICAgICAgICBfaGFzQ2hlY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgaWYoIV9wYXRoKXtcbiAgICAgICAgICAgICAgICAgICAgX3VybFVubWF0Y2hzLnB1c2goX3RlbXApO1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYoIV9wYXRoLmlzUGFyYW1ldGVyICYmIF90ZW1wICE9PSBfcGF0aC5rZXkpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYoX3BhdGguaXNQYXJhbWV0ZXIpe1xuICAgICAgICAgICAgICAgICAgICBfcGFyYW1zW19wYXRoLmtleV0gPSBfdGVtcDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZighX2hhc0NoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiByZXF1ZXN0LnVubWF0Y2hzID0gX3VybFVubWF0Y2hzLCBfcGFyYW1zO1xuICAgICAgICB9LFxuICAgICAgICBfX3BhcnNlUm91dGVQYXRoczogZnVuY3Rpb24gKHBhdGgpe1xuICAgICAgICAgICAgdmFyIF9wYXRocyA9IFtdLFxuICAgICAgICAgICAgICAgIF90ZW1wID0gbnVsbCxcbiAgICAgICAgICAgICAgICBfdGVtcHMgPSBwYXRoLnNwbGl0KHRoaXMuX3BhdGhTZXBhcmF0b3IpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwLCBfbGVuID0gX3RlbXBzLmxlbmd0aDsgaSA8IF9sZW47IGkrKykge1xuICAgICAgICAgICAgICAgIF90ZW1wID0gX3RlbXBzW2ldO1xuICAgICAgICAgICAgICAgIGlmKCFfdGVtcCkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKC9eOlxcd1tcXHdcXGRdKiQvLnRlc3QoX3RlbXApKSB7XG4gICAgICAgICAgICAgICAgICAgIF90ZW1wID0gX3RlbXAucmVwbGFjZSgvXjovLCAnJyk7XG4gICAgICAgICAgICAgICAgICAgIF9wYXRoc1tpXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleTogX3RlbXAsXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1BhcmFtZXRlcjogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBfcGF0aHNbaV0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IF90ZW1wXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gX3BhdGhzO1xuICAgICAgICB9XG4gICAgfVxufSk7IiwidmFyIFBhdGhNYXRjaGVyID0gcmVxdWlyZSgnLi9QYXRoTWF0Y2hlcicpO1xubW9kdWxlLmV4cG9ydHMgPSB6bi5DbGFzcyh7XG4gICAgZXZlbnRzOiBbJ3JlcXVlc3QnLCAnbm90Zm91bmQnXSxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHJlcXVlc3RzOiBudWxsLFxuICAgICAgICByb3V0ZXM6IG51bGxcbiAgICB9LFxuICAgIG1ldGhvZHM6IHtcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKGFyZ3Ype1xuICAgICAgICAgICAgdGhpcy5fcmVxdWVzdHMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX3JvdXRlcyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5fbWF0Y2hlciA9IG5ldyBQYXRoTWF0Y2hlcihhcmd2KTtcbiAgICAgICAgICAgIHRoaXMubG9hZFBsdWdpbnMoYXJndi5wbHVnaW5zKTtcbiAgICAgICAgICAgIHRoaXMubG9hZFJvdXRlcyhhcmd2LnJvdXRlcyk7XG4gICAgICAgIH0sXG4gICAgICAgIGNyZWF0ZVJlcXVlc3Q6IGZ1bmN0aW9uIChyZXF1ZXN0LCBldmVudCl7XG4gICAgICAgICAgICByZXF1ZXN0LmV2ZW50ID0gZXZlbnQ7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVxdWVzdHMucHVzaChyZXF1ZXN0KSwgcmVxdWVzdDtcbiAgICAgICAgfSxcbiAgICAgICAgZG9SZXF1ZXN0OiBmdW5jdGlvbiAocmVxdWVzdCl7XG4gICAgICAgICAgICB2YXIgX3JvdXRlID0gdGhpcy5fbWF0Y2hlci5nZXRSb3V0ZUZvclJlcXVlc3QocmVxdWVzdCwgdGhpcy5fcm91dGVzKTtcbiAgICAgICAgICAgIHJlcXVlc3QubWF0Y2hlciA9IHRoaXMuX21hdGNoZXI7XG4gICAgICAgICAgICBpZihfcm91dGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpcmUoJ3JlcXVlc3QnLCByZXF1ZXN0LCBfcm91dGUpO1xuICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZmlyZSgnbm90Zm91bmQnLCByZXF1ZXN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbG9hZFBsdWdpbnM6IGZ1bmN0aW9uIChwbHVnaW5zKXtcbiAgICAgICAgICAgIHZhciBfcGx1Z2lucyA9IHBsdWdpbnMgfHwgW107XG4gICAgICAgICAgICBzd2l0Y2goem4udHlwZShwbHVnaW5zKSl7XG4gICAgICAgICAgICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgICAgICAgICAgICAgX3BsdWdpbnMgPSBbcGx1Z2luc107XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2Z1bmN0aW9uJzpcbiAgICAgICAgICAgICAgICAgICAgX3BsdWdpbnMgPSBwbHVnaW5zKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKF9wbHVnaW5zICYmIF9wbHVnaW5zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHBsdWdpbnMuZm9yRWFjaChmdW5jdGlvbiAocGx1Z2luKXtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICB9LFxuICAgICAgICBsb2FkUGx1Z2luOiBmdW5jdGlvbiAoKXtcblxuICAgICAgICB9LFxuICAgICAgICBsb2FkUm91dGVzOiBmdW5jdGlvbiAocm91dGVzKXtcbiAgICAgICAgICAgIHZhciBfcm91dGVzID0gdGhpcy5fbWF0Y2hlci5mb3JtYXRSb3V0ZXMocm91dGVzKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yb3V0ZXMgPSB0aGlzLl9yb3V0ZXMuY29uY2F0KF9yb3V0ZXMpLCBfcm91dGVzO1xuICAgICAgICB9LFxuICAgICAgICBsb2FkUm91dGU6IGZ1bmN0aW9uIChyb3V0ZSl7XG4gICAgICAgICAgICB0aGlzLl9yb3V0ZXMucHVzaCh0aGlzLl9tYXRjaGVyLmZvcm1hdFJvdXRlKHJvdXRlKSk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcbiIsIm1vZHVsZS5leHBvcnRzID0gem4uQ2xhc3Moe1xuICAgIHN0YXRpYzogdHJ1ZSxcbiAgICBtZXRob2RzOiB7XG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgdGhpcy5maXhXaW5kb3dIYXNoQ2hhbmdlKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGZpeFdpbmRvd0hhc2hDaGFuZ2U6IGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgLy8gTGV0IHRoaXMgc25pcHBldCBydW4gYmVmb3JlIHlvdXIgaGFzaGNoYW5nZSBldmVudCBiaW5kaW5nIGNvZGVcbiAgICAgICAgICAgIGlmICghd2luZG93Lkhhc2hDaGFuZ2VFdmVudCl7XG4gICAgICAgICAgICAgICAgKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBsYXN0VVJMID0gZG9jdW1lbnQuVVJMO1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImhhc2hjaGFuZ2VcIiwgZnVuY3Rpb24oZXZlbnQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV2ZW50LCBcIm9sZFVSTFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGxhc3RVUkxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV2ZW50LCBcIm5ld1VSTFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGRvY3VtZW50LlVSTFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0VVJMID0gZG9jdW1lbnQuVVJMO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSk7IiwidmFyIFJlYWN0ID0gem51aS5SZWFjdCB8fCByZXF1aXJlKCdyZWFjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdGRpc3BsYXlOYW1lOidFcnJvcjQwNCcsXG5cdHJlbmRlcjogZnVuY3Rpb24oKXtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9e3pudWkucmVhY3QuY2xhc3NuYW1lKCd6ci1yb3V0ZXItZXJyb3ItNDA0JywgdGhpcy5wcm9wcy5jbGFzc05hbWUpfSBzdHlsZT17dGhpcy5wcm9wcy5zdHlsZX0gPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImVycm9yLWhlYWRlclwiPlxuXHRcdFx0XHRcdDxoMz5FUlJPUjogNDA0PC9oMz5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZXJyb3ItYm9keVwiPlxuXHRcdFx0XHRcdFRoZSBwYXRoIDxzcGFuIGNsYXNzTmFtZT1cInBhdGhcIj57dGhpcy5wcm9wcy5yZXF1ZXN0LnBhdGh9PC9zcGFuPiBpcyBub3QgZm91bmQuXG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImVycm9yLWZvb3RlclwiPlxuXHRcdFx0XHRcdFxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn0pOyIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgICdFcnJvcjQwNCc6IHJlcXVpcmUoJy4vRXJyb3I0MDQuanMnKVxufTsiLCJyZXF1aXJlKCcuL1V0aWwuanMnKTtcbm1vZHVsZS5leHBvcnRzID0ge1xuICAgICdIYXNoUm91dGVyJzogcmVxdWlyZSgnLi9IYXNoUm91dGVyLmpzJylcbn07IiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHRoaXNbXCJSZWFjdFwiXTsgfSgpKTsiXSwic291cmNlUm9vdCI6IiJ9
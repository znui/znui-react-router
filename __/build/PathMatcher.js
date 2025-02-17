"use strict";

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
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var PathMatcher = require('./PathMatcher');

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
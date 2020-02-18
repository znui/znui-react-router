"use strict";

var PathMatcher = require('./PathMatcher');

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
      plugins.forEach(function (plugin) {});
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
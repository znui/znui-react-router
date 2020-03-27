var PathMatcher = require('./PathMatcher');
module.exports = zn.Class({
    events: ['request', 'notfound', 'pluginLoaded'],
    properties: {
        requests: null,
        routes: null,
        main: null
    },
    methods: {
        init: function (argv, events){
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
            if(argv.main) {
                this._main.push(argv.main);
            }
        },
        __initEvents: function (events){
            if(events && typeof events == 'object'){
                for(var event in events){
                    this.on(event, events[event], this);
                }
            }
        },
        createRequest: function (request, event){
            request.event = event;
            return this._requests.push(request), request;
        },
        doRequest: function (request){
            var _route = this._matcher.getRouteForRequest(request, this._routes);
            request.matcher = this._matcher;
            if(_route) {
                this.fire('request', request, _route);
            }else {
                this.fire('notfound', request);
            }
        },
        loadPlugins: function (plugins){
            var _plugins = plugins || [];
            switch(zn.type(plugins)){
                case 'string':
                    _plugins = [plugins];
                    break;
                case 'function':
                    _plugins = plugins(this);
                    break;
            }
            if(_plugins && _plugins.length) {
                plugins.forEach(function (plugin){
                    this.loadPlugin(plugin);
                }.bind(this));
            }
            return this;
        },
        loadPlugin: function (plugin){
            var _plugin = plugin || {};
            switch(zn.type(plugin)){
                case 'object':
                    _plugin = _plugin;
                    break;
                case 'function':
                    _plugin = _plugin(this);
                    break;
            }

            if(_plugin.main) {
                this._main.push(_plugin.main);
            }
            var _routes = this._matcher.formatRoutes(_plugin.routes||[]);
            _plugin.__routes__ = _routes;
            this.fire('pluginLoaded', _plugin);
            return this._routes = this._routes.concat(_routes), _routes;
        },
        loadRoutes: function (routes){
            var _routes = this._matcher.formatRoutes(routes);
            return this._routes = this._routes.concat(_routes), _routes;
        },
        loadRoute: function (route){
            this._routes.push(this._matcher.formatRoute(route));
        }
    }
});

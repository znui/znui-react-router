module.exports = zn.Class({
    events: ['pluginLoaded', 'routeLoaded'],
    properties:{ 
        pathSeparator: null,
        pathParameterSymbol: null
    },
    methods: {
        init: function (argv, events){
            this.__initEvents(events);
            this._pathSeparator = argv.pathSeparator || '/';
            this._pathParameterSymbol = argv.pathParameterSymbol || ':';
        },
        __initEvents: function (events){
            if(events && typeof events == 'object'){
                for(var event in events){
                    this.on(event, events[event], this);
                }
            }
        },
        formatRoute: function (route, parent){
            if(parent){
                route.__parent__ = parent;
            }
            route.paths = this.__parseRoutePaths(route.path);
            route.props = zn.extend({}, route.props);
            if(route.exact == null) { route.exact = true; }
            this.fire('routeLoaded', route);
            return route;
        },
        formatRoutes: function (routes, parent){
            var _routes = [];
            if(zn.is(routes, 'object')){
                for(var path in routes){
                    _routes.push(this.__loadPathAndComponent(path, routes[path], parent));
                }
            }else if(zn.is(routes, 'array')){
                return routes.map((route)=>this.formatRoute(route, parent));
            }else if(zn.is(routes, 'function')){
                return this.formatRoutes(routes.call(this));
            }

            return _routes;
        },
        getRouteForRequest: function (request, routes){
            var _routes = routes,
                _route = null,
                _data = null;
            for(var i = 0, _len = _routes.length; i < _len; i++){
                _route = _routes[i];
                _data = this.__matchRouteAndRequest(_route, request);
                if(_data){
                    break;
                }
            }
            
            if(!_data || !_route) {
                return;
            }

            return request.params = _data, _route;
        },
        __isReactComponent: function (component){
            if(component && zn.is(component, 'function') && (component.prototype.render || component.displayName)) {
                return true;
            }

            return false;
        },
        __loadPathAndComponent: function (path, component, parent){
            var _route = { path: path };
            if(zn.is(component, 'string')){
                _route.component = zn.path(window, component);
            } else if(zn.is(component, 'function')){
                if(!this.__isReactComponent(component)) {
                    _route.component = component.call(this, path, this);
                }else{
                    _route.component = component;
                }
            } else if(zn.is(component, 'object')){
                zn.extend(_route, component);
                this.__initRoute(_route);
            }

            return this.formatRoute(_route, parent);
        },
        __initRoute: function (route){
            if(route.routes) {
                route.__routes__ = this.formatRoutes(route.routes, route);
            }
            
            if(route.plugins) {
                var _plugins = this.__loadPlugins(route.plugins, route);
                route.main = _plugins.main;
                if(route.__routes__) {
                    route.__routes__ = route.__routes__.concat(_plugins.routes);
                }else{
                    route.__routes__ = _plugins.routes;
                }
                if(!route.component && _plugins.main.length) {
                    route.component = _plugins.main.pop();
                }
            }
        },
        __loadPlugins: function (plugins, parent){
            var _plugins = plugins || [],
                _plugin = null,
                _routes = [],
                _main = [];
            switch(zn.type(plugins)){
                case 'object':
                    _plugins = [plugins];
                    break;
                case 'function':
                    _plugins = plugins(this);
                    break;
            }
            if(_plugins && _plugins.length) {
                plugins.forEach(function (plugin){
                    _plugin = this.__loadPlugin(plugin, parent);
                    if(_plugin){
                        if(_plugin.__routes__) {
                            _routes = _routes.concat(_plugin.__routes__);
                        }
                        if(_plugin.main) {
                            _main.push(_plugin.main);
                        }
                    }
                }.bind(this));
            }

            return {
                routes: _routes,
                main: _main
            };
        },
        __loadPlugin: function (plugin, parent){
            var _plugin = plugin || {};
            switch(zn.type(plugin)){
                case 'object':
                    _plugin = _plugin;
                    break;
                case 'function':
                    _plugin = _plugin(this);
                    break;
            }

            if(_plugin.namespace && _plugin.components) {
                zn.path(window, _plugin.namespace, _plugin.components);
            }
            _plugin.__routes__ = this.formatRoutes(_plugin.routes||[], parent);
            return this.fire('pluginLoaded', _plugin), _plugin;
        },
        __matchRouteAndRequest: function (route, request){
            var _paths = route.paths,
                _path = null,
                _params = {},
                _urlUnmatchs = [],
                _hasChecked = false,
                _temp = null,
                _temps = request.path.split(this._pathSeparator);

            if(route.routes && Object.keys(route.routes).length) {
                if(route.exact == null) {
                    route.exact = false;
                }
            }

            if(route.exact) {
                if(route.path === request.path) {
                    return request.unmatchs = _urlUnmatchs, _params; 
                }
                if(_temps.length !== _paths.length){
                    return false;
                }
            }

            for(var i = 0, _len = _temps.length; i < _len; i++) {
                _temp = _temps[i];
                if(!_temp) {
                    continue;
                }
                _path = _paths[i];
                _hasChecked = true;
                if(!_path){
                    _urlUnmatchs.push(_temp);
                    continue;
                }
                if(!_path.isParameter && _temp !== _path.key){
                    return false
                }
                if(_path.isParameter){
                    _params[_path.key] = _temp;
                }
            }
            if(!_hasChecked) {
                return false;
            }

            return request.unmatchs = _urlUnmatchs, _params;
        },
        __parseRoutePaths: function (path){
            var _paths = [],
                _temp = null,
                _temps = path.split(this._pathSeparator);
            
            for(var i = 0, _len = _temps.length; i < _len; i++) {
                _temp = _temps[i];
                if(!_temp) {
                    continue;
                }
                if (/^:\w[\w\d]*$/.test(_temp)) {
                    _temp = _temp.replace(/^:/, '');
                    _paths[i] = {
                        key: _temp,
                        isParameter: true
                    };
                }else{
                    _paths[i] = {
                        key: _temp
                    };
                }
            }

            return _paths;
        }
    }
});
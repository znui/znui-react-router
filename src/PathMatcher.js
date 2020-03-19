module.exports = zn.Class({
    properties:{ 
        pathSeparator: null,
        pathParameterSymbol: null
    },
    methods: {
        init: function (argv, events){
            this._pathSeparator = argv.pathSeparator || '/';
            this._pathParameterSymbol = argv.pathParameterSymbol || ':';
        },
        formatRoute: function (route){
            route.paths = this.__parseRoutePaths(route.path);
            route.props = zn.extend({}, route.props);
            if(route.exact == null) { route.exact = true; }

            return route;
        },
        formatRoutes: function (routes){
            var _routes = [];
            if(zn.is(routes, 'object')){
                for(var path in routes){
                    _routes.push(this.__loadPathAndComponent(path, routes[path]));
                }
            }else if(zn.is(routes, 'array')){
                return routes.map((route)=>this.formatRoute(route));
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
        __loadPathAndComponent: function (path, component){
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
            }

            return this.formatRoute(_route);
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
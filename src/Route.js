var React = znui.React || require('react');
var error = require('./error/index.js');
var ZRRoute = React.createClass({
	displayName:'ZRRoute',
	__handler: function (){
		var _request = this.props.request,
			_matcher = _request.matcher,
			_newRequest = {
				path: _request.path.replace(this.props.route.path,  ''),
				search: _request.search,
				event: _request.event,
				matcher: _matcher
			},
			_routes = this.props.route.__routes__,
			_route = null,
			_component = null;
        if(!_routes) {
			var _fRoute = _matcher.getRoutesFromRoute(this.props.route);
			_routes = _fRoute.routes;
			_component = _fRoute.component;
		}
		_route = _matcher.getRouteForRequest(_newRequest, _routes);

		if(_route) {
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
			}
		}else{
			return {
				Component: error.Error404,
				ComponentProps: {
					application: this.props.application,
					parent: this,
					parentRequest: _request,
					router: this.props.router,
					request: _newRequest
				}
			}
		}
		
	},
	__getComponent: function (){
		return this.__handler();
	},
	render: function(){
		if(this.props.request && this.props.route && this.props.route.routes) {
			var _Component = this.__getComponent();
			return (
				<div className={znui.react.classname("zr-route", this.props.className)} style={this.props.style} >
					{_Component.Component && <_Component.Component {..._Component.ComponentProps} />}
				</div>
			);
		}else{
			return null;
		}
	}
});

module.exports = ZRRoute;
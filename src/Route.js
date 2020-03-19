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
			_routes = _matcher.formatRoutes(this.__mergeRoutesAndPlugins(this.props.route.routes, this.props.route.plugins)),
			_route = _matcher.getRouteForRequest(_newRequest, _routes);

		
		if(_route) {
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
			}
		}else{
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
			}
		}
		
	},
	__mergeRoutesAndPlugins: function (routes, plugins) {
		return routes;
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
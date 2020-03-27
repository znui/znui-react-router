var React = znui.React || require('react');
var HashHandler = require('./HashHandler');
var error = require('./error/index.js');
module.exports = React.createClass({
	displayName:'ZRHashRouter',
	getInitialState:function(){
		return {
			Component: null,
			ComponentProps: null
		}
	},
	componentDidMount:function(){
		this.__initHandler();
	},
	__initHandler: function (){
		this._handler = new HashHandler(this.props, {
			hashchange: this.__hashchange,
			handler: this.__handler,
			request: this.__request,
			notfound: this.__notfound,
			pluginloaded: this.__pluginLoaded
		});
		this.props.onInitHandler && this.props.onInitHandler(this._handler, this);
	},
	__hashchange: function (sender, event){
		this.props.onHashChange && this.props.onHashChange(event, this);
	},
	__handler: function (sender, event, data){
		this.props.onHandler && this.props.onHandler(event, data, this);
	},
	__request: function (sender, request, route){
		this.setState({
			Component: route.component,
			ComponentProps: zn.extend({}, route.props, {
				application: this.props.application,
				request: request,
				router: this,
				route: route
			})
		});
		this.props.onRequest && this.props.onRequest(request, route, this);
	},
	__notfound: function (sender, request){
		this.notfound(request);
		this.props.onNotFound && this.props.onNotFound(request, this);
	},
	__pluginLoaded: function (sender, data){
		this.props.onPluginLoaded && this.props.onPluginLoaded(data, this);
	},
	push: function (){

	},
	forward: function (){

	},
	notfound: function (request){
		this.setState({
			Component: error.Error404,
			ComponentProps: {
				request: request
			}
		});
	},
	render: function(){
		return (
			<div className={znui.react.classname("zr-hash-router", this.props.className)} style={this.props.style} >
				{this.state.Component && <this.state.Component {...this.state.ComponentProps} />}
			</div>
		);
	}
});
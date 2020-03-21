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
		new HashHandler(this.props, {
			hashchange: this.__hashchange,
			handler: this.__handler,
			request: this.__request,
			notfound: this.__notfound
		});
	},
	__hashchange: function (sender, event){
		
	},
	__handler: function (sender, event, data){
		
	},
	__request: function (sender, request, route){
		this.setState({
			Component: route.component,
			ComponentProps: zn.extend({}, route.props, {
				application: this.props.application,
				config: (this.props.application||{})._config,
				request: request,
				router: this,
				route: route
			})
		});
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
	__notfound: function (sender, request){
		this.notfound(request);
	},
	render: function(){
		return (
			<div className={znui.react.classname("zr-hash-router", this.props.className)} style={this.props.style} >
				{this.state.Component && <this.state.Component {...this.state.ComponentProps} />}
			</div>
		);
	}
});
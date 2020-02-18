var React = znui.React || require('react');
var Route = require('../../src/Route');
module.exports = React.createClass({
	displayName:'A2',
	render: function(){
		return (
			<div style={{backgroundColor: 'red'}} >
				<div>A2</div>
				<div>Search: {JSON.stringify(this.props.request.search)}</div>
				<div>Params: {JSON.stringify(this.props.params)}</div>
				<div>Unmatchs: {JSON.stringify(this.props.request.unmatchs)}</div>
				<Route {...this.props} />
			</div>
		);
	}
});
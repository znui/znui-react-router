var React = znui.React || require('react');
module.exports = React.createClass({
	displayName:'A2.2',
	render: function(){
		return (
			<div style={{backgroundColor: 'blue'}} >
				<div>A2.2</div>
				<div>Path: {JSON.stringify(this.props.request.path)}</div>
				<div>Search: {JSON.stringify(this.props.request.search)}</div>
				<div>Unmatchs: {JSON.stringify(this.props.request.unmatchs)}</div>
			</div>
		);
	}
});
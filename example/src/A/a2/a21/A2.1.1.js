var React = znui.React || require('react');
module.exports = React.createClass({
	displayName:'A2.1.1',
	render: function(){
		return (
			<div style={{backgroundColor: 'yellow'}} >
				<div>A2.1.1</div>
				<div>Path: {JSON.stringify(this.props.request.path)}</div>
				<div>Search: {JSON.stringify(this.props.request.search)}</div>
				<div>Unmatchs: {JSON.stringify(this.props.request.unmatchs)}</div>
			</div>
		);
	}
});
var React = znui.React || require('react');
module.exports = React.createClass({
	displayName:'A3',
	render: function(){
		return (
			<div style={{width: 100, height: 50, lineHeight: 50, backgroundColor: 'yellow'}} >
				<div>A3</div>
				<div>Search: {JSON.stringify(this.props.request.search)}</div>
				<div>Params: {JSON.stringify(this.props.request.params)}</div>
				<div>Unmatchs: {JSON.stringify(this.props.request.unmatchs)}</div>
			</div>
		);
	}
});
var React = znui.React || require('react');
module.exports = React.createClass({
	displayName:'C2',
	render: function(){
		return (
			<div style={{width: 100, height: 50, lineHeight: 50, backgroundColor: 'red'}} >
				<div>C2</div>
				<div>Search: {JSON.stringify(this.props.request.search)}</div>
				<div>Params: {JSON.stringify(this.props.request.params)}</div>
				<div>Unmatchs: {JSON.stringify(this.props.request.unmatchs)}</div>
			</div>
		);
	}
});
var React = znui.React || require('react');
module.exports = React.createClass({
	displayName:'A4',
	render: function(){
		return (
			<div style={{backgroundColor: 'green'}} >
				<div>A4</div>
				<div>Search: {JSON.stringify(this.props.request.search)}</div>
				<div>Params: {JSON.stringify(this.props.params)}</div>
			</div>
		);
	}
});
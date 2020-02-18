var React = znui.React || require('react');
module.exports = React.createClass({
	displayName:'Error404',
	render: function(){
		return (
			<div className={znui.react.classname('zr-router-error-404', this.props.className)} style={this.props.style} >
				<div className="error-header">
					<h3>ERROR: 404</h3>
				</div>
				<div className="error-body">
					The path <span className="path">{this.props.request.path}</span> is not found.
				</div>
				<div className="error-footer">
					
				</div>
			</div>
		);
	}
});
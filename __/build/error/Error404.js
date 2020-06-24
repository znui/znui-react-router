"use strict";

var React = znui.React || require('react');

module.exports = React.createClass({
  displayName: 'Error404',
  render: function render() {
    return /*#__PURE__*/React.createElement("div", {
      className: znui.react.classname('zr-router-error-404', this.props.className),
      style: this.props.style
    }, /*#__PURE__*/React.createElement("div", {
      className: "error-header"
    }, /*#__PURE__*/React.createElement("h3", null, "ERROR: 404")), /*#__PURE__*/React.createElement("div", {
      className: "error-body"
    }, "The path ", /*#__PURE__*/React.createElement("span", {
      className: "path"
    }, this.props.request.path), " is not found."), /*#__PURE__*/React.createElement("div", {
      className: "error-footer"
    }));
  }
});
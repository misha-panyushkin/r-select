var _ = require('lodash');
var React = require('react');
var lifecycle = require('./lifecycle.react');
var render = require('./render.react');
var methods = require('./methods.react');

module.exports = React.createClass(_.assign(lifecycle, render, methods));
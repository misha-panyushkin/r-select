var _ = require('lodash');
var React = require('react');
module.exports = {

	propTypes: {
		className: React.PropTypes.string,
		classNamesPrefix: React.PropTypes.string,
		staticPlaceHolder: React.PropTypes.string,
		floatPlaceHolder: React.PropTypes.string,
		disabled: React.PropTypes.bool,
		options: React.PropTypes.array,
		selected: React.PropTypes.oneOfType([
			React.PropTypes.number,
			React.PropTypes.string,
			React.PropTypes.array
	    ]),
		focused: React.PropTypes.bool,
		multiple: React.PropTypes.bool,
		shouldMatch: React.PropTypes.bool,
		asyncHandler: React.PropTypes.func,
		onChange: React.PropTypes.func
	},

	getDefaultProps: function () {
		return {
			classNamesPrefix: 'ss',
			staticPlaceHolder: '',
			floatPlaceHolder: '',

			asyncHandler: function () {},
			onChange: function () {},

			value: '',
			selected: null,
			options: [],
			disabled: false,
			multiple: false,
			shouldMatch: true
		}
	},

	getInitialState: function () {
		return _.assign(this._getState(this.props), {
			focused: false
		});
	},

	componentWillReceiveProps: function (nextProps) {
		this.setState(_.assign(this._getState(nextProps, this.state.value)));
	},

	componentDidUpdate: function () {
		if (_.isNumber(this.state.optionHighlightIndex) && this.refs.options) {
			this.refs.options.getDOMNode().scrollTop = this.refs['option' + this.state.optionHighlightIndex].getDOMNode().offsetTop;
		}
	}	
};
var _ = require('lodash');
module.exports = {
	
	_handleFocus: function () {
		if (this.state.disabled) {
			return;
		}
		clearTimeout(this.__blurTimeout);
		this.setState({
			focused: true
		});
	},

	_handleBlur: function () {
		this.__blurTimeout = setTimeout(function () {
			var undefined;
			this.setState({
				focused: false,
				optionHighlightIndex: undefined
			});
		}.bind(this), 200)
	},

	_handleKeyDown: function (event) {
		switch (event.keyCode) {
			case 38:
				this.setState({
					optionHighlightIndex: this.state.optionHighlightIndex > 0 
						? this.state.optionHighlightIndex - 1 
						: this.state.filteredOptions.length 
							? this.state.filteredOptions.length - 1 
							: 0
				});
				break;

			case 40:
				this.setState({
					optionHighlightIndex: this.state.filteredOptions.length && this.state.optionHighlightIndex < this.state.filteredOptions.length - 1 
						? this.state.optionHighlightIndex + 1 
						: 0
				});
				break;

			case 13:
				if (_.isNumber(this.state.optionHighlightIndex)) {
					this._handleOptionSelect(this.state.filteredOptions[this.state.optionHighlightIndex]);
				}
				break;

			case 27:
				this._blur();
				break;
		}
	},

	_handleMainInputOnChange: function () {
		if (this.state.disabled) {
			return;
		}
		var value = this.refs.main_input.getDOMNode().value;	
		this.props.asyncHandler(value, this._asyncHandler);
		this.setState(_.assign(this.__getFilteredOptions(this.state.options, value), {
			selected: this.props.multiple ? this.state.selected : null
		}));
	},

	_handleMainInputOnPaste: function () {
		if (this.state.disabled || !this.props.multiple) {
			return;
		}
		setTimeout(function () {
			var value = '';
			var selected;
			var accepted = _.reduce(this.refs.main_input.getDOMNode().value.replace(/( |\n)/g,',').split(','), function (memo, id) {
				if (id.length) {
					memo.push({
						id: id,
						label: id
					});

				}
				return memo;
			}, []);
			this.refs.main_input.getDOMNode().value = value;
	
			this.setState(function (state, props) {
				selected = this.__getSelected(state.options, _.uniq(_.union(accepted, state.selected), 'id'));
				return _.assign({
					selected: selected
				}, this.__getOptions(selected, state.options, value));
			});
			this.__handleChangeEventOccur(selected);
		}.bind(this));
	},

	_handleOptionSelect: function (option) {
		if (this.state.disabled) {
			return;
		}		
		var selected, options, value = '';
		if (this.props.multiple) {
			selected = this.__getSelected(this.state.options, _.uniq(this.state.selected.slice().concat(option), 'id'));
			clearTimeout(this.__blurTimeout);

		} else {
			this._blur();
			selected = this.__getSelected(this.state.options, _.find(this.state.options, 'id', option.id));

		}

		this.refs.main_input.getDOMNode().value = value;
		this.setState(_.assign({
			selected: selected
		}, this.__getOptions(selected, this.state.options, value)));
		this.__handleChangeEventOccur(selected);
	},

	_handleSelectedRemove: function (option) {
		var undefined;
		if (this.state.disabled) {
			return;
		}	
		var selected;
		if (this.props.multiple) {
			selected = this.__getSelected(this.state.options, _.reject(this.state.selected, 'id', option.id));
		} else {
			selected = undefined;
		}		
		this.setState(_.assign({
			selected: selected
		}, this.__getOptions(selected, this.state.options.slice().concat(option), this.state.value)));
		this.__handleChangeEventOccur(selected);
	},


	_focus: function () {
		this.refs.main_input.getDOMNode().focus();
		this._handleFocus();
	},

	_blur: function () {
		this.refs.main_input.getDOMNode().blur();
		this._handleBlur();
	},


	_asyncHandler: function (options) {
		if (this.state.disabled) {
			return;
		}
		this.setState(function (state, props) {
			return this.__getOptions(state.selected, options, state.value);
		});
	},

	_getState: function (props, value) {
		var options = props.options;
		var selected = props.multiple ? (props.selected || []) : props.selected;
		return _.assign({
			selected: this.__getSelected(options, selected),
			disabled: props.disabled
		}, this.__getOptions(selected, options, value || props.value));
	},



	__getOptions: function (selected, options, value) {
		if (this.props.multiple) {
			options = _.reject(options, function (option) {
				return _.find(selected, 'id', option.id);
			});
		} else if (selected) {
			options = _.reject(options, 'id', selected.id || selected);
		}
		return _.assign({
			options: options
		}, this.__getFilteredOptions(options, value));
	},

	__getFilteredOptions: function (options, value) {
		var filteredOptions = _.reduce(options, function (memo, option) {
			if (value) {
				if (option.label.toString().toLowerCase().indexOf(value.toLowerCase()) + 1 || option.id.toString().toLowerCase().indexOf(value.toLowerCase()) + 1) {
					memo.push(option);
				}
			} else {
				memo.push(option);
			}
			return memo;
		}, []);
		var undefined;
		var optionHighlightIndex = this.state ? this.state.optionHighlightIndex : undefined;
		if (this.props.multiple && optionHighlightIndex) {
			if (optionHighlightIndex < 0) {
				optionHighlightIndex = 0;
			} else if (optionHighlightIndex > filteredOptions.length - 1) {
				optionHighlightIndex = filteredOptions.length - 1;
			}
		}
		return {
			value: value,
			filteredOptions: filteredOptions,
			optionHighlightIndex: optionHighlightIndex
		};
	},

	__getSelected: function (options, selected) {
		if (this.props.multiple) {
			if (this.props.shouldMatch) {
				selected = _.reduce(options, function (memo, option) {
					if(_.find(selected, function (selected) {
						return selected == option.id || selected.id == option.id;
					})) {
						memo.push(option);
					}
					return memo;
				}, []);
			}
		} else if (selected) {
			selected = _.find(options, 'id', selected.id || selected);
		}
		return selected;
	},

	__blurTimeout: 0,

	__handleChangeEventOccur: function (selected) {
		this.props.onChange(selected.id || _.pluck(selected, 'id'));
	}
};
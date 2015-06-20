var _ = require('lodash');
module.exports = {
	
	renderStaticPlaceHolder: function () {
		return (
			<div
				className={this.props.classNamesPrefix + '-static-placeholder'}>
				{this.props.staticPlaceHolder}
			</div>
		);
	},

	renderFloatPlaceHolder: function () {
		return (
			<div
				className={this.props.classNamesPrefix + '-float-placeholder'}>
				{this.props.floatPlaceHolder}
			</div>
		);
	},

	renderMultipleSelectedOption: function (option) {
		return (
			<li 
				key={'selected' + option.id}
				className={this.props.classNamesPrefix + '-selected-option'}>
				<span className={this.props.classNamesPrefix + '-selected-option-label'}>
					{option.label}
				</span>
				<span 
					className={this.props.classNamesPrefix + '-selected-option-remove-btn'}
					onClick={this._handleSelectedRemove.bind(this, option)}>
					×
				</span>
			</li>
		);
	},

	renderSelectedOptions: function () {
		if (this.props.multiple && this.state.selected.length) {
			return (
				<ul
					className={this.props.classNamesPrefix + '-selected-options'}>
					{_.map(this.state.selected, this.renderMultipleSelectedOption)}
				</ul>
			);

		} else if (this.state.selected && !this.state.selected.length) {
			return (
				<div
					className={this.props.classNamesPrefix + '-single-selected-option'}>
					{this.state.selected.label}
				</div>
			);

		} else {
			return this.renderStaticPlaceHolder();
		}
	},

	renderMainInput: function () {
		return (
			<input 
				ref="main_input"
				key={this.props.multiple ? 'main_multiple_input' : 'main_single_input'}
				className={this.props.classNamesPrefix + '-main-input'}
				disabled={this.state.disabled}
				style={{
					width: this.props.multiple ? this.state.value.length*11 : 'auto'
				}}
				onChange={this._handleMainInputOnChange}
				onPaste={this._handleMainInputOnPaste}
				onFocus={this._handleFocus}
				onBlur={this._handleBlur}
				onKeyDown={this._handleKeyDown}/>
		);
	},

	renderOption: function (option, index) {
		return (
			<li 
				ref={'option' + index}
				key={'option' + index}
				className={this.props.classNamesPrefix + '-option' + (this.state.optionHighlightIndex == index ? ' ' + this.props.classNamesPrefix + '-option-highlighted' : '')}
				onClick={this._handleOptionSelect.bind(this, option)}>
				{option.label}
			</li>
		);
	},

	renderOptionsBox: function () {
		if (this.state.filteredOptions.length) {
			return (
				<ul 
					ref="options"
					className={this.props.classNamesPrefix + '-options'}>
					{_.map(this.state.filteredOptions, this.renderOption)}
				</ul>	
			);
		} else {
			return (
				<div></div>
			);
		}
	},

	renderSimpleSelect: function () {
		return (
			<div 
				className={this.props.classNamesPrefix + '-box' 
					+ (this.props.className ? ' ' + this.props.className : '') 
					+ (this.props.multiple ? ' ' + this.props.classNamesPrefix + '-multiple' : '') 
					+ (this.state.disabled ? ' ' + this.props.classNamesPrefix + '-disabled' : '') 
					+ ((_.isArray(this.state.selected) ? this.state.selected.length : this.state.selected) ? ' ' + this.props.classNamesPrefix + '-selected' : '') 
					+ (this.state.focused ? ' ' + this.props.classNamesPrefix + '-focused' : ' ' + this.props.classNamesPrefix + '-hided')}
				onClick={this._focus}>
				<div 
					className="">
					{this.renderSelectedOptions()}
					{this.renderMainInput()}
					<span className={this.props.classNamesPrefix + '-selectable-icon'}></span>
				</div>
				{this.renderFloatPlaceHolder()}
				{this.renderOptionsBox()}
			</div>
		);
	},

	render: function () {
		return this.renderSimpleSelect();
	}
};
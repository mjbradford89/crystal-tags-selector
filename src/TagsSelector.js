'use strict';

import ComponentRegistry from 'bower:metal/src/component/ComponentRegistry';
import core from 'bower:metal/src/core';
import SoyComponent from 'bower:metal/src/soy/SoyComponent';
import './TagsSelector.soy';

class TagsSelector extends SoyComponent {
	constructor(opt_config) {
		super(opt_config);
	}

	addTag(tag) {
		if (!this.hasTag_(tag)) {
			this.tags = this.tags.concat(tag);

			this.emit('tagAdded');
		}
	}

	handleFocusout_(event) {
		var inputElement = event.target;
		var value = inputElement.value;

		value = this.removeDelim_(value);

		if (value.length > 0) {
			this.addTag(value);

			inputElement.value = '';
		}
	}

	handleKeypress_(event) {
		var char = event.keyCode;

		if (char === this.delimeter.charCodeAt(0) || char === TagsSelector.ENTER_KEYCODE) {
			var inputElement = event.target;
			var value = inputElement.value;

			value = this.removeDelim_(value);

			if (value.length > 0) {
				this.addTag(value);

				//The re-focusing of the input has to be delayed until after
				//the element is repainted.
				setTimeout(function(id) {
					document.getElementById(id).focus();
				}, 10, this.id + '-input');
			}

			inputElement.value = '';

			event.preventDefault();
		}
	}

	handleRemoveClick_(event) {
		var tagElement = event.target.parentElement;
		var tag = tagElement.textContent;

		this.removeTag(tag);
	}

	hasTag_(tag) {
		return this.tags.indexOf(tag) !== -1;
	}

	removeDelim_(value) {
		return value.replace(this.delimeter, '');
	}

	removeTag(tag) {
		if (this.hasTag_(tag)) {
			var index = this.tags.indexOf(tag);

			var tags = this.tags.slice(0, index);

			this.tags = tags.concat(this.tags.slice(index + 1));

			this.emit('tagRemoved');
		}
	}

	val() {
		return this.tags;
	}
}

TagsSelector.ATTRS = {
	delimeter: {
		validator: function(val) {
			return core.isString && val.length === 1;
		},
		value: ','
	},

	placeholder: {
		validator: core.isString,
		value: ''
	},

	tags: {
		validator: core.isArray,
		value: []
	}
};

TagsSelector.ELEMENT_CLASSES = 'tagsSelector';

TagsSelector.ENTER_KEYCODE = 13;

ComponentRegistry.register('TagsSelector', TagsSelector);

export default TagsSelector;

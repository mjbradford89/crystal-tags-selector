'use strict';

import ComponentRegistry from 'bower:metal/src/component/ComponentRegistry';
import core from 'bower:metal/src/core';
import SoyComponent from 'bower:metal/src/soy/SoyComponent';
import './TagsSelector.soy';

/**
 * TagsSelector component.
 */
class TagsSelector extends SoyComponent {
	/**
	 * Adds a tag to the tags list.
	 * @param {!string} tag
	 */
	addTag(tag) {
		if (!this.hasTag_(tag)) {
			this.tags = this.tags.concat(tag);

			this.emit('tagAdded', {
				addedTag: tag,
				tags: this.tags
			});
		}
	}

	/**
	 * Handles the focusout event from the tags input.
	 * @param {!Event} event
	 * @protected
	 */
	handleFocusout_(event) {
		var inputElement = event.target;
		var value = inputElement.value;

		value = this.getNextTagName_(value);

		if (value.length > 0) {
			this.addTag(value);

			inputElement.value = '';
		}
	}

	/**
	 * Handles the keydown event from the tags input.
	 * @param {!Event} event
	 * @protected
	 */
	handleKeydown_(event) {
		var char = event.keyCode;
		var inputElement = event.target;
		var value = inputElement.value;

		if (char === TagsSelector.BACKSPACE_KEYCODE && value.length === 0) {
			var lastTag = this.tags[this.tags.length - 1];

			this.removeTag(lastTag);
		}
	}

	/**
	 * Handles the keypress event from the tags input.
	 * @param {!Event} event
	 * @protected
	 */
	handleKeypress_(event) {
		var char = event.keyCode;

		if (char === this.delimeter.charCodeAt(0) || char === TagsSelector.ENTER_KEYCODE) {
			var inputElement = event.target;
			var value = inputElement.value;

			value = this.getNextTagName_(value);

			if (value.length > 0) {
				this.addTag(value);
			}

			inputElement.value = '';

			event.preventDefault();
		}
	}

	/**
	 * Handles click event triggered from the remove button.
	 * @param {!Event} event
	 * @protected
	 */
	handleRemoveClick_(event) {
		var tagElement = event.target.parentElement;
		var tag = tagElement.textContent;

		this.removeTag(tag);
	}

	/**
	 * Checks if tag already exists.
	 * @param {!string} tag
	 * @return {boolean}
	 * @protected
	 */
	hasTag_(tag) {
		return this.tags.indexOf(tag) !== -1;
	}

	/**
	 * Removes all tags.
	 */
	removeAll() {
		this.tags = [];
	}

	/**
	 * Removes delimeter and trims whitespace of next tag.
	 * @param {!string} value
	 * @return {string} value with delimeter removed.
	 * @protected
	 */
	getNextTagName_(value) {
		return value.replace(this.delimeter, '').trim();
	}

	/**
	 * Removes tag from the list.
	 * @param {!string} tag
	 */
	removeTag(tag) {
		if (this.hasTag_(tag)) {
			var index = this.tags.indexOf(tag);

			var tags = this.tags.slice(0, index);

			this.tags = tags.concat(this.tags.slice(index + 1));

			this.emit('tagRemoved', {
				removedTag: tag,
				tags: this.tags
			});
		}
	}

	/**
	 * Gets the tags currently selected.
	 * @return {Array<string>}
	 */
	val() {
		return this.tags;
	}
}

/**
 * Default tooltip elementClasses.
 * @default tooltip
 * @type {string}
 * @static
 */
TagsSelector.ELEMENT_CLASSES = 'tagsSelector';

/**
 * KeyCode for the Backspace key.
 * @default 8
 * @type {int}
 * @static
 */
TagsSelector.BACKSPACE_KEYCODE = 8;


/**
 * KeyCode for the Enter key.
 * @default 13
 * @type {int}
 * @static
 */
TagsSelector.ENTER_KEYCODE = 13;

/**
 * TagsSelector attrbutes definition.
 * @type {!Object}
 * @static
 */
TagsSelector.ATTRS = {
	/**
	 * Character to separate tags.
	 * @type {!string}
	 */
	delimeter: {
		validator: function(val) {
			return core.isString && val.length === 1;
		},
		value: ','
	},

	/**
	 * Text that is the placeholder in the tags input.
	 * @type {string}
	 * @default ''
	 */
	placeholder: {
		validator: core.isString,
		value: ''
	},

	/**
	 * Text that is the placeholder in the tags input.
	 * @type {!Array<string>}
	 * @default []
	 */
	tags: {
		validator: core.isArray,
		value: []
	}
};

ComponentRegistry.register('TagsSelector', TagsSelector);

export default TagsSelector;

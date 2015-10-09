'use strict';

import async from 'bower:metal/src/async/async';
import dom from 'bower:metal/src/dom/dom';
import TagsSelector from '../src/TagsSelector';

var selector;

describe('TagsSelector', function() {
	afterEach(function() {
		if (selector) {
			selector.dispose();
		}
	});

	it('should create hidden input so it can be embedded in a form', function() {
		selector = new TagsSelector({
			tags: ['A', 'B']
		}).render();

		var hiddenInput = selector.element.querySelector('input[name="tagsSelectorInput"]');

		assert.ok(hiddenInput);
		assert.deepEqual(['A', 'B'], selector.val());
	});

	it('should update hidden input value when tag is added and removed', function(done) {
		selector = new TagsSelector({
			tags: ['A', 'B', 'C']
		}).render();

		var removeElement = selector.element.querySelector('.tag span.glyphicon-remove');

		dom.triggerEvent(removeElement, 'click');

		assert.deepEqual(['B', 'C'], selector.val());

		var tagsInput = selector.element.querySelector('.tags-input');

		tagsInput.value = 'D,';

		dom.triggerEvent(tagsInput, 'focusout');

		async.nextTick(function() {
			assert.deepEqual(['B', 'C', 'D'], selector.val());
			done();
		});
	});

	it('should create a new tag when delimeter is entered', function(done) {
		selector = new TagsSelector({
			tags: ['A', 'B'],
			delimeter: ','
		}).render();

		var tagsInput = selector.element.querySelector('.tags-input');

		dom.triggerEvent(tagsInput, 'keypress', {
			keyCode: 44
		});

		tagsInput.value = 'C';

		dom.triggerEvent(tagsInput, 'keypress', {
			keyCode: 13
		});

		setTimeout(function() {
			assert.deepEqual(['A', 'B', 'C'], selector.val());

			tagsInput.value = 'D,';

			dom.triggerEvent(tagsInput, 'keypress', {
				keyCode: 13
			});

			done();
		}, 50);
	});

	it('should not allow empty tags', function(done) {
		selector = new TagsSelector({
			tags: ['A', 'B']
		}).render();

		var tagsInput = selector.element.querySelector('.tags-input');

		tagsInput.value = ' ';

		dom.triggerEvent(tagsInput, 'focusout');

		async.nextTick(function() {
			assert.deepEqual(['A', 'B'], selector.val());
			done();
		});
	});

	it('should not allow duplicate tags', function(done) {
		selector = new TagsSelector({
			tags: ['A', 'B']
		}).render();

		var tagsInput = selector.element.querySelector('.tags-input');

		tagsInput.value = 'A';

		dom.triggerEvent(tagsInput, 'keypress', {
			keyCode: 65
		});

		dom.triggerEvent(tagsInput, 'focusout');

		async.nextTick(function() {
			assert.deepEqual(['A', 'B'], selector.val());
			done();
		});
	});

	it('should remove tags when remove methods are called', function() {
		selector = new TagsSelector({
			tags: ['A', 'B', 'C', 'D']
		}).render();

		selector.removeTag('A');
		selector.removeTag('F');

		assert.deepEqual(['B', 'C', 'D'], selector.val());

		selector.removeAll();

		assert.deepEqual([], selector.val());
	});
});

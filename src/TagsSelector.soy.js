/* jshint ignore:start */
import ComponentRegistry from 'bower:metal/src/component/ComponentRegistry';
var Templates = ComponentRegistry.Templates;
// This file was automatically generated from TagsSelector.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Templates.TagsSelector.
 */

if (typeof Templates.TagsSelector == 'undefined') { Templates.TagsSelector = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.TagsSelector.content = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '" class="tagsSelector component' + soy.$$escapeHtmlAttribute(opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + '"><input name="tagsSelectorInput" type="text" value="' + soy.$$escapeHtmlAttribute(opt_data.tags) + '" />' + Templates.TagsSelector.selected(opt_data, null, opt_ijData) + '<input class="tags-input" data-onfocusout="handleFocusout_" data-onkeypress="handleKeypress_" id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-input" type="text" placeholder="' + soy.$$escapeHtmlAttribute(opt_data.placeholder) + '" /></div>');
};
if (goog.DEBUG) {
  Templates.TagsSelector.content.soyTemplateName = 'Templates.TagsSelector.content';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.TagsSelector.selected = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-selected" class="selected">';
  var tagList20 = opt_data.tags;
  var tagListLen20 = tagList20.length;
  for (var tagIndex20 = 0; tagIndex20 < tagListLen20; tagIndex20++) {
    var tagData20 = tagList20[tagIndex20];
    output += '<span class="tag label label-info">' + soy.$$escapeHtml(tagData20) + '<span class="glyphicon glyphicon-remove" data-onclick="handleRemoveClick_"></span></span>';
  }
  output += '</div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  Templates.TagsSelector.selected.soyTemplateName = 'Templates.TagsSelector.selected';
}

Templates.TagsSelector.content.params = ["id","placeholder","tags"];
Templates.TagsSelector.selected.params = ["id","tags"];
export default Templates.TagsSelector;
/* jshint ignore:end */

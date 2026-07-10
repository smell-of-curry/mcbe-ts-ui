"use strict";
/**
 * Common UI Pattern Helpers
 *
 * Pre-built binding patterns for common Bedrock UI scenarios.
 * These patterns encapsulate complex binding logic into simple functions.
 *
 * @module helpers/ui-patterns
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.phudVisibility = phudVisibility;
exports.phudRead = phudRead;
exports.phudPhoneBinding = phudPhoneBinding;
exports.conditionalBindings = conditionalBindings;
exports.phudPhoneConditionalBindings = phudPhoneConditionalBindings;
exports.phudText = phudText;
exports.hudSubtitleBinding = hudSubtitleBinding;
exports.formVisibility = formVisibility;
exports.formRead = formRead;
exports.formButtonBindings = formButtonBindings;
exports.factoryBindings = factoryBindings;
exports.buttonFlagVisibility = buttonFlagVisibility;
exports.standardButtonBindings = standardButtonBindings;
exports.buttonEnabledBinding = buttonEnabledBinding;
exports.fullButtonBindings = fullButtonBindings;
exports.chestVisibility = chestVisibility;
exports.itemTextureBindings = itemTextureBindings;
exports.nonRendererItemBindings = nonRendererItemBindings;
exports.formButtonPrefixVisibility = formButtonPrefixVisibility;
exports.hoverTextBindings = hoverTextBindings;
exports.imageTextureBindings = imageTextureBindings;
exports.siblingImageVisibilityBinding = siblingImageVisibilityBinding;
const bindings_1 = require("./bindings");
const expressions_1 = require("./expressions");
// ============================================================================
// PHUD (Pokemon HUD) Pattern Helpers
// ============================================================================
/**
 * Creates standard PHUD visibility bindings.
 *
 * This pattern:
 * 1. Fetches a property value from the "elements" sibling control
 * 2. Shows the element only when the property is not empty
 * 3. Enables the element only when the property is not empty
 *
 * @param propertyName - The property name to bind (e.g., "#fake_actionbar")
 * @returns Array of bindings for visibility control
 *
 * @example
 * ```typescript
 * panel("main")
 *   .bindings(...phudVisibility("#fake_actionbar"))
 * ```
 */
function phudVisibility(propertyName) {
    const visibilityExpr = (0, expressions_1.notEmpty)(propertyName);
    return [
        {
            binding_name: "#null",
            binding_type: "view",
            source_control_name: "elements",
            source_property_name: propertyName,
            target_property_name: propertyName,
        },
        (0, bindings_1.viewBinding)(visibilityExpr, "#visible"),
        (0, bindings_1.viewBinding)(visibilityExpr, "#enabled"),
    ];
}
/**
 * Creates a binding that reads from the "elements" control.
 *
 * @param sourceProperty - The source property on elements
 * @param targetProperty - The target property on this element
 * @param transform - Optional transformation expression (use ${prop} placeholder)
 * @returns A single binding object
 */
function phudRead(sourceProperty, targetProperty, transform) {
    const sourceExpr = transform
        ? transform.replace(/\$\{prop\}/g, sourceProperty)
        : sourceProperty;
    return {
        binding_name: "#null",
        binding_type: "view",
        source_control_name: "elements",
        source_property_name: sourceExpr,
        target_property_name: targetProperty,
    };
}
/**
 * Creates a binding to read #phone from the elements control.
 *
 * @param targetProperty - Target property (default: "#value")
 * @returns Binding for phone value
 */
function phudPhoneBinding(targetProperty = "#value") {
    return {
        binding_name: "#null",
        binding_type: "view",
        source_control_name: "elements",
        source_property_name: "#phone",
        target_property_name: targetProperty,
    };
}
/**
 * Creates conditional visibility and enabled bindings from a $condition variable.
 *
 * @returns Array of visibility and enabled bindings using $condition
 */
function conditionalBindings() {
    return [
        (0, bindings_1.viewBinding)("$condition", "#visible"),
        (0, bindings_1.viewBinding)("$condition", "#enabled"),
    ];
}
/**
 * Creates phone element bindings (value read + conditional visibility).
 *
 * @returns Array of bindings for phone conditional elements
 */
function phudPhoneConditionalBindings() {
    return [phudPhoneBinding("#value"), ...conditionalBindings()];
}
/**
 * Configures a label to display PHUD text from a binding property.
 *
 * This is a shorthand that:
 * 1. Sets `.text("#text")` to use the bound value
 * 2. Adds the binding to fetch and strip underscore from the property
 *
 * @param labelBuilder - The label builder to configure
 * @param propertyName - The PHUD property to bind (e.g., "#fake_actionbar")
 * @returns The label builder for chaining
 *
 * @example
 * ```typescript
 * phudText(
 *   label("display"),
 *   "#player_ping_text"
 * )
 * ```
 */
function phudText(labelBuilder, propertyName) {
    return labelBuilder.bindings(phudRead(propertyName, labelBuilder.bindingName, (0, expressions_1.strip)("${prop}")));
}
/**
 * Creates a binding for HUD subtitle text.
 *
 * @returns A global binding for subtitle text
 */
function hudSubtitleBinding() {
    return {
        binding_name: "#hud_subtitle_text_string",
        binding_name_override: "#text",
        binding_type: "global",
    };
}
// ============================================================================
// Form Pattern Helpers
// ============================================================================
/**
 * Creates visibility bindings for server forms based on title flags.
 *
 * @param flag - The flag string to check for in title text
 * @returns Array of bindings
 */
function formVisibility(flag) {
    const flagExpr = (0, expressions_1.contains)("#title_text", flag);
    return [
        (0, bindings_1.globalBinding)("#title_text"),
        (0, bindings_1.viewBinding)(flagExpr, "#visible"),
        (0, bindings_1.viewBinding)(flagExpr, "#enabled"),
    ];
}
/**
 * Creates a form text binding.
 *
 * @param targetProperty - The target property (default: "#form_text")
 * @returns A global binding for form text
 */
function formRead(targetProperty = "#form_text") {
    return (0, bindings_1.globalBinding)("#form_text", targetProperty);
}
/**
 * Creates bindings for form button collection items.
 *
 * @param textExpr - Expression for text transformation
 * @param collectionName - Collection name (default: "form_buttons")
 * @returns Array of bindings for button text
 */
function formButtonBindings(textExpr, collectionName = "form_buttons") {
    const bindings = [
        (0, bindings_1.collectionDetailsBinding)(collectionName),
        (0, bindings_1.collectionBinding)("#form_button_text", collectionName),
    ];
    if (textExpr) {
        bindings.push((0, bindings_1.viewBinding)(textExpr, "#text"));
    }
    return bindings;
}
// ============================================================================
// Button Factory Pattern Helpers
// ============================================================================
/**
 * Creates factory bindings for button collections.
 *
 * Standard pattern for stack panels that generate buttons from a collection.
 *
 * @returns Binding for collection length
 */
function factoryBindings() {
    return [
        {
            binding_name: "#form_button_length",
            binding_name_override: "#collection_length",
        },
    ];
}
/**
 * Creates visibility bindings for buttons based on text flags.
 *
 * @param flag - The flag to check for in button text
 * @param collectionName - Collection name (default: "form_buttons")
 * @returns Array of bindings
 */
function buttonFlagVisibility(flag, collectionName = "form_buttons") {
    return [
        (0, bindings_1.collectionBinding)("#form_button_text", collectionName),
        (0, bindings_1.viewBinding)((0, expressions_1.contains)("#form_button_text", flag), "#visible"),
    ];
}
/**
 * Creates standard button bindings with collection details.
 *
 * @param collectionName - Collection name (default: "form_buttons")
 * @returns Array of bindings
 */
function standardButtonBindings(collectionName = "form_buttons") {
    return [(0, bindings_1.collectionDetailsBinding)(collectionName)];
}
/**
 * Creates button enabled binding based on prefix check.
 *
 * @param enabledExpression - Expression for enabled state
 * @returns Enabled binding
 */
function buttonEnabledBinding(enabledExpression) {
    return (0, bindings_1.enabledBinding)(enabledExpression);
}
/**
 * Creates full button bindings with visibility and enabled based on text.
 *
 * @param visibleExpression - Expression for visibility
 * @param enabledExpression - Expression for enabled state
 * @param collectionName - Collection name (default: "form_buttons")
 * @returns Array of bindings
 */
function fullButtonBindings(visibleExpression, enabledExpression, collectionName = "form_buttons") {
    return [
        (0, bindings_1.collectionDetailsBinding)(collectionName),
        (0, bindings_1.collectionBindingNone)(collectionName),
        (0, bindings_1.collectionBinding)("#form_button_text", collectionName),
        (0, bindings_1.visibilityBinding)(visibleExpression),
        (0, bindings_1.enabledBinding)(enabledExpression),
    ];
}
// ============================================================================
// Chest UI Pattern Helpers
// ============================================================================
/**
 * Creates visibility bindings for chest UI types based on title flags.
 *
 * @param flag - The flag string identifying the chest type
 * @returns Array of bindings
 */
function chestVisibility(flag) {
    return [
        { binding_name: "#title_text" },
        (0, bindings_1.viewBinding)((0, expressions_1.contains)("#title_text", flag), "#visible"),
    ];
}
/**
 * Standard texture bindings for item renderers in forms.
 *
 * @param collectionName - Collection name (default: "form_buttons")
 * @param options - Optional aux-expression tweaks
 * @returns Array of bindings for texture loading
 */
function itemTextureBindings(collectionName = "form_buttons", options = {}) {
    const auxExpr = options.stripBracketSuffix
        ? "(1 * (#form_button_texture - ']'))"
        : "(#form_button_texture * 1)";
    return [
        (0, bindings_1.collectionBinding)("#form_button_texture", collectionName),
        (0, bindings_1.viewBinding)("(not (('%.8s' * #form_button_texture) = 'textures'))", "#visible"),
        (0, bindings_1.viewBinding)("(not ((#form_button_texture = '') or (#form_button_texture = 'loading')))", "#visible"),
        (0, bindings_1.viewBinding)(auxExpr, "#item_id_aux"),
    ];
}
/**
 * Bindings for custom texture icons (path starts with `textures`).
 *
 * @param collectionName - Collection name (default: "form_buttons")
 * @returns Array of bindings for non-item-renderer images
 */
function nonRendererItemBindings(collectionName = "form_buttons") {
    return [
        (0, bindings_1.collectionBinding)("#form_button_texture", collectionName, "#texture"),
        (0, bindings_1.viewBinding)("(not ((#texture = '') or (#texture = 'loading')))", "#visible"),
        (0, bindings_1.viewBinding)("(('%.8s' * #texture) = 'textures')", "#visible"),
    ];
}
/**
 * Collection + visibility when `#form_button_text` starts with a prefix.
 *
 * @param prefix - Prefix to match (e.g. `"cht:"`, `"inv:"`)
 * @param collectionName - Collection name (default: "form_buttons")
 * @returns Array of bindings
 */
function formButtonPrefixVisibility(prefix, collectionName = "form_buttons") {
    return [
        (0, bindings_1.collectionBindingNone)(collectionName),
        (0, bindings_1.collectionDetailsBinding)(collectionName),
        (0, bindings_1.collectionBinding)("#form_button_text", collectionName),
        (0, bindings_1.viewBinding)(`(('%.${prefix.length}s' * #form_button_text) = '${prefix}')`, "#visible"),
    ];
}
/**
 * Hover-text renderer bindings that strip a fixed prefix length.
 *
 * @param stripLen - Characters to strip from the start of `#form_button_text`
 * @param collectionName - Collection name (default: "form_buttons")
 * @returns Array of bindings writing `#hover_text`
 */
function hoverTextBindings(stripLen = 58, collectionName = "form_buttons") {
    return [
        (0, bindings_1.collectionBinding)("#form_button_text", collectionName),
        (0, bindings_1.collectionDetailsBinding)(collectionName),
        (0, bindings_1.viewBinding)(`(#form_button_text - ('%.${stripLen}s' * #form_button_text))`, "#hover_text"),
    ];
}
/**
 * Creates texture bindings for image display from collection.
 *
 * @param collectionName - Collection name (default: "form_buttons")
 * @returns Array of bindings
 */
function imageTextureBindings(collectionName = "form_buttons") {
    return [
        (0, bindings_1.collectionBinding)("#form_button_texture", collectionName, "#texture"),
        (0, bindings_1.collectionBinding)("#form_button_texture_file_system", collectionName, "#texture_file_system"),
        (0, bindings_1.viewBinding)("(not ((#texture = '') or (#texture = 'loading')))", "#visible"),
    ];
}
/**
 * Creates bindings for checking if image texture is present from sibling.
 *
 * @returns Binding for sibling image visibility check
 */
function siblingImageVisibilityBinding() {
    return (0, bindings_1.siblingViewBinding)("image", "(not (#texture = ''))", "#visible");
}
// Note: variableParserBindings is now exported from "./bindings"
//# sourceMappingURL=ui-patterns.js.map
"use strict";
/**
 * Bedrock UI Generator - Modification Types
 *
 * Modifications allow you to alter existing vanilla UI elements
 * by inserting, removing, or replacing controls.
 *
 * @see https://wiki.bedrock.dev/json-ui/json-ui-documentation#control
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertBack = insertBack;
exports.insertFront = insertFront;
exports.insertAfter = insertAfter;
exports.insertBefore = insertBefore;
exports.removeControl = removeControl;
exports.replaceControl = replaceControl;
// ============================================================================
// Helper Functions
// ============================================================================
/**
 * Create an insert_back modification.
 *
 * @example
 * ```typescript
 * const mod = insertBack("controls", { "my_el@ns.el": {} });
 * ```
 */
function insertBack(arrayName, ...controls) {
    return {
        array_name: arrayName,
        operation: "insert_back",
        value: controls,
    };
}
/**
 * Create an insert_front modification.
 *
 * @example
 * ```typescript
 * const mod = insertFront("controls", { "my_el@ns.el": {} });
 * ```
 */
function insertFront(arrayName, ...controls) {
    return {
        array_name: arrayName,
        operation: "insert_front",
        value: controls,
    };
}
/**
 * Create an insert_after modification.
 *
 * @example
 * ```typescript
 * const mod = insertAfter("existing_control", { "my_el@ns.el": {} });
 * ```
 */
function insertAfter(controlName, ...controls) {
    return {
        control_name: controlName,
        operation: "insert_after",
        value: controls,
    };
}
/**
 * Create an insert_before modification.
 *
 * @example
 * ```typescript
 * const mod = insertBefore("existing_control", { "my_el@ns.el": {} });
 * ```
 */
function insertBefore(controlName, ...controls) {
    return {
        control_name: controlName,
        operation: "insert_before",
        value: controls,
    };
}
/**
 * Create a remove modification.
 *
 * @example
 * ```typescript
 * const mod = removeControl("unwanted_element");
 * ```
 */
function removeControl(controlName) {
    return {
        control_name: controlName,
        operation: "remove",
    };
}
/**
 * Create a replace modification.
 *
 * @example
 * ```typescript
 * const mod = replaceControl("old_element", { "new_el@ns.el": {} });
 * ```
 */
function replaceControl(controlName, ...controls) {
    return {
        control_name: controlName,
        operation: "replace",
        value: controls,
    };
}
//# sourceMappingURL=modifications.js.map
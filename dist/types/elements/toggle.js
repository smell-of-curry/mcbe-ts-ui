"use strict";
/**
 * Bedrock UI Generator - Toggle Element Type
 *
 * Toggles are checkbox/radio button style elements that maintain
 * an on/off state. They can function independently or as part
 * of a radio group where only one can be selected.
 *
 * @see https://wiki.bedrock.dev/json-ui/json-ui-documentation#toggle
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isToggle = isToggle;
// ============================================================================
// Type Guard
// ============================================================================
/**
 * Type guard to check if an element is a toggle.
 */
function isToggle(element) {
    return element.type === "toggle";
}
//# sourceMappingURL=toggle.js.map
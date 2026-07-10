"use strict";
/**
 * Bedrock UI Generator - Dropdown Element Type
 *
 * Dropdowns display a collapsible list of options.
 * When clicked, they expand to show selectable items.
 *
 * @see https://wiki.bedrock.dev/json-ui/json-ui-documentation#dropdown
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDropdown = isDropdown;
// ============================================================================
// Type Guard
// ============================================================================
/**
 * Type guard to check if an element is a dropdown.
 */
function isDropdown(element) {
    return element.type === "dropdown";
}
//# sourceMappingURL=dropdown.js.map
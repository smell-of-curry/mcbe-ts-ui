"use strict";
/**
 * Bedrock UI Generator - Edit Box Element Type
 *
 * Edit boxes are text input fields that allow users to
 * type and edit text content.
 *
 * @see https://wiki.bedrock.dev/json-ui/json-ui-documentation#text-edit
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEditBox = isEditBox;
// ============================================================================
// Type Guard
// ============================================================================
/**
 * Type guard to check if an element is an edit box.
 */
function isEditBox(element) {
    return element.type === "edit_box";
}
//# sourceMappingURL=edit_box.js.map
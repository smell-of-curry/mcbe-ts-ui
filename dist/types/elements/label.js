"use strict";
/**
 * Bedrock UI Generator - Label Element Type
 *
 * Labels display text content with various styling options.
 * They support static text, bound text from game data,
 * localized strings, and rich formatting.
 *
 * @see https://wiki.bedrock.dev/json-ui/json-ui-documentation#text
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLabel = isLabel;
// ============================================================================
// Type Guard
// ============================================================================
/**
 * Type guard to check if an element is a label.
 */
function isLabel(element) {
    return element.type === "label";
}
//# sourceMappingURL=label.js.map
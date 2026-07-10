"use strict";
/**
 * Bedrock UI Generator - Scrollbar Box Element Type
 *
 * Scrollbar boxes are the draggable thumb/handle of a scrollbar.
 * They indicate scroll position and allow direct dragging.
 *
 * @see https://wiki.bedrock.dev/json-ui/json-ui-documentation#scrollbar-box
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isScrollbarBox = isScrollbarBox;
// ============================================================================
// Type Guard
// ============================================================================
/**
 * Type guard to check if an element is a scrollbar box.
 */
function isScrollbarBox(element) {
    return element.type === "scrollbar_box";
}
//# sourceMappingURL=scrollbar_box.js.map
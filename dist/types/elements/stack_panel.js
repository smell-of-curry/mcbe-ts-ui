"use strict";
/**
 * Bedrock UI Generator - Stack Panel Element Type
 *
 * Stack panels automatically arrange child elements in a line,
 * either horizontally or vertically. Children are positioned
 * one after another without overlapping.
 *
 * @see https://wiki.bedrock.dev/json-ui/json-ui-documentation#stack-panel
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isStackPanel = isStackPanel;
// ============================================================================
// Type Guard
// ============================================================================
/**
 * Type guard to check if an element is a stack panel.
 */
function isStackPanel(element) {
    return element.type === "stack_panel";
}
//# sourceMappingURL=stack_panel.js.map
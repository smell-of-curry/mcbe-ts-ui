"use strict";
/**
 * Bedrock UI Generator - Panel Element Type
 *
 * Panel is the most basic and commonly used UI element type.
 * It serves as a container for other elements and can be styled
 * with backgrounds, borders, and other visual properties.
 *
 * @see https://wiki.bedrock.dev/json-ui/json-ui-documentation#element-types
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPanel = isPanel;
// ============================================================================
// Type Guard
// ============================================================================
/**
 * Type guard to check if an element is a panel.
 * Note: Elements without a type are also panels (default type).
 */
function isPanel(element) {
    return element.type === "panel" || element.type === undefined;
}
//# sourceMappingURL=panel.js.map
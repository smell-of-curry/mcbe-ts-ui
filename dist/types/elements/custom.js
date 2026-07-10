"use strict";
/**
 * Bedrock UI Generator - Custom Element Type
 *
 * Custom elements use native code renderers to display
 * complex or dynamic content that can't be created with
 * standard UI elements.
 *
 * @see https://wiki.bedrock.dev/json-ui/json-ui-documentation#custom-render
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCustom = isCustom;
// ============================================================================
// Type Guard
// ============================================================================
/**
 * Type guard to check if an element is a custom renderer.
 */
function isCustom(element) {
    return element.type === "custom";
}
//# sourceMappingURL=custom.js.map
"use strict";
/**
 * Bedrock UI Generator - Factory Element Type
 *
 * Factories dynamically create UI elements based on data.
 * They're used when the UI structure depends on game state
 * (e.g., different form types, dynamic content).
 *
 * @see https://wiki.bedrock.dev/json-ui/json-ui-documentation#factory
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFactory = isFactory;
// ============================================================================
// Type Guard
// ============================================================================
/**
 * Type guard to check if an element is a factory.
 */
function isFactory(element) {
    return element.type === "factory";
}
//# sourceMappingURL=factory.js.map
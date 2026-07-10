"use strict";
/**
 * Bedrock UI Generator - Selection Wheel Element Type
 *
 * Selection wheels display radial menus where users select
 * options by pointing in different directions.
 *
 * @see https://wiki.bedrock.dev/json-ui/json-ui-documentation#selection-wheel
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSelectionWheel = isSelectionWheel;
// ============================================================================
// Type Guard
// ============================================================================
/**
 * Type guard to check if an element is a selection wheel.
 */
function isSelectionWheel(element) {
    return element.type === "selection_wheel";
}
//# sourceMappingURL=selection_wheel.js.map
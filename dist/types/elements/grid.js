"use strict";
/**
 * Bedrock UI Generator - Grid Element Type
 *
 * Grids arrange children in a 2D grid layout with rows and columns.
 * They're commonly used for inventory slots, button arrays, and
 * any repeated UI elements.
 *
 * @see https://wiki.bedrock.dev/json-ui/json-ui-documentation#grid
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isGrid = isGrid;
// ============================================================================
// Type Guard
// ============================================================================
/**
 * Type guard to check if an element is a grid.
 */
function isGrid(element) {
    return element.type === "grid";
}
//# sourceMappingURL=grid.js.map
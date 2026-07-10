"use strict";
/**
 * Bedrock UI Generator - Input Panel Element Type
 *
 * Input panels are specialized panels that handle input events
 * like touch, mouse, and gestures. They can capture or pass
 * through input to elements behind them.
 *
 * @see https://wiki.bedrock.dev/json-ui/json-ui-documentation#input
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isInputPanel = isInputPanel;
// ============================================================================
// Type Guard
// ============================================================================
/**
 * Type guard to check if an element is an input panel.
 */
function isInputPanel(element) {
    return element.type === "input_panel";
}
//# sourceMappingURL=input_panel.js.map
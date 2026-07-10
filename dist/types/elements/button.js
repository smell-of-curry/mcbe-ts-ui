"use strict";
/**
 * Bedrock UI Generator - Button Element Type
 *
 * Buttons are interactive elements that respond to clicks/taps.
 * They support multiple visual states (default, hover, pressed, locked)
 * and can trigger actions via button mappings.
 *
 * @see https://wiki.bedrock.dev/json-ui/json-ui-documentation#button
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isButton = isButton;
// ============================================================================
// Type Guard
// ============================================================================
/**
 * Type guard to check if an element is a button.
 */
function isButton(element) {
    return element.type === "button";
}
//# sourceMappingURL=button.js.map
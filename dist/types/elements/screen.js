"use strict";
/**
 * Bedrock UI Generator - Screen Element Type
 *
 * Screens are top-level UI containers that represent
 * entire UI views (menus, HUD overlays, dialogs).
 *
 * @see https://wiki.bedrock.dev/json-ui/json-ui-documentation#screen
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isScreen = isScreen;
// ============================================================================
// Type Guard
// ============================================================================
/**
 * Type guard to check if an element is a screen.
 */
function isScreen(element) {
    return element.type === "screen";
}
//# sourceMappingURL=screen.js.map
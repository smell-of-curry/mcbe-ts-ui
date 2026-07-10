"use strict";
/**
 * Bedrock UI Generator - Slider Element Type
 *
 * Sliders allow users to select a value within a range by
 * dragging a handle along a track.
 *
 * @see https://wiki.bedrock.dev/json-ui/json-ui-documentation#slider
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSlider = isSlider;
// ============================================================================
// Type Guard
// ============================================================================
/**
 * Type guard to check if an element is a slider.
 */
function isSlider(element) {
    return element.type === "slider";
}
//# sourceMappingURL=slider.js.map